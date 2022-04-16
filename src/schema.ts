export interface PostEntity {
  id: number;
  title: string;
  abstract: string;
  date: string;
}

export interface PostDetailEntity extends PostEntity {
  content: string;
}
