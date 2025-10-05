export type SaveType = {
  created_at: string;
  game_save_id: string;
  id: number;
  planners: PlannerType[];
  save_data: SaveDataType;
  tasks: TaskType;
  user_id: string;
}

export type PlannerType = {
  id: number;
  name: string;
  description: string;
}

export type TaskType = {
  id: number;
  plannerId: number;
  name: string;
  description: string;
  days: number;
}

export interface SaveDataType {
  "?xml": {
    "@version": string;
    "@encoding": string;
  };
  SaveGame: SaveGameType;
}

export interface SaveGameType {
  year: string;
  player: PlayerType;
  [key: string]: unknown; // permite campos adicionais
}

export interface PlayerType {
  name: string;
  farmName: string;
  gender?: string;
  money?: string;
  qiGems?: string;
  spouse?: string;
  horseName?: string;
  health?: string;
  stamina?: string;
  maxHealth?: string;
  maxStamina?: string;
  stats?: PlayerStatsType;
  boots?: ItemType;
  items?: { Item: ItemType[] };
  rightRing?: ItemType;
  leftRing?: ItemType;
  pantsItem?: ItemType;
  shirtItem?: ItemType;
  questLog?: { Quest: QuestType[] };
  fishCaught?: {
    item: {
      key: { string: string };
      value: { ArrayOfInt: { int: string[] } };
    }[];
  };
  [key: string]: unknown;
}

export interface PlayerStatsType {
  Values?: {
    item: {
      key: { string: string };
      value: { unsignedInt: string };
    }[];
  };
  specificMonstersKilled?: {
    item: {
      key: { string: string };
      value: { int: string };
    }[];
  };
  [key: string]: unknown;
}

export interface ItemType {
  name?: string;
  type?: string;
  itemId?: string;
  price?: string;
  stack?: string;
  quality?: string;
  category?: string;
  "@xsi:type"?: string;
  enchantments?: { level: string; "@xsi:type": string }[];
  boundingBox?: {
    X: string;
    Y: string;
    Size: { X: string; Y: string };
    Width: string;
    Height: string;
    Location: { X: string; Y: string };
  };
  tileLocation?: { X: string; Y: string };
  [key: string]: unknown;
}

export interface QuestType {
  id: string;
  questTitle: string;
  _questTitle: string;
  _questDescription?: string;
  _currentObjective?: string;
  completed: string;
  questType: string;
  moneyReward: string;
  [key: string]: unknown;
}
