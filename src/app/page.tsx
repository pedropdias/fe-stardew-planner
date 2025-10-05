"use client"

import {useAppContextProvider} from "@/providers/AppContextProvider";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useFetch} from "@/hooks/useFetch";
import {getSaves} from "@/api/services/SaveService";
import Header from "@/components/header/header";

export default function Home() {
  const {user, authLoading, signOut, saves, fetchSaves} = useAppContextProvider()
  const router = useRouter();

  const {
    execute: executeGetSaves,
    loading: loadingGetSaves,
    error: errorGetSaves
  } = useFetch(getSaves)

  useEffect(() => {
    console.log("loadingGetSaves", loadingGetSaves)
  }, [loadingGetSaves]);

  useEffect(() => {
    if (!user) return;
    fetchSaves(user.id);
  }, [executeGetSaves, user]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login")
      return;
    } else {
      if (!loadingGetSaves) {
        router.replace("/saves")
      }
      return;
    }
  }, [authLoading, user, router, saves]);

  if (authLoading) return <p>Loading...</p>;


  return (
    <>
      {loadingGetSaves && (
        <>
          <div className="w-[100vw] h-[100vh] fixed flex justify-center items-center inset-0 bg-[#000000B3] backdrop-blur-sm z-[999] transition-transform"
               style={{ backdropFilter: "blur(3px)" }}
          >
            <span className={"absolute w-[100px] h-[100px] border-2 border-[#FFF] border-t-transparent rounded-full animate-spin"}></span>
          </div>
        </>
      )}
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
    </>
  );
}
