import api from "./api";

export type Task = {
    id: number;
    title: string;
    description: string;
    status: "todo" | "in-progress" | "done";
};

export async function getTasks(): Promise<Task[]> {
    const res = await api.get("/tasks");
    return res.data;
}

export async function addTask(data: Partial<Task>): Promise<Task> {
    const res = await api.post("/tasks", data);
    return res.data;
}

export async function deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
}

export async function updateTask(id: number, data: Partial<Task>): Promise<void> {
    await api.put(`/tasks/${id}`, data);
}

export async function patchTask(id: number, data: Partial<Task>): Promise<void> {
    await api.patch(`/tasks/${id}`, data);
}
