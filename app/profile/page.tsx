import Profile from "./profile";

export default function Page() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };
  return <Profile userInfo={user} />;
}
