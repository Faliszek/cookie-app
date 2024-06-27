"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const COOKIE_KEY = "myCookie";

type CookiePersistance = "persisted" | "not-persisted";
export const NoSsr = () => {
  const [cookieValue, setCookieValue] =
    useState<CookiePersistance>("not-persisted");

  const handleButtonClick = () => {
    const newValue =
      cookieValue === "persisted" ? "not-persisted" : "persisted";
    Cookies.set(COOKIE_KEY, newValue, { expires: 7 });
    setCookieValue(newValue);
  };

  useEffect(() => {
    setCookieValue(
      (Cookies.get(COOKIE_KEY) as CookiePersistance) ?? "not-persisted"
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen gap-8">
      <h1 className="text-center text-xl font-medium">
        This app persist cookie once you click a button (1.0.1)
      </h1>
      <div className="font-light">
        <strong>Cookie: </strong> {cookieValue}
      </div>

      <button
        onClick={handleButtonClick}
        className={`rounded-lg min-w-32 ${
          cookieValue === "persisted" ? "bg-red-500" : "bg-green-500"
        } px-4 py-2 transition-all duration-200 ease-linear text-white`}
      >
        {cookieValue === "persisted" ? "Remove" : "Save"}
      </button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
