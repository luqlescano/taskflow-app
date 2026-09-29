import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as profileService from "../services/profileService";
import { setUser } from "./authSlice";

const initialState = {
  avatarUri: null,
  isSaving: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const profile = await profileService.fetchProfile(userId);
      return profile.avatarUri ?? null;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const updateAvatar = createAsyncThunk(
  "profile/updateAvatar",
  async ({ userId, avatarUri }, { rejectWithValue }) => {
    try {
      await profileService.saveAvatarUri(userId, avatarUri);
      return avatarUri;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.avatarUri = action.payload;
      })
      .addCase(updateAvatar.pending, (state, action) => {
        state.isSaving = true;
        state.error = null;
        state.avatarUri = action.meta.arg.avatarUri;
      })
      .addCase(updateAvatar.fulfilled, (state) => {
        state.isSaving = false;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload;
      })
      .addCase(setUser, (state, action) => {
        if (!action.payload) {
          state.avatarUri = null;
          state.isSaving = false;
          state.error = null;
        }
      });
  },
});

export default profileSlice.reducer;
