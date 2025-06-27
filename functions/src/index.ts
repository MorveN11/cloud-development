import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore';
import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';
import { postSchema } from './schemas/post.schema';
import { Post } from './types/post.type';
import { UserRepository } from './repositories/user.repository';
import { NotificationService } from './services/notification.service';
import { Timestamp } from 'firebase-admin/firestore';
import { likeSchema } from './schemas/like.schema';
import { PostRepository } from './repositories/post.repository';
import { Like } from './types/like.type';

admin.initializeApp();

export const onPostCreated = onDocumentCreated('posts/{id}', async (event) => {
  try {
    const userRepository = new UserRepository(admin.firestore());
    const notificationService = new NotificationService(admin.messaging());

    if (!event.data) {
      logger.error('No post data found');
      return;
    }

    const evenData = event.data.data();

    const post = postSchema.safeParse({
      ...evenData,
      createdAt: new Timestamp(evenData.createdAt.seconds, evenData.createdAt.nanoseconds).toDate(),
    });

    if (!post.success) {
      logger.error('Invalid post data:', post.error);
      return;
    }

    const postData: Post = post.data;

    logger.info('New post created:', { post: postData });

    const allUsers = await userRepository.getAllUserProfiles();

    if (!allUsers) {
      logger.info('No users found to notify');
      return;
    }

    const users = allUsers.filter((user) => user.uid !== postData.authorUID);

    if (users.length === 0) {
      logger.info('No users to notify, excluding post author');
      return;
    }

    const message = {
      title: '!Nuevo post disponible!',
      body: `Consulta el nuevo post: ${postData.title}`,
    };

    const fcmTokens: string[] = users.flatMap((user) => user.fcmTokens || []);

    await notificationService.sendNotification(message.title, message.body, fcmTokens);
  } catch (error) {
    logger.error('Error sending FCM notifications:', error);
    throw error;
  }
});

export const onLikeCreated = onDocumentCreated('likes/{id}', async (event) => {
  try {
    const userRepository = new UserRepository(admin.firestore());
    const postRepository = new PostRepository(admin.firestore());
    const notificationService = new NotificationService(admin.messaging());

    if (!event.data) {
      logger.error('No like data found');
      return;
    }

    const eventData = event.data.data();

    const like = likeSchema.safeParse({
      ...eventData,
      createdAt: new Timestamp(eventData.createdAt.seconds, eventData.createdAt.nanoseconds).toDate(),
    });

    if (!like.success) {
      logger.error('Invalid like data:', like.error);
      return;
    }

    const likeData: Like = like.data;

    logger.info('New like created:', { like: likeData });

    const userNotifier = await userRepository.getUserProfileByUID(likeData.userId);

    const postToNotify = await postRepository.getPostById(likeData.postId);

    if (!userNotifier || !postToNotify) {
      logger.info('User or post not found for notification');
      return;
    }

    if (userNotifier.uid === postToNotify.authorUID) {
      logger.info('Post author cannot be notified about their own like removal');
      return;
    }

    const userToNotify = await userRepository.getUserProfileByUID(postToNotify.authorUID);

    if (!userToNotify) {
      logger.info('Post author not found for notification');
      return;
    }

    const message = {
      title: '¡Nuevo "me gusta" en tu post!',
      body: `${userNotifier.displayName} ha dado "me gusta" a tu post: ${postToNotify.title}`,
    };

    await notificationService.sendNotification(message.title, message.body, userToNotify.fcmTokens);
  } catch (error) {
    logger.error('Error sending FCM notifications', error);
    throw error;
  }
});

export const onLikeDeleted = onDocumentDeleted('likes/{id}', async (event) => {
  try {
    const userRepository = new UserRepository(admin.firestore());
    const postRepository = new PostRepository(admin.firestore());
    const notificationService = new NotificationService(admin.messaging());

    if (!event.data) {
      logger.error('No like data found');
      return;
    }

    const eventData = event.data.data();

    const like = likeSchema.safeParse({
      ...eventData,
      createdAt: new Timestamp(eventData.createdAt.seconds, eventData.createdAt.nanoseconds).toDate(),
    });

    if (!like.success) {
      logger.error('Invalid like data:', like.error);
      return;
    }

    const likeData: Like = like.data;

    logger.info('Like Deleted:', { like: likeData });

    const userNotifier = await userRepository.getUserProfileByUID(likeData.userId);

    const postToNotify = await postRepository.getPostById(likeData.postId);

    if (!userNotifier || !postToNotify) {
      logger.info('User or post not found for notification');
      return;
    }

    if (userNotifier.uid === postToNotify.authorUID) {
      logger.info('Post author cannot be notified about their own like removal');
      return;
    }

    const userToNotify = await userRepository.getUserProfileByUID(postToNotify.authorUID);

    if (!userToNotify) {
      logger.info('Post author not found for notification');
      return;
    }

    const message = {
      title: '¡A un usuario ya no le gusta tu post!',
      body: `${userNotifier.displayName} ha eliminado su "me gusta" de tu post: ${postToNotify.title}`,
    };

    await notificationService.sendNotification(message.title, message.body, userToNotify.fcmTokens);
  } catch (error) {
    logger.error('Error sending FCM notifications', error);
    throw error;
  }
});
