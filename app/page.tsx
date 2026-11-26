import { Toaster } from "react-hot-toast";
import LoginCard from "@/app/components/LoginCard";
import Decor from "@/app/components/Decor";
import Features from "@/app/components/Features";

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[url('/BG.png')] bg-cover bg-center bg-no-repeat px-4 py-7">
      <Toaster position="top-center" />
      <img
        src="/Rectangle.png"
        alt="myTutorHub"
        className="relative z-10 w-[220px] md:w-[320px]"
      />

      <Decor />
      <LoginCard />
      <Features />
    </main>
  );
}
