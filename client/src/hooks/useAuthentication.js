// src/hooks/useAuthentication.js
import { useState, useEffect } from 'react';

const useAuthentication = () => {
    const [user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    // Function to register a new user:
    const register = async (username, email, password) => {
        try {
            const response = await fetch ('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
            if (!response.ok) {
                throw new Error('Registration Failed ): ');
            } 
            const data = await response.json();
            return data;
        }   catch (err) {
            setError(err.message);
            throw err;
        }
    } 


    //Function to log in an existing user:
    const login = async (username, password) => {
        try {
            const response = await fetch('/login', {
                method: 'POST', 
                headers: { 'Application-Type': 'application/json' },
                body: JSON.stringify ({ username, password }),
            }); //end of trying to fetch
            if (!response.ok) {
                throw new Error('Login Failed ): ');
            } //end of if statement
            const data = await response.json();
            setUser(data); 
            return data;
        }   catch (err) {
            setError(err.message);
            throw err;
        }
    } 


    //Function to check if the user is logged in:
    const checkSession = async() => {
        try {
            const response = await fetch('/check_session', {
                method: 'GET',
                credentials: 'include', //send cookies with the request
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                setUser(null);
            }
        }   catch (err) {
            setError(err.message);
        }  finally {
            setLoading(false);
        }
    }; 



    //Call checkSession on first render:
    useEffect(() => {
        checkSession();
    }, []);


    //Function to log out the user:
    const logout = () => {
        //add logout logic once I create my logout endpoint
    }


    return { user, loading, error, register, login, logout };

} //the big one


export default useAuthentication;
