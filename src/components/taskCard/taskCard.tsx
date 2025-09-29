import {formatDayWithSuffix} from "@/utils/dayFormatter";
import {useAppContextProvider} from "@/providers/AppContextProvider";

export default function TaskCard({data}: {data: any}) {
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
    <div className={"flex flex-col justify-between w-[250px] h-[160px] bg-[var(--card-background)] rounded-[10px] p-[16px] gap-[26px] shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-200 hover:scale-103"}>

    </div>
  )
}