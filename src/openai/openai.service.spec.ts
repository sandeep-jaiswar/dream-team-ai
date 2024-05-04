import { Test, TestingModule } from '@nestjs/testing';
import { OpenAIService } from './openai.service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('OpenAIService', () => {
  let service: OpenAIService;
  let mockAxios: MockAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenAIService],
    }).compile();

    service = module.get<OpenAIService>(OpenAIService);
    mockAxios = new MockAdapter(axios);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('analyzeMatchData', () => {
    it('should return data successfully when the API call is successful', async () => {
      const mockData = { analysis: 'positive' };
      const matchData = 'sample match data';

      mockAxios
        .onPost('https://api.openai.com/v1/analyze')
        .reply(200, mockData);

      const result = await service.analyzeMatchData(matchData);
      expect(result).toEqual(mockData);
    });

    it('should handle errors when the API call fails', async () => {
      const error = new Error('Network Error');
      const matchData = 'sample match data';

      mockAxios.onPost('https://api.openai.com/v1/analyze').networkError();

      await expect(service.analyzeMatchData(matchData)).rejects.toThrow(
        error.message,
      );
    });
  });
});
