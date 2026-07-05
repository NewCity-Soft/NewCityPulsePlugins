import { PluginAPI } from '../types';

export default {
  id: "com.citypulse.ui-pack.liquid",
  name: "Liquid Glass UI",
  version: "1.0.0",
  init: (api: PluginAPI) => {
    // Inject liquid glass CSS
    const styleId = 'liquid-ui-pack-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        :root {
          --liquid-bg: rgba(255, 255, 255, 0.45);
          --liquid-bg-dark: rgba(15, 15, 20, 0.45);
          --liquid-border: rgba(255, 255, 255, 0.4);
          --liquid-border-dark: rgba(255, 255, 255, 0.1);
          --liquid-glow: rgba(255, 255, 255, 0.5);
          --liquid-glow-dark: rgba(0, 0, 0, 0.3);
        }

        /* Liquid Glass Panels */
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
          background: linear-gradient(135deg, var(--liquid-bg), rgba(255, 255, 255, 0.1)) !important;
          backdrop-filter: blur(20px) saturate(200%);
          -webkit-backdrop-filter: blur(20px) saturate(200%);
          border: 1px solid var(--liquid-border) !important;
          border-radius: 1.5rem !important; /* Extra round */
          box-shadow: 
            0 8px 32px 0 rgba(31, 38, 135, 0.2),
            inset 0 0 1px 1px var(--liquid-glow) !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
          background: linear-gradient(135deg, var(--liquid-bg-dark), rgba(0, 0, 0, 0.1)) !important;
          border: 1px solid var(--liquid-border-dark) !important;
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.6),
            inset 0 0 1px 1px var(--liquid-glow-dark) !important;
        }

        /* Interactive Elements */
        .hover\\:bg-slate-50:hover, 
        .hover\\:bg-slate-100:hover,
        .dark .hover\\:bg-neutral-800:hover,
        .hover\\:bg-neutral-100:hover {
          background-color: rgba(255, 255, 255, 0.2) !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.3) !important;
        }

        /* Modals and Overlays */
        .fixed.inset-0.bg-black\\/50,
        .fixed.inset-0.bg-slate-900\\/40,
        .fixed.inset-0.bg-white\\/70,
        .fixed.inset-0.bg-black\\/70 {
          background-color: transparent !important;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* Buttons and HUD Items */
        .rounded-lg { border-radius: 1rem !important; }
        .rounded-xl { border-radius: 1.25rem !important; }
        .rounded-full { border-radius: 9999px !important; }

        /* HUD specific colors */
        .bg-purple-100, .bg-rose-500, .bg-amber-500 {
           backdrop-filter: blur(15px) saturate(180%);
           -webkit-backdrop-filter: blur(15px) saturate(180%);
           border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }

        .bg-purple-100 { background: linear-gradient(135deg, rgba(243, 232, 255, 0.7), rgba(243, 232, 255, 0.2)) !important; }
        .dark .dark\\:bg-purple-900\\/40 { background: linear-gradient(135deg, rgba(88, 28, 135, 0.5), rgba(88, 28, 135, 0.1)) !important; }

        .bg-rose-500 { background: linear-gradient(135deg, rgba(244, 63, 94, 0.8), rgba(244, 63, 94, 0.4)) !important; }
        .bg-amber-500 { background: linear-gradient(135deg, rgba(245, 158, 11, 0.8), rgba(245, 158, 11, 0.4)) !important; }

        /* Scrollbar */
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `;
      document.head.appendChild(style);
    }
  }
};
