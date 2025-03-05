import { useState } from "react"
import { Link, useNavigate} from "react-router-dom";
import { URL } from "../helper/basic";

export default function (){
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [matric_no, setMatricno] = useState('');
    const [username, setName] = useState('');
    const [error, setError] = useState('  ');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const response = await fetch(`${URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, matric_no, username }),
        });
        const data = await response.json();
        
        if (data.exists) {
            setError(data.msg);
        }else if (!response.ok) {
            setError(data.message);
        }
         else {
            navigate(`/voting?matric_no=${matric_no}&student_name=${username}`);
        }
    };

    return (
    <div id="register">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={(e) => setName(e.target.value)}  type="text" id="register-name" placeholder="Full Name" required />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="register-email" placeholder="Email" required />
            <input value={matric_no} onChange={(e) => setMatricno(e.target.value)} type="text" id="matric" placeholder="Matric Number" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)}  type="password" id="register-password" placeholder="Password" required />
           <button type="submit">Register</button>
           {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <p>Already have an account? <Link to='/login'>Login</Link>
        </p>
    </div>
    )
}