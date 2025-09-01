import { createContext, useEffect, useReducer } from 'react';

// Retrieve user from local storage
const storedUser = localStorage.getItem("user");
let user = null;
if (storedUser !== null) {
    try {
        user = JSON.parse(storedUser);
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
    }
}

// Initial state with the retrieved user from local storage
const initial_state = {
    user,
    loading: false,
    error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                ...state, // Preserve other state properties
                user: null,
                loading: true,
                error: null
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state, // Preserve other state properties
                user: action.payload,
                loading: false,
                error: null
            };
        case 'LOGIN_FAILURE':
            return {
                ...state, // Preserve other state properties
                user: null,
                loading: false,
                error: action.payload
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state, // Preserve other state properties
                user: null,
                loading: false,
                error: null,
            };
        case 'LOGOUT':
            return {
                ...state, // Preserve other state properties
                user: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initial_state);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
