import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenAIService {
  private readonly openaiApiKey: string;

  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
  }

  async analyzeMatchData(matchData: string): Promise<any> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/analyze',
        {
          model: 'text-davinci-003',
          prompt: matchData,
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.openaiApiKey}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error analyzing match data:', { error, data: matchData });
      throw error;
    }
  }
}
