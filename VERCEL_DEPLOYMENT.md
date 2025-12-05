# Vercel Deployment Checklist

## Environment Variables Required

These environment variables must be added to Vercel for the site to work correctly:

### Required Variables

| Variable Name | Value | Purpose |
|--------------|-------|---------|
| `NEXT_PUBLIC_ALGOLIA_APP_ID` | `5EDIFWL8LA` | Algolia Application ID |
| `NEXT_PUBLIC_ALGOLIA_API_KEY` | `a615aee65545f347c390b7ae5a3ed350` | Algolia Search API Key |

### Optional Variables

| Variable Name | Value | Purpose |
|--------------|-------|---------|
| `NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID` | `YOUR_ALGOLIA_ASSISTANT_ID` | Enable AI-powered search answers |

## How to Add Environment Variables to Vercel

### Method 1: Vercel Dashboard (Easiest)

1. Go to https://vercel.com/bipin-24s-projects/tirthanportal/settings/environment-variables
2. Click "Add New"
3. Enter variable name and value
4. Select environments: Production, Preview, Development
5. Click "Save"
6. Repeat for all variables
7. Redeploy from Deployments tab

### Method 2: Vercel CLI

```bash
# Login first
vercel login

# Add environment variables
vercel env add NEXT_PUBLIC_ALGOLIA_APP_ID
# When prompted, enter: 5EDIFWL8LA
# Select: Production, Preview, Development

vercel env add NEXT_PUBLIC_ALGOLIA_API_KEY
# When prompted, enter: a615aee65545f347c390b7ae5a3ed350
# Select: Production, Preview, Development

vercel env add NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID
# When prompted, enter: YOUR_ALGOLIA_ASSISTANT_ID
# Select: Production, Preview, Development

# Redeploy
vercel --prod
```

## Verifying the Deployment

### Check Environment Variables

```bash
# List all environment variables
vercel env ls
```

### Check if Search is Working

1. Visit: https://tirthanportal.vercel.app/
2. Look for search icon in top navigation
3. Click search and try searching for content
4. If AI Assistant is configured, test AI-powered answers

## Troubleshooting

### Search icon not appearing after adding variables

- **Cause**: Old deployment is cached
- **Solution**: Trigger a new deployment by:
  - Going to Deployments → Click "⋮" → "Redeploy"
  - OR push a new commit to your repository

### Search icon appears but no results

- **Cause**: Algolia index "Tirthan" is not populated
- **Solution**: Configure crawler in Algolia dashboard
  - Visit: https://www.algolia.com/apps/5EDIFWL8LA/
  - Set up crawler for https://tirthanportal.vercel.app/

### AI Assistant not working

- **Cause**: Assistant ID not configured or invalid
- **Solution**: 
  - Go to Algolia dashboard → AI Assistant
  - Create an Assistant
  - Copy the Assistant ID
  - Update `NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID` in Vercel

## Important Notes

- ⚠️ `.env.local` file is in `.gitignore` and won't be deployed
- ⚠️ All `NEXT_PUBLIC_*` variables are exposed to the browser (safe for API keys)
- ⚠️ Never commit `.env.local` to Git
- ✅ Always use Vercel dashboard or CLI to set production environment variables
- ✅ Environment variables must be set separately for each Vercel project

## Quick Links

- **Vercel Project**: https://vercel.com/bipin-24s-projects/tirthanportal
- **Environment Variables**: https://vercel.com/bipin-24s-projects/tirthanportal/settings/environment-variables
- **Deployments**: https://vercel.com/bipin-24s-projects/tirthanportal/deployments
- **Algolia Dashboard**: https://www.algolia.com/apps/5EDIFWL8LA/
- **Live Site**: https://tirthanportal.vercel.app/

## After Deployment

Once environment variables are added and site is redeployed:

1. ✅ Search icon will appear in navigation
2. ✅ Users can search documentation
3. ✅ Search will use "Tirthan" index
4. ⏳ AI Assistant features (if Assistant ID is configured)
