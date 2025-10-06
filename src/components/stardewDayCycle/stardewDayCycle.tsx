import {useAppContextProvider} from "@/providers/AppContextProvider";
import {SaveType} from "@/types/saveType";

interface StardewDayCycleProps {
  save: SaveType;
}

export default function StardewDayCycle({save}: StardewDayCycleProps) {
  const { locale } = useAppContextProvider();
  const year = save.save_data?.SaveGame?.year;
  const season = save.save_data?.SaveGame?.currentSeason as string;
  const seasonFormatted = season
    ? season.charAt(0).toUpperCase() + season.slice(1)
    : undefined;
  const day = Number(save.save_data?.SaveGame?.dayOfMonth);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDaysPT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const dayOfWeekIndex = (day - 1) % 7;

  return (
    <div
      className={"bg-transparent min-w-[312px] max-w-[312px] min-h-[260px] max-h-[260px] relative"}
      style={{
        backgroundImage: "url('/stardew-day-cicle.png')",
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <p
        className={"absolute right-[60px] bottom-[200px] font-stardewSimple text-[2em]"}
        style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.45)" }}
      >
        <>
          {locale === "pt-BR" ? weekDaysPT[dayOfWeekIndex] : weekDays[dayOfWeekIndex]}
          &nbsp;&nbsp;
          {day}
        </>
      </p>
      <div className={"absolute right-[28px] bottom-[104px] w-[165px] h-[32px] flex justify-center items-center"}>
        <p
          className={" font-stardewSimple text-[1.4em]"}
          style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.45)" }}
        >
          {seasonFormatted}, Year {year}
        </p>
      </div>
      <p
        className={"absolute right-[28px] bottom-[6px] font-stardewMain tracking-[6.2px] text-[3em] font-[600] text-[var(--primary-red)]"}
      >
        {save.save_data?.SaveGame?.player?.money}
      </p>
    </div>
  )
}