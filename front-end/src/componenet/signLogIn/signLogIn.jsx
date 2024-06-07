
import React,{useState,useContext} from 'react'
import axios from "axios"
import "./signLogIn.css"
import { CartContext } from '../context/storeContext';
const signLogIn = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const{fetchItems}=useContext(CartContext);
    
    const signup = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/registor', {
                name,
                email,
                password,
            });

            const { token } = response.data;
            
            localStorage.setItem('token', token);
            alert('Sign up successful!');
            // Redirect or further actions after signup
        } catch (error) {
            console.error('Error signing up', error);
            alert('Error signing up');
        }
    };
    const login = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', {
                
                email,
                password,
            });

            const { token } = response.data;
            
            localStorage.setItem('token', token);
            alert('log in successful!');
            // Redirect or further actions after signup
        } catch (error) {
            console.error('Error signing up', error);
            alert('Error log in up');
        }
    };
    const handleAuth = (e) => {
        e.preventDefault();
        if (isLogin) {
            
            login();
            fetchItems();
        } else {
            
            signup();
            fetchItems();
        }
      
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
        setName('');
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleAuth}>
                   
                {!isLogin && (
                        <div className="input-group">
                            <label htmlFor="confirm-password">Name</label>
                            <input
                                type="name"
                                id="confirm-password"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                 
                    <button type="submit" className="auth-btn">{isLogin ? 'Login' : 'Sign Up'}</button>
                </form>
                <div className="toggle-link" onClick={toggleAuthMode}>
                    {isLogin ?'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
                </div>
            </div>
        </div>
    );
}

export default signLogIn