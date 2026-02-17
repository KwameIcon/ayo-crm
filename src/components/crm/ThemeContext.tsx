import { createContext, useContext, useState, useEffect, type SetStateAction, type Dispatch } from 'react';

const ThemeContext = createContext<ThemeContextType | null>(null);

export type ThemeContextType = {
    theme: string;
    role: string;
    setRole: Dispatch<SetStateAction<string>>;
    toggleTheme: () => void;
    toggleRole: () => void;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {


    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('ayo-theme') || 'light';
        }
        return 'light';
    });

    const [role, setRole] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('ayo-role') || 'admin';
        }
        return 'admin';
    });


    useEffect(() => {
        localStorage.setItem('ayo-theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);



    useEffect(() => {
        localStorage.setItem('ayo-role', role);
    }, [role]);


    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };



    const toggleRole = () => {
        setRole(prev => prev === 'admin' ? 'agent' : 'admin');
    };



    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, role, setRole, toggleRole }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};