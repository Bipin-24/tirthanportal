# Previous/Next Navigation Component

This directory contains the Previous/Next navigation feature that allows users to navigate sequentially through documentation pages.

## Component

### PrevNext (`/components/Shell/PrevNext.js`)
A React component that displays navigation links to the previous and next pages in the documentation sequence.

## Features

- ✨ **Sequential Navigation**: Navigate through docs in a logical order
- 📱 **Responsive Design**: Adapts to mobile and desktop layouts
- 🎨 **Themed**: Supports light and dark mode
- ⚡ **Smart Display**: Only shows when previous/next pages exist
- 🔗 **Contextual**: Shows the title of the previous/next page

## How It Works

The component uses a predefined `navigationOrder` array that defines the sequence of pages. It:

1. Gets the current route using Next.js router
2. Finds the current page in the navigation order
3. Determines the previous and next pages
4. Displays navigation cards with arrows and titles

## Usage

### Automatic Integration

The PrevNext component is automatically added to all documentation pages through the `Document` component. No manual addition is needed!

### Navigation Order Configuration

To modify the page order, edit the `navigationOrder` array in `/components/Shell/PrevNext.js`:

```javascript
const navigationOrder = [
  { href: '/docs/overview', title: 'What is Markdoc?' },
  { href: '/docs/getting-started', title: 'Get started' },
  { href: '/docs/syntax', title: 'Syntax' },
  // ... add more pages here
];
```

### Adding New Pages

When you add a new documentation page:

1. Create the markdown file in `/pages/docs/`
2. Add an entry to the `navigationOrder` array in the desired position
3. The navigation will automatically update

Example:
```javascript
const navigationOrder = [
  // ... existing pages
  { href: '/docs/your-new-page', title: 'Your New Page Title' },
  // ... more pages
];
```

## Styling

The component uses:
- CSS-in-JS (styled-jsx) for scoped styling
- CSS variables for theming (supports light/dark mode)
- Responsive breakpoints for mobile optimization

### Key CSS Variables Used
- `--gray-medium`: Border colors
- `--gray-light`: Background color (light mode)
- `--blue`: Hover accent color
- `--dark` / `--light`: Text colors

## Mobile Behavior

On screens < 768px:
- Cards stack vertically
- Next card aligns to the left (instead of right)
- Reduced padding and font sizes
- Maintains full functionality

## Integration Points

### Document Component (`/components/Document.js`)
The PrevNext component is rendered at the bottom of every documentation page:

```javascript
export function Document({ source, children }) {
  return (
    <article>
      {children}
      <PrevNext />
    </article>
  );
}
```

### Shell Index (`/components/Shell/index.js`)
Exported for easy importing:

```javascript
export * from './PrevNext';
```

## Navigation Order Structure

Current navigation order for tirthanportal:

1. **Introduction**
   - What is Markdoc?
   - Get started

2. **Core Concepts**
   - Syntax
   - Tags
   - Nodes
   - Attributes
   - Variables
   - Functions
   - Partials

3. **Advanced**
   - Config
   - Validation
   - Frontmatter
   - Formatting
   - Render

4. **Integration**
   - Next.js
   - Examples (overview)
   - React example
   - HTML example

5. **Resources**
   - FAQ

## Customization

### Change the Order
Edit the `navigationOrder` array in the PrevNext component.

### Style Modifications
Modify the `<style jsx>` block in the component for custom styling.

### Different Layouts
You can create multiple navigation orders for different doc sections by:
1. Detecting the current section
2. Using different arrays based on the section
3. Applying conditional logic in the component

## Example Output

```
┌────────────────────────┬────────────────────────┐
│ ← Previous             │              Next →    │
│ Get started            │ Tags                   │
└────────────────────────┴────────────────────────┘
```

## Testing

After adding pages:
1. Visit any documentation page
2. Verify Previous/Next navigation appears at the bottom
3. Click the navigation cards to test routing
4. Test on mobile to ensure responsive behavior
5. Test in dark mode

## Notes

- Pages not in `navigationOrder` won't show navigation
- The component automatically hides if there's no prev/next page
- Maintains proper semantic HTML with `<nav>` element
- Accessible with proper ARIA labels
