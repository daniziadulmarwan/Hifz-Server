const { build } = require("esbuild");

build({
  keepNames: true,
  bundle: true,
}).catch(() => {
  process.exit(1);
});
