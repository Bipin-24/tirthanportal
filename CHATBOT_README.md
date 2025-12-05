# ChatBot Component (MiniChat)

This directory contains the GenAI Doc Quest chatbot component that provides AI-powered assistance to users browsing the documentation.

## Files

### 1. CSS (`/public/minichat.css`)
Styles for the chatbot UI including:
- Floating chat button
- Chat container
- Messages display
- Input area
- Quick action buttons
- Animations and responsive design

### 2. JavaScript (`/public/MiniChatJavaScript.js`)
Core chatbot functionality including:
- Chat UI initialization
- Message handling
- API communication
- Markdown rendering
- Session management

### 3. Integration (`/pages/_document.js`)
Integrates the chatbot into all pages by loading CSS and JavaScript files.

## Features

### 🤖 AI-Powered Responses
- Connects to backend API for intelligent answers
- Understands context and documentation queries
- Provides relevant links and information

### 💬 Chat Interface
- **Floating Button**: Fixed bottom-right corner with message icon 💬
- **Chat Window**: Expandable chat interface (380x550px)
- **Message History**: Scrollable conversation history
- **Auto-scroll**: Automatically scrolls to latest message

### ⚡ Quick Actions
Pre-defined questions for quick access:
- "What is this product?"
- "Show me examples"
- "How do I get started?"
- "Troubleshooting guide"
- "Contact support"

### 🔄 Controls
- **Refresh**: Start new conversation
- **Maximize**: Open full chat in new tab
- **Close**: Hide chat window

### 📝 Markdown Support
- Renders AI responses with proper formatting
- Supports lists, bold, italic, code blocks
- Auto-formats consecutive links into lists
- Opens links in new tabs

## Configuration

### API Endpoint
Located in `/public/MiniChatJavaScript.js`:
```javascript
const API_URL = 'http://10.247.4.130:8006';
```

**To customize**: Edit this URL to point to your backend API.

### Backend API Requirements

The chatbot expects a POST endpoint at `/ask-agent` with:

**Request:**
```json
{
  "question": "User's question here",
  "id": "session_123456789_abc123"
}
```

**Response:**
```json
{
  "answer": "AI generated answer with markdown support"
}
```

## Usage

### Automatic Integration
The chatbot is automatically loaded on all pages through `_document.js`. No manual integration needed!

### User Experience
1. **Open Chat**: Click the floating 💬 button (bottom-right)
2. **Ask Questions**: Type in the input field or click quick actions
3. **View Responses**: AI responses appear with proper formatting
4. **Navigate**: Click suggested links to explore documentation
5. **New Conversation**: Click refresh icon to start over

## Customization

### Quick Actions
Edit in `/public/MiniChatJavaScript.js` around line 70:
```javascript
<button class="mini-chat-quick-action">Your custom question</button>
```

### Styling
Modify `/public/minichat.css`:
- Colors: Update gradient in `.mini-chat-button`
- Size: Change `width` and `height` in `.mini-chat-container`
- Position: Adjust `bottom` and `right` values

### Welcome Message
Located in `/public/MiniChatJavaScript.js` around line 67:
```javascript
<p>Hi, 😊 Welcome to GenAI Doc Quest! How can I assist you today?</p>
```

## Features Breakdown

### Session Management
- Unique session ID per browser session
- Format: `session_<timestamp>_<random>`
- Sent with every API request for context

### Message Types
1. **User Messages**: Right-aligned, simple text
2. **AI Messages**: Left-aligned, markdown-rendered with formatting
3. **Welcome Message**: Initial greeting when chat opens

### Input Handling
- **Auto-resize textarea**: Expands as you type
- **Enter to send**: Press Enter (Shift+Enter for new line)
- **Disabled state**: Send button disabled when input is empty

### Processing Animation
- Shows "..." while waiting for AI response
- Automatically removed when response arrives
- Provides visual feedback

## Responsive Design

### Desktop
- Fixed position bottom-right
- 380x550px chat window
- Hover effects on buttons

### Mobile
- Adapts to smaller screens
- Touch-friendly buttons
- Maintains readability

## Dependencies

### External Libraries
1. **marked.js**: Markdown parsing (loaded from CDN)
   - URL: `https://cdn.jsdelivr.net/npm/marked/marked.min.js`
   - Used for rendering AI responses with formatting

### Browser Requirements
- Modern browsers with ES6+ support
- JavaScript enabled
- Fetch API support

## Troubleshooting

### Chatbot Not Appearing
1. Check if files are in `/public` folder
2. Verify `_document.js` is loading the scripts
3. Check browser console for errors

### API Connection Issues
1. Verify `API_URL` is correct
2. Check CORS settings on backend
3. Ensure backend is running and accessible

### Styling Issues
1. Check if `minichat.css` is loaded
2. Look for CSS conflicts with existing styles
3. Verify z-index values (chat uses 9998-9999)

## Security Considerations

### API Communication
- Uses POST requests with JSON payload
- Session IDs are client-generated
- Consider adding authentication for production

### XSS Prevention
- Markdown rendered through marked.js library
- Links automatically get `target="_blank"` and `rel="noopener noreferrer"`
- User input is not directly inserted as HTML

## Performance

### Optimization
- CSS and JS loaded once per session
- Minimal DOM manipulation
- Lazy rendering of messages
- Efficient scroll handling

### Bundle Size
- CSS: ~13KB
- JavaScript: ~12KB
- Total: ~25KB additional load

## Future Enhancements

Potential improvements:
- [ ] Typing indicator animation
- [ ] Message timestamps
- [ ] File upload support
- [ ] Voice input
- [ ] Chat history persistence
- [ ] Multiple language support
- [ ] Theme customization (dark/light)
- [ ] Emoji picker
- [ ] Code syntax highlighting
- [ ] Search within chat history

## Testing

To test the chatbot:
1. Open any page in the documentation
2. Click the floating chat button
3. Try asking questions
4. Test quick actions
5. Verify markdown rendering
6. Test refresh and maximize buttons
7. Check mobile responsiveness

## Support

If you need to customize the chatbot further:
1. Review `/public/MiniChatJavaScript.js` for logic
2. Modify `/public/minichat.css` for styling
3. Update API endpoint for your backend
4. Customize quick actions for your use case
