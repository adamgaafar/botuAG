import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AIService {
  private requestCount = 0;
  private readonly RATE_LIMIT = 100; // Max requests per hour

  private checkRateLimit() {
    if (this.requestCount >= this.RATE_LIMIT) {
      throw new HttpException('Rate limit exceeded. Please try again later.', HttpStatus.TOO_MANY_REQUESTS);
    }
    this.requestCount++;
    setTimeout(() => this.requestCount--, 3600000); // Decrease count after 1 hour
  }

  async optimizeWorkflow(parameters: any): Promise<any> {
    // Mock AI optimization logic
    return {
      success: true,
      optimizedParameters: { ...parameters, optimized: true },
    };
  }

  async generateIaCTemplate(requirements: string): Promise<string> {
    this.checkRateLimit(); // Check rate limit
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new HttpException('OpenAI API key is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const response = await axios.post<{ choices: { text: string }[] }>(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Generate Terraform code for the following requirements: ${requirements}`,
        max_tokens: 1500,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );
    return response.data.choices[0].text;
  }

  async generatePipelineConfig(repositoryDetails: string): Promise<string> {
    this.checkRateLimit(); // Check rate limit
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new HttpException('OpenAI API key is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const response = await axios.post<{ choices: { text: string }[] }>(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Generate a CI/CD pipeline configuration for the following repository details: ${repositoryDetails}`,
        max_tokens: 1500,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );
    return response.data.choices[0].text;
  }

  async executeNaturalLanguageCommand(command: string): Promise<any> {
    this.checkRateLimit(); // Check rate limit
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new HttpException('OpenAI API key is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const response = await axios.post<{ choices: { text: string }[] }>(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Execute the following command: ${command}`,
        max_tokens: 1500,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );
    return response.data.choices[0].text;
  }
}
