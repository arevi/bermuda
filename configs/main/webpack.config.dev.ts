const config = {
  entry: "./src/main/app.ts",
  name: "electron",
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".ts", ".json"],
  },
  output: {
    path: __dirname + "/build",
    filename: "app.js",
  },
  plugins: [],
};
