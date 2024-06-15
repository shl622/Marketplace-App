import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto *:font-medium flex flex-col items-center">
        <span className="text-9xl">🍊</span>
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
        <div className="flex gap-2">
          <Link href="/guest">
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  );
}