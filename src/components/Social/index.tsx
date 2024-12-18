import { ReactNode } from "react"

interface SocialProps {
    url: string | undefined;
    children: ReactNode
}
export function Social( {url, children} : SocialProps) {
    return (
        <a 
            href={url}
            rel="noreferrer noopenner"
            target="_blank" 
        >
            {children}
        </a>
    )
}