import { useState } from 'react'
import Link from 'next/link'
import Axios from 'axios'

import { Header, Main, Content } from "/components/default/page"
import { Btn } from '/components/default/btn'
import { Input, TextBox } from "/components/default/input"

import Style from '/components/default/page.module.scss'
import { useRouter } from 'next/router'

const handler = ({ setLoading }) => {
    const router = useRouter()
    const [data, setData] = useState({ _id: '', name: '' })

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        await Axios.post('/api/roles', data).then(res => {
            setLoading(false)
            if(res.status === 200) {
                window.postMessage({ messaging: true, type: 'success', title: 'Pronto!', message: 'Papel cadastrado com sucesso' })
                router.push('/manager/roles')
            } else {
                window.postMessage({ messaging: true, type: 'danger', title: `Erro ${ res.status }`, message: `Algo deu errado` })
            }
        }).catch(err => {
            window.postMessage({ messaging: true, type: 'danger', title: 'Algo deu errado', message: err.response.data.message })
            setLoading(false)
        })
    }

    return (
        <Main>
            <>
                <Header>
                    <h2>Adicionar Papel</h2>
                </Header>
                <Content>
                    <form style={{ display: 'flex', gap: '4rem', flexDirection: 'column' }} onSubmit={ handleSubmit }>
                        <div className={ Style.form }>
                            <div className={ Style.formGroup }>
                                <Input label="Slug" 
                                    input={{ 
                                        required: true, 
                                        value: data._id, 
                                        onChange: (e) => {
                                            setData({ ...data, _id: e.target.value })
                                        }
                                    }}  />

                                <Input label="Nome"
                                    input={{ 
                                        required: true, 
                                        value: data.name, 
                                        onChange: (e) => {
                                            setData({ ...data, name: e.target.value })
                                        }
                                    }}  />
                            </div>
                            <div className={ Style.formGroup }>
                                <TextBox>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.</TextBox>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link href="/manager/users">
                                <a><Btn>Cancelar</Btn></a>
                            </Link>
                            <Btn data-type="info" type="submit">Salvar</Btn>
                        </div>
                    </form>
                </Content>
            </>
        </Main>
    )
}

export default handler