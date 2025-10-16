// Placeholder for send-sms.ts
import type { Handler } from '@netlify/functions';
import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;
const demoTarget = process.env.DEMO_SMS_TARGET;

const client = accountSid && authToken ? Twilio(accountSid, authToken) : null;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }
  try {
    const { serviceType, message } = JSON.parse(event.body || '{}');
    const to = demoTarget;
    if (!to) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Missing demo target number' })
      };
    }
    if (client) {
      await client.messages.create({
        body: message,
        from: fromNumber!,
        to
      });
    } else {
      console.log('[DEMO MODE] Would send SMS:', { to, message });
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err: any) {
    console.error('send-sms error', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message || 'Unknown error' })
    };
  }
};
