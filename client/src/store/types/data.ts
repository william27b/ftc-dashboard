
export const Colors = {
    'POSITIVE': 'text-green-400',
    'NEGATIVE': 'text-red-400',
    'INFO': 'text-blue-400',
    'NEUTRAL': '',
}

type Numerical = {
    type: 'NUMERICAL',
    color: 'POSITIVE' | 'NEGATIVE' | 'INFO' | 'NEUTRAL' | undefined,

    id: String,

    caption: String,
    value: Number,
    unit: String | undefined,
}

type Qualitative = {
    type: 'QUALITATIVE',
    color: 'POSITIVE' | 'NEGATIVE' | 'INFO' | 'NEUTRAL' | undefined,

    id: String,

    caption: String,
    value: String,
}

type NumericalSelection = {
    type: 'NUMERICAL_SELECTION',
    color: 'POSITIVE' | 'NEGATIVE' | 'INFO' | 'NEUTRAL' | undefined,

    id: String,

    caption: String,
    value: Number,
    unit: String | undefined,

    min: Number | undefined,
    max: Number | undefined,
}

type NumericalRange = {
    type: 'NUMERICAL_RANGE',
    color: 'POSITIVE' | 'NEGATIVE' | 'INFO' | 'NEUTRAL' | undefined,

    id: String,

    caption: String,
    value: Number,
    unit: String | undefined,

    min: Number,
    max: Number,
}

type QualitativeSelection = {
    type: 'QUALITATIVE_SELECTION',
    color: 'POSITIVE' | 'NEGATIVE' | 'INFO' | 'NEUTRAL' | undefined,

    id: String,
    
    caption: String,
    value: String,

    options: String[] | undefined,
}

export type DataItem = 
    Numerical |
    Qualitative |
    NumericalSelection |
    NumericalRange |
    QualitativeSelection;


export type DataState = DataItem[];



export const SET_DATA = 'SET_DATA';

export type SetDataAction = {
  type: typeof SET_DATA;
  data: DataState
};



export const RECEIVE_DATA = 'RECEIVE_DATA';

export type ReceiveDataAction = {
  type: typeof RECEIVE_DATA;
  data: DataState;
}