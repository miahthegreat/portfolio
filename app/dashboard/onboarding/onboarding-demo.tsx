"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  LayoutList,
  LayoutGrid,
  Table as TableIcon,
  Loader2,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { DemoGuide } from "@/components/demo-guide";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useProperty } from "@/contexts/property-context";
import {
  type OnboardingTask,
  type Resident,
  type TaskCategory,
  type TaskStatus,
  type TaskOwner,
} from "./types";

const API = "/api/onboarding";
const STATUS_ORDER: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];
const OWNER_LABEL: Record<TaskOwner, string> = {
  RESIDENT: "Resident",
  PM: "PM",
  SYSTEM: "System",
};

function formatDate(s: string | null) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TaskActionsDropdown({
  task,
  onComplete,
  onEdit,
  onDelete,
  pending,
}: {
  task: OnboardingTask;
  onComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
  pending: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          data-testid="task-actions-trigger"
          variant="ghost"
          size="icon"
          className="size-8 shrink-0"
          aria-label="Task actions"
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {task.status !== "DONE" && (
          <>
            <DropdownMenuItem onClick={onComplete} disabled={pending}>
              {pending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Check className="size-4" />
              )}
              Mark complete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="size-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          disabled={pending}
          variant="destructive"
        >
          <Trash2 className="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function OnboardingDemo() {
  const { selectedPropertyId } = useProperty();
  const [residents, setResidents] = useState<Resident[]>([]);
  const [categories, setCategories] = useState<TaskCategory[]>([]);
  const [tasks, setTasks] = useState<OnboardingTask[]>([]);
  const [residentId, setResidentId] = useState<string>("");
  const [view, setView] = useState<"checklist" | "kanban" | "table">("checklist");
  const [loadingResidents, setLoadingResidents] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<OnboardingTask | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const fetchResidents = useCallback(async () => {
    if (!selectedPropertyId) {
      setResidents([]);
      setResidentId("");
      setLoadingResidents(false);
      return;
    }
    setLoadingResidents(true);
    try {
      const res = await fetch(`${API}/residents?propertyId=${encodeURIComponent(selectedPropertyId)}`);
      if (!res.ok) throw new Error("Failed to load residents");
      const json = await res.json();
      setResidents(json.data);
      setResidentId(json.data.length ? json.data[0].id : "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load residents");
      setResidents([]);
      setResidentId("");
      toast.error("Failed to load residents");
    } finally {
      setLoadingResidents(false);
    }
  }, [selectedPropertyId]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API}/categories`);
      if (!res.ok) throw new Error("Failed to load categories");
      const json = await res.json();
      setCategories(json.data);
    } catch (e) {
      toast.error("Failed to load categories");
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    if (!residentId) {
      setTasks([]);
      return;
    }
    setLoadingTasks(true);
    setError(null);
    try {
      const res = await fetch(`${API}/tasks?residentId=${encodeURIComponent(residentId)}`);
      if (!res.ok) throw new Error("Failed to load tasks");
      const json = await res.json();
      setTasks(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load tasks");
      setTasks([]);
      toast.error("Failed to load tasks");
    } finally {
      setLoadingTasks(false);
    }
  }, [residentId]);

  useEffect(() => {
    fetchResidents();
    fetchCategories();
  }, [fetchResidents, fetchCategories]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const completeCount = tasks.filter((t) => t.status === "DONE").length;
  const progressPercent = tasks.length ? Math.round((completeCount / tasks.length) * 100) : 0;
  const estimatedText =
    tasks.length === 0
      ? "No tasks yet"
      : completeCount === tasks.length
        ? "All done"
        : `${completeCount} of ${tasks.length} complete`;

  const markComplete = async (task: OnboardingTask) => {
    if (task.status === "DONE") return;
    setPendingId(task.id);
    const prev = [...tasks];
    setTasks((t) =>
      t.map((x) => (x.id === task.id ? { ...x, status: "DONE" as const, completedAt: new Date().toISOString() } : x))
    );
    try {
      const res = await fetch(`${API}/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "DONE" }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error?.message ?? "Update failed");
      }
      const json = await res.json();
      setTasks((t) => t.map((x) => (x.id === task.id ? json.data : x)));
      toast.success("Task completed");
    } catch (e) {
      setTasks(prev);
      toast.error(e instanceof Error ? e.message : "Update failed");
    } finally {
      setPendingId(null);
    }
  };

  const updateStatus = async (task: OnboardingTask, status: TaskStatus) => {
    setPendingId(task.id);
    const prev = [...tasks];
    setTasks((t) =>
      t.map((x) =>
        x.id === task.id
          ? { ...x, status, completedAt: status === "DONE" ? new Date().toISOString() : null }
          : x
      )
    );
    try {
      const res = await fetch(`${API}/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error?.message ?? "Update failed");
      }
      const json = await res.json();
      setTasks((t) => t.map((x) => (x.id === task.id ? json.data : x)));
      toast.success("Status updated");
    } catch (e) {
      setTasks(prev);
      toast.error(e instanceof Error ? e.message : "Update failed");
    } finally {
      setPendingId(null);
    }
  };

  const deleteTask = async (task: OnboardingTask) => {
    setPendingId(task.id);
    const prev = [...tasks];
    setTasks((t) => t.filter((x) => x.id !== task.id));
    try {
      const res = await fetch(`${API}/tasks/${task.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Task deleted");
    } catch (e) {
      setTasks(prev);
      toast.error("Delete failed");
    } finally {
      setPendingId(null);
    }
  };

  const handleReset = async () => {
    setResetting(true);
    try {
      const res = await fetch(`${API}/reset`, { method: "POST" });
      if (!res.ok) throw new Error("Reset failed");
      await fetchTasks();
      toast.success("Demo data reset");
    } catch (e) {
      toast.error("Reset failed");
    } finally {
      setResetting(false);
    }
  };

  const tasksByCategory = categories.map((cat) => ({
    category: cat,
    tasks: tasks.filter((t) => t.categoryId === cat.id),
  }));

  const kanbanColumns = STATUS_ORDER.map((status) => ({
    status,
    tasks: tasks.filter((t) => t.status === status),
  }));

  if (!selectedPropertyId) {
    return (
      <div data-testid="onboarding-no-property" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Resident onboarding</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a property in the sidebar to view and manage onboarding for that property.
        </p>
        <Card className="mt-8">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No property selected.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Use the property dropdown at the top of the sidebar to choose a property.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div data-testid="onboarding-page" className="min-w-0 max-w-full mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex min-w-0 max-w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold text-foreground">Resident onboarding</h1>
          <p className="mt-1 text-sm text-muted-foreground break-words">
            Manage onboarding tasks by resident for this property. Try completing tasks, editing, and switching views.
          </p>
        </div>
        <Link
          href="/dashboard/docs#api"
          className="text-sm font-medium text-primary hover:underline shrink-0"
        >
          API docs →
        </Link>
      </div>

      <div className="mb-6 min-w-0 max-w-full">
        <DemoGuide
          title="Demo guide"
          steps={[
            "Select a resident to see their onboarding checklist.",
            "Mark tasks complete (idempotent — safe to click again).",
            "Switch between Checklist, Kanban, and Table views.",
            "Create a new task or edit title, due date, and owner.",
            "Use Reset Demo Data to restore seed state.",
          ]}
        >
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={resetting}
            >
              {resetting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Reset demo data"
              )}
            </Button>
          </div>
        </DemoGuide>
      </div>

      <div className="min-w-0 max-w-full overflow-x-hidden space-y-6">
        <div className="flex max-w-full flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex min-w-0 flex-1 basis-full items-center gap-2 sm:flex-initial sm:basis-auto">
            <Label htmlFor="resident" className="shrink-0 text-sm text-muted-foreground">
              Resident
            </Label>
            <Select
              value={residentId}
              onValueChange={setResidentId}
              disabled={loadingResidents}
            >
              <SelectTrigger data-testid="onboarding-resident-select" id="resident" className="w-full min-w-0 max-w-[220px] sm:w-[220px]">
                <SelectValue placeholder="Select resident" />
              </SelectTrigger>
              <SelectContent>
                {residents.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Tabs value={view} onValueChange={(v) => setView(v as typeof view)} className="shrink-0" data-testid="onboarding-view-tabs">
            <TabsList className="flex-wrap">
              <TabsTrigger data-testid="onboarding-view-tab-checklist" value="checklist">
                <LayoutList className="size-4 sm:mr-1" />
                <span className="hidden sm:inline">Checklist</span>
              </TabsTrigger>
              <TabsTrigger data-testid="onboarding-view-tab-kanban" value="kanban">
                <LayoutGrid className="size-4 sm:mr-1" />
                <span className="hidden sm:inline">Kanban</span>
              </TabsTrigger>
              <TabsTrigger data-testid="onboarding-view-tab-table" value="table">
                <TableIcon className="size-4 sm:mr-1" />
                <span className="hidden sm:inline">Table</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button data-testid="onboarding-new-task-btn" onClick={() => setCreateOpen(true)} size="sm" className="shrink-0 gap-1">
            <Plus className="size-4" />
            New task
          </Button>
        </div>

        <div data-testid="onboarding-progress">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span>{estimatedText}</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {loadingTasks ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : tasks.length === 0 && residentId ? (
          <Card data-testid="onboarding-empty-tasks">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">No onboarding tasks yet.</p>
              <Button
                data-testid="onboarding-create-first-task"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setCreateOpen(true)}
              >
                Create first task
              </Button>
            </CardContent>
          </Card>
        ) : view === "checklist" ? (
          <div data-testid="onboarding-task-list" className="space-y-6">
            {tasksByCategory.map(
              ({ category, tasks: catTasks }) =>
                catTasks.length > 0 && (
                  <Card key={category.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {catTasks.map((task) => (
                        <TaskRow
                          key={task.id}
                          task={task}
                          onComplete={() => markComplete(task)}
                          onEdit={() => setEditingTask(task)}
                          onDelete={() => deleteTask(task)}
                          pending={pendingId === task.id}
                        />
                      ))}
                    </CardContent>
                  </Card>
                )
            )}
          </div>
        ) : view === "kanban" ? (
          <div data-testid="onboarding-kanban" className="grid gap-4 sm:grid-cols-3">
            {kanbanColumns.map(({ status, tasks: colTasks }) => (
              <Card key={status}>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium capitalize">
                    {status.replace("_", " ")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {colTasks.map((task) => (
                    <KanbanCard
                      key={task.id}
                      task={task}
                      onStatusChange={(s) => updateStatus(task, s)}
                      onEdit={() => setEditingTask(task)}
                      onDelete={() => deleteTask(task)}
                      pending={pendingId === task.id}
                    />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Mobile: stacked cards with task + category/owner pills and action popover */}
            <div data-testid="onboarding-task-cards" className="w-full space-y-3 md:hidden">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  data-testid="onboarding-task-card"
                  data-task-id={task.id}
                  className="flex items-start justify-between gap-3 rounded-lg border bg-card p-4 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p
                      className={
                        task.status === "DONE"
                          ? "text-sm font-medium text-muted-foreground line-through"
                          : "text-sm font-medium"
                      }
                    >
                      {task.title}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="text-xs font-normal">
                        {task.category.name}
                      </Badge>
                      <Badge variant="outline" className="text-xs font-normal">
                        {OWNER_LABEL[task.owner]}
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Due {formatDate(task.dueDate)}
                      <span className="mx-1.5">·</span>
                      <Badge
                        variant={
                          task.status === "DONE"
                            ? "default"
                            : task.status === "IN_PROGRESS"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs font-normal"
                      >
                        {task.status}
                      </Badge>
                    </p>
                  </div>
                  <TaskActionsDropdown
                    task={task}
                    onComplete={() => markComplete(task)}
                    onEdit={() => setEditingTask(task)}
                    onDelete={() => deleteTask(task)}
                    pending={pendingId === task.id}
                  />
                </div>
              ))}
            </div>

            {/* Desktop: full-width table with actions in dropdown */}
            <div data-testid="onboarding-task-table" className="hidden w-full min-w-0 md:block">
              <Card className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Due date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[70px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id} data-testid="onboarding-task-row" data-task-id={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>{task.category.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{OWNER_LABEL[task.owner]}</Badge>
                        </TableCell>
                        <TableCell>{formatDate(task.dueDate)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              task.status === "DONE"
                                ? "default"
                                : task.status === "IN_PROGRESS"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {task.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <TaskActionsDropdown
                            task={task}
                            onComplete={() => markComplete(task)}
                            onEdit={() => setEditingTask(task)}
                            onDelete={() => deleteTask(task)}
                            pending={pendingId === task.id}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </>
        )}
      </div>

      <TaskFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        categories={categories}
        residentId={residentId}
        onSuccess={(task) => {
          setTasks((t) => [...t, task]);
          setCreateOpen(false);
          toast.success("Task created");
        }}
        onError={(msg) => toast.error(msg)}
      />

      {editingTask && (
        <TaskFormDialog
          open={!!editingTask}
          onOpenChange={(open) => !open && setEditingTask(null)}
          categories={categories}
          residentId={editingTask.residentId}
          task={editingTask}
          onSuccess={(updated) => {
            setTasks((t) => t.map((x) => (x.id === updated.id ? updated : x)));
            setEditingTask(null);
            toast.success("Task updated");
          }}
          onError={(msg) => toast.error(msg)}
        />
      )}
    </div>
  );
}

function TaskRow({
  task,
  onComplete,
  onEdit,
  onDelete,
  pending,
}: {
  task: OnboardingTask;
  onComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
  pending: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-md border bg-muted/30 px-3 py-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {task.status !== "DONE" ? (
          <button
            type="button"
            onClick={onComplete}
            disabled={pending}
            className="flex size-5 shrink-0 items-center justify-center rounded border border-input bg-background hover:bg-muted"
            aria-label="Mark complete"
          >
            {pending ? <Loader2 className="size-3 animate-spin" /> : null}
          </button>
        ) : (
          <span className="flex size-5 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
            <Check className="size-3" />
          </span>
        )}
        <div className="min-w-0">
          <p
            className={
              task.status === "DONE"
                ? "text-sm text-muted-foreground line-through"
                : "text-sm font-medium"
            }
          >
            {task.title}
          </p>
          <p className="text-xs text-muted-foreground">
            {OWNER_LABEL[task.owner]} · Due {formatDate(task.dueDate)}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 gap-1">
        <Button variant="ghost" size="icon-xs" onClick={onEdit} aria-label="Edit">
          <Pencil className="size-4" />
        </Button>
        <Button variant="ghost" size="icon-xs" onClick={onDelete} disabled={pending} aria-label="Delete">
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function KanbanCard({
  task,
  onStatusChange,
  onEdit,
  onDelete,
  pending,
}: {
  task: OnboardingTask;
  onStatusChange: (s: TaskStatus) => void;
  onEdit: () => void;
  onDelete: () => void;
  pending: boolean;
}) {
  return (
    <div className="rounded-lg border bg-card p-3 shadow-sm">
      <p className="text-sm font-medium">{task.title}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {task.category.name} · {OWNER_LABEL[task.owner]}
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {STATUS_ORDER.filter((s) => s !== task.status).map((s) => (
          <Button
            key={s}
            variant="outline"
            size="xs"
            onClick={() => onStatusChange(s)}
            disabled={pending}
          >
            {s.replace("_", " ")}
          </Button>
        ))}
        <Button variant="ghost" size="icon-xs" onClick={onEdit}>
          <Pencil className="size-4" />
        </Button>
        <Button variant="ghost" size="icon-xs" onClick={onDelete} disabled={pending}>
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function TaskFormDialog({
  open,
  onOpenChange,
  categories,
  residentId,
  task,
  onSuccess,
  onError,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: TaskCategory[];
  residentId: string;
  task?: OnboardingTask | null;
  onSuccess: (t: OnboardingTask) => void;
  onError: (msg: string) => void;
}) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [categoryId, setCategoryId] = useState(task?.categoryId ?? categories[0]?.id ?? "");
  const [owner, setOwner] = useState<TaskOwner>(task?.owner ?? "RESIDENT");
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? task.dueDate.slice(0, 16) : ""
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle(task?.title ?? "");
      setCategoryId(task?.categoryId ?? categories[0]?.id ?? "");
      setOwner(task?.owner ?? "RESIDENT");
      setDueDate(task?.dueDate ? task.dueDate.slice(0, 16) : "");
    }
  }, [open, task, categories]);

  const submit = async () => {
    if (!title.trim()) {
      onError("Title is required");
      return;
    }
    setSaving(true);
    try {
      if (task) {
        const res = await fetch(`${API}/tasks/${task.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            ...(categoryId && { categoryId }),
            owner,
            dueDate: dueDate || null,
          }),
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j?.error?.message ?? "Update failed");
        }
        const json = await res.json();
        onSuccess(json.data);
      } else {
        const res = await fetch(`${API}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            residentId,
            categoryId,
            title: title.trim(),
            owner,
            dueDate: dueDate || null,
          }),
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j?.error?.message ?? "Create failed");
        }
        const json = await res.json();
        onSuccess(json.data);
      }
    } catch (e) {
      onError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Edit task" : "New task"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="task-title">Title</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Owner</Label>
            <Select value={owner} onValueChange={(v) => setOwner(v as TaskOwner)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(OWNER_LABEL) as TaskOwner[]).map((k) => (
                  <SelectItem key={k} value={k}>
                    {OWNER_LABEL[k]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="due-date">Due date</Label>
            <Input
              id="due-date"
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={saving}>
            {saving ? <Loader2 className="size-4 animate-spin" /> : null}
            {task ? "Save" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
