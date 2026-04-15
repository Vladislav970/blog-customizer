const { existsSync } = require('node:fs');
const { join } = require('node:path');
const { spawnSync } = require('node:child_process');

if (!process.env.CI) {
	process.exit(0);
}

const cliPath = join(__dirname, '..', 'node_modules', 'playwright', 'cli.js');

if (!existsSync(cliPath)) {
	console.warn('Playwright CLI not found, skipping CI browser install.');
	process.exit(0);
}

const result = spawnSync(process.execPath, [cliPath, 'install', 'chromium'], {
	stdio: 'inherit',
});

if (result.status !== 0) {
	process.exit(result.status ?? 1);
}
