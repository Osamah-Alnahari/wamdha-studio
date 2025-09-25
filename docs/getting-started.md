# Getting Started

## Prerequisites

- Node.js 18+ and npm/pnpm
- AWS Account with Amplify CLI configured
- Git

## Installation

1. **Clone the repository**

   ```sh
   git clone <repo-url>
   cd wamdha-studio
   ```

2. **Install dependencies**

   ```sh
   npm install --legacy-peer-deps
   ```

3. **Configure AWS Amplify**

   - Install Amplify CLI if not already installed:

     ```sh
     npm install -g @aws-amplify/cli
     ```

   - Configure your AWS credentials (one-time per machine):

     ```sh
     amplify configure
     ```

   - Pull the existing Amplify backend environment:

     ```sh
     amplify pull --appId <appId> --envName <env>
     ```

     This will automatically generate/update the `amplify/` folder and configuration files (e.g., `aws-exports.js`).

4. **Run the development server**

   ```sh
   npm run dev
   ```

5. **Open in browser**
   [http://localhost:3000](http://localhost:3000)

## Environment Setup

Create a `.env` file in the root directory with your AWS configuration:

```env
NEXT_PUBLIC_AWS_REGION=your-region
NEXT_PUBLIC_AWS_USER_POOL_ID=your-user-pool-id
NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID=your-client-id
```

## Troubleshooting

### Common Issues

- **Amplify CLI not found**: Make sure you've installed the Amplify CLI globally
- **Permission errors**: Ensure your AWS credentials have the necessary permissions
- **Build errors**: Try deleting `node_modules` and reinstalling dependencies
