// store/userSlice.ts
import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  ChatMsgIOTypes,
  UserTypes,
} from "../App-Interfaces/ChatRelatedInterfaces";


interface appGlobalDataState {
  chatSessionDetails: {
    currChatId: string;
    lastQuestion: string;
  };
  chatSessionList: any;
  chatSessionLoading: boolean;
  chatSubmissionIsRunning: boolean;
  currentChatDetails: any;
}

const initialState: appGlobalDataState = {
  chatSessionDetails: {
    currChatId: "",
    lastQuestion: "",
  },
  chatSessionList: [],
  chatSessionLoading: false,
  chatSubmissionIsRunning: false,
  currentChatDetails: [
    {
      userType: UserTypes.USER,
      content: {
        type: ChatMsgIOTypes.INCOMING,
        message:
          "Hello! I am your Clinical Development Assistant. How can I assist you today?",
      },
    },
  ],
};

const userSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateChatSessionDetails: (state, action: PayloadAction<any>) => {
      state.chatSessionDetails = action.payload;

      console.log(state.chatSessionDetails);
    },
    updateChatSessionList: (state, action: PayloadAction<any>) => {
      state.chatSessionList = action.payload;
    },
    updateChatSubmissionRunningStatus: (state,action: PayloadAction<boolean>,) => {
      console.log("hello 123",action.payload)
      state.chatSubmissionIsRunning = action.payload;
    },
    updateChatSessionLoading: (state, action: PayloadAction<boolean>) => {
      state.chatSessionLoading = action.payload;
    },
    loadChatFromHistory: (state, action: PayloadAction<any>) => {
      state.chatSessionDetails = action.payload.chatSessionDetails;
      state.currentChatDetails = action.payload.currentChatDetails;
    },
    pushToCurrentChatDetails: (state, action: PayloadAction<any>) => {
      state.currentChatDetails.push(action.payload);
    },
    clearChatSessionAtStore: (state) => {
      state.chatSessionDetails = {
        currChatId: "",
        lastQuestion: "",
      };
      state.currentChatDetails = [
        {
          userType: UserTypes.USER,
          content: {
            type: ChatMsgIOTypes.INCOMING,
            message:
              "Hello! I am your Clinical Development Assistant. How can I assist you today?",
          },
        },
      ];
    },
  },
});

export const {
  updateChatSessionDetails,
  updateChatSessionList,
  updateChatSessionLoading,
  loadChatFromHistory,
  clearChatSessionAtStore,
  pushToCurrentChatDetails,
  updateChatSubmissionRunningStatus
} = userSlice.actions;
export default userSlice.reducer;
