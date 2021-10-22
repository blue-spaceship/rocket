import Head from 'next/head'

import Styles from './setup.module.scss'

const handler = ({ data }) => {
    return (
        <>
            <Head>
                <title>Setup Application</title>
            </Head>            
            <div className={ Styles.container }>
                <section className={ Styles.subcontainer }>
                    <header className={ Styles.header }>
                        <h1>Setup da aplicação</h1>
                        <p>Certifique-se de que todas as variáveis ambiente estão configuradas e as conexões e integrações funcionando conforme o esperado antes de começar.</p>
                    </header>
                    <section className={ Styles.display }>
                        <section className={ Styles.card }>
                            <header>
                                <h3>Banco de dados</h3>
                            </header>
                            <div className={ Styles.infos }>
                                <div className={ Styles.info }>
                                    <span>String de conexão</span>
                                    <span className={ data.MONGO?.URL ? Styles.success : Styles.danger }>{ data.MONGO?.URL ? 'configurada' : 'não configurado' }</span>
                                </div>
                                <div className={ Styles.info }>
                                    <span>Conexão com banco</span>
                                    <span className={ data.MONGO?.STATUS ? Styles.success : Styles.danger }>{ data.MONGO?.STATUS ? 'bem sucedido' : 'falhou' }</span>
                                </div>
                            </div>
                            <hr className={ Styles.divider } />
                            <div className="text">
                                <p>A string de conexão com o banco deve ser configurada como <code>MONGO_URI</code> e deve conter o nome do banco de dados</p>
                            </div>
                        </section>
                        <section className={ Styles.card }>
                            <header>
                                <h3>Autenticação</h3>
                            </header>
                            <div className={ Styles.infos }>
                                <div className={ Styles.info }>
                                    <span>URL base</span>
                                    <span className={ data.URL ? Styles.success : Styles.danger }>{ data.URL ? 'configurada' : 'não configurado' }</span>
                                </div>
                                <div className={ Styles.info }>
                                    <span>Secret</span>
                                    <span className={ data.SECRET ? Styles.success : Styles.danger }>{ data.SECRET ? 'configurada' : 'não configurado' }</span>
                                </div>
                            </div>
                            <hr className={ Styles.divider } />
                            <div className="text">
                                <p>A URL base deve ser configurada em <code>NEXTAUTH_URL</code> e deve apontar para o host da aplicação. Atualmente está apontando para http://localhost:3000/.</p>
                                <p>O Secrete deve ser configurado em <code>SESSION_SECRET</code> e conter uma cadeia de caracteres aleatórios</p>
                            </div>
                        </section>
                    </section>
                </section>
                <section className={ Styles.subcontainer }>
                    <header className={ Styles.header }>
                        <h2>Integrações</h2>
                        <p>Certifique-se de que todas as variáveis ambiente estão configuradas e as conexões e integrações funcionando conforme o esperado antes de começar.</p>
                    </header>
                    <section className={ Styles.display }>
                        <section className={ Styles.card }>
                            <header>
                                <h3>Sendgrid</h3>
                            </header>
                            <div className={ Styles.infos }>
                                <div className={ Styles.info }>
                                    <span>API KEY</span>
                                    <span className={ data.SENDGRID?.URL ? Styles.success : Styles.danger }>{ data.SENDGRID?.URL ? 'configurada' : 'não configurado' }</span>
                                </div>
                                <div className={ Styles.info }>
                                    <span>Integração</span>
                                    <span className={ data.SENDGRID?.STATUS ? Styles.success : Styles.danger }>{ data.SENDGRID?.STATUS ? 'bem sucedido' : 'falhou' }</span>
                                </div>
                            </div>
                            <hr className={ Styles.divider } />
                            <div className="text">
                                <p>A API KEY deve ser configurada em <code>SENDGRID_API_KEY</code>. E um teste bem sucedido deve ser capas de enviar um e-mail de teste para o e-mail configurado no seed.</p>
                            </div>
                        </section>
                        <section className={ Styles.card }>
                            <header>
                                <h3>Cloudinary</h3>
                            </header>
                            <div className={ Styles.infos }>
                                <div className={ Styles.info }>
                                    <span>URL</span>
                                    <span className={ data.CLOUDINARY?.URL ? Styles.success : Styles.danger }>{ data.CLOUDINARY?.URL ? 'configurada' : 'não configurado' }</span>
                                </div>
                                <div className={ Styles.info }>
                                    <span>Integração</span>
                                    <span className={ data.CLOUDINARY?.STATUS ? Styles.success : Styles.danger }>{ data.CLOUDINARY?.STATUS ? 'bem sucedido' : 'falhou' }</span>
                                </div>
                            </div>
                            <hr className={ Styles.divider } />
                            <div className="text">
                                <p>A URL  deve ser configurada em <code>CLOUDINARY_URL</code>. E um teste bem sucedido deve ser capaz de fazer conexão com a URL e obter informações de status da conta.</p>
                            </div>
                        </section>
                        <section className={ Styles.card }>
                            <header>
                                <h3>Pipeless</h3>
                            </header>
                            <div className={ Styles.infos }>
                                <div className={ Styles.info }>
                                    <span>App name</span>
                                    <span className={ data.PIPELESS?.NAME ? Styles.success : Styles.danger }>{ data.PIPELESS?.NAME ? 'configurada' : 'não configurado' }</span>
                                </div>
                                <div className={ Styles.info }>
                                    <span>API KEY</span>
                                    <span className={ data.PIPELESS?.KEY ? Styles.success : Styles.danger }>{ data.PIPELESS?.KEY ? 'configurada' : 'não configurado' }</span>
                                </div>
                                <div className={ Styles.info }>
                                    <span>Integração</span>
                                    <span className={ data.PIPELESS?.STATUS ? Styles.success : Styles.danger }>{ data.PIPELESS?.STATUS ? 'bem sucedido' : 'falhou' }</span>
                                </div>
                            </div>
                            <hr className={ Styles.divider } />
                            <div className="text">
                                <p>Integração com Pipeless</p>
                            </div>
                        </section>
                    </section>
                </section>
            </div>
        </>
    )
}

handler.getInitialProps = async ({ req }) => {
    var host = req ? `http://${req.headers.host}` : window.location.origin
    const seed = await fetch(`${host}/api/setup`)

    if(seed.status === 200){
        const data = await seed.json()
        return { data }
    }else{
        return { data: {} }
    }
}

handler.noLayout = true

export default handler