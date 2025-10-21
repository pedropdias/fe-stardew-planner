"use client"

import {useAppContextProvider} from "@/providers/AppContextProvider";
import Image from "next/image";

export default function LoginPage() {
  const { authLoading, signInWithGoogle, setLocale, locale, t } = useAppContextProvider()

  if (authLoading) return <p>Loading...</p>

  return (
    <div className="min-h-[100vh] max-w-[100vw] overflow-x-hidden bg-cover bg-center flex flex-col items-center justify-start gap-[10vh] select-none" style={{ backgroundImage: "url('/sky-wallpaper-blur.png')" }}>
      <div className="flex justify-end w-full px-[16px] mt-[16px]">
        <button
          className={"text-[0.8rem] sm:text-[1rem] p-[10px] rounded-[12px] font-stardewSimple bg-[rgba(255,255,255,0.25)] text-[#FFF] cursor-pointer"}
          onClick={() => setLocale(locale === "pt-BR" ? "en-US" : "pt-BR")}
        >
          {locale === "pt-BR" ? "PT-BR" : "EN-US"}
        </button>
      </div>
      <Image
        src={"/stardew-planner-logo.png"}
        alt={"stardew-planner-logo"}
        width={931}
        height={450}
        className={"max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] xl:w-[40%] xl:max-w-[40%] 2xl:max-w-[800px] mt-[7vh]"}
      />
      <div className="flex flex-col items-center justify-center gap-[24px] ">
        <button
          className={"flex justify-between items-center bg-[#FFF] text-[#838383] text-[1.5rem] rounded-full w-fit h-[60px] sm:h-[74px] cursor-pointer pl-[16px] pr-[24px] gap-[24px] transform transition-transform duration-200 ease-in-out hover:scale-105 shadow-[2px_2px_20px_rgba(0,0,0,0.2)]" +
            "w-[100px] sm:w-auto"}
          onClick={signInWithGoogle}>
          <Image
            src={"/google-logo.png"}
            alt={"google-logo"}
            width={40}
            height={41}
            className={"max-w-[30px] sm:max-w-none"}
          />
          <p className={"font-outfit text-[1.2rem] sm:text-[1.5rem]"}>{t("login.googleButton")}</p>
        </button>
        <Image
          src={"/starfruit.png"}
          alt={"starfruit"}
          width={110}
          height={110}
          className={"max-w-[84px] sm:max-w-none"}
        />
      </div>
    </div>
  );
}