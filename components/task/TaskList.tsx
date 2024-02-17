"use client";
import { useSearchParams } from "next/navigation";
import Task from "./Task";
import { STATUS, Task as ITask } from "@/types";
import { useAppSelector } from "@/hooks/store";
import TaskFilter from "./TaskFilter";
import AddTasks from "./AddTask";

const TaskList = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const searchParams = useSearchParams();
  const tasksFilter = searchParams.get("tasks");
  let filteredTasks = tasks;

  switch (tasksFilter) {
    case STATUS.PENDING:
      filteredTasks = tasks.filter(
        (task: ITask) => task.status === STATUS.PENDING
      );
      break;
    case STATUS.IN_PROGRESS:
      filteredTasks = tasks.filter(
        (task: ITask) => task.status === STATUS.IN_PROGRESS
      );
      break;
    case STATUS.COMPLETED:
      filteredTasks = tasks.filter(
        (task: ITask) => task.status === STATUS.COMPLETED
      );
      break;

    default:
      break;
  }

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-8 sm:mb-14">
        <h2 className="text-2xl font-semibold">
          All The{" "}
          {tasksFilter === STATUS.PENDING
            ? "Pending"
            : tasksFilter === STATUS.IN_PROGRESS
            ? "In Progress"
            : tasksFilter === STATUS.COMPLETED
            ? "Completed"
            : ""}{" "}
          Tasks
        </h2>
        <AddTasks />
      </div>

      <TaskFilter />

      <div className="flex flex-col gap-2 px-4 py-5 max-h-[600px] overflow-auto">
        {filteredTasks.map((task: any) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
