import { FormEvent, useState } from "react";
import Input from "../../components/Input";

import { auth } from "../../services/firebaseConnections";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Titulo } from "../../components/Titulo";

export function Login() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();

    function handleSubmit( e: FormEvent<HTMLFormElement> ) {
        e.preventDefault();

        if (email == '' || password == '') {
            alert( "Preencha todos os campos");
            return;
        }

        signInWithEmailAndPassword( auth, email, password)
        .then( () => {
            navigate("/admin", {replace: true});
        })
        .catch( (error) => {
            console.log('ERRO AO FAZER O LOGIN:')
            console.log(error);
        })


        console.log(email, password);
    }

    return(
        <div className="flex w-full h-screen items-center justify-center flex-col ">
            <header className="w-full max-w-2xl mt-4 px-1">
                <Titulo texto="Login" />
            </header>
            
            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2" >
                <Input
                    type="email"
                    placeholder="Digite seu email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />

                <Input
                    type="password"
                    placeholder="********"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />

                <button type="submit"
                    className="h-9 bg-blue-600 rounded border-0 text-lg font-medium">Acessar
                </button>
            </form>
        </div>
    )
}