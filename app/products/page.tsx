import Products from "./products";
import { cookies } from "next/headers";

export default async function Page() {
  const isLogin = await checkLogin();
  return (
    <>
      <Products />
    </>
  );
}

async function checkLogin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  return session;
}
