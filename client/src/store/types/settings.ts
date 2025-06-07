import { Values } from '@/typeHelpers';

import LayoutPreset from '@/enums/LayoutPreset';
import { IntegrationPreset } from '@/enums/IntegrationType'

export const SAVE_LAYOUT_PRESET = 'SAVE_LAYOUT_PRESET';
export const RECEIVE_LAYOUT_PRESET = 'RECEIVE_LAYOUT_PRESET';
export const GET_LAYOUT_PRESET = 'GET_LAYOUT_PRESET';

export const SAVE_INTEGRATION_PRESET = 'SAVE_INTEGRATION_PRESET';
export const RECEIVE_INTEGRATION_PRESET = 'RECEIVE_INTEGRATION_PRESET';
export const GET_INTEGRATION_PRESET = 'GET_INTEGRATION_PRESET';

export type SettingState = {
  layoutPreset: Values<typeof LayoutPreset>;
  integrationPreset: Values<typeof IntegrationPreset>;
};

export type SaveIntegrationPreset = {
  type: typeof SAVE_INTEGRATION_PRESET;
  preset: Values<typeof IntegrationPreset>;
};

export type RecieveIntegrationPreset = {
  type: typeof RECEIVE_INTEGRATION_PRESET;
  preset: Values<typeof IntegrationPreset>;
};

export type GetIntegrationPreset = {
  type: typeof GET_INTEGRATION_PRESET;
};



export type SaveLayoutPresetAction = {
  type: typeof SAVE_LAYOUT_PRESET;
  preset: Values<typeof LayoutPreset>;
};

export type ReceiveLayoutPresetAction = {
  type: typeof RECEIVE_LAYOUT_PRESET;
  preset: Values<typeof LayoutPreset>;
};

export type GetLayoutPresetAction = {
  type: typeof GET_LAYOUT_PRESET;
};
