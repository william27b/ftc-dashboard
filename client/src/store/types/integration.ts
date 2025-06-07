// Integration State
export type IntegrationState = {
  motorStates: MotorStates;
  controlState: ControlState;
}



export const SET_MOTOR = 'SET_MOTOR';

export type MotorStates = {
  power: number;
}

export type SetMotorAction = {
  type: typeof SET_MOTOR;
  name: String;
  power: number;
};



export const SET_CONTROL = 'SET_CONTROL_TYPE';

export type ControlState = {
  controlType: String;
}

export type SetControlAction = {
  type: typeof SET_CONTROL;
  controlType: String;
}