import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AIService {
  async optimizeWorkflow(parameters: any): Promise<any> {
    // Mock AI optimization logic
    return {
      success: true,
      optimizedParameters: { ...parameters, optimized: true },
    };
  }

  async generateIaCTemplate(requirements: string): Promise<string> {
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
