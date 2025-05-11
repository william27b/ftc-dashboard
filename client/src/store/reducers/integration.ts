import { SetMotorAction } from '@/store/types';

const integrationReducer = (
  state: any,
  action: SetMotorAction,
) => {
  switch (action.type) {
    case 'SET_MOTOR':
      return action;
    default:
      return {
        name: '',
        power: 0.0
      }
  }
};

export default integrationReducer;
