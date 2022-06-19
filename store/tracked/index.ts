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

interface SaveWritingPayload {
  image: string,
  title: string,
  contentSanitized: string
}

type Action = 
  | { type: "START_WRITING" }
  | { type: "SAVE_WRITING", payload: SaveWritingPayload }
  | { type: "SUBMIT_WRITING" }

export interface ArticleCreation {
  image: string,
  title: string,
  content: string[],
  contentSanitized: string,
  category: ""
}

interface Writing extends ArticleCreation {
  isSubmitting: boolean,
  submit: boolean
}

interface Store {
  writing?: Writing
}

const reducer = ( draft: Store, action: Action ) => {
  switch(action.type) {
    case "START_WRITING": {
      const writingInitialState: Writing = {
        submit: false,
        isSubmitting: false,
        image: "",
        title: "",
        content: [],
        contentSanitized: "",
        category: ""
      }

      draft.writing = writingInitialState
    }
      return;
    case "SAVE_WRITING": {
      if ( draft.writing ) {
        draft.writing.contentSanitized = action.payload.contentSanitized;
        draft.writing.image = action.payload.image;
        draft.writing.title = action.payload.title; 
      }
      return;
    }
    case "SUBMIT_WRITING": {
      if ( draft.writing ) {
        draft.writing.isSubmitting = true;
      }
    }
  }
}

const initialState: Store = {
  
}

const useValue = (): [ Store, Dispatch<Action> ] => {
  const [ state, dispatch ] = useImmerReducer(reducer, initialState);

  return [ state, dispatch ];
}

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch
} = createContainer(useValue)