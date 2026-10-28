import { build } from "esbuild";
import { readFile, mkdir, rm, copyFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const root = new URL("../", import.meta.url);
process.chdir(fileURLToPath(root));
await rm("lib", { recursive: true, force: true });
await mkdir("lib/licenses", { recursive: true });
await build({
	entryPoints: ["src/index.ts"],
	outfile: "lib/index.js",
	platform: "node",
	format: "esm",
	target: "node22",
	bundle: true,
});
const pkg = JSON.parse(await readFile("package.json", "utf8"));
await build({
	entryPoints: ["src/client/index.ts"],
	outfile: "lib/client.js",
	platform: "browser",
	format: "cjs",
	target: "es2022",
	bundle: true,
	external: ["react", "react/jsx-runtime", "@deepseek-ai/cordis"],
	loader: { ".css": "text" },
	banner: {
		js: `window.__ModuleLoader__.load({id:${JSON.stringify(pkg.name)},factory:(require)=>{const module={exports:{}};const exports=module.exports;`,
	},
	footer: { js: "return module.exports;}});" },
	plugins: [
		{
			name: "inkpond-offline-fonts",
			setup(api) {
				api.onLoad(
					{ filter: /inkpond[/\\]dist[/\\].*\.js$/ },
					async ({ path }) => {
						let contents = await readFile(path, "utf8");
						const matches = [
							...contents.matchAll(
								/new URL\("((?:\.\.\/|\.\/)+assets\/[^\"]+\.woff2)", import\.meta\.url\)\.href/g,
							),
						];
						for (const match of matches) {
							const font = await readFile(resolve(dirname(path), match[1]));
							contents = contents.replace(
								match[0],
								JSON.stringify(
									"data:font/woff2;base64," + font.toString("base64"),
								),
							);
						}
						return { contents, loader: "js" };
					},
				);
			},
		},
	],
	metafile: true,
}).then(async (result) => {
	const inputs = Object.keys(result.metafile.inputs);
	if (inputs.some((p) => /node_modules\/react\//.test(p)))
		throw new Error("React must be supplied by DSH");
	await writeFile(
		"lib/build-info.json",
		JSON.stringify(
			{ version: pkg.version, inkpond: pkg.devDependencies.inkpond },
			null,
			2,
		) + "\n",
	);
});
await copyFile(
	"node_modules/inkpond/dist/assets/OFL.txt",
	"lib/licenses/OFL.txt",
);
await copyFile("node_modules/inkpond/LICENSE", "lib/licenses/inkpond-MIT.txt");
