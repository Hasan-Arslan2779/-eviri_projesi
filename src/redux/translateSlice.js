import { createSlice } from "@reduxjs/toolkit";
import { getLanguages, getAnswer } from "./action";
const initialState = {
  languages: [],
  answer: "",
  isLoading: true,
  isError: false,
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  extraReducers: {
    // Veriyi bekleme durumu
    [getLanguages.pending]: (state) => {
      state.isLoading = true;
    },
    // verfi gelme durumu
    [getLanguages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.languages = action.payload;
    },
    // veri reddedilme durumu gelmeme durumu
    [getLanguages.rejected]: (state, action) => {
      state.isError = "Dilleri Alırken Hata Oluştu";
    },
    // Çeviri İsteklerini yönetme
    [getAnswer.pending]: (state) => {
      state.isLoading = true;
    },
    [getAnswer.fulfilled]: (state, action) => {
      (state.isLoading = false),
        (state.isError = true),
        (state.answer = action.payload);
    },
    [getAnswer.rejected]: (state) => {
      (state.isLoading = false), (state.isError = "Çevirirken bir hata oluştu");
    },
  },
  reducers: {
    clearAnswer: (state) => {
      state.answer = "";
    },
  },
});
export const { clearAnswer } = translateSlice.actions;
export default translateSlice.reducer;
