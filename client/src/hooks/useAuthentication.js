import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useAuthentication = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory(); 

    let backendUrl = process.env.REACT_APP_PROXY_URL; 

    // Function to register a new user:
    const register = async (username, email, password) => {
        try {
            const response = await fetch(`${backendUrl}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Registration Failed ): ');
            } 
            const data = await response.json();
            // Navigate to HomePage after successful registration
            history.push('/home_page');
            return data;
        }   catch (err) {
            setError(err.message);
            throw err;
        }
    };

    // Function to log in an existing user:
    const login = async (username, password) => {
        try {
            const response = await fetch(`${backendUrl}/api/login`, {
                method: 'POST',  
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify ({ username, password }),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Login Failed  ): ');
            }
            const data = await response.json();
            setUser(username); // Set user to the username after login
            // Push to HomePage after successful login
            history.push('/home_page');
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    // Function to check if the user is logged in:
    const checkSession = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/check_session`, {
                method: 'GET',
                credentials: 'include', // Send cookies with the request
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }; 

    // Function to log out the user:
    const logout = async () => {
        try {
            const response = await fetch('/api/logout', { method: "DELETE" });
            if (response.ok) {
                setUser(null); // Set user to null upon successful logout
                history.push('/register');
                console.log('logged out')
            } else {
                // If response is not ok, throw an error
                throw new Error('Logout failed');
            }
        } catch (error) {
            // Handle any errors that occur during the logout process
            setError(error.message);
            console.error('Logout Error:', error);
        }
    };

    // Call checkSession on first render:
    useEffect(() => {
        checkSession();
        // eslint-disable-next-line
    }, []); // Come back to this

    return { user, loading, error, register, login, logout };
}

export default useAuthentication;
