import { BombermanRenderer } from '../vendor/contribution-graph/arcade-renderer.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const demo = process.argv.includes('--demo');
const token = process.env.GITHUB_TOKEN;
if (!demo && !token) throw new Error('Set GITHUB_TOKEN to fetch the actual GitHub contribution calendar.');
const directory = path.join(root, demo ? 'preview/assets' : 'dist');
await mkdir(directory, { recursive: true });
const palette = { '#161b22':'#04140a', '#0e4429':'#075526', '#006d32':'#008f36', '#26a641':'#00c853', '#39d353':'#00ff41', '#0d1117':'#020805', '#8b949e':'#80b98d' };
let result = '';
const renderer = new BombermanRenderer({
  platform: demo ? 'scenario' : 'github',
  ...(demo ? { scenario: 'random' } : {}),
  username: 'OjasJain777',
  gameTheme: 'github-dark',
  showMonthLabels: true,
  githubSettings: { accessToken: token || '' },
  svgCallback: svg => { result = svg; },
  gameOverCallback: () => {},
  pointsIncreasedCallback: () => {}
});
await renderer.start();
if (!result.startsWith('<svg') && !result.includes('<svg')) throw new Error('Renderer did not return an SVG.');
result = result.replace(/#[0-9a-f]{6}\b/gi, value => palette[value.toLowerCase()] || value);
if (demo) {
  await writeFile(path.join(directory, 'bomberman-demo.svg'), result);
  console.log('Generated Bomberman preview using synthetic demo data.');
} else {
  // Keep the Matrix theme in both GitHub colour modes.
  for (const filename of ['bomberman-contribution-graph.svg', 'bomberman-contribution-graph-dark.svg']) {
    await writeFile(path.join(directory, filename), result);
  }
  console.log('Generated Bomberman SVGs from OjasJain777 contribution data.');
}
