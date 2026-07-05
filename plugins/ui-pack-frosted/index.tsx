import { PluginAPI } from '../types';

export default {
  id: "com.citypulse.ui-pack.frosted",
  name: "Frosted Glass UI",
  version: "1.0.0",
  init: (api: PluginAPI) => {
    // Inject frosted glass CSS
    const styleId = 'frosted-ui-pack-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        :root {
          --glass-bg: rgba(255, 255, 255, 0.4);
          --glass-bg-dark: rgba(23, 23, 23, 0.4);
          --glass-border: rgba(255, 255, 255, 0.2);
          --glass-border-dark: rgba(255, 255, 255, 0.1);
        }

        /* Frosted Glass Panels */
        .bg-white, 
        .dark\\:bg-neutral-800, 
        .dark\\:bg-neutral-900,
        .bg-slate-50,
        .dark\\:bg-neutral-950,
        .bg-slate-100,
        .bg-white\\/80,
        .bg-white\\/90,
        .bg-white\\/95,
        .dark\\:bg-black,
        .dark\\:bg-neutral-800\\/90 {
          background-color: var(--glass-bg) !important;
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          border: 1px solid var(--glass-border) !important;
          transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
        }

        .dark .bg-white,
        .dark .dark\\:bg-neutral-800, 
        .dark .dark\\:bg-neutral-900,
        .dark .bg-slate-50,
        .dark .dark\\:bg-neutral-950,
        .dark .bg-slate-100,
        .dark .bg-white\\/80,
        .dark .bg-white\\/90,
        .dark .bg-white\\/95,
        .dark .dark\\:bg-black,
        .dark .dark\\:bg-neutral-800\\/90 {
          background-color: var(--glass-bg-dark) !important;
          border: 1px solid var(--glass-border-dark) !important;
        }

        /* Modals and Overlays */
        .fixed.inset-0.bg-black\\/50,
        .fixed.inset-0.bg-slate-900\\/40,
        .fixed.inset-0.bg-white\\/70,
        .fixed.inset-0.bg-black\\/70 {
          background-color: transparent !important;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* Buttons and interactive elements */
        .hover\\:bg-slate-50:hover, 
        .hover\\:bg-slate-100:hover,
        .dark .hover\\:bg-neutral-800:hover,
        .hover\\:bg-neutral-100:hover {
          background-color: rgba(255, 255, 255, 0.15) !important;
          backdrop-filter: blur(8px);
        }

        /* HUD specific panels with colors */
        .bg-purple-100, .bg-rose-500, .bg-amber-500 {
           backdrop-filter: blur(10px) saturate(150%);
           -webkit-backdrop-filter: blur(10px) saturate(150%);
        }

        .bg-purple-100 { background-color: rgba(243, 232, 255, 0.6) !important; }
        .dark .dark\\:bg-purple-900\\/40 { background-color: rgba(88, 28, 135, 0.4) !important; }
        
        .bg-rose-500 { background-color: rgba(244, 63, 94, 0.8) !important; }
        .bg-amber-500 { background-color: rgba(245, 158, 11, 0.8) !important; }

        /* Tabs and specific UI components */
        .border-slate-100, .dark\\:border-neutral-900 {
          border-color: var(--glass-border) !important;
        }

        .dark .border-slate-100, .dark .dark\\:border-neutral-900 {
          border-color: var(--glass-border-dark) !important;
        }

        /* Custom Scrollbar to match glass look */
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.1);
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
        }
      `;
      document.head.appendChild(style);
    }
  }
};
