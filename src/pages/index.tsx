import Image from "next/image";
import { Inter } from "next/font/google";
import Siderbar from "@/components/navigation/Siderbar";
import Header from "@/components/navigation/Header";
import Feed from "@/components/content/Feed";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen  bg-background">
      <Header />
      <div className="h-full flex">
        <Siderbar />
        <Feed />
      </div>
    </main>
  );
}
