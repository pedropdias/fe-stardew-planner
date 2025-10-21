import {formatDayWithSuffix} from "@/utils/dayFormatter";
import {useAppContextProvider} from "@/providers/AppContextProvider";
import {SaveType} from "@/types/saveType";

export default function SaveCard({data}: { data: SaveType }) {
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

  const dayFormatted = formatDayWithSuffix(day);

  const {t} = useAppContextProvider();

  return (
    <div
      className={"flex flex-col justify-between min-w-[260px] min-h-[160px] max-h-[160px] bg-transparent px-[16px] pb-[20px] pt-[14px] gap-[20px] shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] text-[#000] transition-transform duration-200 hover:scale-105 hover:brightness-110"}
      style={{
        backgroundImage: "url('/default-card-large.png')",
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        textShadow: "1px 1px 0px rgba(135,52,0,0.6)"
      }}
    >
      <div className={"flex flex-col gap-[4px]"}>
        <h2 className={"font-[100] text-[1.5rem]"}>{farmName}</h2>
        <p className={"text-[1rem]"}>{t("saves.saveCard.farmer", {playerName})}</p>
      </div>
      <div className={"flex flex-col text-[1rem]"}>
        <p>{t("saves.saveCard.money", {money: formattedMoney})}</p>
        <p>{seasonFormatted}, {dayFormatted}, {year}</p>
      </div>
    </div>
  )
}