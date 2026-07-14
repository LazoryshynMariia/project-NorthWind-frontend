import type { Traveller } from './traveller';

export interface StoryCategory {
  _id: string;
  category: string;
}

export type StoryOwner = string | Pick<Traveller, '_id' | 'name' | 'avatarUrl'>;

export interface CreateStoryData {
  title: string;
  article: string;
  category: string;
}

export interface Story {
  _id: string;
  title: string;
  img: string;
  article: string;
  category: StoryCategory | string;
  rate: number;
  ownerId: StoryOwner;
  date: string;
  ownerName?: string;
  savesCount?: number;
}
