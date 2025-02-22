const path = require("path");
const cwd = process.cwd();
/** @type {import('webpack').Configuration} */
const config = {
	mode: "development",
	entry: "./client.js",
	watch: true,
	output: {
		filename: "client.bundle.js",
		path: path.resolve(cwd, "./public"),
	},
	module: {
		rules: [
			{
				test: /\.(mjs|js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
					},
				},
			},
		],
	},
};

module.exports = config;
