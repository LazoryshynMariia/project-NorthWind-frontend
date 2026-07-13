export interface StoryCategory {
  _id: string;
  category: string;
}

export interface Story {
  _id: string;
  title: string;
  img: string;
  article: string;
  category: StoryCategory | string;
  rate: number;
  ownerId: string;
  date: string;
  ownerName?: string;
  savesCount?: number;
}
