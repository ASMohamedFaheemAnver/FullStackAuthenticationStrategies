import {SliceNames} from '@constants/strings';
import {createSlice} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: SliceNames.counter,
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state, action) => {
      console.log({action});
      state.count += 1;
    },
    decrement: state => {
      state.count -= 1;
    },
  },
});

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export default counterSlice.reducer;
