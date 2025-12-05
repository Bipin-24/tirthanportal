# Feedback Component

This directory contains the feedback system that allows users to provide feedback on documentation pages.

## Components

### 1. Feedback Component (`/components/Feedback.js`)
A React component that displays a feedback widget allowing users to rate pages as helpful or not helpful, and optionally provide comments.

### 2. API Endpoint (`/pages/api/feedback.js`)
Handles POST requests to save feedback data to a JSON file in the `/data` directory.

### 3. Markdoc Tag (`/markdoc/tags/feedback.markdoc.js`)
Allows you to use the feedback component in Markdoc files with the `{% feedback /%}` tag.

### 4. Feedback Viewer (`/pages/feedback-viewer.js`)
A dashboard page to view all collected feedback at `/feedback-viewer`.

## Usage

### In Markdoc Files

Add the feedback widget to any Markdoc page:

```markdown
## Your Content Here

Some documentation content...

{% feedback /%}
```

### In React/JSX Files

Import and use directly:

```jsx
import { Feedback } from '../components/Feedback';

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <Feedback />
    </div>
  );
}
```

## Viewing Feedback

Visit `/feedback-viewer` to see the feedback dashboard with:
- Total responses
- Helpful vs. Not Helpful statistics
- Feedback grouped by page
- User comments

## Data Storage

Feedback is stored in `/data/feedback.json`. This directory is ignored by Git (see `.gitignore`).

### Feedback Data Structure

```json
[
  {
    "helpful": true,
    "comment": "Great explanation!",
    "page": "/docs/getting-started",
    "timestamp": "2024-12-05T10:30:00.000Z",
    "userAgent": "Mozilla/5.0...",
    "receivedAt": "2024-12-05T10:30:01.000Z"
  }
]
```

## Deployment Notes

- The API endpoint requires server-side rendering (SSR) or API routes support
- Not compatible with static exports (`output: 'export'` in next.config.js)
- Ensure the `/data` directory has write permissions in production
- Consider backing up the feedback data regularly

## Customization

### Styling
The component uses CSS-in-JS (styled-jsx). Modify styles in `/components/Feedback.js`.

### Storage
To use a database instead of JSON file, modify `/pages/api/feedback.js`.

### Questions
Customize the feedback question or add additional fields in the Feedback component.
