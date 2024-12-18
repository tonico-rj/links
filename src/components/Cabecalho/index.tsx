import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi"
import { Titulo } from "../Titulo";

import { auth } from "../../services/firebaseConnections";
import { signOut } from "firebase/auth";

interface CabecalhoProps {
    titulo : string;
}

export default function Cabecalho( {titulo} : CabecalhoProps) {

    async function handleLogout() {
        await signOut(auth)
    }

    return (
        <header className="w-full max-w-2xl mt-4 px-1">
            <Titulo texto={titulo? titulo : ""}></Titulo>
            <nav className="w-full bg-white h-12 flex items-center justify-between rounded-md px-3">
                <div className="flex gap-4 font-medium">
                    <Link to="/">Home</Link>
                    <Link to="/admin">Admin</Link> 
                    <Link to="/networks">Redes Sociais</Link>
                </div>

                <button onClick={handleLogout}>
                    <BiLogOut size={28} color="red"/>
                </button>
            </nav>
        </header>
    )
}