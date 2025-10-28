import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between">
            <h1 className="font-bold text-xl">Task Tracker</h1>
            <div className="space-x-4">
                <Link to="/">Login</Link>
            </div>
        </nav>
    );
}
