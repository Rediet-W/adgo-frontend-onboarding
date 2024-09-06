import "./App.css";
import { Trans, useTranslation } from "react-i18next";
import LanguageSelector from "./components/languageSelector";

function App() {
  const { t } = useTranslation();
  const { line1, line2 } = t("description");
  return (
    <div className="big">
      <div className="container">
        <LanguageSelector />
        <h1>{t("greeting")}</h1>
        <span>
          <Trans
            i18nKey="description.line1"
            values={{ same: "RoadsideCoder" }}
            components={{ 1: <b /> }}
          />
        </span>
        <p>{line2}</p>
      </div>
    </div>
  );
}

export default App;
