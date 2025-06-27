import { db } from '@/apps/firebase.app';
import { CustomLikeError, LikeErrorCode, handleLikeError } from '@/error-handlers/like.error-handler';
import type { ILikeRepository } from '@/interfaces/like/like-repository.interface';
import { likeSchema } from '@/schemas/like.schemas';
import { errorResponse, successResponse, type ApiResponse } from '@/types/api.types';
import type { Like } from '@/types/like.types';

import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  query,
  runTransaction,
  where,
} from 'firebase/firestore';

class LikeRepository implements ILikeRepository {
  private readonly collectionName = 'likes';
  private readonly likesCollection = collection(db, this.collectionName);

  async toggleLike(postId: string, userId: string): Promise<ApiResponse<boolean>> {
    try {
      return successResponse(
        await runTransaction(db, async (transaction) => {
          const likeQuery = query(this.likesCollection, where('postId', '==', postId), where('userId', '==', userId));

          const existingLikes = await getDocs(likeQuery);

          if (!existingLikes.empty) {
            const likeDoc = existingLikes.docs[0];
            await deleteDoc(likeDoc.ref);

            const postRef = doc(db, 'posts', postId);

            transaction.update(postRef, {
              likesCount: increment(-1),
            });

            return false;
          } else {
            const likeDoc = doc(this.likesCollection);

            const docToAdd = likeSchema.safeParse({
              id: likeDoc.id,
              postId,
              userId,
              createdAt: new Date(),
            });

            if (!docToAdd.success) {
              throw new CustomLikeError(LikeErrorCode.DOCUMENT_PARSE_ERROR);
            }

            await addDoc(this.likesCollection, docToAdd.data);

            const postRef = doc(db, 'posts', postId);

            transaction.update(postRef, {
              likesCount: increment(1),
            });

            return true;
          }
        }),
      );
    } catch (error) {
      return errorResponse(handleLikeError(error));
    }
  }

  async getUserLikes(userId: string): Promise<ApiResponse<Like[]>> {
    try {
      const q = query(this.likesCollection, where('userId', '==', userId));
      const snapshot = await getDocs(q);

      const likes: Like[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();

        const parsedLike = likeSchema.safeParse({
          ...data,
          createdAt: new Timestamp(data.createdAt.seconds, data.createdAt.nanoseconds).toDate(),
        });

        if (!parsedLike.success) {
          throw new CustomLikeError(LikeErrorCode.DOCUMENT_PARSE_ERROR);
        }

        likes.push(parsedLike.data);
      });

      return successResponse(likes);
    } catch (error) {
      return errorResponse(handleLikeError(error));
    }
  }
}

export const likeRepository = new LikeRepository();
