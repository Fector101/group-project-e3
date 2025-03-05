import { useState } from "react"

import { Link, useNavigate} from "react-router-dom";
import { URL } from "../helper/basic";

export default function Loginpage(){

    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [matric_no, setMatricno] = useState('');
    const [error, setError] = useState('  ');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const response = await fetch(`${URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password, matric_no }),
        });
        const data = await response.json();
        
        if (data.exists) {
            setError('Student already exists');
        }else if (!response.ok) {
            setError(data.msg);
        }
         else {
            console.log(data.msg)
            navigate(`/voting?matric_no=${matric_no}&student_name=${data.msg}`);
        }
    };
    return (
        <div id="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input value={matric_no} onChange={e=>setMatricno(e.target.value)} name="matric_no" type="text" id="login-matric" placeholder="Matric Number" required />
                <input value={password} onChange={e=>setPassword(e.target.value)} name="password" type="password" id="login-password" placeholder="Password" required />
                <button type="submit">Login</button>
               {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <p>Don't have an account yet? <Link to='/signup'> Register</Link>
            </p>
        </div>
    )
}