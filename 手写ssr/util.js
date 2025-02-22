const generateHtml = (content, windowData) => {
	return `
  <html>
    <head>
      <title>Tiny React SSR</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script>
        window.__DATA__ = ${JSON.stringify(windowData)}
      </script>
			<script src="/client.bundle.js"></script>
    <body>
  </html>
  `;
};

exports.generateHtml = generateHtml;
