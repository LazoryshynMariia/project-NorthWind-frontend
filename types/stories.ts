export interface AddStory {
  title: string;
  article: string;
  category: string;
}

export interface Story {
  article: string;
  category: string;
  date: Date;
  img: string;
  ownerId: string;
  rate: number;
  title: string;
  _id: string;
}
