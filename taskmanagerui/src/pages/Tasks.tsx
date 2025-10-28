import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTasks } from "../hooks/useTasks";

export default function Tasks() {
    const { tasks, createTask, removeTask, changeStatus, editTask } = useTasks();
    const [newTask, setNewTask] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState("");
    const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);
    const [dragOverStatus, setDragOverStatus] = useState<string | null>(null);

    const handleAdd = () => {
        if (!newTask.trim()) return;
        createTask(newTask);
        setNewTask("");
    };

    const handleSave = (id: number) => {
        if (!editingText.trim()) return;
        editTask(id, editingText);
        setEditingId(null);
        setEditingText("");
    };

    const statuses = ["todo", "in-progress", "done"] as const;
    const titles = { "todo": "Новые", "in-progress": "В работе", "done": "Готово" };
    const colors = { "todo": "bg-blue-100 border-blue-300", "in-progress": "bg-yellow-100 border-yellow-300", "done": "bg-green-100 border-green-300" };

    const handleDragStart = (id: number) => setDraggedTaskId(id);
    const handleDragOver = (e: React.DragEvent, status: string) => {
        e.preventDefault();
        setDragOverStatus(status);
    };
    const handleDragLeave = () => setDragOverStatus(null);
    const handleDrop = (status: string) => {
        if (draggedTaskId !== null) changeStatus(draggedTaskId, status as any);
        setDraggedTaskId(null);
        setDragOverStatus(null);
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6">
            <h2 className="text-2xl font-semibold mb-6">My Kanban</h2>

            <div className="flex mb-6">
                <input
                    className="flex-1 border p-3 rounded-l-lg"
                    placeholder="Новая задача..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                />
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                    Добавить
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statuses.map(status => (
                    <div
                        key={status}
                        className={`border-2 rounded-lg p-4 min-h-[300px] transition-colors ${colors[status]} ${dragOverStatus === status ? "ring-4 ring-blue-400 bg-blue-50" : ""
                            }`}
                        onDragOver={(e) => handleDragOver(e, status)}
                        onDragLeave={handleDragLeave}
                        onDrop={() => handleDrop(status)}
                    >
                        <h3 className="text-lg font-semibold mb-4 text-center">
                            {titles[status]} ({tasks.filter(t => t.status === status).length})
                        </h3>

                        <AnimatePresence>
                            {tasks
                                .filter(t => t.status === status)
                                .map(task => (
                                    <motion.div
                                        key={task.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-white p-3 rounded-lg shadow-sm border mb-3 cursor-move"
                                        draggable
                                        onDragStart={() => handleDragStart(task.id)}
                                    >
                                        {editingId === task.id ? (
                                            <>
                                                <input
                                                    className="w-full border p-2 rounded mb-2"
                                                    value={editingText}
                                                    onChange={(e) => setEditingText(e.target.value)}
                                                    onKeyDown={(e) => e.key === "Enter" && handleSave(task.id)}
                                                    autoFocus
                                                />
                                                <div className="flex space-x-2">
                                                    <button onClick={() => handleSave(task.id)} className="flex-1 bg-green-500 text-white py-1 rounded">✓</button>
                                                    <button onClick={() => setEditingId(null)} className="flex-1 bg-gray-500 text-white py-1 rounded">✗</button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div
                                                    className="cursor-pointer mb-2"
                                                    onDoubleClick={() => { setEditingId(task.id); setEditingText(task.title); }}
                                                >
                                                    {task.title}
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-500">{titles[task.status]}</span>
                                                    <button
                                                        onClick={() => removeTask(task.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        Удалить
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                ))}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
