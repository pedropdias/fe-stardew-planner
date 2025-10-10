import {closestCorners, DndContext, DragOverEvent, DragOverlay, DragStartEvent} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAppContextProvider } from "@/providers/AppContextProvider";
import { DragAndDropType } from "@/types/dragAndDropType";
import {SaveType} from "@/types/saveType";

interface DragAndDropContainerProps<T> {
  data: T[];
  renderCard: (cardData: T) => React.ReactNode;
  type: DragAndDropType;
}

export function DragAndDropContainer<T extends { id: number | string }>({
                                                                          data,
                                                                          renderCard,
                                                                          type,
                                                                        }: DragAndDropContainerProps<T>) {
  const [cards, setCards] = useState<T[]>([]);
  const [activeCard, setActiveCard] = useState<T | null>(null);

  useEffect(() => {
    if (data) setCards(data);
  }, [data]);

  const getCardPos = (id: number | string) =>
    cards.findIndex((card) => card.id === id);

  const handleDragStart = (event: DragStartEvent) => {
    const card = cards.find((card) => card.id === event.active.id);
    if (card) setActiveCard(card);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setCards((cards) => {
      const activeIndex = getCardPos(active.id);
      const overIndex = getCardPos(over.id);

      const newCards = [...cards];
      [newCards[activeIndex], newCards[overIndex]] = [
        newCards[overIndex],
        newCards[activeIndex],
      ];

      return newCards;
    });
  };

  const handleDragEnd = () => setActiveCard(null);

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
              <Card
                key={card.id}
                cardData={card}
                isDragging={activeCard?.id === card.id}
                renderCard={renderCard}
                type={type}
              />
            ))}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeCard ? (
            <Card
              cardData={activeCard}
              isDragging={false}
              renderCard={renderCard}
              type={type}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

interface CardProps<T> {
  cardData: T;
  isDragging?: boolean;
  renderCard: (cardData: T) => React.ReactNode;
  type: DragAndDropType;
}

function Card<T extends { id: number | string }>({
                                                   renderCard,
                                                   cardData,
                                                   isDragging,
                                                   type,
                                                 }: CardProps<T>) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: cardData.id,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  const { setSelectedSave } = useAppContextProvider();
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
        if (!dragging && type === "save" && isSaveType(cardData)) {
          setSelectedSave(cardData);
        }
      }}
    >
      {renderCard(cardData)}
    </div>
  );
}

function isSaveType(obj: unknown): obj is SaveType {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "save_data" in obj &&
    "game_save_id" in obj &&
    "created_at" in obj
  );
}
