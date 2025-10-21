import React from "react";
import JSZip from "jszip";
import {useAppContextProvider} from "@/providers/AppContextProvider";

interface DownloadModButtonProps {
  userId: string,
  email: string,
}

export default function DownloadModButton({ userId, email }: DownloadModButtonProps) {
  const { t } = useAppContextProvider();

  const handleDownload = async () => {

    const response = await fetch("/docs/SaveMod.zip");
    const arrayBuffer = await response.arrayBuffer();

    const zip = await JSZip.loadAsync(arrayBuffer);

    const userConfig = {
      userId,
      email,
    };
    const jsonString = JSON.stringify(userConfig, null, 2);

    zip.file("SaveMod/StardewPlannerUserConfig.json", jsonString);

    const newZipBlob = await zip.generateAsync({ type: "blob" });

    const url = URL.createObjectURL(newZipBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "StardewPlannerSaveMod.zip";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex justify-between items-center bg-transparent px-[24px] py-[16px] my-[32px] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer text-[2rem] font-stardewMain shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-50 hover:scale-105 hover:brightness-110 no-underline text-[var(--primary-dark-text)]"
      style={{
        backgroundImage: "url('/default-button-extra-large.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        textShadow: "2px 2px 0px rgba(135,52,0,0.5)",
      }}
    >
      {t("savesFallback.buttonText")}
    </button>
  );
}