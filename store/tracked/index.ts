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

export interface ArticleCreation {
  [ key:string ]: string,
  image: string,
  title: string,
  content: string,
  type: string
}

export interface UserWriter extends Writer {
  [ key: string ]: any,
  likes: ArticleData[],
  followings: Writer[]
}

interface UpdateWriterPayload {
  [ key: string ]: any,
}

type Action = 
  | { type: "SET_WRITER", userType: "writer" | "student", data: UserWriter }
  | { type: "REMOVE_USER" } 
  | { type: "UPDATE_WRITER_PROFILE", payload: UpdateWriterPayload } 
  | { type: "START_WRITING" }
  | { type: "SAVE_WRITING", field: string, data: string }

interface Store {
  writing?: ArticleCreation,
  writer?: UserWriter
}

const reducer = ( draft: Store, action: Action ) => {
  switch(action.type) {
    case "SET_WRITER": {
      draft.writer = action.data;
      return;
    }
    case "REMOVE_USER": {
      draft = {};

      return;
    }
    case "UPDATE_WRITER_PROFILE": {
      for( const[key, val] of Object.entries(action.payload) ) {
        if ( draft.writer ) {
          draft.writer[key] = val
        }
      }
      return;
    }
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