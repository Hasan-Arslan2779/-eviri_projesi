import { configureStore } from "@reduxjs/toolkit";
import translateReducer from "../redux/translateSlice";

export default configureStore({ reducer: translateReducer });
