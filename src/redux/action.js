import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../helpers/constant";
// Dillerin verisini Çeker
export const getLanguages = createAsyncThunk(
  "translate/getLanguages",
  async () => {
    // Asenkron İşlemler
    const res = await axios.get(
      "https://text-translator2.p.rapidapi.com/getLanguages",
      options
    );
    const languages = res.data.data.languages;

    const newLanguages = languages.map((lang) => ({
      value: lang.code,
      label: lang.name,
    }));

    //   Store gönderilecek değeri return edilir
    return newLanguages;
  }
);

// Çeviri Yapar

export const getAnswer = createAsyncThunk(
  "translate/getAnswer",
  async (props) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", props.sourceLang.value);
    encodedParams.set("target_language", props.targetLang.value);
    encodedParams.set("text", props.text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "446af5c39fmsh8bdd4b925ca3f32p194697jsn9467629ea658",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };
    // isteği yapma
    const res = await axios.request(options);
    // çevrilmiş yazıya erişme
    const answer = res.data.data.translatedText;
    // veriye slice'ta erişebilmek için return ediyoruz
    return answer;
  }
);
