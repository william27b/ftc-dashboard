import { SetMotorAction, SET_MOTOR, SetControlAction, SET_CONTROL, IntegrationState } from '@/store/types';

const initialState: IntegrationState = {
  motorStates: {
    power: 0.0,
  },
  controlState: {
    controlType: 'robot',
  }
};

const integrationReducer = (
  state: IntegrationState = initialState,
  action:
    SetMotorAction |
    SetControlAction,
) => {
  switch (action.type) {
    case SET_MOTOR:
      return {
        ...state,
        motorStates: {
          power: action.power
        }
      };
    case SET_CONTROL:
      return {
        ...state,
        controlState: {
          controlType: action.controlType
        }
      };
    default:
      return state;
  }
};

export default integrationReducer;
