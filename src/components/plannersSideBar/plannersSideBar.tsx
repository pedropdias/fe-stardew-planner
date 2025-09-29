import {useAppContextProvider} from "@/providers/AppContextProvider";

export default function PlannersSideBar() {
  const { planners, setSelectedPlanner } = useAppContextProvider();

  return(
    <div
      className={"flex flex-col min-w-[291px] h-[900px] p-[26px_28px_26px_20px] bg-transparent font-stardewSimple"}
      style={{
        backgroundImage: "url('/default-planner-sidebar-bg.png')",
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        textShadow: "2px 2px 0px rgba(135,52,0,0.5)"
      }}
    >
      <p className={"text-[2rem]"}>My planners</p>
      <div
        className={"flex justify-between items-center bg-transparent mt-[24px] mb-[8px] px-[20px] py-[12px] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-50 hover:scale-103 hover:brightness-120"}
        style={{
          backgroundImage: "url('/default-button-extra-large.png')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <p className={"text-[1.5rem]"}>New planner</p>
        <button
          className={"flex justify-between items-center bg-transparent px-[10px] py-[4px] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer text-[1.5rem]"}
          style={{
            backgroundImage: "url('/default-square-button.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            textShadow: "2px 2px 0px rgba(135,52,0,0.5)"
          }}
        >
          +
        </button>
      </div>
      <div className={"bg-[var(--card-background-5)] w-full h-[3px] my-[24px]"}/>
      {planners?.map((planner, index) => (
        <div
          key={index}
          className={"flex justify-between items-center bg-transparent mb-[8px] px-[20px] py-[12px] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-50 hover:scale-103 hover:brightness-120"}
          style={{
            backgroundImage: "url('/default-button-extra-large.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          onClick={() => setSelectedPlanner(planner)}
        >
          <p className={"text-[1.5rem] mt-[6px]"}>Planner {planner.name}</p>
        </div>
      ))}
    </div>
  )
}