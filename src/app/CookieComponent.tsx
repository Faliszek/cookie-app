"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const COOKIE_KEY = "myCookie";

enum CookiePersistance {
  Persisted = "Persisted",
  NotPersisted = "NotPersisted",
}
const CookieComponent = () => {
  const [cookieValue, setCookieValue] = useState<CookiePersistance | null>(
    null
  );

  const handleButtonClick = () => {
    const newValue =
      cookieValue === CookiePersistance.Persisted
        ? CookiePersistance.NotPersisted
        : CookiePersistance.Persisted;

    Cookies.set(COOKIE_KEY, newValue, {
      expires: 7,
      sameSite: "Strict",
      secure: true,
    });
    setCookieValue(newValue);
  };

  useEffect(() => {
    const currentCookie = Cookies.get(COOKIE_KEY) as CookiePersistance;
    window.postMessage({ currentCookie });
    setCookieValue(currentCookie ?? null);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen gap-8">
      <h1 className="text-center text-xl font-medium">
        This app persist cookie once you click a button (1.0.6)
      </h1>
      <div className="font-light">
        <strong>Cookie: </strong> {cookieValue}
      </div>

      <div className="min-h-12">
        <button
          onClick={handleButtonClick}
          className={`rounded-lg min-w-32 ${
            cookieValue === CookiePersistance.Persisted
              ? "bg-red-500"
              : "bg-green-500"
          } px-4 py-2 transition-all duration-200 ease-linear text-white`}
        >
          {cookieValue === CookiePersistance.Persisted ? "Remove" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CookieComponent;
