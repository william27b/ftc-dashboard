import { SetDataAction, SET_DATA, ReceiveDataAction, RECEIVE_DATA } from '@/store/types';
import { DataItem } from '../types/data';

export const setData = (data: DataItem[]): SetDataAction => ({
  type: SET_DATA,
  data: data,
});

export const receiveData = (data: DataItem[]): ReceiveDataAction => ({
  type: RECEIVE_DATA,
  data: data,
});