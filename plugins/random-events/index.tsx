import React, { useState, useEffect } from 'react';
import { Plugin, PluginAPI } from '../types';
import { GameState } from '../../types';
import { CONFIG } from '../../constants';

const EVENTS = [
  { id: 'GRANT', name: 'Government Grant', description: 'The city received a development grant!', impact: { money: 5000 }, color: 'text-emerald-500' },
  { id: 'TAX', name: 'Tax Season', description: 'Annual taxes have been collected.', impact: { money: 2000 }, color: 'text-blue-500' },
  { id: 'MAINTENANCE', name: 'Infrastructure Maintenance', description: 'Routine maintenance costs for the city pipes.', impact: { money: -1000 }, color: 'text-amber-500' },
  { id: 'GIFT', name: 'Citizen Gift', description: 'A wealthy citizen donated to the city fund.', impact: { score: 100 }, color: 'text-purple-500' },
  { id: 'FAILURE', name: 'Equipment Failure', description: 'Minor equipment failure in the water works.', impact: { money: -500 }, color: 'text-rose-500' },
  { id: 'BOOM', name: 'Economic Boom', description: 'The city is thriving! Extra revenue collected.', impact: { money: 10000 }, color: 'text-emerald-400' },
  { id: 'CRASH', name: 'Market Crash', description: 'Stock market crash affects city reserves.', impact: { money: -3000 }, color: 'text-rose-600' },
  // Timed Effects
  { id: 'SANDSTORM', name: 'Sandstorm', description: 'A sandstorm is hitting the city! Building stress increases faster.', impact: { duration: 1800, stressMultiplier: 2 }, color: 'text-orange-500' },
  { id: 'FESTIVAL', name: 'City Festival', description: 'The city is celebrating! Score increases over time.', impact: { duration: 1200, scorePerTick: 0.1 }, color: 'text-pink-500' },
  { id: 'REPAIR', name: 'Emergency Repair', description: 'Engineers are working hard. Stress accumulation slowed down.', impact: { duration: 1500, stressMultiplier: 0.5 }, color: 'text-sky-500' },
];

const EVENT_ICONS: Record<string, React.ReactNode> = {
  GRANT: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  TAX: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  MAINTENANCE: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" /></svg>,
  GIFT: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M20 12V8H4v4M2 4h20v4H2zM12 20V8M18 20V8M6 20V8M2 20h20" /></svg>,
  FAILURE: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3ZM12 9v4M12 17h.01" /></svg>,
  BOOM: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="m2 22 7-7 3 3 10-10M18 7h4v4" /></svg>,
  CRASH: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="m2 2 7 7 3-3 10 10M18 17h4v-4" /></svg>,
  SANDSTORM: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M17.5 19c.7 0 1.2-.6 1.2-1.2s-.5-1.2-1.2-1.2H4.2c-.7 0-1.2.6-1.2 1.2s.5 1.2 1.2 1.2h13.3Zm2.5-4.5c.7 0 1.2-.6 1.2-1.2s-.5-1.2-1.2-1.2H5.2c-.7 0-1.2.6-1.2 1.2s.5 1.2 1.2 1.2h14.8ZM16.5 10c.7 0 1.2-.6 1.2-1.2s-.5-1.2-1.2-1.2H3.2c-.7 0-1.2.6-1.2 1.2s.5 1.2 1.2 1.2h13.3Z" /></svg>,
  FESTIVAL: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18ZM12 7v5l3 3" /></svg>,
  REPAIR: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" /></svg>,
};

const RandomEventNotification: React.FC<{ gameState: GameState }> = ({ gameState }) => {
  const [visibleEvent, setVisibleEvent] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const eventData = gameState.pluginData?.['com.citypulse.randomevents']?.lastEvent;
    if (eventData && eventData.timestamp !== visibleEvent?.timestamp) {
      setVisibleEvent(eventData);
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [gameState.pluginData, visibleEvent]);

  if (!show || !visibleEvent) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 px-6 py-4 rounded-2xl shadow-2xl flex flex-col items-center gap-1 animate-bounce-in pointer-events-auto">
        <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${visibleEvent.color}`}>
          {EVENT_ICONS[visibleEvent.id]}
          {visibleEvent.name}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300 font-medium text-center max-w-[240px]">
          {visibleEvent.description}
        </div>
        <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
          {visibleEvent.impact.money ? `${visibleEvent.impact.money > 0 ? '+' : ''}$${visibleEvent.impact.money}` : ''}
          {visibleEvent.impact.score ? `${visibleEvent.impact.score > 0 ? '+' : ''}${Math.round(visibleEvent.impact.score)} Score` : ''}
          {visibleEvent.impact.duration ? `Duration: ${Math.floor(visibleEvent.impact.duration / 60)}s` : ''}
        </div>
      </div>
    </div>
  );
};

const NewsTicker: React.FC<{ gameState: GameState }> = ({ gameState }) => {
  const eventData = gameState.pluginData?.['com.citypulse.randomevents']?.lastEvent;
  const activeEffects = gameState.pluginData?.['com.citypulse.randomevents']?.activeEffects || [];
  
  if (!eventData && activeEffects.length === 0) return null;

  return (
    <div className="flex flex-col gap-1 items-end">
      {activeEffects.map((effect: any) => (
        <div key={effect.id} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm px-3 py-1 rounded-lg border border-slate-200/50 dark:border-slate-800/50 flex items-center gap-2 animate-pulse">
           <div className={`w-1.5 h-1.5 rounded-full bg-sky-500`} />
           <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
             {effect.name}: {Math.ceil(effect.remaining / 60)}s
           </div>
        </div>
      ))}
      {eventData && (
        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-slate-800/50 flex items-center gap-2 max-w-[200px] overflow-hidden">
          <div className={`w-2 h-2 rounded-full animate-pulse flex-shrink-0 ${eventData.impact.money < 0 || eventData.impact.score < 0 || eventData.id === 'SANDSTORM' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
          <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter truncate">
            Latest: {eventData.name}
          </div>
        </div>
      )}
    </div>
  );
};

const RandomEventsPlugin: Plugin = {
  id: 'com.citypulse.randomevents',
  name: 'Random Events',
  version: '1.1.0',
  init: (api: PluginAPI) => {
    api.registerHook('onTick', (gameState: GameState) => {
      const pluginData = gameState.pluginData?.['com.citypulse.randomevents'];
      if (!pluginData || !pluginData.activeEffects || pluginData.activeEffects.length === 0) return gameState;

      let stressMultiplier = 1;
      let scoreBonus = 0;
      const newActiveEffects = [];

      // Process effects immutably
      for (const effect of pluginData.activeEffects) {
        const remaining = effect.remaining - 1;
        if (remaining > 0) {
          newActiveEffects.push({ ...effect, remaining });
          if (effect.impact.stressMultiplier) stressMultiplier *= effect.impact.stressMultiplier;
          if (effect.impact.scorePerTick) scoreBonus += effect.impact.scorePerTick;
        }
      }

      // If no changes and no effects left, return original state
      if (newActiveEffects.length === 0 && pluginData.activeEffects.length === 0) return gameState;

      const newGameState = { 
        ...gameState,
        score: gameState.score + scoreBonus,
        pluginData: {
          ...gameState.pluginData,
          ['com.citypulse.randomevents']: {
            ...pluginData,
            activeEffects: newActiveEffects
          }
        }
      };

      // Apply real-time impacts to nodes
      if (stressMultiplier !== 1) {
        newGameState.nodes = newGameState.nodes.map(node => {
          if (node.type === 'SINK') {
            const extraStress = CONFIG.STRESS_RATE * (stressMultiplier - 1);
            const nextStress = Math.max(0, Math.min(node.maxStress, node.stress + extraStress));
            if (nextStress !== node.stress) {
              return { ...node, stress: nextStress };
            }
          }
          return node;
        });
      }

      return newGameState;
    });

    api.registerHook('onCycle', (gameState: GameState) => {
      // 15% chance of an event per cycle
      if (Math.random() > 0.15) return gameState;

      const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      const timestamp = Date.now();

      const currentPluginData = gameState.pluginData?.['com.citypulse.randomevents'] || { activeEffects: [] };
      const newActiveEffects = [...currentPluginData.activeEffects];

      // Add to active effects if it has duration
      if (event.impact.duration) {
        newActiveEffects.push({
          id: event.id,
          name: event.name,
          remaining: event.impact.duration,
          impact: event.impact
        });
      }

      return {
        ...gameState,
        money: gameState.money + (event.impact.money || 0),
        score: gameState.score + (event.impact.score || 0),
        pluginData: {
          ...gameState.pluginData,
          ['com.citypulse.randomevents']: {
            ...currentPluginData,
            activeEffects: newActiveEffects,
            lastEvent: { ...event, timestamp }
          }
        }
      };
    });

    api.registerCustomUI('random-event-notification', RandomEventNotification);
    api.registerTopBarExtension('news-ticker', NewsTicker);
  }
};

export default RandomEventsPlugin;
