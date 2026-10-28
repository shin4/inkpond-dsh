import { it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import vm from "node:vm";
it("loads the actual client artifact through the DSH factory with only shared React", () => {
	execFileSync(process.execPath, ["scripts/build.mjs"]);
	const source = readFileSync("lib/client.js", "utf8");
	let exports: Record<string, unknown> = {};
	vm.runInNewContext(source, {
		window: {
			__ModuleLoader__: {
				load({
					id,
					factory,
				}: {
					id: string;
					factory: (
						require: (name: string) => unknown,
					) => Record<string, unknown>;
				}) {
					expect(id).toBe("dsh-inkpond");
					exports = factory((name) => {
						expect(["react", "react/jsx-runtime"]).toContain(name);
						return {};
					});
				},
			},
		},
	});
	expect(exports.apply).toBeTypeOf("function");
	expect(exports.inject).toEqual(["slots"]);
	expect(source.match(/data:font\/woff2;base64,/g)).toHaveLength(5);
	expect(source).not.toContain("import_meta");
	expect(readFileSync("lib/licenses/OFL.txt", "utf8")).toContain(
		"SIL OPEN FONT LICENSE",
	);
});
