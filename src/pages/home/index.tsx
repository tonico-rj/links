import { useEffect, useState } from "react"
import Cabecalho from "../../components/Cabecalho"
import { Social } from "../../components/Social"
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import { db } from "../../services/firebaseConnections"     
import { getDocs, collection, query, orderBy, doc, getDoc } from "firebase/firestore"

interface LinksProps {
    id: string,
    name: string,
    url: string,
    textColor: string,
    backgroundColor: string
}

interface SocialProps {
    facebook: string | undefined;
    instagram: string | undefined;
    twitter: string | undefined;
    youtube: string | undefined;
}

export function Home() {

    const [links, setLinks] = useState<LinksProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialProps>()

    useEffect( () => {
        function loadLinks() {
            const linksRef = collection(db, "links")
            const queryRef = query(linksRef, orderBy("created", "desc"))

            getDocs(queryRef)
            .then((snapshot) => {
                let lista = [] as LinksProps[]

                snapshot.forEach((doc) => {
                    lista.push( {
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        textColor: doc.data().textColor,
                        backgroundColor: doc.data().backgroundColor
                    })
                })
                setLinks(lista);
            })
        }
        loadLinks();
    }, [])

    useEffect( () => {

        function getSocialLinks() {
            const docRef = doc(db, "sociais", "links")
            getDoc(docRef)
            .then((doc) => {
                if (doc.data() !== undefined) {
                    setSocialLinks(
                        {
                            facebook    : doc.data()?.facebook,
                            instagram   : doc.data()?.instagram,
                            twitter     : doc.data()?.twitter,
                            youtube     : doc.data()?.youtube
                        }
                    )
                }
            })
            .catch( (error) => {
                console.log('Erro ao buscar redes sociais', error)
            })
        }

        getSocialLinks()
    }, [])


    return(
        <>
            <div className="flex flex-col items-center w-full py-4  justify-center">
                <Cabecalho titulo="Home"></Cabecalho>
                <span className="text-gray-50 mb-5 mt-3">Veja meus links</span>

                <main className="flex flex-col w-11/12 max-w-xl text-center">
                    {
                        links.map( (link) => (
                            <section 
                                key={link.id} 
                                style={{ backgroundColor: link.backgroundColor, color: link.textColor }} 
                                className="bg-white md-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer mb-4" 
                            >
                                <a href={link.url} target="_blank">
                                    <p className="text-base md:text-lg">{link.name}</p>
                                </a>
                            </section>
                        ))
                    }

                    {
                        socialLinks && Object.keys(socialLinks).length > 0 && (
                            <footer className="flex justify-center gap-3 my-4">
                                <Social url={socialLinks?.facebook}>
                                    <FaFacebook size={35} color="#FFFFFF" />
                                </Social>

                                <Social url={socialLinks?.youtube}>
                                    <FaYoutube size={35} color="#FFFFFF" />
                                </Social>

                                <Social url={socialLinks?.instagram}>
                                    <FaInstagram size={35} color="#FFFFFF" />
                                </Social>

                                <Social url={socialLinks?.twitter}>
                                    <FaTwitter size={35} color="#FFFFFF" />
                                </Social>
                            </footer>
                        )
                    }
                </main>
            </div>
        </>
    )
}