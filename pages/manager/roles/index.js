import { useState } from 'react'
import Link from 'next/link'
import Axios from 'axios'

import { getRoles } from '/pages/api/roles'

import { Header, Main, Content, Card } from "/components/default/page"
import EmptyState from '/components/states/empty'
import { Btn, BtnIcon } from '/components/default/btn'

import ListStyles from '/components/default/page.module.scss'

export const getServerSideProps = async () => {
    const data = await getRoles()
    return { props:{ data } }
}

const handler = ({ data }) => {
    const [roles, setRoles] = useState(data)

    const [ ToDelete, setToDelete ] = useState( undefined )
    const [ ToArchive, setToArchive ] = useState( undefined )

    const [ CardLoading, setCardLoading ] = useState( false )

    const ListItem = ({data}) => {
        const [ item, setItem ] = useState( {...data} )
    
        return (
            <div className={ ListStyles.listItem }>
                <div className={ ListStyles.content }>
                    <div className={ ListStyles.title }>{ item.name }</div>
                    <div className={ ListStyles.subitems }>{ item.email }</div>
                </div>
                <div className={ ListStyles.action }>
                    <BtnIcon onClick={ () => setToArchive(item) } data-type={ item.active ? 'success' : 'disabled' }><span className="material-icons-round">{ item.active ? 'archive' : 'unarchive' }</span></BtnIcon>
                    <BtnIcon href={ `/manager/roles/${ item._id }/edit` }><span className="material-icons-round">edit</span></BtnIcon>
                    <Btn data-type="danger" onClick={ () => setToDelete(item) }>Excluir</Btn>
                </div>
            </div>
        )
    }

    // handle delete user
    const handleDelete = async ( user ) => {
        setCardLoading(true)

        try {
            await Axios.delete(`/api/roles/${ user._id }`)
            setToDelete(undefined)
            window.postMessage({ messaging: true, type: 'success', message: 'Papel excluido' })
            setRoles( roles.filter( item => item._id !== user._id ) )
        } catch (error) {
            window.postMessage({ messaging: true, type: 'danger', message: 'Não foi possível excluir o papel' })
            // console.error(error)
        } finally {
            setCardLoading(false)
        }
    }

    // handle archive role
    const handleArchive = async ( role ) => {
        setCardLoading(true)

        try {
            const updatedRole = await Axios.patch(`/api/roles/${ role._id }`, { active: !role.active })
            setToArchive(undefined)
            window.postMessage({ messaging: true, type: 'success', message: `Papel ${ role.active ? 'arquivado' : 'desarquivado' }` })
            setRoles( roles.map( item => role._id === item._id ? updatedRole.data : item ) )
        } catch (error) {
            window.postMessage({ messaging: true, type: 'danger', message: `Não foi possível ${ role.active ? 'arquivar' : 'desarquivar' } o papel` })
        } finally {
            setCardLoading(false)
        }
    }

    return (
        <Main>
            <>
                <Header>
                    <h2>Papeis</h2>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link href="/manager/roles/new">
                            <a><BtnIcon data-type="info"><span className="material-icons-round">add</span></BtnIcon></a>
                        </Link>
                    </div>
                </Header>
                <Content>
                    { roles.length > 0 ? 
                        roles.map( item => (<ListItem key={item._id} data={ item } />) ) : <EmptyState /> }
                </Content>
                {
                    ToDelete && <Card closeAction={ () => setToDelete( undefined ) }>
                        <div>
                            <h3>Deseja realmente excluir este papel?</h3>
                            <div className={ ListStyles.sample }>
                                <div>
                                    <strong>Nome: </strong>
                                    { ToDelete.name }
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
                            <h3>Deseja { ToArchive.active ? 'arquivar' : 'desarquivar' } este papel?</h3>
                            <div className={ ListStyles.sample }>
                                <div>
                                    <strong>Nome: </strong>
                                    { ToArchive.name }
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