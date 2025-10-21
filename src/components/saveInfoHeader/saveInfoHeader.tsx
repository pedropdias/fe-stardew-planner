import {SaveType} from "@/types/saveType";
import StardewDayCycle from "@/components/stardewDayCycle/stardewDayCycle";
import {useAppContextProvider} from "@/providers/AppContextProvider";

interface SaveInfoHeaderProps {
  save: SaveType;
}

export default function SaveInfoHeader({save}: SaveInfoHeaderProps) {

  return (
    <div className={"flex w-[100%] justify-between h-fit"}>
      <div className={"flex flex-col h-fit w-full"}>
        <div className={"flex flex-col text-[#FFF] mb-[80px]"}>
          <h1 className={"font-[100] font-stardewMain text-[3rem]"}>{save.save_data.SaveGame.player.farmName}</h1>
          <h3 className={"font-[100] font-stardewSimple text-[1.2rem]"}>{save.save_data.SaveGame.player.name}</h3>
        </div>
        <SaveInfoHeaderButtons save={save}/>
      </div>
      <StardewDayCycle save={save} />
    </div>
  )
}

export function SaveInfoHeaderButtons({save}: SaveInfoHeaderProps) {
  const { t } = useAppContextProvider();

  return (
    <div className={"flex w-[800px] items-center justify-between"}>
      <div
        className={"bg-transparent w-[222px] h-[174px] relative cursor-pointer shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-50 hover:scale-[1.02] hover:brightness-110"}
        style={{
          backgroundImage: "url('/quests-button-no-text.png')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        <p className={"absolute top-[16px] left-[50%] translate-x-[-50%] font-stardewMain text-[var(--secondary-red)] text-[3.2rem]"}>
          {t("saveInfoHeader.quests")}
        </p>
      </div>
      <div
        className={"bg-transparent w-[222px] h-[174px] relative cursor-pointer shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-50 hover:scale-[1.02] hover:brightness-110"}
        style={{
          backgroundImage: "url('/bundles-button-no-text.png')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        <p className={"absolute top-[20px] left-[50%] translate-x-[-50%] font-stardewMain text-[var(--secondary-red)] text-[3.2rem]"}>
          {t("saveInfoHeader.bundles")}
        </p>
      </div>
      <div
        className={"bg-transparent w-[222px] h-[174px] relative cursor-pointer shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-50 hover:scale-[1.02] hover:brightness-110"}
        style={{
          backgroundImage: "url('/villagers-button-no-text.png')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        <p className={"absolute top-[20px] left-[50%] translate-x-[-50%] font-stardewMain text-[var(--secondary-red)] text-[3.2rem]"}>
          {t("saveInfoHeader.social")}
        </p>
      </div>
    </div>
  )
}