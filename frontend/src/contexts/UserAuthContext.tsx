import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    User as FirebaseUser,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

interface User extends FirebaseUser {
    role?: string;
}

interface AuthContextType {
    user: User | null; 
    logIn: (email: string, password: string) => Promise<User>;
    signUp: (email: string, password: string, role: string) => Promise<User>;
    logOut: () => Promise<void>;
    isLoading: boolean;
}

const userAuthContext = createContext<AuthContextType | null>(null);

interface UserAuthContextProviderProps {
    children: ReactNode;
}

export function UserAuthContextProvider({ children }: UserAuthContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const logIn = async (email: string, password: string): Promise<User> => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const currentUser = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const userWithRole = { ...currentUser, role: userData.role } as User;
            setUser(userWithRole);
            return userWithRole;
        }

        return currentUser as User;
    };

    const signUp = async (email: string, password: string, role: string): Promise<User> => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const currentUser = userCredential.user;

        await setDoc(doc(db, "users", currentUser.uid), {
            email: email,
            role: role,
            createdAt: serverTimestamp(),
        });

        const userWithRole = { ...currentUser, role: role } as User;
        setUser(userWithRole);
        
        return userWithRole;
    };

    const logOut = async () => {
        await signOut(auth);
        setUser(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setIsLoading(true);
            if (currentUser) {
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUser({ ...currentUser, role: userData.role } as User);
                } else {
                    setUser(currentUser as User);
                }
            } else {
                setUser(null); // ถ้าไม่มีผู้ใช้ ตั้งค่าเป็น null
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <userAuthContext.Provider value={{ user, logIn, signUp, logOut, isLoading }}>
            {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    const context = useContext(userAuthContext);
    if (!context) {
        throw new Error('useUserAuth must be used within a UserAuthContextProvider');
    }
    return context;
}
