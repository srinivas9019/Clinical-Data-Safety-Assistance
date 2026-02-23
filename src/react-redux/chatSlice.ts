// store/userSlice.ts
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../api";
import {
  ChatMsgIOTypes,
  UserTypes,
} from "../App-Interfaces/ChatRelatedInterfaces";
import { generateSessionId } from "../utility";

interface appGlobalDataState {
  chatSessionDetails: {
    currChatId: string;
    currChatSessionId: string;
    lastQuestion: string;
  };
  chatSessionList: any;
  chatSessionLoading: boolean;
  currentChatDetails: any;
}

const initialState: appGlobalDataState = {
  chatSessionDetails: {
    currChatId: "",
    currChatSessionId: "",
    lastQuestion: "",
  },
  chatSessionList: [],
  chatSessionLoading: false,
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

export const fetchUser = createAsyncThunk<any, number>(
  "user/fetchUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get<any>(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

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
        currChatId: generateSessionId(),
        currChatSessionId: "",
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
  extraReducers: (builder) => {
    builder

      .addCase(fetchUser.pending, (state) => {
        // state.loading = true;
        // state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        // state.loading = false;
        // state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        // state.loading = false;
        // state.error = action.payload as string;
      });
  },
});

export const {
  updateChatSessionDetails,
  updateChatSessionList,
  updateChatSessionLoading,
  loadChatFromHistory,
  clearChatSessionAtStore,
  pushToCurrentChatDetails,
} = userSlice.actions;
export default userSlice.reducer;
