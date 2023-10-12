import {Languages, SliceNames} from '@constants/strings';
import {createSlice} from '@reduxjs/toolkit';

export const applicationSlice = createSlice({
  name: SliceNames.application,
  initialState: {
    language: Languages.english,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action?.payload;
    },
  },
});

export const {changeLanguage} = applicationSlice.actions;

export default applicationSlice.reducer;
