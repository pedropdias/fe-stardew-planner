import {useAppContextProvider} from "@/providers/AppContextProvider";
import Header from "@/components/header/header";

export default function SavesPageFallback() {
  const { t } = useAppContextProvider();

  return (
    <div
      className="min-h-[100vh] bg-cover bg-center flex flex-col items-center gap-[14vh] select-none text-[#FFF]"
      style={{backgroundImage: "url('/sky-wallpaper-blur.png')"}}>
      <Header/>
      <h1 className={"font-stardewMain font-[100] text-[3rem]"}>{t("savesFallback.title")}</h1>
      <div className={"flex flex-col items-center justify-center gap-[4px] font-stardewSimple text-[1.5rem]"}>
        <p>{t("savesFallback.text1")}</p>
        <button
          className={"flex justify-between items-center bg-transparent px-[24px] py-[16px] my-[32px] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer text-[1.5rem] font-stardewMain text-[2rem] shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-50 hover:scale-103 hover:brightness-120"}
          style={{
            backgroundImage: "url('/default-button-extra-large.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            textShadow: "2px 2px 0px rgba(135,52,0,0.5)"
          }}
        >
          {t("savesFallback.buttonText")}
        </button>
        <p>{t("savesFallback.text2")}</p>
        <p>{t("savesFallback.text3")}</p>
        <p>{t("savesFallback.text4")}</p>
      </div>
    </div>
  )
}