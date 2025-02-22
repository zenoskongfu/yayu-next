const path = require("path");
const cwd = process.cwd();
/** @type {import('webpack').Configuration} */
const config = {
	mode: "development",
	entry: "./ssg.js",
	watch: true,
	target: "node",
	output: {
		filename: "ssg.bundle.js",
		path: path.resolve(cwd, "./build"),
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
