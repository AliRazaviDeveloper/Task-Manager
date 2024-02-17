"use client";

import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import { useState } from "react";
import { STATUS } from "@/types";
import { deleteTask } from "@/stores/features/task/TaskSlice";
import EditTask from "./EditTask";
import { useAppDispatch } from "@/hooks/store";

interface TaskProps {
  id: number;
  title: string;
  description: string;
  status: string;
}

const Task = ({ id, title, description, status }: TaskProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="relative bg-white p-4 rounded shadow mt-1 border-b border-slate-300 max-w-2xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>

        <div className="flex gap-1 sm:gap-3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil2Icon className="w-5 h-5 text-blue-500" />
              </Button>
            </DialogTrigger>
            <EditTask
              id={id}
              title={title}
              description={description}
              status={status}
              open={open}
              setOpen={setOpen}
            />
          </Dialog>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDeleteTask(id)}
          >
            <TrashIcon className="w-5 h-5 text-red-500" />
          </Button>
        </div>
      </div>

      <Badge
        className="my-2"
        variant={
          status === STATUS.PENDING
            ? "error"
            : status === STATUS.IN_PROGRESS
            ? "warning"
            : "success"
        }
      >
        {status === "pending"
          ? "Pending"
          : status === STATUS.IN_PROGRESS
          ? "In Progress"
          : "Completed"}
      </Badge>

      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
};

export default Task;
