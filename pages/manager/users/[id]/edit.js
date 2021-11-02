import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Axios from 'axios'

import { Header, Main, Content } from "/components/default/page"
import { Btn, } from '/components/default/btn'
import { Input, Select } from "/components/default/input"

import { getRoles } from '/pages/api/roles'
import { getUser } from '/pages/api/users'

import Style from '/components/default/page.module.scss'

export const getServerSideProps = async ({ query }) => {
    const user = await getUser(query.id)
    const roles = await getRoles({ active: true })
    return { props:{ roles, user } }
}

const handler = ({ roles, user, setLoading }) => {
    const router = useRouter()
    const [data, setData] = useState({...user})

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        await Axios.put(`/api/users/${ user._id }`, data).then(res => {
            setLoading(false)
            if(res.status === 200) {
                window.postMessage({ messaging: true, type: 'success', title: 'Pronto!', message: 'Usuário alterado com sucesso' })
                router.push(`/manager/users/${ res.data._id }`)
            } else {
                window.postMessage({ messaging: true, type: 'danger', title: `Erro ${ res.status }`, message: `Algo deu errado` })
            }
        }).catch(err => {
            window.postMessage({ messaging: true, type: 'danger', title: 'Algo deu errado', message: "Só não sei o que foi" })
            setLoading(false)
        })
    }

    const handleSelectMultiple = (e) => {
        const options = [...e.target.options].filter(x => x.selected).map(x => x.value)
        setData({ ...data, roles: options })
    }

    return (
        <Main>
            <>
                <Header>
                    <h2>Adicionar usuário</h2>
                </Header>
                <Content>
                    <form style={{ display: 'flex', gap: '4rem', flexDirection: 'column' }} onSubmit={ handleSubmit }>
                        <div className={ Style.form }>
                            <div className={ Style.formGroup }>
                                <Input label="Nome" input={{ name: 'users-name', required: true, defaultValue: data.name, onChange: (e)=>{ setData({...data, name: e.target.value}) } }}  />
                                <Input label="Usuário" input={{ name: 'users-username', required: true, defaultValue: data.username, onChange: (e)=>{ setData({...data, username: e.target.value}) } }}  />
                                <Input label="E-mail" input={{ name: 'users-email', required: true, defaultValue: data.email, onChange: (e)=>{ setData({...data, email: e.target.value}) } }}  />
                            </div>
                            <div className={ Style.formGroup }>
                                <Select label="Papeis"
                                    input={{ multiple: true, onChange : handleSelectMultiple, defaultValue: data.roles }}
                                    options={ roles.map( role => ({ value: role._id, text: role.name }) ) }
                                    message={{ text: <>Selecione um ou mais papeis que o usuário poderá desempenhar.</> }} />
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