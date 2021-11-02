import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Axios from 'axios'

import { Header, Main, Content } from "/components/default/page"
import { Btn } from '/components/default/btn'
import { Input, Select } from "/components/default/input"

import { getRoles } from '/pages/api/roles'

import Style from '/components/default/page.module.scss'

export const getServerSideProps = async () => {
    const roles = await getRoles({ active: true })
    return { props:{ roles } }
}

const handler = ({ roles, setLoading }) => {
    const router = useRouter()

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        username: '',
        roles: [],
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        await Axios.post('/api/users', data).then(res => {
            setLoading(false)
            if(res.status === 200) {
                window.postMessage({ messaging: true, type: 'success', title: 'Pronto!', message: 'Usuário cadastrado com sucesso' })
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
                                <Input label="Nome" input={{ name: 'users-name', required: true, onChange: (e)=>{ setData({...data, name: e.target.value}) } }}  />
                                <Input label="Usuário" input={{ name: 'users-username', required: true, onChange: (e)=>{ setData({...data, username: e.target.value}) } }}  />
                                <Input label="E-mail" input={{ name: 'users-email', required: true, onChange: (e)=>{ setData({...data, email: e.target.value}) } }}  />
                                <Input label="Senha" input={{ name: 'users-password', required: true, type: 'password', onChange: (e)=>{ setData({...data, password: e.target.value}) } }} />
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