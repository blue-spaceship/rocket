import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Auth from '/components/auth/acm'

import Styles from './default.module.scss'

function Layout({ ignore, children }){
    const [ toogle, setToggle ] = useState(false)

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
                            <a>
                                <Image src="/assets/icons/logo.svg" width={64} height={64} />
                                <h1>Blue Crystal</h1>
                            </a>
                        </Link>
                    </div>
                    <menu className={ Styles.menu }>
                        <Auth auth={false}>
                            <Link href="/login"><a tabIndex="0">Login</a></Link>
                            <div className="divider"></div>
                        </Auth>
                        <Link href="/"><a tabIndex="1">Home</a></Link>
                        <Auth>
                            <Link href="/manager/users"><a tabIndex="2">Usuários</a></Link>
                            <div className="divider"></div>
                            <Link href="/auth/logout"><a tabIndex="3">Logout</a></Link>
                        </Auth>
                    </menu>
                </aside>
            </div>
            <section className={ Styles.display }>{ children }</section>
        </div>
}

export default Layout