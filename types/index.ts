export interface Traveller {
  _id: string;
  name: string;
  avatarUrl: string | null;
  articlesAmount: number;
}

export interface StoryCategory {
  _id: string;
  category: string;
}

export interface Story {
  _id: string;
  title: string;
  article: string;
  category: StoryCategory | string;
  img: string;
  date: string;
  ownerId: string;
  rate: number;
}
