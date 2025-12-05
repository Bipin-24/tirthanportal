# DocSearch (Algolia) Configuration

This documentation site uses Algolia DocSearch for powerful search functionality across all documentation pages.

## What is DocSearch?

DocSearch is a search solution provided by Algolia specifically designed for documentation sites. It automatically crawls your documentation and provides instant search results as users type.

## Configuration Files

### 1. Environment Variables (`/.env.local`)
Contains the Algolia API credentials:
```bash
NEXT_PUBLIC_ALGOLIA_APP_ID=3ZH45TUUP7
NEXT_PUBLIC_ALGOLIA_API_KEY=4a7ae0f46bfbcb101d196c9ce2a8c38a
```

**Note**: `.env.local` is already in `.gitignore` and won't be committed to Git.

### 2. Example File (`/.env.local.example`)
Template for setting up the environment variables. Copy this file to `.env.local` and add your actual keys.

### 3. TopNav Component (`/components/Shell/TopNav.js`)
Integrates the DocSearch component with conditional rendering.

## Features

### 🔍 Instant Search
- **Real-time results**: Shows results as you type
- **Keyboard navigation**: Navigate with arrow keys
- **Quick access**: Shortcut activation (Cmd/Ctrl + K)

### 🎯 Smart Indexing
- **Automatic crawling**: Algolia indexes all documentation pages
- **Relevance ranking**: Most relevant results appear first
- **Context aware**: Shows page titles and content snippets

### 📱 Responsive
- **Desktop**: Full search modal with keyboard shortcuts
- **Mobile**: Touch-friendly search interface
- **Accessible**: Screen reader compatible

## How It Works

### 1. Search Button
Located in the top navigation bar, displays the search icon when:
- Algolia credentials are configured
- Environment variables are properly set

### 2. Search Modal
Opens when:
- User clicks the search button
- User presses Cmd/Ctrl + K
- User clicks on the search input area

### 3. Results Display
Shows:
- Page title
- Content snippet with matching text highlighted
- Direct links to relevant sections
- Category/hierarchy information

## Setup Instructions

### For Development

1. **Copy the example file**:
   ```bash
   cp .env.local.example .env.local
   ```

2. **Add your Algolia credentials**:
   Edit `.env.local` and add your App ID and API Key

3. **Restart the development server**:
   ```bash
   npm run dev
   ```

### For Production

1. **Add environment variables** to your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Other platforms: Follow their environment variable setup

2. **Required variables**:
   ```
   NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
   NEXT_PUBLIC_ALGOLIA_API_KEY=your_api_key
   ```

## Current Configuration

### App ID
```
3ZH45TUUP7
```

### API Key (Search-only)
```
4a7ae0f46bfbcb101d196c9ce2a8c38a
```

### Index Name
```
Documentation Website
```

**Note**: This is a search-only API key, safe for client-side use.

## Customization

### Change Index Name
Edit `/components/Shell/TopNav.js`:
```javascript
<DocSearch
  appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}
  apiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY}
  indexName="Your Index Name Here"  // Change this
/>
```

### Styling
DocSearch uses CSS classes that can be customized:
- `.DocSearch-Button`: Search button
- `.DocSearch-Modal`: Search modal overlay
- `.DocSearch-Input`: Search input field
- `.DocSearch-Hits`: Results list

Add custom styles in your CSS files to override defaults.

### Conditional Rendering
The search component only renders when API credentials are available:
```javascript
const hasAlgoliaConfig = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID && 
                        process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;

if (!hasAlgoliaConfig) {
  return null; // Hide search bar
}
```

This prevents errors when credentials are not set.

## Algolia Dashboard

### Access
- URL: https://www.algolia.com/
- Login with your Algolia account

### What You Can Do
1. **View search analytics**: See what users are searching for
2. **Monitor usage**: Track API calls and search volume
3. **Customize ranking**: Adjust relevance algorithms
4. **Manage indices**: Add/remove indexed content
5. **Configure crawlers**: Set up automatic documentation crawling

## DocSearch Application

If you don't have Algolia DocSearch yet:

1. **Apply for DocSearch**: https://docsearch.algolia.com/apply/
2. **Provide information**:
   - Website URL
   - Documentation URL
   - Contact email
   - Site ownership proof

3. **Wait for approval**: Usually takes 1-2 weeks
4. **Receive credentials**: App ID and API Key via email
5. **Configure crawler**: Algolia will set up automatic indexing

## Troubleshooting

### Search Not Appearing

**Problem**: Search button doesn't show up

**Solutions**:
1. Check if `.env.local` exists
2. Verify environment variables are set correctly
3. Restart the development server
4. Check browser console for errors

### No Search Results

**Problem**: Search shows no results

**Solutions**:
1. Verify Algolia has crawled your site
2. Check index name matches in configuration
3. Confirm API key has search permissions
4. Visit Algolia dashboard to verify index content

### Wrong Results

**Problem**: Irrelevant or outdated results

**Solutions**:
1. Trigger manual re-crawl in Algolia dashboard
2. Check crawler configuration
3. Review content structure (headings, meta tags)
4. Adjust ranking configuration

## Best Practices

### 1. SEO-Friendly Content
- Use proper heading hierarchy (H1, H2, H3)
- Add meta descriptions
- Include relevant keywords naturally

### 2. Regular Updates
- Re-crawl after major content changes
- Monitor search analytics
- Update stop words if needed

### 3. Security
- Never commit `.env.local` to Git
- Use search-only API keys (not admin keys)
- Rotate keys periodically

### 4. Performance
- Algolia handles caching automatically
- Search is served from CDN
- No impact on site performance

## Dependencies

### Required Packages
Already installed in `package.json`:
```json
{
  "@docsearch/react": "^3.6.0",
  "@docsearch/css": "^3.6.0"
}
```

### Import Statement
In `pages/_app.js`:
```javascript
import '@docsearch/css';
```

## API Limits

### Free Tier (DocSearch)
- **Searches**: 10,000 searches/month
- **Records**: Up to 10,000 indexed records
- **Updates**: Automatic re-crawling every 24 hours

### Paid Plans
If you need more:
- Contact Algolia for custom plans
- Pricing based on searches and records
- Additional features available

## Support

### Algolia Support
- Documentation: https://www.algolia.com/doc/
- DocSearch Docs: https://docsearch.algolia.com/docs/what-is-docsearch
- Community Forum: https://discourse.algolia.com/
- Email: support@algolia.com

### Implementation Help
For questions about this implementation:
1. Check this README
2. Review `/components/Shell/TopNav.js`
3. Consult Algolia documentation
4. Test in browser console

## Testing

To test DocSearch:

1. **Start development server**: `npm run dev`
2. **Open site**: http://localhost:3000
3. **Look for search button**: Should appear in top nav
4. **Try searching**: Type a query
5. **Verify results**: Check for relevant pages
6. **Test keyboard shortcuts**: Cmd/Ctrl + K
7. **Mobile testing**: Test on responsive view

## Future Enhancements

Potential improvements:
- [ ] Add search analytics tracking
- [ ] Custom result templates
- [ ] Advanced filtering options
- [ ] Search suggestions
- [ ] Recent searches history
- [ ] Multi-language support
- [ ] Voice search integration
