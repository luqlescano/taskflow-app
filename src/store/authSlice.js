import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAccount,
  signIn,
  logOut,
  mapAuthError,
} from "../services/authService";

const initialState = {
  user: null,
  isLoading: true, // true durante los thunks de auth (botón deshabilitado)
  authChecked: false, // true una vez que onAuthStateChanged resolvió la primera vez
  error: null,
};

// El user real lo setea el listener (setUser); estos thunks solo disparan
// la llamada al SDK y capturan el error para mostrarlo en el formulario.
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await createAccount(email, password);
    } catch (err) {
      return rejectWithValue(mapAuthError(err.code));
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await signIn(email, password);
    } catch (err) {
      return rejectWithValue(mapAuthError(err.code));
    }
  },
);

export const logOutUser = createAsyncThunk("auth/logOutUser", async () => {
  await logOut();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.authChecked = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;

export default authSlice.reducer;
