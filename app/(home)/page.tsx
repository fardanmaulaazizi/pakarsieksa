import { cookies } from "next/headers";
import Home from "./home";

export default async function Page() {
  return <Home isLogin={true} />;
}

