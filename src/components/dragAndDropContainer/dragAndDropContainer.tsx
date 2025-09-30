import {closestCorners, DndContext, DragOverlay} from "@dnd-kit/core";
import {useEffect, useState} from "react";
import {
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useAppContextProvider} from "@/providers/AppContextProvider";
import {DragAndDropType} from "@/types/dragAndDropType";

interface DragAndDropContainerProps {
  data: any;
  renderCard: (cardData: any) => React.ReactNode;
  type: DragAndDropType;
}

export function DragAndDropContainer({data, renderCard, type}: DragAndDropContainerProps) {

  const [cards, setCards] = useState<any[]>([]);
  const [activeCard, setActiveCard] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setCards(data);
    }
  }, [data]);


  const getCardPos = (id: number) => cards.findIndex(card => card.id === id);

  const handleDragStart = (event: any) => {
    const card = cards.find((card) => card.id === event.active.id);
    setActiveCard(card);
  };

  const handleDragOver = (event: any) => {
    const {active, over} = event;
    if (!over || active.id === over.id) return;

    setCards((cards) => {
      const activeIndex = getCardPos(active.id);
      const overIndex = getCardPos(over.id);

      const newCards = [...cards];
      [newCards[activeIndex], newCards[overIndex]] = [newCards[overIndex], newCards[activeIndex]];

      return newCards;
    });
  };

  const handleDragEnd = () => {
    setActiveCard(null);
  };

  return (
    <div>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="w-[862px] flex justify-start items-center rounded-[24px] gap-[24px] flex-wrap">
          <SortableContext items={cards.map((card) => card.id)}>
            {cards.map((card) => (
              <Card key={card.id} cardData={card} isDragging={activeCard?.id === card.id} renderCard={renderCard}
                    type={type}/>
            ))}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeCard ? (
            <Card cardData={activeCard} isDragging={false} renderCard={renderCard} type={type}/>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

interface CardCardProps {
  cardData: any;
  isDragging?: boolean;
  renderCard: (cardData: any) => React.ReactNode;
  type: DragAndDropType;
}

function Card({renderCard, cardData, isDragging, type}: CardCardProps) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: cardData.id});
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  const {setSelectedSave} = useAppContextProvider();

  const [dragging, setDragging] = useState(false);

  return (
    <div
      className="flex items-center justify-center cursor-pointer select-none font-stardewSimple"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onPointerMove={() => setDragging(true)}
      onPointerUp={() => {
        if (!dragging && type === "save") {
          setSelectedSave(cardData);
        }
      }}
    >
      {renderCard(cardData)}
    </div>
  );
}
