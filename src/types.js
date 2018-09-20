import { EVENTS } from './constants.js';
import type {
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
} from 'redux';

export type ChatsState = {
  chats: Array<Chat>,
  chatsData: Array<Chat>,
  currentIndex: number,
  isLoading: boolean,
  error: ?string
};

// No need to provide browser type since the reducer is generated by a third-party library
export type State = {
  chats: ChatsState,
  browser: any
}

export type Coords = {
  latitude: number,
  longitude: number
};

export type Chat = {
  name: string,
  thumbnailUrl: string,
  radius: number,
  maxRadius: number,
  coord: Array<Coords>
}

export type MarkerT = {
  icon: string,
  lat: number,
  lng: number,
  data: Chat,
}

export type ChatsAction =
  | { type: typeof EVENTS.GET_CHATS_START }
  | { type: typeof EVENTS.LOAD_MORE_CHATS }
  | {
      type: typeof EVENTS.GET_CHATS_FAILURE,
      payload: { error: string }
    }
  | {
      type: typeof EVENTS.GET_CHATS_SUCCESS,
      payload: { chats: Array<Chat> }
    }

type Action = ChatsAction;

export type Thunk<A> = ((Dispatch, GetState) => Promise<void> | void) => A;

export type Dispatch =
  & ReduxDispatch<Action>
  & Thunk<Action>
