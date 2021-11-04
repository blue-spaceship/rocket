import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import Axios from 'axios'
import { Btn } from '/components/default/btn'

import Styles from './login.module.scss'

function Page({ setLoading }){
    const resetPassword = async (event) => {
        event.preventDefault()
        setLoading(true)
        Axios.post(`/api/auth/passwordReset`, { 
            reference: event.target.reference.value
        }).then(result=>{
            window.postMessage({ messaging: true, message: 'Uma nova senha foi enviada para seu e-mail.', type: 'success'  })
            setLoading(false)
            Router.push('/login')
        }).catch(error=>{
            if(error.response.status === 404){
                window.postMessage({ messaging: true, message: 'Usuário ou e-mail não cadastrado', type: 'warning'  })
            }else{
                window.postMessage({ messaging: true, message: 'Falha ao tentar resetar a senha', type: 'danger'  })
            }
        }).finally(()=>{
            setLoading(false)
        })
    }

    return (
        <div className={ Styles.bgGradient }>
            <div className={ Styles.loginContainer }>
                <Head><title>Resetar senha</title></Head>
                <div className={ Styles.container }>
                    <header className={ Styles.header }>
                        <Link href="/">
                            <a><Image src="/assets/icons/logo.png" alt="Blue Crystal" width={80} height={80} quality={100} objectFit="contain" alt="Blue Spaceship Icon" /></a>
                        </Link>
                        <h1>resetar senha</h1>
                        <p>Entre com seu usuário ou e-mail para receber uma nova senha.</p>
                    </header>
                    <section className={Styles.box}>
                        <form onSubmit={resetPassword} className={Styles.form}>
                            <label className="input-area">
                                <div className="input-label">Usuário ou e-mail</div>
                                <div className="input-field">
                                    <input type="text" required name="reference" id="reference" autoFocus />
                                </div>
                            </label>
                            <Btn type="submit" data-type="submit">Resetar</Btn>
                        </form>
                    </section>
                    <footer className={ Styles.footer }>
                        <p><Link href="/login"><a>voltar e fazer login</a></Link></p>
                    </footer>
                </div>
                <footer className={ Styles.footerPage }>
                    <nav className={ Styles.footerNav }>
                        <span>Dev by <Link href="https://github.com/walmeidaw"><a target="_blank">@walmeidaw</a></Link></span>
                        <Link href="https://bluespaceship.vercel.app"><a target="_blank">Demo</a></Link>
                        <Link href="https://github.com/walmeidaw/blue-spaceship"><a target="_blank">Repository</a></Link>
                    </nav>
                </footer>
            </div>
        </div>
    )
}

Page.noLayout = true

export default Page