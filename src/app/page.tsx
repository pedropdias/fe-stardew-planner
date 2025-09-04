"use client"

import {useAppContextProvider} from "@/providers/AppContextProvider";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
  const { user, authLoading, signInWithGoogle, signOut } = useAppContextProvider()
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  if (authLoading) return <p>Loading...</p>;

  return (
    <div className="font-sans flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 w-[100vw] h-[100vh]">
      <h1 className={"text-[2rem] text-gray-400 bg-white p-[48px] rounded-[48px] h-fit select-none cursor-pointer shadow-[0_0px_32px_rgba(0,0,0,0.2)]"}>Stardew Planner</h1>
      {user ? (
        <>
          <p>Olá, {user.user_metadata.full_name}</p>
          <button onClick={signOut}>Sair</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Entrar com Google</button>
      )}
    </div>
  );
}
