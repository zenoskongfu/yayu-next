import express from "express";
import { readFile } from "fs";
import { readdir } from "fs/promises";
import { join, resolve } from "path";
import { renderToString } from "react-dom/server";
const app = express();
app.use(express.static("public"));

const pwd = process.cwd();
const pageDir = join(pwd, "./pages");
const buildDir = join(pwd, "./build");

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
			<script src="./client.bundle.js"></script>
    <body>
  </html>
  `;
};

app.get(/.*$/, async (req, res) => {
	const url = req.url;
	let path = url.split("/").slice(-1)[0];
	path = path ? path : "index";

	// if (path.endsWith(".js")) {
	// 	const file = resolve(buildDir, path);
	// 	res.end(readFile(file));
	// 	return;
	// }

	const pages = await readdir(pageDir);
	if (pages.includes(`${path}.js`)) {
		// 动态获取组件
		const page = await import(`./pages/${path}.js`);
		const Component = page.default;
		// 请求组件的所需要的数据
		let propsObj = {};
		if (page.getServerSideProps) {
			const { props } = await page.getServerSideProps({ query: req.query });
			console.log(props);
			propsObj = props;
		}

		// 生成页面需要的html结构
		const content = renderToString(<Component {...propsObj} />);
		res.setHeader("Content-type", "text/html; charset=utf-8");
		res.end(
			generateHtml(content, {
				props: propsObj,
				page: path,
			})
		);
	} else {
		res.status(404).end(`page ${path} not find in ${pages}`);
	}
});

app.listen(3000, () => {
	console.log("listen 3000");
});
