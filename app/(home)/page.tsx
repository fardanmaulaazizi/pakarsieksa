import { cookies } from "next/headers";
import Home from "./home";

export default async function Page() {
  const isLogin = await checkLogin();
  return <Home isLogin={true} />;
}

async function checkLogin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  return session;
}
