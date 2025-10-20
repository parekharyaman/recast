import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { BACKEND_URL } from "./constants";
import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/user`, {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setUser(data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
