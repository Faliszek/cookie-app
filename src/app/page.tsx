import { Suspense } from "react";
import CookieComponent from "./CookieComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col h-screen w-screen">
      <Suspense>
        <CookieComponent />
      </Suspense>
    </main>
  );
}
