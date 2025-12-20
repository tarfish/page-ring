import { cp, rmdir, stat } from "fs/promises";
import path from "path";

const file = Bun.file(path.join(__dirname, "../dist/script.umd.cjs"));
if (!(await file.exists())) {
  console.error("postbuild failed: script.umd.cjs not found");
  process.exit(1);
}
await Bun.write(path.join(__dirname, "../dist/script.js"), file);
await file.delete();

const fromDir = path.join(__dirname, "../dist");
const toDir = path.join(__dirname, "../../website/public/embed");
try {
  await rmdir(toDir, { recursive: true });
} catch (e) {}
await cp(fromDir, toDir, {
  recursive: true,
  force: true,
});
