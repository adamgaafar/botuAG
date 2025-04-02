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

  private async makeOpenAIRequest(prompt: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new HttpException('OpenAI API key is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      const response = await axios.post<{ choices: { text: string }[] }>(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt,
          max_tokens: 1500,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );
      return response.data.choices[0]?.text.trim() || 'No response generated.';
    } catch (error) {
      throw new HttpException(
        `OpenAI API error: ${error.response?.data?.error?.message || error.message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async optimizeWorkflow(parameters: any): Promise<any> {
    // Mock AI optimization logic
    return {
      success: true,
      optimizedParameters: { ...parameters, optimized: true },
    };
  }

  async generateIaCTemplate(requirements: string): Promise<string> {
    this.checkRateLimit();
    const prompt = `Generate Terraform code for the following requirements: ${requirements}`;
    return this.makeOpenAIRequest(prompt);
  }

  async generatePipelineConfig(repositoryDetails: string): Promise<string> {
    this.checkRateLimit();
    const prompt = `Generate a CI/CD pipeline configuration for the following repository details: ${repositoryDetails}`;
    return this.makeOpenAIRequest(prompt);
  }

  async executeNaturalLanguageCommand(command: string): Promise<any> {
    this.checkRateLimit();
    const prompt = `Execute the following command: ${command}`;
    return this.makeOpenAIRequest(prompt);
  }
}
