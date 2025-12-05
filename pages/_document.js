import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* MiniChat Chatbot CSS */}
          <link rel="stylesheet" href="/minichat.css" />
          {/* Marked.js for markdown parsing in chatbot */}
          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* MiniChat Chatbot JavaScript */}
          <script src="/MiniChatJavaScript.js"></script>
        </body>
      </Html>
    );
  }
}
