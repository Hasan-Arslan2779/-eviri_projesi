import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswer, getLanguages } from "../redux/action";
import { clearAnswer } from "../redux/translateSlice";
import Select from "react-select";
const Main_Page = ({}) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const areaRef = useRef();
  const store = useSelector((store) => store);
  // Uygulama Başladığı anda dilleri çeker
  useEffect(() => {
    dispatch(getLanguages());
  }, []);
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });
  // Stateler arasında veri değişimi  çeker

  const handleClick = () => {
    // State'deki cevabı silme
    dispatch(clearAnswer());
    // İlk area Temizlenir
    areaRef.current.value = "";

    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };
  return (
    <>
      <h1>Çeviri +++</h1>
      <div className="container">
        <div className="left">
          <Select
            value={sourceLang}
            isLoading={store.isLoading}
            isDisabled={store.isLoading}
            onChange={(e) => setSourceLang(e)}
            options={store.languages}
          />
          <textarea
            ref={areaRef}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <button onClick={handleClick} className="change-btn">
          Değiş
        </button>
        <div className="right">
          <Select
            isLoading={store.isLoading}
            isDisabled={store.isLoading}
            value={targetLang}
            onChange={(e) => setTargetLang(e)}
            options={store.languages}
          />
          <textarea disabled value={store.answer}></textarea>
        </div>
      </div>
      <button
        onClick={() => dispatch(getAnswer({ text, sourceLang, targetLang }))}
        className="translate-btn"
      >
        Çevir
      </button>
    </>
  );
};

export default Main_Page;
