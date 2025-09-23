"use client"

import {useAppContextProvider} from "@/providers/AppContextProvider";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {DragAndDropContainer} from "@/components/dragAndDropContainer/dragAndDropContainer";
import {useFetch} from "@/hooks/useFetch";
import {getSaves} from "@/api/services/SaveService";
import Header from "@/components/header/header";

export default function Home() {
  const {user, authLoading, signInWithGoogle, signOut} = useAppContextProvider()
  const router = useRouter();
  const [saves, setSaves] = useState<any>([]);

  const {
    execute: executeGetSaves,
    loading: getSavesLoading,
    error: getSavesError,
  } = useFetch(getSaves);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login")
    } else {
      router.replace("/saves");
    }
  }, [authLoading, user, router]);

  if (authLoading) return <p>Loading...</p>;


  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center flex flex-col items-center gap-[34vh] select-none"
      style={{backgroundImage: "url('/sky-wallpaper-blur.png')"}}>
      <Header />
      {user && (
        <div className={"flex justify-center items-center gap-[32px] h-[100%] font-stardewSimple"}>
          <p className={"text-[#FFF] text-[1.2rem]"}>Olá, {user.user_metadata.full_name}</p>
          <button onClick={signOut} className={"py-[24px] px-[48px] rounded-[20px] text-[1.2rem] cursor-pointer font-stardewSimple text-[#FFF] bg-[rgba(0,0,0,0.15)] shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-200 hover:scale-103"}>Sair
          </button>
        </div>
      )}
    </div>
  );
}
