import { useState } from 'react'
import Link from 'next/link'
import Axios from 'axios'

import { getUsers } from '/pages/api/users'

import { Header, Main, Content, Card } from "/components/default/page"
import EmptyState from '/components/states/empty'
import { Btn, BtnIcon } from '/components/default/btn'

import ListStyles from '/components/default/page.module.scss'

export const getServerSideProps = async () => {
    const data = await getUsers()
    return { props:{ data } }
}

const handler = ({ data, setLoading }) => {
    const [users, setUsers] = useState(data)
    
    const [ ToDelete, setToDelete ] = useState( undefined )
    const [ ToArchive, setToArchive ] = useState( undefined )

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
                    <BtnIcon onClick={ () => setToArchive(item) } data-type={ item.active ? 'success' : 'disabled' }><span className="material-icons-round">{ item.active ? 'archive' : 'unarchive' }</span></BtnIcon>
                    <BtnIcon data-type="info" href={ `/manager/users/${ item._id }/edit` }><span className="material-icons-round">edit</span></BtnIcon>
                    <Btn data-type="danger" onClick={ () => setToDelete(item) }>Excluir</Btn>
                </div>
            </div>
        )
    }

    // handle delete user
    const handleDelete = async ( user ) => {
        setCardLoading(true)

        try {
            await Axios.delete(`/api/users/${ user._id }`)
            setToDelete(undefined)
            console.log(users);
            window.postMessage({ messaging: true, type: 'success', message: 'Usuário excluido' })
            setUsers( users.filter( item => item._id !== user._id ) )
        } catch (error) {
            window.postMessage({ messaging: true, type: 'danger', message: 'Não foi possível excluir o usuário' })
            // console.error(error)
        } finally {
            setCardLoading(false)
        }
    }

    // handle archive user
    const handleArchive = async ( user ) => {
        setCardLoading(true)

        try {
            const updatedUser = await Axios.patch(`/api/users/${ user._id }`, { active: !user.active })
            setToArchive(undefined)
            window.postMessage({ messaging: true, type: 'success', message: `Usuário ${ user.active ? 'arquivado' : 'desarquivado' }` })
            setUsers( users.map( item => user._id === item._id ? updatedUser.data : item ) )
        } catch (error) {
            window.postMessage({ messaging: true, type: 'danger', message: `Não foi possível ${ user.active ? 'arquivar' : 'desarquivar' } o usuário` })
        } finally {
            setCardLoading(false)
        }
    }

    return (
        <Main>
            <>
                <Header>
                    <h2>Usuários</h2>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link href="/manager/users/new">
                            <a><BtnIcon data-type="info"><span className="material-icons-round">add</span></BtnIcon></a>
                        </Link>
                    </div>
                </Header>
                <Content>
                    { users.length > 0 ? users.map( item => (<ListItem key={item._id} data={ item } />) ) : <EmptyState /> }
                </Content>
                {
                    ToDelete && <Card closeAction={ () => setToDelete( undefined ) }>
                        <div>
                            <h3>Deseja realmente excluir este usuário?</h3>
                            <div className={ ListStyles.sample }>
                                <div>
                                    <strong>Nome: </strong>
                                    { ToDelete.name }
                                </div>
                                <div>
                                    <strong>E-mail: </strong>
                                    { ToDelete.email}
                                </div>
                                <div>
                                    <strong>Usuário: </strong>
                                    { ToDelete.username}
                                </div>
                                <div>
                                    <strong>Papeis: </strong>
                                    { ToDelete.roles}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>                        
                            <Btn data-type={ CardLoading ? 'default' : 'danger' } onClick={ () => handleDelete( ToDelete ) }>
                                { CardLoading ?  <span className="material-icons-round animate-loop">loop</span> : 'Confirmar' }
                            </Btn>
                            { CardLoading ? null : <Btn onClick={ () => setToDelete( undefined ) }>Cancelar</Btn> }
                        </div>
                    </Card>
                }

                {
                    ToArchive && <Card closeAction={ () => setToArchive( undefined ) }>
                        <div>
                            <h3>Deseja { ToArchive.active ? 'arquivar' : 'desarquivar' } este usuário?</h3>
                            <div className={ ListStyles.sample }>
                                <div>
                                    <strong>Nome: </strong>
                                    { ToArchive.name }
                                </div>
                                <div>
                                    <strong>E-mail: </strong>
                                    { ToArchive.email}
                                </div>
                                <div>
                                    <strong>Usuário: </strong>
                                    { ToArchive.username}
                                </div>
                                <div>
                                    <strong>Papeis: </strong>
                                    { ToArchive.roles}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>                        
                            <Btn data-type={ CardLoading ? 'default' : 'info' } onClick={ () => handleArchive( ToArchive) }>
                                { CardLoading ?  <span className="material-icons-round animate-loop">loop</span> : 'Confirmar' }
                            </Btn>
                            { CardLoading ? null : <Btn onClick={ () => setToArchive( undefined ) }>Cancelar</Btn> }
                        </div>
                    </Card>
                }
            </>
        </Main>
    )
}

export default handler