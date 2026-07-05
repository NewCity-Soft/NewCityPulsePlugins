import React, { useEffect, useRef } from 'react';
import { Plugin, PluginAPI } from '../types';
import { NodeType, PipeType } from '../../types';
import { pluginManager } from '../PluginManager';

/**
 * Smart Build Plugin
 * 
 * Interaction Logic:
 * 1. Start: When dragging from a building, temporarily adjust pipe mode.
 * 2. During: UI checkboxes visually sync (handled by React state flow).
 * 3. End: Revert to the last manually set state.
 */

const SMART_BUILD_CONFIG: Record<string, { pipeMode?: PipeType; hasPower?: boolean; hasGas?: boolean }> = {
    'SOURCE': { pipeMode: 'WATER' },
    'WELL': { pipeMode: 'WATER' },
    'SURFACE_INTAKE': { pipeMode: 'WATER' },
    'SEWAGE_PLANT': { pipeMode: 'SEWAGE' },
    'WIND_POWER': { pipeMode: 'NONE', hasPower: true },
    'COAL_POWER': { pipeMode: 'NONE', hasPower: true },
    'GAS_SOURCE': { pipeMode: 'NONE', hasGas: true },
    'GAS_DECOMPRESSOR': { pipeMode: 'NONE', hasGas: true },
    'GAS_STORAGE': { pipeMode: 'NONE', hasGas: true },
    'COMMERCIAL': { pipeMode: 'WATER' }
};

const SmartBuildLogic: React.FC<any> = ({ gameState, setGameState }) => {
    const manualSettings = useRef<any>(null);
    const isTemporary = useRef(false);

    useEffect(() => {
        const handleDragStart = (data: { nodeId: string, nodeType: NodeType }) => {
            const config = SMART_BUILD_CONFIG[data.nodeType];
            if (config) {
                // Save current settings as manual if we are not already in a temporary state
                if (!isTemporary.current) {
                    manualSettings.current = { ...gameState.pipeBuildSettings };
                }
                
                isTemporary.current = true;
                setGameState((prev: any) => ({
                    ...prev,
                    pipeBuildSettings: {
                        water: config.pipeMode === 'WATER' || config.pipeMode === 'COMBINED',
                        sewage: config.pipeMode === 'SEWAGE' || config.pipeMode === 'COMBINED',
                        power: !!config.hasPower,
                        gas: !!config.hasGas
                    }
                }));
            }
        };

        const handleDragEnd = () => {
            if (isTemporary.current && manualSettings.current) {
                setGameState((prev: any) => ({
                    ...prev,
                    pipeBuildSettings: { ...manualSettings.current }
                }));
                isTemporary.current = false;
            }
        };

        const handleBuildTypeSelect = (data: { type: string | null }) => {
            if (!data.type) return;
            const config = SMART_BUILD_CONFIG[data.type];
            if (config) {
                setGameState((prev: any) => ({
                    ...prev,
                    pipeBuildSettings: {
                        water: config.pipeMode === 'WATER' || config.pipeMode === 'COMBINED',
                        sewage: config.pipeMode === 'SEWAGE' || config.pipeMode === 'COMBINED',
                        power: !!config.hasPower,
                        gas: !!config.hasGas
                    }
                }));
            }
        };

        const unsubscribeStart = pluginManager.onEvent('pipe_drag_start', handleDragStart);
        const unsubscribeEnd = pluginManager.onEvent('pipe_drag_end', handleDragEnd);
        const unsubscribeSelect = pluginManager.onEvent('build_type_select', handleBuildTypeSelect);

        return () => {
            unsubscribeStart();
            unsubscribeEnd();
            unsubscribeSelect();
        };
    }, [gameState.pipeBuildSettings, setGameState]);

    return null;
};

const smartBuildPlugin: Plugin = {
    id: 'smart-build',
    name: 'Smart Build',
    version: '2.0.0',
    init: (api: PluginAPI) => {
        api.registerCustomUI('smart-build-logic', SmartBuildLogic);
    }
};

export default smartBuildPlugin;
