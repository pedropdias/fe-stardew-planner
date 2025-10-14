import {useAppContextProvider} from "@/providers/AppContextProvider";
import Header from "@/components/header/header";
import ConfigFileDownloadButton from "@/components/configFileDownloadButton/configFileDownloadButton";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function SavesPageFallback() {
  const { t, user, authLoading } = useAppContextProvider();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login")
    }
  }, [authLoading, user, router]);

  if (!user) return null;

  return (
    <div
      className="min-h-[100vh] bg-cover bg-center flex flex-col items-center gap-[14vh] select-none text-[#FFF]"
      style={{backgroundImage: "url('/sky-wallpaper-blur.png')"}}>
      <Header/>
      <h1 className={"font-stardewMain font-[100] text-[3rem]"}>{t("savesFallback.title")}</h1>
      <div className={"flex flex-col items-center justify-center gap-[4px] font-stardewSimple text-[1.5rem]"}>
        <p>{t("savesFallback.text1")}</p>
        <ConfigFileDownloadButton userId={user.id} email={user.email!} />
        <p>{t("savesFallback.text2")}</p>
        <p>{t("savesFallback.text3")}</p>
        <p>{t("savesFallback.text4")}</p>
      </div>
    </div>
  )
}