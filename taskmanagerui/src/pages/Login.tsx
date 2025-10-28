import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogin() {
        setError("");
        if (!username || !password) {
            setError("Введите логин и пароль");
            return;
        }

        try {
            const res = await api.post("/users/login", { username, password });
            localStorage.setItem("token", res.data.token);
            navigate("/tasks");
        } catch (err: any) {
            setError("Неверный логин или пароль");
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="bg-white p-6 rounded-xl shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Вход</h2>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <input
                    className="w-full border border-gray-300 rounded-md p-2 mb-3"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="w-full border border-gray-300 rounded-md p-2 mb-3"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                >
                    Войти
                </button>

                <p className="text-sm mt-3 text-center">
                    Нет аккаунта?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Зарегистрироваться
                    </a>
                </p>
            </div>
        </div>
    );
}
