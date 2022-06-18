

interface UserBody {
  firstName: string,
  lastName: string,
  username: string
}

export interface Writer extends UserBody{
  writings: ArticleData[],
  image: string,
  bio?: string
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

export interface ResultJson {
  status: number,
  data: any
}