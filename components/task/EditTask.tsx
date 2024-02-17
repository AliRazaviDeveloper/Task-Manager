import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useDispatch } from "react-redux";
import { updateTask } from "@/stores/features/task/TaskSlice";
interface EditTaskProps {
  id: number;
  title: string;
  description: string;
  status: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const EditTask = ({
  id,
  description,
  open,
  setOpen,
  status,
  title,
}: EditTaskProps) => {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);
  const [newStatus, setNewStatus] = useState<string>(status);
  const [error, setError] = useState<string>();
  const dispatch = useDispatch();
  const handleEditedTask = (e: any) => {
    e.preventDefault();

    if (newTitle.length < 3) {
      setError("Please enter a title with at least 3 characters");
    } else if (newDescription.length < 3) {
      setError("Please enter a description with at least 3 characters");
    } else if (!newStatus) {
      setError("Please select a status for the task");
    } else {
      const editedTask = {
        id,
        title: newTitle,
        description: newDescription,
        status: newStatus,
      };

      dispatch(updateTask(editedTask));

      // Reset the input values
      setNewTitle("");
      setNewDescription("");
      setNewStatus("");
      setError("");
      setOpen(!open);
      router.refresh();
    }
  };
  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-xl">Edit Task</DialogTitle>
        <DialogDescription>
          Edit or Update Your Task here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleEditedTask}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="name" className="text-left">
              Title
            </Label>
            <Input
              id="name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Textarea
              id="description"
              rows={5}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="status" className="text-left">
              Status
            </Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Task Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <p className="text-center py-1 rounded bg-error-background text-error-foreground">
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EditTask;
