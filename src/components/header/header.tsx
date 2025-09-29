import {useAppContextProvider} from "@/providers/AppContextProvider";

export default function Header() {
  const { locale, setLocale } = useAppContextProvider();

  return (
    <div className="flex justify-between w-full pt-[24px] px-[24px]">
      <h1 className={"font-stardewMain text-[#FFF] text-[2.2rem] font-[100] "}>Stardew Planner</h1>
      <button
        className={"p-[10px] rounded-[12px] font-stardewSimple bg-[rgba(255,255,255,0.25)] text-[#FFF] cursor-pointer"}
        onClick={() => setLocale(locale === "pt-BR" ? "en-US" : "pt-BR")}
      >
        {locale === "pt-BR" ? "EN-US" : "PT-BR"}
      </button>
    </div>
  )
}