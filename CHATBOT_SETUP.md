# Yoga AI Chatbot Setup Guide

## Overview
The floating chatbot feature has been successfully integrated into your yoga therapy website. Users can now access an AI assistant for yoga-related questions, pose guidance, meditation tips, and wellness advice.

## Features
- **Floating Chat Button**: A green circular button in the bottom-right corner
- **Settings Button**: A gray settings button in the bottom-left corner for configuration
- **Real-time Chat**: Interactive chat interface with typing indicators
- **Local Storage**: API credentials are stored securely in the user's browser
- **Responsive Design**: Works on both desktop and mobile devices

## Setup Instructions

### 1. Get API Credentials
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for the Gemini Pro model
3. Copy your API key

### 2. Configure the Chatbot
1. Visit your website
2. Click the gray settings button (⚙️) in the bottom-left corner
3. Enter your API key in the configuration modal
4. The API URL is pre-filled with the Gemini Pro endpoint
5. Click "Save" to store your configuration

### 3. Start Chatting
1. Click the green chat button (💬) in the bottom-right corner
2. Type your yoga-related questions
3. The AI will respond with helpful guidance

## Usage Examples
- "What are the benefits of sun salutation?"
- "How do I perform downward dog correctly?"
- "Can you suggest a meditation technique for stress relief?"
- "What yoga poses help with back pain?"
- "How long should I hold each pose?"

## Technical Details
- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: Browser localStorage
- **API**: Google Gemini Pro

## Files Added
- `components/floating-chatbot.tsx` - Main chatbot component
- `components/chatbot-config.tsx` - Configuration modal
- Updated `app/layout.tsx` - Integrated chatbot into layout

## Security Notes
- API keys are stored locally in the user's browser
- No credentials are sent to your server
- Each user manages their own API configuration
- The chatbot only sends messages to Google's API

## Troubleshooting
- If the chatbot doesn't respond, check your API key configuration
- Ensure you have an active internet connection
- Verify that your API key has access to the Gemini Pro model
- Check the browser console for any error messages

## Customization
You can customize the chatbot by modifying:
- Colors in the `floating-chatbot.tsx` file
- Welcome message in the initial state
- API prompt in the `sendMessageToApi` function
- UI layout and styling

The chatbot is now ready to help your users with their yoga journey!
