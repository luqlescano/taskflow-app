import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as taskService from "../services/taskService";
import { setUser } from "./authSlice";

const initialState = {
  items: [],
  filter: "all",
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (userId, { rejectWithValue }) => {
    try {
      return await taskService.fetchTasks(userId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ userId, title, description, category }, { rejectWithValue }) => {
    try {
      return await taskService.createTask({
        userId,
        title,
        description,
        category,
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// Recibe el completed actual y persiste el opuesto.
export const toggleTask = createAsyncThunk(
  "tasks/toggleTask",
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      await taskService.updateTaskStatus(id, !completed);
      return { id, completed: !completed };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (id, { rejectWithValue }) => {
    try {
      await taskService.removeTask(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearTasks: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Orden estable (createdAt descendente) entre recargas.
        state.items = [...action.payload].sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt),
        );
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const task = state.items.find((item) => item.id === action.payload.id);
        if (task) task.completed = action.payload.completed;
      })
      .addCase(toggleTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Al cerrar sesión (por cualquier vía) se limpian las tareas.
      .addCase(setUser, (state, action) => {
        if (!action.payload) {
          state.items = [];
          state.status = "idle";
          state.error = null;
        }
      });
  },
});

export const { setFilter, clearTasks } = taskSlice.actions;

export default taskSlice.reducer;
