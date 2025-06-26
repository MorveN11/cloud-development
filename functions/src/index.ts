import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import { Post, postSchema } from "./schemas/post.schema";
import { UserRepository } from "./repositories/user.repository";
import { NotificationService } from "./services/notification.service";
import { Timestamp } from "firebase-admin/firestore";

admin.initializeApp();

export const onPostCreated = onDocumentCreated("posts/{id}", async (event) => {
  try {
    const userRepository = new UserRepository(admin.firestore());

    const notificationService = new NotificationService(admin.messaging());

    const postId = event.params.id;

    if (!event.data || !postId) {
      logger.error("No post data found");
      return;
    }

    const evenData = event.data.data();

    const post = postSchema.safeParse({
      ...evenData,
      createdAt: new Timestamp(evenData.createdAt.seconds, evenData.createdAt.nanoseconds).toDate(),
    });

    if (!post.success) {
      logger.error("Invalid post data:", post.error);
      return;
    }

    const postData: Post = post.data;

    logger.info(`New post created: ${postId}`, { post: postData });

    const users = await userRepository.getAllUserProfiles();

    if (!users || users.length === 0) {
      logger.info("No users found to notify");
      return;
    }

    const message = {
      title: "!Nuevo post disponible!",
      body: `Consulta el nuevo post: ${postData.title}`,
    };

    const fcmTokens: string[] = users.flatMap((user) => user.fcmTokens || []);

    await notificationService.sendNotification(message.title, message.body, fcmTokens);
  } catch (error) {
    logger.error("Error sending FCM notifications:", error);
    throw error;
  }
});
