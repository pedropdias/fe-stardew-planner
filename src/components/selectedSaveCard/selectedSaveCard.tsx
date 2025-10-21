'use client'

import {formatDayWithSuffix} from "@/utils/dayFormatter";
import {useAppContextProvider} from "@/providers/AppContextProvider";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {SaveType} from "@/types/saveType";

interface SelectedSaveCardProps {
  data: SaveType;
  setShowModal: (showModal: boolean) => void;
}

export default function SelectedSaveCard({data, setShowModal}: SelectedSaveCardProps) {
  // console.log("Save Data Selected Card Component:", data);
  const farmName = data?.save_data?.SaveGame?.player?.farmName;
  const playerName = data?.save_data?.SaveGame?.player?.name;
  const money = Number(data?.save_data?.SaveGame?.player?.money);
  const formattedMoney = money.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const year = data?.save_data?.SaveGame?.year;
  const season = data?.save_data?.SaveGame?.currentSeason as string;
  const seasonFormatted = season
    ? season.charAt(0).toUpperCase() + season.slice(1)
    : undefined;

  const day = Number(data?.save_data?.SaveGame?.dayOfMonth);
  const dayFormatted = formatDayWithSuffix(day) || "";

  const { t } = useAppContextProvider();

  const router = useRouter();

  return (
    <div
      className={"flex flex-col justify-between h-[612px] w-[434px] bg-transparent text-[#000] p-[32px] shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] font-stardewSimple text-[1.5rem]"}
      style={{
        backgroundImage: "url('/default-selected-card.png')",
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        textShadow: "2px 2px 0px rgba(135,52,0,0.5)"
      }}
    >
      <div className={"flex justify-between w-full"}>
        <h2 className={"font-[400] text-[2.8rem]"}>{farmName}</h2>
        <div className={"cursor-pointer transition-transform duration-50 hover:scale-[1.03]"} onClick={() => setShowModal(true)}>
          <Image src="/delete-button.png" alt="delete-button" width={36} height={36}/>
        </div>
      </div>
      <div className={"flex flex-col gap-[16px]"}>
        <p>{t("saves.selectedCard.farmer", {farmer: playerName})}</p>
      </div>
      <div className={"flex flex-col gap-[16px]"}>
        <p>{t("saves.selectedCard.season", {season: seasonFormatted || ""})}</p>
        <p>{t("saves.selectedCard.day", {day: dayFormatted})}</p>
        <p>{t("saves.selectedCard.year", {year})}</p>
      </div>
      <div className={"flex flex-col gap-[16px]"}>
        <p>{t("saves.selectedCard.pendingTasks", {})}</p>
        <p>{t("saves.selectedCard.money", {money: formattedMoney})}</p>
      </div>
      <div className={"w-full flex justify-end"}>
        <button
          className={"w-[180px] h-[80px] bg-transparent font-stardewSimple text-[1.6rem] cursor-pointer shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-50 hover:scale-[1.02] hover:brightness-[1.15]"}
          onClick={() => router.replace(`/saves/${data?.game_save_id}`)}
          style={{
            backgroundImage: "url('/default-button-large.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <span style={{ textShadow: "2px 2px 0px rgba(135,52,0,0.55)" }}>{t("saves.selectedCard.button")}</span>
        </button>
      </div>
    </div>
  )
}