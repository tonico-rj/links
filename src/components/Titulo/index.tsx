interface TituloProps{
    texto : string;
}

export function Titulo( {texto} : TituloProps) {
    return (
        <>
            <h1 className="mt-11 text-center text-white font-bold text-5xl">Tonico.net
            </h1>
            <h1 className="text-center font-bold text-3xl bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent h-14">
                {texto}
            </h1>
        </>
    )
}