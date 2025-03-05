import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../helper/basic";
export default function AdminLogic() {
    const [password, setPassword] = useState("admin");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${URL}/api/auth/admin-login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // credentials: "include",
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            // Redirect to admin dashboard
            if (data.redirect) {
                navigate(data.redirect);
            }
        } catch (error) {
            console.log(error)
            setError(error.message);
        }
    };

    return (
        <div id="admin-login">
            <h2>Admin Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form id="admin-login-form" onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-blue-900 text-white" type="submit">Login</button>
            </form>
        </div>
    );
}
