import "../styles/Home.module.css";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <Layout>
      <div className="text-blue-900 flex items-center justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>{" "}
        </h2>
        <div className="flex  gap-1 bg-gray-300 text-black rounded-lg overflow-hidden">
          <img
            src={session?.user?.image}
            alt="admin-image"
            className="w-6 h-6"
          />
          <div className="px-2">{session?.user?.name}</div>
        </div>
      </div>
    </Layout>
  );
}
