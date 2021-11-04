import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Axios from 'axios'

import { Header, Main, Content } from "/components/default/page"
import { Btn } from '/components/default/btn'
import { Input, TextBox } from "/components/default/input"

import { getRole } from '/pages/api/roles'

import Style from '/components/default/page.module.scss'

export const getServerSideProps = async ({ query }) => {
    const role = await getRole(query.id)
    return { props:{ role } }
}

const handler = ({ role, setLoading }) => {
    const router = useRouter()
    const [data, setData] = useState({...role})

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        await Axios.put(`/api/roles/${role._id}`, data).then(res => {
            setLoading(false)
            if(res.status === 200) {
                window.postMessage({ messaging: true, type: 'success', title: 'Pronto!', message: 'Papel atualizado com sucesso' })
                router.push(`/manager/roles/`)
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
                            <div className={ Style.formGroup }></div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link href="/manager/roles">
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