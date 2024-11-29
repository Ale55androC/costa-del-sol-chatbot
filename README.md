# Costa Del Sol Property Chatbot

An interactive chatbot for property viewings and brochure requests.

## Features

- Property viewing scheduling
- Brochure requests
- Interactive property details
- Real-time form validation
- Webhook integration for handling requests

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Deployment

### Prerequisites

1. Create an account on [Vercel](https://vercel.com)
2. Install Vercel CLI:
```bash
npm install -g vercel
```

### Deploy to Vercel

1. Build the project locally:
```bash
npm run build
```

2. Deploy using Vercel:
```bash
vercel login
vercel
```

3. Follow the prompts to deploy your project.

### Environment Variables

Make sure to set up the following environment variable in your Vercel project:

- `VITE_WEBHOOK_URL`: Your Zapier webhook URL

You can set this up in the Vercel dashboard under Project Settings > Environment Variables.

## Configuration

The chatbot uses environment variables for configuration. Create a `.env` file in the root directory:

```env
VITE_WEBHOOK_URL=your_webhook_url_here
```

## Usage

The chatbot can be embedded in any website by adding the following code:

```html
<div id="costa-del-sol-chatbot"></div>
<script type="module" src="path_to_your_deployed_chatbot/main.js"></script>
```

## Support

For support, please contact:
- Email: info@costadelsol.com
- Phone: +34 123 456 789
