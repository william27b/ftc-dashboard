export const SET_MOTOR = 'SET_MOTOR';

export type SetMotorAction = {
  type: typeof SET_MOTOR,
  name: String,
  power: number;
};