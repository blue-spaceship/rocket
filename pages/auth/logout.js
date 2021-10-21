import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

export default function Logout(){
    useEffect(()=>{
        window.postMessage({ messaging: true, message: 'Deslogado', type: 'default'  });
        signOut({ callbackUrl: '/' })
    }, [])
    return <></>
}

Logout.noLayout = true