import Link from "next/link";
import { SiCoinmarketcap } from "react-icons/si";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto *:font-medium flex flex-col items-center gap-5">
        <SiCoinmarketcap className="text-9xl text-orange-500"/>
        <h2 className="text-2xl">Welcome to Marketplace!</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link href="/create-account" className="primary-btn text-lg py-1.5">
          Create Account
        </Link>
        <div className="flex gap-2">
          <span>Do you already have an account?</span>
          <Link href="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}