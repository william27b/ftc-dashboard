import { LayoutPresetType } from '@/enums/LayoutPreset';
import { IntegrationPreset } from '@/enums/IntegrationType'

import {
  GetLayoutPresetAction,
  ReceiveLayoutPresetAction,
  SaveLayoutPresetAction,
  GET_LAYOUT_PRESET,
  RECEIVE_LAYOUT_PRESET,
  SAVE_LAYOUT_PRESET,

  GetIntegrationPreset,
  SaveIntegrationPreset,
  GET_INTEGRATION_PRESET,
  SAVE_INTEGRATION_PRESET,
  RecieveIntegrationPreset,
  RECEIVE_INTEGRATION_PRESET,
} from '@/store/types';

import { Values } from '@/typeHelpers';

export const saveLayoutPreset = (
  preset: LayoutPresetType,
): SaveLayoutPresetAction => ({
  type: SAVE_LAYOUT_PRESET,
  preset,
});

export const receiveLayoutPreset = (
  preset: LayoutPresetType,
): ReceiveLayoutPresetAction => ({
  type: RECEIVE_LAYOUT_PRESET,
  preset,
});

export const getLayoutPreset = (): GetLayoutPresetAction => ({
  type: GET_LAYOUT_PRESET,
});



export const saveIntegrationPreset = (
  preset: Values<typeof IntegrationPreset>,
): SaveIntegrationPreset => ({
  type: SAVE_INTEGRATION_PRESET,
  preset,
});

export const receiveIntegrationPreset = (
  preset: Values<typeof IntegrationPreset>,
): RecieveIntegrationPreset => ({
  type: RECEIVE_INTEGRATION_PRESET,
  preset,
});

export const getIntegrationPreset = (): GetIntegrationPreset => ({
  type: GET_INTEGRATION_PRESET,
});
