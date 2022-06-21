import { Dispatch } from "react"
import { createContainer } from "react-tracked"
import { useImmerReducer } from "use-immer"


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
  content: string,
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

interface SaveWritingPayload {
  image: string,
  title: string,
  contentSanitized: string
}

export interface ArticleCreation {
  [ key:string ]: string,
  image: string,
  title: string,
  content: string,
  type: string
}

type Action = 
  | { type: "START_WRITING" }
  | { type: "SAVE_WRITING", field: string, data: string }

interface Store {
  writing?: ArticleCreation
}

const reducer = ( draft: Store, action: Action ) => {
  switch(action.type) {
    case "START_WRITING": {
      const writingInitialState: ArticleCreation = {
        image: "",
        title: "",
        content: "",
        type: ""
      }

      draft.writing = writingInitialState;

      return;
    }
    case "SAVE_WRITING": {
      if ( draft.writing ) {
        draft.writing[action.field] = action.data;
      }

      return;
    }
  }
}

const initialState: Store = {}

const useValue = (): [ Store, Dispatch<Action> ] => {
  const [ state, dispatch ] = useImmerReducer(reducer, initialState);

  return [ state, dispatch ];
}

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch
} = createContainer(useValue)