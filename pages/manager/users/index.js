import { useState } from 'react'
import Link from 'next/link'
import { Header, Main, Content, Card } from "/components/default/page"
import { getUsers } from '/pages/api/users'
import EmptyState from '/components/states/empty'
import { Btn, BtnIcon } from '/components/default/btn'

import ListStyles from '/components/default/page.module.scss'
import Axios from 'axios'

export const getServerSideProps = async () => {
    const data = await getUsers()
    return { props:{ data } }
}

const handler = ({ data, setLoading }) => {
    const [users, setUsers] = useState(data)
    const [ CardToogle, setCardToogle ] = useState( undefined )
    const [ CardLoading, setCardLoading ] = useState( false )

    const ListItem = ({data}) => {
        const [ item, setItem ] = useState( {...data} )
        return (
            <div className={ ListStyles.listItem }>
                <Link href={ `/manager/users/${ item._id }` }>
                    <a className={ ListStyles.content }>
                        <div className={ ListStyles.title }>{ item.name }</div>
                        <div className={ ListStyles.subitems }>{ item.email }</div>
                    </a>
                </Link>
                <div className={ ListStyles.action }>
                    <BtnIcon href={ `/manager/users/${ item._id }/edit` }><span className="material-icons-round">edit</span></BtnIcon>
                    <Btn data-type="danger" onClick={ () => setCardToogle(item) }>Excluir</Btn>
                </div>
            </div>
        )
    }

    // handle delete user
    const handleDelete = async ( user ) => {
        setCardLoading(true)

        try {
            await Axios.delete(`/api/users/${ user._id }`)
            setCardToogle(undefined)
            setUsers( users.filter( item => item._id !== user._id ) )
            window.postMessage({ messaging: true, type: 'success', message: 'Usuário excluido' })
        } catch (error) {
            window.postMessage({ messaging: true, type: 'danger', message: 'Não foi possível excluir o usuário' })
            console.log(error)
        } finally {
            setCardLoading(false)
        }
    }

    return (
        <Main>
            <>
                <Header>
                    <h2>Usuários</h2>
                </Header>
                <Content>
                    { users.length > 0 ? users.map( item => (<ListItem key={item._id} data={ item } />) ) : <EmptyState /> }
                </Content>
                {
                    CardToogle && <Card closeAction={ () => setCardToogle( undefined ) }>
                        <div>
                            <h3>Deseja realmente excluir este usuário?</h3>
                            <div className={ ListStyles.sample }>
                                <div>
                                    <strong>Nome: </strong>
                                    { CardToogle.name }
                                </div>
                                <div>
                                    <strong>E-mail: </strong>
                                    { CardToogle.email}
                                </div>
                                <div>
                                    <strong>Usuário: </strong>
                                    { CardToogle.username}
                                </div>
                                <div>
                                    <strong>Papeis: </strong>
                                    { CardToogle.roles}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>                        
                            <Btn data-type={ CardLoading ? 'default' : 'danger' } onClick={ () => handleDelete( CardToogle ) }>
                                { CardLoading ?  <span className="material-icons-round animate-loop">loop</span> : 'Confirmar' }
                            </Btn>
                            { CardLoading ? null : <Btn onClick={ () => setCardToogle( undefined ) }>Cancelar</Btn> }
                        </div>
                    </Card>
                }
            </>
        </Main>
    )
}

export default handler