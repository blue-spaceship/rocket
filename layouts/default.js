import Styles from './default.module.scss'
import Link from 'next/link'
import Auth from '/components/auth/acm'

function Layout({ ignore, children }){
    return ignore ? 
        children : 
        <div className={ Styles.container }>
            <aside className={ Styles.bar }>                
				<Auth auth={false}>
                    <Link href="/login"><a>Login</a></Link>
                    <hr/>
                </Auth>
                <Link href="/"><a>Home</a></Link>
                <Auth>
                    <Link href="/manager/users"><a>Usuários</a></Link>
                    <hr/>
                    <Link href="/auth/logout"><a>Logout</a></Link>
                </Auth>
            </aside>
            <section className={ Styles.display }>{ children }</section>
        </div>
}

export default Layout