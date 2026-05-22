import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
const outputDir = path.resolve(".vercel/output");

// Clean and create output dirs
fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(path.join(outputDir, "static"), { recursive: true });
fs.mkdirSync(path.join(outputDir, "functions/index.func"), { recursive: true });

// Copy client assets to static
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(path.join(distDir, "client"), path.join(outputDir, "static"));

// Copy server bundle to function
fs.copyFileSync(
  path.join(distDir, "server/server.js"),
  path.join(outputDir, "functions/index.func/server.js")
);
for (const entry of fs.readdirSync(path.join(distDir, "server/assets"))) {
  fs.copyFileSync(
    path.join(distDir, "server/assets", entry),
    path.join(outputDir, "functions/index.func/assets", entry)
  );
}

// Create Edge Function entry
const edgeEntry = `import server from "./server.js";
export default async function handler(request) {
  return server.fetch(request, {}, {});
}`;

fs.writeFileSync(path.join(outputDir, "functions/index.func/index.js"), edgeEntry);

// Create .vc-config.json for Edge Function
const vcConfig = {
  runtime: "edge",
  entrypoint: "index.js",
};
fs.writeFileSync(
  path.join(outputDir, "functions/index.func/.vc-config.json"),
  JSON.stringify(vcConfig, null, 2)
);

// Create Vercel output config
const config = {
  version: 3,
  routes: [
    { handle: "filesystem" },
    { src: "/(.*)", dest: "/" },
  ],
};
fs.writeFileSync(path.join(outputDir, "config.json"), JSON.stringify(config, null, 2));

console.log("Vercel output generated at .vercel/output");
