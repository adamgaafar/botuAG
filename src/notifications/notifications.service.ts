import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NotificationsService {
  async sendSlackNotification(message: string): Promise<any> {
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!slackWebhookUrl) {
      throw new HttpException('Slack webhook URL is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return axios.post(slackWebhookUrl, { text: message });
  }

  async sendTeamsNotification(message: string): Promise<any> {
    const teamsWebhookUrl = process.env.TEAMS_WEBHOOK_URL;
    if (!teamsWebhookUrl) {
      throw new HttpException('Teams webhook URL is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return axios.post(teamsWebhookUrl, { text: message });
  }
}
