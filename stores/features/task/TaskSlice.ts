import { Task } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const loadTasks = () => {
  if (typeof window !== "undefined") {
    const tasks = localStorage.getItem("taskStore");
    return tasks ? JSON.parse(tasks) : [];
  }
  return [];
};

interface TaskSlice {
  tasks: Task[];
}
const initialState: TaskSlice = {
  tasks: loadTasks(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem("taskStore", JSON.stringify(state.tasks));
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem("taskStore", JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("taskStore", JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
