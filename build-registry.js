const fs = require('fs');
const path = require('path');

const PLUGINS_DIR = './outside/pluginstore/plugins';
const REGISTRY_FILE = './outside/pluginstore/registry.json';
const BASE_URL = 'https://raw.githubusercontent.com/NewCity-Soft/NewCityPulsePlugins/main';

function buildRegistry() {
    const plugins = fs.readdirSync(PLUGINS_DIR)
        .filter(dir => fs.lstatSync(path.join(PLUGINS_DIR, dir)).isDirectory())
        .map(dir => {
            const manifestPath = path.join(PLUGINS_DIR, dir, 'manifest.json');
            if (fs.existsSync(manifestPath)) {
                const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
                return {
                    ...manifest,
                    manifestUrl: `${BASE_URL}/plugins/${dir}/manifest.json`,
                    entryUrl: `${BASE_URL}/plugins/${dir}/${manifest.entry || 'index.tsx'}`
                };
            }
            return null;
        })
        .filter(Boolean);

    const registry = {
        name: "New City Pulse Official Store",
        plugins: plugins
    };

    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2));
    console.log('Registry updated successfully.');
}

buildRegistry();
