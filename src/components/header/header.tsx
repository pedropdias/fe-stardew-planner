import {useAppContextProvider} from "@/providers/AppContextProvider";
import Image from "next/image";

export default function Header() {
  const { locale, setLocale, signOut, isMobile } = useAppContextProvider();

  return (
    <div className="flex justify-between w-full pt-[24px] px-[24px]">
      <h1 className={"font-stardewMain text-[#FFF] text-[2.2rem] font-[100] "}>Stardew Planner</h1>
      <div className={`flex ${isMobile && "flex-col"} justify-between gap-[16px] h-[36px]`}>
        <button
          className={"h-[36px] p-[10px] rounded-[12px] font-stardewSimple bg-[rgba(255,255,255,0.25)] text-[#FFF] text-[0.85rem] cursor-pointer transition-transform hover:scale-103"}
          onClick={() => setLocale(locale === "pt-BR" ? "en-US" : "pt-BR")}
        >
          {locale === "pt-BR" ? "PT-BR" : "EN-US"}
        </button>
        <button onClick={signOut} className={"cursor-pointer mb-[100px] bg-transparent shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-50 hover:scale-[1.03] hover:brightness-125"}>
          <Image src="/exit-button.png" alt="exit-button" width={60} height={36}/>
        </button>
      </div>
    </div>
  )
}