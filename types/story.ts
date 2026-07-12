export interface Story {
  _id: string;
  title: string;
  img: string;
  article: string;
  category: string;
  rate: number;
  ownerId: string;
  date: string;
  ownerName?: string;
  savesCount?: number;
}
