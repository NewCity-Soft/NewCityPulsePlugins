import React from 'react';
import { Plugin, PluginAPI } from '../types';

export const MaintenancePlugin: Plugin = {
  id: 'maintenance-plugin',
  name: 'Maintenance System',
  version: '1.0.0',
  init: (api: PluginAPI) => {
    // Add a maintenance section to ALL core building types
    const coreBuildings = ['WELL', 'SURFACE_INTAKE', 'SOURCE', 'SINK', 'PUMP', 'COMMERCIAL', 'WIND_POWER', 'COAL_POWER', 'GAS_SOURCE', 'GAS_STORAGE', 'GAS_BOOSTER', 'GAS_DECOMPRESSOR'];
    
    coreBuildings.forEach(type => {
      api.registerInfoPanelSection(type, 'INTRO', ({ node, onUpdateNode }) => {
        const maintenance = (node as any).maintenanceLevel || 100;
        
        return (
          <div className="p-2 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-800/50">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">Maintenance</span>
              <span className={`text-[10px] font-mono font-bold ${maintenance < 30 ? 'text-rose-500' : 'text-amber-600'}`}>
                {Math.round(maintenance)}%
              </span>
            </div>
            <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${maintenance < 30 ? 'bg-rose-500' : 'bg-amber-500'}`}
                style={{ width: `${maintenance}%` }}
              />
            </div>
            <button 
              onClick={() => onUpdateNode(node.id, { maintenanceLevel: 100 } as any)}
              className="w-full mt-2 py-1 bg-amber-500 hover:bg-amber-600 text-white text-[9px] font-bold rounded transition-colors"
            >
              Perform Maintenance (10 HY)
            </button>
          </div>
        );
      });
    });

    // Add a global maintenance alert to the top bar
    api.registerTopBarExtension('maintenance-alert', ({ gameState }) => {
      const lowMaintenanceCount = gameState.nodes.filter((n: any) => (n.maintenanceLevel || 100) < 30).length;
      if (lowMaintenanceCount === 0) return null;

      return (
        <div className="flex items-center gap-1 px-2 py-0.5 bg-rose-500 text-white rounded-full text-[9px] font-bold animate-pulse">
          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
          </svg>
          {lowMaintenanceCount} Buildings Need Repair
        </div>
      );
    });

    // Hook into the game tick to decrease maintenance over time
    api.registerHook('onTick', (state) => {
      // Every 60 ticks (approx 1 second), decrease maintenance
      if (state.gameTime % 60 === 0) {
        return {
          ...state,
          nodes: state.nodes.map(node => ({
            ...node,
            maintenanceLevel: Math.max(0, ((node as any).maintenanceLevel || 100) - 0.1)
          }))
        };
      }
      return state;
    });
  }
};
