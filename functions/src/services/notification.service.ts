import { Messaging } from 'firebase-admin/messaging';

/**
 * Service for handling Firebase Cloud Messaging (FCM) notifications
 */
export class NotificationService {
  /**
   * Creates an instance of NotificationService
   * @param {Messaging} messaging - Firebase Admin Messaging instance
   */
  constructor(private readonly messaging: Messaging) {}

  /**
   * Sends push notifications to multiple FCM tokens
   * @param {string} title - The notification title
   * @param {string} body - The notification body text
   * @param {string[]} tokens - Array of FCM tokens to send notifications to
   * @return {Promise<void>} Promise that resolves when notifications are sent
   */
  async sendNotification(title: string, body: string, tokens: string[]): Promise<void> {
    if (!tokens || tokens.length === 0) {
      console.warn('No FCM tokens provided for notification');
      return;
    }

    const message = {
      notification: {
        title,
        body,
      },
      tokens,
    };

    const response = await this.messaging.sendEachForMulticast(message);

    if (response.failureCount > 0) {
      const failedTokens = response.responses
        .map((resp, index) => (resp.error ? tokens[index] : null))
        .filter((token) => token !== null);

      console.error('Failed to send notifications to tokens:', failedTokens);
    } else {
      console.log('Notifications sent successfully to all tokens');
    }
  }
}
