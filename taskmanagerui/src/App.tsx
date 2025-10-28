import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <NavBar />
                <div className="p-6">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/tasks"
                            element={
                                <ProtectedRoute>
                                    <Tasks />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
