# Algolia DocSearch with AI Assistant - Updated Configuration

## What Changed

Updated Algolia DocSearch configuration with:
- **New App ID**: `5EDIFWL8LA`
- **New Index Name**: `Tirthan`
- **New API Key**: `a615aee65545f347c390b7ae5a3ed350`
- **AI Assistant Support**: Added optional AI-powered search answers

## Configuration

### Environment Variables

The following environment variables are now configured in `.env.local`:

```bash
NEXT_PUBLIC_ALGOLIA_APP_ID=5EDIFWL8LA
NEXT_PUBLIC_ALGOLIA_API_KEY=a615aee65545f347c390b7ae5a3ed350
NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID=YOUR_ALGOLIA_ASSISTANT_ID
```

### Enabling AI Assistant

To enable AI-powered search answers:

1. **Create an Algolia AI Assistant**:
   - Go to https://www.algolia.com/apps/5EDIFWL8LA/assistant
   - Create a new Assistant or use an existing one
   - Copy the Assistant ID

2. **Update Environment Variable**:
   ```bash
   NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID=your_actual_assistant_id
   ```

3. **Restart Development Server**:
   ```bash
   npm run dev
   ```

## How It Works

The `TopNav.js` component now:

1. **Checks for Algolia credentials** - If missing, hides the search bar
2. **Detects AI Assistant ID** - If configured, enables AI-powered answers
3. **Conditionally adds AI features** - Only when a valid Assistant ID is provided

```javascript
// AI Assistant is enabled when:
// 1. NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID is set
// 2. Value is not the placeholder 'YOUR_ALGOLIA_ASSISTANT_ID'
if (insights) {
  searchConfig.askAi = process.env.NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID;
}
```

## Implementation Details

### Current Setup (React Component)

You're using `@docsearch/react` package which provides a React component. This is the **recommended approach for Next.js** applications.

**Advantages**:
- Better integration with React/Next.js
- Automatic server-side rendering support
- Type-safe with TypeScript
- Easier state management

### Alternative Setup (JavaScript Client)

The code snippet you shared uses `@docsearch/js`, which is a vanilla JavaScript implementation.

**To use JavaScript client instead** (not recommended for Next.js):

1. Install packages:
   ```bash
   npm install @docsearch/js @docsearch/css
   ```

2. Create a component:
   ```javascript
   import { useEffect } from 'react';
   import docsearch from '@docsearch/js';
   import '@docsearch/css';

   export function Search() {
     useEffect(() => {
       docsearch({
         container: '#docsearch',
         appId: '5EDIFWL8LA',
         indexName: 'Tirthan',
         apiKey: 'a615aee65545f347c390b7ae5a3ed350',
         askAi: 'YOUR_ALGOLIA_ASSISTANT_ID',
       });
     }, []);

     return <div id="docsearch" />;
   }
   ```

However, the **current React component approach is better** for your Next.js setup.

## Testing

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Visit your site**: http://localhost:3001

3. **Test the search**:
   - Click the search bar in the top navigation
   - Try searching for documentation terms
   - If AI Assistant is configured, you'll see AI-powered answers

## Index Configuration

Your Algolia index `Tirthan` should be configured to crawl:
- **URL**: https://tirthanportal.vercel.app/
- **Selectors**: Target your documentation content

### Crawler Configuration Example

```json
{
  "index_name": "Tirthan",
  "start_urls": ["https://tirthanportal.vercel.app/"],
  "selectors": {
    "lvl0": "h1",
    "lvl1": "h2",
    "lvl2": "h3",
    "lvl3": "h4",
    "text": "p, li"
  }
}
```

## Next Steps

1. ✅ **Updated credentials** - New App ID and API Key configured
2. ✅ **Updated index name** - Changed from "tirthanportal" to "Tirthan"
3. ⏳ **Configure AI Assistant** - Create Assistant in Algolia dashboard
4. ⏳ **Verify crawler** - Ensure "Tirthan" index is being populated
5. ⏳ **Test search** - Verify search results are working on deployed site

## Troubleshooting

### Search bar not appearing
- Check that `.env.local` file exists and contains the credentials
- Restart the development server after changing environment variables

### No search results
- Verify the "Tirthan" index exists in Algolia dashboard
- Check that the crawler has run and populated the index
- Visit: https://www.algolia.com/apps/5EDIFWL8LA/explorer/browse/Tirthan

### AI Assistant not working
- Ensure you've created an Assistant in Algolia dashboard
- Replace `YOUR_ALGOLIA_ASSISTANT_ID` with actual Assistant ID
- AI features require the Assistant to be trained on your content

## Resources

- [Algolia DocSearch React Documentation](https://docsearch.algolia.com/docs/api/#react)
- [Algolia AI Assistant Documentation](https://www.algolia.com/doc/guides/ai-search/ai-assistant/)
- [Your Algolia Dashboard](https://www.algolia.com/apps/5EDIFWL8LA/)
