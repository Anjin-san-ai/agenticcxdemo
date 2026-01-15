# Azure Deployment Guide

This guide covers deploying the Agentic CX Demo application to Azure App Service.

## Prerequisites

- Azure account with active subscription
- GitHub account
- Azure CLI installed (optional, for command-line setup)

## Azure App Service Setup

### 1. Create Azure App Service

1. Log in to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource" → "Web App"
3. Configure the following:
   - **Subscription**: Your Azure subscription
   - **Resource Group**: Create new or use existing
   - **Name**: Unique name for your app (e.g., `agentic-cx-demo`)
   - **Publish**: Code
   - **Runtime stack**: Node.js 18 LTS
   - **Operating System**: Linux (recommended) or Windows
   - **Region**: Choose closest to your users
   - **App Service Plan**: Create new (B1 Basic minimum recommended)

4. Click "Review + create" → "Create"

### 2. Configure Application Settings

Once the App Service is created:

1. Navigate to your App Service in Azure Portal
2. Go to **Configuration** → **Application settings**
3. Add the following environment variables:

   | Name | Value | Description |
   |------|-------|-------------|
   | `COMPANY_NAME` | Your company name (e.g., "BT") | Company branding |
   | `NODE_ENV` | `production` | Node.js environment |
   | `ATHENA_BASE_URL` | URL to your Athena Desktop service | External service URL |
   | `PORT` | (Auto-set by Azure) | Server port |

4. Click **Save**

### 3. Configure Startup Command

1. In your App Service, go to **Configuration** → **General settings**
2. Set **Startup Command** to: `cd server && npm start`
3. Enable **Always On** (prevents cold starts)
4. Click **Save**

### 4. Get Publish Profile

1. In your App Service, click **Get publish profile**
2. Download the `.PublishSettings` file
3. Open it in a text editor and copy the entire contents

## GitHub Repository Setup

### 1. Add GitHub Secrets

1. Go to your GitHub repository: https://github.com/Anjin-san-ai/agenticcxdemo
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

   - **Name**: `AZURE_WEBAPP_PUBLISH_PROFILE`
     - **Value**: Paste the entire contents of the `.PublishSettings` file
   
   - **Name**: `AZURE_WEBAPP_NAME`
     - **Value**: Your Azure App Service name (e.g., `agentic-cx-demo`)

### 2. Push Code to GitHub

The code has been pushed to: https://github.com/Anjin-san-ai/agenticcxdemo

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/azure-deploy.yml`) automatically:

1. **Builds** the application when code is pushed to `cx-demo` branch
2. **Deploys** to Azure App Service automatically

### Manual Deployment Trigger

You can also trigger deployment manually:
1. Go to **Actions** tab in GitHub
2. Select "Deploy to Azure App Service" workflow
3. Click "Run workflow"

## Post-Deployment Verification

### 1. Test Endpoints

After deployment, verify the application:

- **Frontend**: `https://<your-app-name>.azurewebsites.net/`
- **Config API**: `https://<your-app-name>.azurewebsites.net/config`
- **Health Check**: `https://<your-app-name>.azurewebsites.net/`

### 2. Check Logs

1. In Azure Portal, go to your App Service
2. Navigate to **Log stream** to see real-time logs
3. Or go to **Logs** → **Application Logging** for historical logs

### 3. Monitor Application

- **Application Insights**: Enable for detailed monitoring
- **Metrics**: Check CPU, memory, and request metrics
- **Alerts**: Set up alerts for errors and downtime

## Troubleshooting

### Application Not Starting

1. Check **Log stream** in Azure Portal
2. Verify **Startup Command** is set correctly
3. Ensure `package.json` has correct `start` script
4. Check Node.js version matches (18.x)

### Dependencies Not Installing

1. Verify `package-lock.json` is committed
2. Check build logs in GitHub Actions
3. Ensure `npm ci` runs successfully

### External Service Connection Issues

1. Verify `ATHENA_BASE_URL` is set correctly
2. Check network connectivity from Azure to Athena service
3. Review CORS settings if needed
4. Check firewall rules

### Static Files Not Loading

1. Verify `web.config` is in `server/` directory
2. Check static file path in `app.js`
3. Ensure client files are in `client/public/`

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Install Azure CLI
az login

# Deploy using Azure CLI
az webapp up \
  --name <your-app-name> \
  --resource-group <your-resource-group> \
  --runtime "NODE:18-lts" \
  --location <region>
```

## Scaling

- **Scale Up**: Increase App Service Plan tier for more resources
- **Scale Out**: Add more instances in **Scale out** settings
- **Auto-scaling**: Configure auto-scale rules based on metrics

## Security Considerations

- Enable **HTTPS Only** in Azure App Service
- Use **Managed Identity** for Azure resource access
- Store secrets in **Azure Key Vault** for production
- Configure **CORS** properly for API endpoints
- Use **Private Endpoints** for Athena service if available

## Cost Optimization

- Use **B1 Basic** plan for development/testing
- Enable **Always On** only if needed (prevents cold starts but costs more)
- Monitor usage and scale down during off-hours
- Use **Reserved Instances** for predictable workloads
