import { Timestamp } from 'firebase-admin/firestore';
import { postSchema } from '../schemas/post.schema';
import { Post } from '../types/post.type';

import * as logger from 'firebase-functions/logger';

/**
 * PostRepository class for managing posts in Firestore
 */
export class PostRepository {
  /**
   * The Firestore collection name for posts
   */
  private readonly collectionName = 'posts';

  /**
   * Creates an instance of PostRepository
   * @param {FirebaseFirestore.Firestore} firestore - Firestore database instance
   */
  constructor(private readonly firestore: FirebaseFirestore.Firestore) {}

  /**
   * Retrieves a post by ID from the posts collection
   * @param {string} id - The ID of the post to retrieve
   * @return {Promise<Post | null>} Promise that resolves to the post or null if not found
   */
  async getPostById(id: string): Promise<Post | null> {
    const doc = await this.firestore.collection(this.collectionName).doc(id).get();

    if (!doc.exists) {
      logger.warn(`Post with ID ${id} does not exist.`);
      return null;
    }

    const docData = doc.data();

    if (!docData) {
      logger.warn(`No data found for post with ID ${id}.`);
      return null;
    }

    const post = postSchema.safeParse({
      ...docData,
      createdAt: new Timestamp(docData.createdAt.seconds, docData.createdAt.nanoseconds).toDate(),
    });

    if (!post.success) {
      logger.error('Invalid post data:', post.error);
      return null;
    }

    return post.data;
  }
}
