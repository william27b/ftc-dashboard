import { SetDataAction, SET_DATA, ReceiveDataAction, RECEIVE_DATA, DataState } from '@/store/types';

const initialState: DataState = [];

const dataReducer = (
  state: DataState = initialState,
  action:
    SetDataAction |
    ReceiveDataAction,
) => {
  switch (action.type) {
    case SET_DATA: {
      state = action.data;

      return action.data;
    }
    case RECEIVE_DATA:
      return action.data;
    default:
      return state;
  }
};

export default dataReducer;
