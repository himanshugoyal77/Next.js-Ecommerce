import Head from "next/head";
import Image from "next/image";
import "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "../components/Nav";

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center justify-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}
