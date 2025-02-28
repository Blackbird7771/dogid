# Deploying the Dog Breed Identification Backend to Fly.io

This guide will walk you through deploying the dog breed identification backend to Fly.io. This deployment includes a CNN model using MobileNetV2 for dog breed prediction.

## Prerequisites

1. Install the Fly.io CLI by following the [official installation guide](https://fly.io/docs/hands-on/install-flyctl/)
2. Sign up for a Fly.io account if you don't have one
3. Log in to Fly.io using the CLI:
   ```
   fly auth login
   ```

## Deployment Steps

### 1. Navigate to the Backend Directory

```bash
cd backend
```

### 2. Initialize Your Fly.io App

If this is your first time deploying this app, run:

```bash
fly launch
```

This will start an interactive setup process. When prompted:
- Choose a unique app name (or use the suggested one)
- Select your preferred region
- Skip PostgreSQL and Redis setup (unless you need them)
- Choose to deploy now or just create the configuration

If you already have a `fly.toml` file, you can skip this step.

### 3. Deploy Your Application

```bash
fly deploy
```

This command builds your Docker image and deploys it to Fly.io. Wait for the deployment to complete.

### 4. Check Your Deployment

Once deployed, check the status of your app:

```bash
fly status
```

### 5. View Logs

To see the logs of your running application:

```bash
fly logs
```

### 6. Open Your Application in a Browser

To open your deployed app in a browser:

```bash
fly open
```

This will open the root endpoint of your API.

## Environment Variables (Optional)

If you need to set environment variables for your application:

```bash
fly secrets set MY_ENV_VAR=value
```

## Scaling (Optional)

To scale your application:

```bash
fly scale count 2  # Set number of instances
```

## Troubleshooting

If you encounter issues:

1. Check the application logs:
   ```bash
   fly logs
   ```

2. SSH into your deployment:
   ```bash
   fly ssh console
   ```

3. Restart your application:
   ```bash
   fly apps restart
   ```

## Updating Your Deployment

Whenever you make changes to your code, simply run:

```bash
fly deploy
```

## Important Notes

- The current implementation uses MobileNetV2 as a base model with a simulated classifier
- In a production environment, you might want to fine-tune the model or use a custom-trained model
- Monitor your usage as machine learning models can consume significant resources

## Further Reading

- [Fly.io Documentation](https://fly.io/docs/)
- [Managing Fly Apps](https://fly.io/docs/apps/)
- [Fly.io Pricing](https://fly.io/docs/about/pricing/) 