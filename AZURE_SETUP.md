# Azure Web App Setup Complete ✅

## Created Resources

Your Azure App Service has been successfully created! Here are the details:

### Web App Details
- **App Name**: `agentic-cx-demo-1768502151`
- **URL**: `https://agentic-cx-demo-1768502151.azurewebsites.net`
- **Resource Group**: `agentic-cx-demo-rg`
- **Location**: East US
- **App Service Plan**: `agentic-cx-demo-plan` (B1 Basic - Linux)
- **Runtime**: Node.js 20 LTS

### Configuration Applied
- ✅ Startup Command: `cd server && npm start`
- ✅ Always On: Enabled
- ✅ Environment Variables:
  - `NODE_ENV=production`
  - `COMPANY_NAME=BT`

## Next Steps: Configure GitHub Secrets

To enable automatic deployment via GitHub Actions, you need to add two secrets to your GitHub repository:

### 1. Get Publish Profile

**Option A: Via Azure Portal (Recommended)**
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to: **Resource Groups** → `agentic-cx-demo-rg` → `agentic-cx-demo-1768502151`
3. Click **Get publish profile** button (top toolbar)
4. The `.PublishSettings` file will download
5. Open the file in a text editor and copy the **entire contents**

**Option B: Via Azure CLI**
```bash
az webapp deployment list-publishing-profiles \
  --resource-group agentic-cx-demo-rg \
  --name agentic-cx-demo-1768502151 \
  --xml > publish-profile.xml
```
Then open `publish-profile.xml` and copy its contents.

### 2. Add GitHub Secrets

1. Go to your GitHub repository: `https://github.com/Anjin-san-ai/agenticcxdemo`
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

   **Secret 1:**
   - **Name**: `AZURE_WEBAPP_NAME`
   - **Value**: `agentic-cx-demo-1768502151`

   **Secret 2:**
   - **Name**: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - **Value**: Paste the **entire contents** of the publish profile XML file you downloaded

### 3. Deploy!

Once the secrets are added, you can deploy in two ways:

**Automatic Deployment:**
- Push code to `main` or `cx-demo` branch
- GitHub Actions will automatically build and deploy

**Manual Deployment:**
1. Go to **Actions** tab in GitHub
2. Select **"Deploy to Azure App Service"** workflow
3. Click **Run workflow** → **Run workflow**

## Verify Deployment

After deployment, test your application:

- **Frontend**: `https://agentic-cx-demo-1768502151.azurewebsites.net/`
- **Config API**: `https://agentic-cx-demo-1768502151.azurewebsites.net/config`
- **Health Check**: Visit the root URL

## Additional Configuration (Optional)

### Add ATHENA_BASE_URL (if needed)
If your application needs to connect to an Athena Desktop service:

```bash
az webapp config appsettings set \
  --resource-group agentic-cx-demo-rg \
  --name agentic-cx-demo-1768502151 \
  --settings ATHENA_BASE_URL="https://your-athena-service-url.com"
```

### View Logs
```bash
az webapp log tail \
  --resource-group agentic-cx-demo-rg \
  --name agentic-cx-demo-1768502151
```

Or in Azure Portal:
- Go to your App Service → **Log stream** (for real-time logs)
- Or **Logs** → **Application Logging** (for historical logs)

## Cost Information

- **Current Plan**: B1 Basic (Linux)
- **Estimated Cost**: ~$13/month (pricing may vary by region)
- **Features**: 
  - 1.75 GB RAM
  - 1 CPU core
  - 10 GB storage
  - Custom domains support

## Troubleshooting

### Application Not Starting
1. Check logs: `az webapp log tail -g agentic-cx-demo-rg -n agentic-cx-demo-1768502151`
2. Verify startup command is: `cd server && npm start`
3. Check Node.js version matches (20.x)

### Deployment Fails
1. Verify GitHub secrets are set correctly
2. Check GitHub Actions logs for error details
3. Ensure `package-lock.json` is committed to repository

### 404 Errors
1. Verify static files are in `client/public/` directory
2. Check that `web.config` is in `server/` directory
3. Review `app.js` static file path configuration

## Useful Commands

```bash
# Get app details
az webapp show -g agentic-cx-demo-rg -n agentic-cx-demo-1768502151

# Restart app
az webapp restart -g agentic-cx-demo-rg -n agentic-cx-demo-1768502151

# View app settings
az webapp config appsettings list -g agentic-cx-demo-rg -n agentic-cx-demo-1768502151

# Delete app (if needed)
az webapp delete -g agentic-cx-demo-rg -n agentic-cx-demo-1768502151
```

---

**Your Azure Web App is ready! Just add the GitHub secrets and push your code to deploy.** 🚀
