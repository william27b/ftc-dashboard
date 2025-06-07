import { Middleware } from 'redux';

import LayoutPreset, { LayoutPresetType } from '@/enums/LayoutPreset';
import { GET_INTEGRATION_PRESET, GET_LAYOUT_PRESET, SAVE_INTEGRATION_PRESET, SAVE_LAYOUT_PRESET } from '@/store/types';
import { receiveLayoutPreset, receiveIntegrationPreset } from '@/store/actions/settings';
import { RootState } from '@/store/reducers';
import { IntegrationPreset } from '@/enums/IntegrationType';
import { Values } from '@/typeHelpers';

const LAYOUT_PRESET_KEY = 'layoutPreset';
const INTEGRATION_PRESET_KEY = 'integrationPreset';

const storageMiddleware: Middleware<Record<string, unknown>, RootState> =
  (store) => (next) => (action) => {
    switch (action.type) {
      case GET_LAYOUT_PRESET: {
        const preset =
          localStorage.getItem(LAYOUT_PRESET_KEY) || LayoutPreset.DEFAULT;

        store.dispatch(receiveLayoutPreset(preset as LayoutPresetType));

        break;
      }
      case SAVE_LAYOUT_PRESET: {
        localStorage.setItem(LAYOUT_PRESET_KEY, action.preset);

        store.dispatch(receiveLayoutPreset(action.preset));

        break;
      }

      case GET_INTEGRATION_PRESET: {
        const preset =
          localStorage.getItem(INTEGRATION_PRESET_KEY) || IntegrationPreset.STRAFER;

        store.dispatch(receiveIntegrationPreset(preset as Values<typeof IntegrationPreset>));

        break;
      }
      case SAVE_INTEGRATION_PRESET: {
        localStorage.setItem(INTEGRATION_PRESET_KEY, action.preset);

        store.dispatch(receiveIntegrationPreset(action.preset));

        break;
      }
      default:
        next(action);

        break;
    }
  };

export default storageMiddleware;
