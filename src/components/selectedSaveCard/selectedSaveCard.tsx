import {formatDayWithSuffix} from "@/utils/dayFormatter";
import {useAppContextProvider} from "@/providers/AppContextProvider";

export default function SelectedSaveCard({ data }: any) {
  console.log("Save Data Selected Card Component:", data);
  const farmName = data?.save_data?.SaveGame?.player?.farmName;
  const playerName = data?.save_data?.SaveGame?.player?.name;
  const money = Number(data?.save_data?.SaveGame?.player?.money);
  const formattedMoney = money.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const year = data?.save_data?.SaveGame?.year;
  const season = data?.save_data?.SaveGame?.currentSeason;
  const seasonFormatted = season
    ? season.charAt(0).toUpperCase() + season.slice(1)
    : undefined;

  const day = Number(data?.save_data?.SaveGame?.dayOfMonth);
  const dayFormatted = formatDayWithSuffix(day);

  const { t } = useAppContextProvider();

  return (
    <div className={"flex flex-col justify-between h-[612px] w-[434px] bg-[var(--card-background)] rounded-[10px] p-[32px] shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] font-stardewSimple text-[1.6rem]"}>
      <h2 className={"font-[400]"}>{farmName}</h2>
      <div className={"flex flex-col gap-[16px]"}>
        <p>{t("saves.selectedCard.season", { season: seasonFormatted})}</p>
        <p>{t("saves.selectedCard.day", { day: dayFormatted})}</p>
        <p>{t("saves.selectedCard.year", { year})}</p>
      </div>
      <div className={"flex flex-col gap-[16px]"}>
        <p>{t("saves.selectedCard.pendingTasks", {})}</p>
        <p>{t("saves.selectedCard.money", { money: formattedMoney})}</p>
      </div>
      <div className={"w-full flex justify-end"}>
        <button className={"w-[160px] h-[60px] bg-[var(--card-background-2)] font-stardewSimple text-[1.6rem] border-[4px] border-[var(--card-background-3)] cursor-pointer transition-transform duration-150 hover:scale-102"}>
          {t("saves.selectedCard.button")}
        </button>
      </div>
    </div>
  )
}