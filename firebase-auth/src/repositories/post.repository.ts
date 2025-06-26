import { db } from '@/apps/firebase.app';
import { CustomPostError, PostErrorCode, handlePostError } from '@/error-handlers/post.error-handler';
import type { IContentModerationService } from '@/interfaces/content-moderation/content-moderation.service';
import type { IImageService } from '@/interfaces/image/image-service.interface';
import type { IPostRepository } from '@/interfaces/post/post-repository.interface';
import { postSchema } from '@/schemas/post.schemas';
import type { ApiResponse } from '@/types/api.types';
import { errorResponse, successResponse } from '@/types/api.types';
import type { CreatePostData, Post } from '@/types/post.types';

import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

class PostRepository implements IPostRepository {
  private readonly collectionName = 'posts';
  private readonly postsCollection = collection(db, this.collectionName);
  private readonly imageService: IImageService;
  private readonly contentModerationService: IContentModerationService;

  constructor(imageService: IImageService, contentModerationService: IContentModerationService) {
    this.imageService = imageService;
    this.contentModerationService = contentModerationService;
  }

  public async create(
    authorUID: string,
    authorDisplayName: string,
    authorEmail: string,
    postData: CreatePostData,
  ): Promise<ApiResponse<Post>> {
    try {
      const imageUploadResult = await this.imageService.uploadImage(postData.imageFile);

      if (!imageUploadResult.success) {
        return errorResponse(handlePostError(new CustomPostError(PostErrorCode.IMAGE_UPLOAD_FAILED)));
      }

      const postDoc = doc(this.postsCollection);

      const postToCreate = postSchema.safeParse({
        id: postDoc.id,
        title: await this.contentModerationService.moderateContent(postData.title),
        content: await this.contentModerationService.moderateContent(postData.content),
        imageName: imageUploadResult.data.name,
        imageUrl: imageUploadResult.data.url,
        authorDisplayName,
        authorUID,
        authorEmail,
        createdAt: new Date(),
      });

      if (!postToCreate.success) {
        return errorResponse(handlePostError(new CustomPostError(PostErrorCode.INVALID_POST_DATA)));
      }

      await setDoc(postDoc, postToCreate.data);

      return successResponse(postToCreate.data);
    } catch (error) {
      return errorResponse(handlePostError(error));
    }
  }

  public async getUserPosts(authorUID: string | undefined): Promise<ApiResponse<Post[]>> {
    try {
      const q = authorUID
        ? query(this.postsCollection, where('authorUID', '==', authorUID), orderBy('createdAt', 'desc'))
        : query(this.postsCollection, orderBy('createdAt', 'desc'));

      const querySnapshot = await getDocs(q);
      const posts: Post[] = [];

      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();

        const post = postSchema.safeParse({
          ...data,
          createdAt: new Timestamp(data.createdAt.seconds, data.createdAt.nanoseconds).toDate(),
        });

        if (post.success) {
          posts.push(post.data);
        } else {
          return errorResponse(handlePostError(new CustomPostError(PostErrorCode.DOCUMENT_PARSE_ERROR)));
        }
      });

      return successResponse(posts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      return errorResponse(handlePostError(error));
    }
  }

  public async delete(postId: string): Promise<ApiResponse> {
    try {
      const postDoc = doc(this.postsCollection, postId);

      const docSnap = await getDoc(postDoc);

      if (!docSnap.exists()) {
        return errorResponse(handlePostError(new CustomPostError(PostErrorCode.POST_NOT_FOUND)));
      }

      const data = docSnap.data();

      const post = postSchema.safeParse({
        ...data,
        createdAt: new Timestamp(data.createdAt.seconds, data.createdAt.nanoseconds).toDate(),
      });

      if (!post.success) {
        return errorResponse(handlePostError(new CustomPostError(PostErrorCode.DOCUMENT_PARSE_ERROR)));
      }

      await deleteDoc(postDoc);

      await this.imageService.deleteImage(post.data.imageName);

      return successResponse();
    } catch (error) {
      return errorResponse(handlePostError(error));
    }
  }
}

export const postRepository = (imageService: IImageService, contentModerationService: IContentModerationService) =>
  new PostRepository(imageService, contentModerationService);
