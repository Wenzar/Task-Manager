import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleRegister() {
        setError("");
        if (!username || !password) {
            setError("Заполните все поля");
            return;
        }

        try {
            await api.post("/users/register", { username, password });
            navigate("/login");
        } catch (err) {
            setError("Ошибка регистрации. Пользователь уже существует?");
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="bg-white p-6 rounded-xl shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Регистрация</h2>

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
                    onClick={handleRegister}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
                >
                    Зарегистрироваться
                </button>

                <p className="text-sm mt-3 text-center">
                    Уже есть аккаунт?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Войти
                    </a>
                </p>
            </div>
        </div>
    );
}
