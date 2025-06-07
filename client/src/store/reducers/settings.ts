import { IntegrationPreset } from '@/enums/IntegrationType';
import {
  SettingState,
  ReceiveLayoutPresetAction,
  RECEIVE_LAYOUT_PRESET,

  RECEIVE_INTEGRATION_PRESET,
  RecieveIntegrationPreset,
} from '@/store/types';

const initialState: SettingState = {
  // TODO: this seems to be necessary to prevent
  // ReferenceError: can't access lexical declaration 'LayoutPreset' before initialization
  // perhaps due to the root reducer type shenanigans?
  layoutPreset: 'DEFAULT',
  integrationPreset: 'STRAFER'
};

const settingsReducer = (
  state: SettingState = initialState,
  action: ReceiveLayoutPresetAction | RecieveIntegrationPreset,
) => {
  switch (action.type) {
    case RECEIVE_LAYOUT_PRESET:
      return {
        ...state,
        layoutPreset: action.preset,
      };
    case RECEIVE_INTEGRATION_PRESET:
      return {
        ...state,
        integrationPreset: action.preset,
      };
    default:
      return state;
  }
};

export default settingsReducer;
