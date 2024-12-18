import { ReactNode, useState, useEffect } from "react";
import { auth } from "../../services/firebaseConnections";
import { onAuthStateChanged } from "firebase/auth"; 
import { Navigate } from "react-router-dom";

interface PrivateProps {
    children : ReactNode;
}



export function Private( {children} : PrivateProps) : any {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect( () => {
        const unsub = onAuthStateChanged( auth, (user) => {
            if (user) {
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }
                
                localStorage.setItem("@reaclinks", JSON.stringify(userData));
                setLoading(false);
                setSigned(true);
            }
            else {
                console.log('NÃO TEM USUÁRIO LOGADO!');
                setLoading(false);
                setSigned(false);
            }
        })

        return () => {
            unsub();
        }

    }, [])

    if (loading) {
        return null;
    }

    if (!signed) {
        return <Navigate to="/login" replace={true}></Navigate>
    }
    
    //return <Outlet></Outlet>
    return children;
}
       