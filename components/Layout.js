import Head from "next/head";
import Image from "next/image";
import "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "../components/Nav";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const [show, setShow] = useState(false);
  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center justify-center">
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
    <div className="bg-bgGray min-h-screen">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShow(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>
        <div className="flex justify-center flex-grow mr-6">
          <Logo />
        </div>
      </div>
      <div className="bg-bgGray  flex">
        <Nav show={show} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
