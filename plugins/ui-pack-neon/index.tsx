import { PluginAPI } from '../types';

export default {
  id: "com.citypulse.ui-pack.neon",
  name: "Neon UI Pack",
  version: "1.0.0",
  init: (api: PluginAPI) => {
    // We can change CSS variables when this plugin loads.
    api.setThemeVariable('radius-lg', '0px');
    api.setThemeVariable('radius-md', '0px');
    api.setThemeVariable('radius-sm', '0px');
    
    // Custom global CSS can be injected via DOM
    const styleId = 'neon-ui-pack-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        body, .custom-scrollbar, .no-scrollbar {
          --color-primary: 0, 255, 255;
          font-family: inherit !important;
        }
        .bg-white, .dark\\:bg-neutral-900 {
          border: 1px solid #0ff !important;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
        }
      `;
      document.head.appendChild(style);
    }
  }
};
