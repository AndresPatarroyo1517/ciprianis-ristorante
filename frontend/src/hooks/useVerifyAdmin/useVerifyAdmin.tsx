import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

export const useVerifyAdmin = () => {
    const { user } = useAuth()
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

    useEffect(() => {
        if (user) {
            setIsAdmin(user.role === 'administrador');
        } else {
            setIsAdmin(false)
        }
    }, [user])

    return isAdmin
};