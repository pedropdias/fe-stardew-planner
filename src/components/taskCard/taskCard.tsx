import {useAppContextProvider} from "@/providers/AppContextProvider";
import {TaskType} from "@/types/saveType";
import Image from "next/image";

export default function TaskCard({data}: {data: TaskType}) {
  const { t } = useAppContextProvider();

  return (
    <div className={"flex flex-col justify-between w-[250px] h-[160px] bg-[var(--card-background)] text-[#000] rounded-[10px] pt-[20px] pb-[20px] px-[18px] gap-[26px] shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-200 hover:scale-105"}
         style={{
           backgroundImage: "url('/default-card-large.png')",
           backgroundSize: '100% 100%',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
           textShadow: "1px 1px 0px rgba(135,52,0,0.6)"
         }}
    >
      {data.isDefault ? <DefaultTaskCard data={data}/> : (
        <>
          <div className={"flex flex-col justify-between gap-[6px]"}>
            <p
              className={"text-[1.5rem] whitespace-normal break-words overflow-hidden"}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >{data.name}</p>
          </div>
          <div className={"flex items-center gap-[6px]"}>
            <div className={`w-[20px] h-[20px] rounded-[50%] ${data.days > 0 ? "bg-[var(--primary-dark-yellow)]" : "bg-[var(--secondary-red)]"}`}></div>
            <p className={"mt-[6px]"}>{t("taskCard.remainingDays")} {data.days}</p>
          </div>
        </>
      )}
    </div>
  )
}

function DefaultTaskCard({data}: {data: TaskType}) {
  return (
    <div
      className={"flex flex-col gap-[16px] max-w-[360px] h-[350px] whitespace-normal break-words overflow-hidden"}
      style={{
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
      }}
    >
      <div className={"flex justify-center mb-[22px]"}>
        {data.name}
      </div>
      <div className={"flex justify-center"}>
        <Image
          src={"/add-button.png"}
          alt={"add-button"}
          width={60}
          height={60}
          className={"transition-transform duration-50 hover:scale-105 hover:brightness-125 cursor-pointer"}
        />
      </div>
    </div>
  )
}