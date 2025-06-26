import { Timestamp } from "firebase-admin/firestore";
import { UserProfile, userProfileSchema } from "../schemas/user.schema";

import * as logger from "firebase-functions/logger";

/**
 * Repository class for managing user data operations in Firestore
 */
export class UserRepository {
  /**
   * The Firestore collection name for users
   */
  private readonly collectionName = "users";

  /**
   * Creates an instance of UserRepository
   * @param {FirebaseFirestore.Firestore} firestore - Firestore database instance
   */
  constructor(private readonly firestore: FirebaseFirestore.Firestore) {}

  /**
   * Retrieves all user profiles from the users collection
   * @return {Promise<UserProfile[] | null>} Promise that resolves to an array of user profiles or null if error occurs
   */
  async getAllUserProfiles(): Promise<UserProfile[] | null> {
    const snapshots = await this.firestore.collection(this.collectionName).get();

    const profiles: UserProfile[] = [];

    snapshots.forEach((doc) => {
      const docData = doc.data();

      const userProfile = userProfileSchema.safeParse({
        ...docData,
        birthDate: new Timestamp(docData.birthDate.seconds, docData.birthDate.nanoseconds).toDate(),
        createdAt: new Timestamp(docData.createdAt.seconds, docData.createdAt.nanoseconds).toDate(),
        updatedAt: new Timestamp(docData.updatedAt.seconds, docData.updatedAt.nanoseconds).toDate(),
      });

      if (!userProfile.success) {
        logger.error("Invalid user profile data:", userProfile.error);

        return null;
      }

      profiles.push(userProfile.data);

      return doc.data();
    });

    return profiles;
  }
}
