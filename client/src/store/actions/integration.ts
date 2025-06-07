import { SetMotorAction, SET_MOTOR, SetControlAction, SET_CONTROL } from '@/store/types';

export const setMotor = (name: String, power: number): SetMotorAction => ({
  type: SET_MOTOR,
  name: name,
  power: power,
});

export const setControl = (controlType: String): SetControlAction => ({
  type: SET_CONTROL,
  controlType: controlType,
});