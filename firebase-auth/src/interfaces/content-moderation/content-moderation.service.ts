export interface IContentModerationService {
  moderateContent(content: string): Promise<string>;
}
