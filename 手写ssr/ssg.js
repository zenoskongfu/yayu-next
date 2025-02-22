import { existsSync } from "fs";
import { access, mkdir, readdir, writeFile } from "fs/promises";
import { join, resolve } from "path";
import { renderToString } from "react-dom/server";
import { generateHtml } from "./util";

async function build() {
	const cwd = process.cwd();
	const pageDir = resolve(cwd, "./pages");
	const outputDir = resolve(cwd, "./output");

	try {
		await access(outputDir);
	} catch (error) {
		await mkdir(outputDir);
	}

	const pages = await readdir(pageDir);

	for (let page of pages) {
		// const pagePath = resolve(pageDir, page);
		const module = await import(`./pages/${page}`);
		const Component = module.default;

		let propsObj = {};
		if (module.getServerSideProps) {
			const { props } = await module.getServerSideProps();
			propsObj = props;
		}

		const content = renderToString(<Component {...propsObj} />);

		const htmlName = page.split(".")[0];
		writeFile(
			resolve(outputDir, `${htmlName}.html`),
			generateHtml(content, {
				page: htmlName,
				props: propsObj,
			})
		);
	}
}

build();
