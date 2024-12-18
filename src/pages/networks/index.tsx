import { FormEvent, useEffect, useState } from "react"
import Cabecalho from "../../components/Cabecalho"
import Input from "../../components/Input"

import { db } from "../../services/firebaseConnections"
import { setDoc, getDoc, doc } from "firebase/firestore"

export function Networks() {
    const [facebookInput, setFacebookInput] = useState("")
    const [instagramInput, setInstagramInput] = useState("")
    const [twitterInput, setTwitterInput] = useState("")
    const [youtubeInput, setYoutubeInput] = useState("")

    function handleRegister(e: FormEvent) {
        e.preventDefault();

        setDoc( 
            doc( db, "sociais", "links"), {
            facebook: facebookInput,
            instagram: instagramInput,
            twitter: twitterInput,
            youtube: youtubeInput
        })
        .then( () => {
            console.log('Redes sociais salvas com sucesso!')
        })
        .catch( (error) => {
            console.log('Erro ao salvar redes sociais', error)
        })
    }

    useEffect( () => {
        async function getLinks() {
            const docRef = doc(db, "sociais", "links")
            getDoc(docRef)
            .then((doc) => {
                if (doc.exists()) {
                    setFacebookInput(doc.data() .facebook)
                    setInstagramInput(doc.data().instagram)
                    setTwitterInput(doc.data().twitter)
                    setYoutubeInput(doc.data().youtube)
                }
            })
            .catch( (error) => {
                console.log('Erro ao buscar redes sociais', error)
            })
        }

        getLinks()
    } , [])


    return(
        <div className="flex flex-col items-center w-full py-4  justify-center">
            <Cabecalho titulo="Redes Sociais"></Cabecalho>


            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Input
                    name="facebook"
                    type="url"
                    placeholder="Digite a url do facebook..."
                    value={facebookInput}
                    onChange={(e) => setFacebookInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do Instagram</label>
                <Input
                    name="instagram"
                    type="url"
                    placeholder="Digite a url do instagram..."
                    value={instagramInput}
                    onChange={(e) => setInstagramInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do twitter</label>
                <Input
                    name="twitter"
                    type="url"
                    placeholder="Digite a url do twitter..."
                    value={twitterInput}
                    onChange={(e) => setTwitterInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do youtube</label>
                <Input
                    name="youtube"
                    type="url"
                    placeholder="Digite a url do youtube..."
                    value={youtubeInput}
                    onChange={(e) => setYoutubeInput(e.target.value)}
                />                

                <button
                    type="submit"
                    className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4"
                >
                    Salvar Links
                </button>

            </form>
        </div>
    )
}