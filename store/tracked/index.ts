export const dummy = 1;


export interface Writer {
  firstName: string,
  lastName: string,
  searchId: string,
  writings?: ArticleData[],
  image: string
}

export interface ArticleData {
  searchId: string,
  title: string,
  content: string[],
  image: string,
  type: string,
  likes: number,
  author: Writer,
  collaborators: Writer[],
  createdAt: string
}

export interface DividedArticles {
  genre: string,
  readings: ArticleData[]
}

export type ArticlesData = DividedArticles[] | ArticleData[];

export interface ResultJson {
  status: number,
  data: any
}