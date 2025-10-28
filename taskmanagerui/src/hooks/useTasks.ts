import { useEffect, useState } from "react";
import { type Task, getTasks, addTask, deleteTask, patchTask, updateTask } from "../api/tasksApi";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getTasks().then(setTasks);
    }, []);

    async function createTask(title: string) {
        const newTask = await addTask({
            title: title,
            description: "Описание по умолчанию",
            status: "todo"
        });
        setTasks([...tasks, newTask]);
    }

    async function removeTask(id: number) {
        await deleteTask(id);
        setTasks(tasks.filter(t => t.id !== id));
    }

    async function changeStatus(id: number, status: Task["status"]) {
        await patchTask(id, { status });
        setTasks(tasks.map(t => (t.id === id ? { ...t, status } : t)));
    }

    async function editTask(id: number, title: string) {
        await updateTask(id, { title, description: "Описание по умолчанию" });
        setTasks(tasks.map(t => (t.id === id ? { ...t, title } : t)));
    }

    return { tasks, createTask, removeTask, changeStatus, editTask };
}
