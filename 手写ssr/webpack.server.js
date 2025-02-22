const path = require("path");

/** @type {import('webpack').Configuration} */
const config = {
	mode: "development",
	target: "node",
	entry: "./server.mjs",
	watch: true,
	output: {
		filename: "server.bundle.js",
		path: path.resolve(__dirname, "build"),
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
