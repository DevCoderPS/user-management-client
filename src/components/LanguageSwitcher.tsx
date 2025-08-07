import type React from "react";
import { Button } from "./Button";
import { useLanguage } from "../store/i18nStore";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={() => setLanguage("en")}
        className={`${
          language === "en"
            ? ""
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
        }`}
      >
        EN
      </Button>
      <Button
        onClick={() => setLanguage("mm")}
        className={`${
          language === "mm"
            ? ""
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
        }`}
      >
        MM
      </Button>
    </div>
  );
};
export default LanguageSwitcher;
