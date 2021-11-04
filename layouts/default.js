import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Auth from '/components/auth/acm'
import Rules from '/components/auth/rules'

import Styles from './default.module.scss'
import { useRouter } from 'next/dist/client/router'

function Layout({ ignore, children }){
    const [ toogle, setToggle ] = useState(false)

    function closeToggle(){
        setToggle(false)
    }

    return ignore ? 
        children : 
        <div className={ Styles.container }>
            <button className={ toogle ? Styles.toogleActive : Styles.toogle } onClick={ () => { setToggle( !toogle ) } } >
                <span className="material-icons-round">{ toogle ? 'close' : 'menu' }</span>
            </button>
            <div className={ Styles.barArea }>
                <aside className={ toogle ? Styles.barActive : Styles.bar }>
                    <div className={ Styles.logo }>
                        <Link href="/">
                            <a onClick={()=>{ closeToggle() }}>
                                <Image src="/assets/icons/logo.png" width={64} height={64} quality={100} layout="fixed" alt="Blue Spaceship Icon" />
                                <h1>Blue Spaceship</h1>
                            </a>
                        </Link>
                    </div>
                    <menu className={ Styles.menu }>
                        <Auth auth={false}>
                            <Link href="/login"><a onClick={()=>{ closeToggle() }} className={ Styles.high }>Login</a></Link>
                            <div className="divider"></div>
                        </Auth>
                        <Link href="/"><a onClick={()=>{ closeToggle() }} className={ useRouter().pathname === "/" ? Styles.active : '' }>Home</a></Link>
                        <Auth { ...Rules['/manager/users'] }>
                            <Link href="/manager/users"><a onClick={()=>{ closeToggle() }} className={ useRouter().pathname === "/manager/users" ? Styles.active : '' }>Usuários</a></Link>
                        </Auth>
                        <Auth { ...Rules['/manager/roles'] }>
                            <Link href="/manager/roles"><a onClick={()=>{ closeToggle() }} className={ useRouter().pathname === "/manager/roles" ? Styles.active : '' }>Papeis</a></Link>
                        </Auth>
                        <Auth>
                            <div className="divider"></div>
                            <Link href="/auth/logout"><a onClick={()=>{ closeToggle() }} className={ Styles.low }>Logout</a></Link>
                        </Auth>
                    </menu>
                </aside>
            </div>
            <section className={ Styles.display }>{ children }</section>
        </div>
}

export default Layout