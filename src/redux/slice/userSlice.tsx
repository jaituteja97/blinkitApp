import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    isLoading: boolean;
    isError: boolean;
    user: any | null;
    accessToken: string | null;
    refreshToken: string | null;
}

// Explicitly define the initial state with type UserState
const initialState: UserState = {
    isLoading: false,
    isError: false,
    user: null,
    accessToken: null,
    refreshToken: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,  // TypeScript now knows the structure of state
    reducers: {
        setUser: (state, action: PayloadAction<{ user: any; accessToken: string; refreshToken: string }>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        clearUser: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
