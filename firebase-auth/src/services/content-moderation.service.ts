import { env } from '@/config/env.config';
import type { IContentModerationService } from '@/interfaces/content-moderation/content-moderation.service';

import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

class ContentModerationService implements IContentModerationService {
  private readonly model: GenerativeModel;

  constructor() {
    this.model = new GoogleGenerativeAI(env.VITE_GEMINI_API_KEY).getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
  }

  async moderateContent(content: string): Promise<string> {
    try {
      const prompt = `
      Eres un moderador de contenido especializado en español. Tu función es:
      1. Revisar el siguiente texto en busca de palabras ofensivas, groserías, insultos, abreviaciones vulgares o cualquier contenido inapropiado en español.
      2. Reemplazar TODAS las palabras ofensivas encontradas (incluidas abreviaciones como "mrd", "ctm", "hp", etc.) con la palabra "[redacted]".
      3. Mantener la estructura y formato original del texto, solo reemplazando las palabras ofensivas.
      4. Ser estricto en la detección: si una palabra puede ser ofensiva en cualquier contexto, debe ser reemplazada.
      5. Responder ÚNICAMENTE con el texto moderado, sin explicaciones adicionales.
      Texto a moderar:
      "${content}"
      Texto moderado:`;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const moderatedText = response.text().trim();

      return moderatedText;
    } catch (error) {
      console.error('Error moderating content:', error);
      return content;
    }
  }
}

export const contentModerationService = new ContentModerationService();
