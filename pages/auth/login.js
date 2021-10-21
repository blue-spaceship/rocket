import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import { signIn } from 'next-auth/react'

import Styles from './login.module.scss'

const Login = () => {
    const login = async (event) => {
        event.preventDefault()

        const data = await signIn( 'credentials', { username: event.target.username.value, password : event.target.password.value, redirect: false })

        if(data.status === 200){
            window.postMessage({ messaging: true, message: 'Login realizado com sucesso.', type: 'success'  })
            Router.push('/')
        }else if(data.status === 401){ 
            window.postMessage({ messaging: true, message: 'Usuário e/ou senha incorretos', type: 'danger'  })
        }else{
            window.postMessage({ messaging: true, message: 'Falha ao fazer login', type: 'warning'  })
        }
    }

    const [ show, setShow ] = React.useState('show')

    return (
        <div className={ Styles.bgGradient }>
            <div className={ Styles.loginContainer }>
                <Head><title>Login</title></Head>
                <div className={ Styles.container }>
                    <header className={ Styles.header }>
                        <Link href="/">
                            <a><Image src="/assets/icons/logo.svg" alt="Blue Crystal" width={128} height={128} quality={100} objectFit="contain" /></a>
                        </Link>
                        <h1>acesso com credencial</h1>
                        <p>A credencial da acesso a área de gestão, controle e monitoramento do Fluorite.</p>
                    </header>
                    <section className={Styles.box}>
                        <form onSubmit={login} className={Styles.form}>
                            <label className="input-area">
                                <div className="input-label">Usuário</div>
                                <div className="input-field">
                                    <input type="text" required name="username" id="username" autoFocus />
                                </div>
                            </label>
                            <label className="input-area">
                                <div className="input-label">Senha</div>
                                <div className="input-field">
                                    <input type={ show === true ? 'text' : 'password' } required id="password" name="password" />
                                    <button type="button" tabIndex="0" className="btn-icon" onClick={ () => setShow( !show ) } onSelect={ () => setShow( !show ) }>
                                        <span className="material-icons-round">{ (show === true) ? 'visibility_off' : 'visibility' }</span>
                                    </button>
                                </div>
                            </label>
                            <button type="submit" className="btn-submit" aria-expanded="false">Login</button>
                        </form>
                    </section>
                    <footer className={ Styles.footer }>
                        <p><Link href="/auth/forgot"><a>esqueci a senha</a></Link></p>
                    </footer>
                </div>
                <footer className={ Styles.footerPage }>
                    <nav className={ Styles.footerNav }>
                        <span>Dev by <Link href="https://github.com/walmeidaw"><a target="_blank">@walmeidaw</a></Link></span>
                        <Link href="https://blue-crystal.vercel.app"><a target="_blank">Demo</a></Link>
                        <Link href="https://github.com/walmeidaw/blue-crystal"><a target="_blank">Repository</a></Link>
                    </nav>
                </footer>
            </div>
        </div>
    )
}

Login.noLayout = true

export default Login