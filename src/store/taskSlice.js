import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "1",
      title: "Terminar informe mensual",
      description: "Redactar y enviar el informe de avance del equipo.",
      category: "Trabajo",
      createdAt: new Date().toISOString(),
      completed: false,
    },
    {
      id: "2",
      title: "Hacer compra del mes",
      description: "Comprar alimentos y productos de limpieza para el mes.",
      category: "Hogar",
      createdAt: new Date().toISOString(),
      completed: false,
    },
    {
      id: "3",
      title: "Ordenar el escritorio",
      description: "Dejar el espacio de trabajo listo para la semana.",
      category: "Hogar",
      createdAt: new Date().toISOString(),
      completed: true,
    },
  ],
  filter: "all",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.items.unshift(action.payload);
      },
      prepare: ({ title, description, category }) => ({
        payload: {
          id: Date.now().toString(),
          title,
          description,
          category,
          createdAt: new Date().toISOString(),
          completed: false,
        },
      }),
    },
    toggleTaskStatus: (state, action) => {
      const task = state.items.find((item) => item.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTaskStatus, deleteTask, setFilter } =
  taskSlice.actions;

export default taskSlice.reducer;
