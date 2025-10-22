import {useAppContextProvider} from "@/providers/AppContextProvider";
import Header from "@/components/header/header";
import ConfigFileDownloadButton from "@/components/configFileDownloadButton/configFileDownloadButton";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import CreateDemoSaveButton from "@/components/createDemoSaveButton/createDemoSaveButton";

export default function SavesPageFallback() {
  const { t, user, authLoading } = useAppContextProvider();
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login")
    }
  }, [authLoading, user, router]);

  if (!user) {
    setButtonDisabled(true);
    return null;
  };

  return (
    <div
      className="min-h-[100vh] bg-cover bg-center flex flex-col items-center gap-[8vh] select-none text-[#FFF] pb-[120px]"
      style={{backgroundImage: "url('/sky-wallpaper-blur.png')"}}>
      <Header/>
      <h1 className={"font-stardewMain font-[100] text-[2.2rem] sm:text-[2.5rem] md:text-[3rem] text-center px-[48px] mb-[24px]"}>{t("savesFallback.title")}</h1>
      <div className={"flex flex-col items-center justify-center sm:w-[80vw] md:w-[60vw] lg:w-[45vw] max-w-[1000px] gap-[4px] font-stardewSimple text-[1.2rem] sm:text-[1.5rem] sm:px-[72px] text-center bg-[#00000022] rounded-[24px] pt-[36px] pb-[10px]"}>
        <p className={"px-[48px] sm:p-0"}>{t("savesFallback.text1")}</p>
        <ConfigFileDownloadButton userId={user.id} email={user.email!} disabled={buttonDisabled} />
        <p className={"px-[48px] sm:p-0"}>{t("savesFallback.text2")}</p>
        <p className={"px-[48px] sm:p-0"}>{t("savesFallback.text3")}</p>
        <p className={"px-[48px] sm:p-0"}>{t("savesFallback.text4")}</p>
        <div className={"flex w-[20vw] h-[3px] bg-[#FFF] my-[48px]"}></div>
        <div className={"flex flex-col items-center justify-center gap-[12px]"}>
          <p className={"px-[48px] sm:p-0"}>{t("savesFallback.text5")}</p>
          <p className={"px-[48px] sm:p-0"}>{t("savesFallback.text6")}</p>
          <p className={"px-[48px] sm:p-0"}>{t("savesFallback.text7")}</p>
          <CreateDemoSaveButton userId={user.id} email={user.email!} disabled={buttonDisabled} />
        </div>
      </div>
    </div>
  )
}