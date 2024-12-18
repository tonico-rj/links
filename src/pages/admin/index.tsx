import { FormEvent, useEffect, useState } from "react"
import Cabecalho from "../../components/Cabecalho"
import Input from "../../components/Input"

import { FiTrash } from "react-icons/fi"
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore"
import { db } from "../../services/firebaseConnections"

interface LinksProps {
    id: string,
    name: string
    url: string
    textColor: string
    backgroundColor: string
}


export function Admin() {
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#F1F1F1") 
    const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")
    const [links, setLinks] = useState<LinksProps[]>([])

    useEffect( () => {
        const linksRef = collection(db, "links")
        const q = query(linksRef, orderBy("created", "desc"))
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let lista = []

            snapshot.forEach((doc) => { 
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    textColor: doc.data().textColor,
                    backgroundColor: doc.data().backgroundColor
                })
                setLinks(lista);
            })
        })

        return (() => {
            unsubscribe()
        })

    }, [])

    async function handleRegisterLinks(e : FormEvent) {
        console.log('handleRegister definida');
        e.preventDefault();
        
        if (nameInput === '' || urlInput === '') {
            alert('Preencha todos os campos');
            return;
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            textColor: textColorInput,
            backgroundColor: backgroundColorInput,
            created: new Date()
        })
        .then(() => {
            setNameInput("")
            setUrlInput("")

            console.log('Link cadastro com sucesso');
        })
        .catch((error) => {
            console.log("Erro ao cadastrar link", error);
        })
    }

    // exclui o registro
    async function handleDeleteLink(id: string) {
        const linkRef = doc(db, "links", id)
        await deleteDoc(linkRef)
    }

    return(
        <div className="flex flex-col items-center w-full py-4  justify-center">
            <Cabecalho titulo="Admin"></Cabecalho>

            <form className="flex flex-col mt-8 w-full max-w-xl" onSubmit={handleRegisterLinks}>
                <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                <Input 
                    placeholder="Digite o nome do link..."
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />
                
                <label className="text-white font-medium mt-2 mb-2">URL do Link</label>
                <Input 
                    type="url"
                    placeholder="Digite a url do link..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5">
                    <div>
                        <label className="text-white font-medium mt-2 mb-2">
                            Cor do Link
                        </label>
                        <input 
                            className="ml-2"
                            type="color" 
                            value={textColorInput} 
                            onChange={(e) => setTextColorInput(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-white font-medium mt-2 mb-2">
                            Fundo do Link
                        </label>
                        <input 
                            className="ml-2"
                            type="color" 
                            value={backgroundColorInput} 
                            onChange={(e) => setBackgroundColorInput(e.target.value)}
                        />
                    </div>
                </section>

                { nameInput !== '' && (
                <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                    <label className="text-white font-medium mt-2 mb-3">
                        Veja como está ficando:
                    </label>
                    <article 
                        className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                        style={{ marginBottom:8, marginTop:8, backgroundColor: backgroundColorInput, color: textColorInput }}
                    >
                        <p>{nameInput}</p>
                    </article>
                </div>
                )}
                <button 
                    type="submit"
                    className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4"
                >
                    Cadastrar
                </button>
            </form>

            <h2 className="font-bold text-white mbb-4 text-2xl">
                Meus Links
            </h2>

            {
                links.map((link) => (
                    <article 
                        key={link.id}   
                        className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
                        style={{ backgroundColor: link.backgroundColor, color: link.textColor}}
                    >
                        <p>{link.name}</p>
                        <div>
                            <button
                                className="border border-dashed p-1 rounded bg-neutral-900"
                                onClick={()=> handleDeleteLink(link.id)}
                            >
                                <FiTrash size={18} color="#FFFFFF" />
                            </button>
                        </div>
                    </article>
                ))
            }

        </div>
    )
}