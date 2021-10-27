import { useState } from 'react'
import Link from 'next/link'
import { Header, Main, Content, Card } from "/components/default/page"
import { getUsers } from '/pages/api/users'
import EmptyState from '/components/states/empty'
import { Btn, BtnIcon } from '/components/default/btn'

import ListStyles from '/components/default/page.module.scss'

export const getServerSideProps = async () => {
    const data = await getUsers()
    return { props:{ data } }
}

const handler = ({ data }) => {
    const [ CardToogle, setCardToogle ] = useState( false )

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
                    <Btn data-type="danger" onClick={ handleDelete }>Excluir</Btn>
                </div>
            </div>
        )
    }

    const handleDelete = ( data ) => {
        setCardToogle(true)
    }

    return (
        <Main>
            <>
                <Header>
                    <h2>Usuários</h2>
                </Header>
                <Content>
                    { data.length > 0 ? 
                        data.map( item => (<ListItem key={item._id} data={ item } />) ) : <EmptyState /> }
                </Content>
                {
                    CardToogle && <Card>
                        <div style={{ display: 'flex', gap: '1rem' }}>                        
                            <Btn data-type="danger">Confirmar</Btn>
                            <Btn onClick={ () => setCardToogle(false) }>Cancelar</Btn>
                        </div>
                    </Card>
                }
            </>
        </Main>
    )
}

export default handler