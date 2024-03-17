import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Kanban task management dashboard" />
          <meta name="keywords" content="keywords, separated, by, commas" />
          <meta name="author" content="Tango" />
          <meta property="og:title" content="kanban dashboard" />
          <meta property="og:description" content="Kanban task management dashboard" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://kanban.com" />
          <meta property="og:image" content="https://kanban.com/og-image.jpg" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
