import { useState } from 'react'
import Link from 'next/link'
import { Header, Main, Contant } from "/components/default/page"
import { getUsers } from '/pages/api/users'
import EmptyState from '/components/states/empty'
import { Btn, BtnIcon } from '/components/default/btn'

import ListStyles from '/components/default/page.module.scss'

export const getServerSideProps = async () => {
    const data = await getUsers()
    return { props:{ data } }
}

const ListItem = ({data}) => {
    const [ item, setItem ] = useState( {...data} )

    return (
        <div className={ ListStyles.listItem }>
            <Link href={ `/manager/users/${ item._id }` }>
                <a className={ ListStyles.content }>
                    <div className={ ListStyles.title }>{ item.name }{ item.roles.split(',').map( role => <small key={ role } className={ ListStyles.tag }>{role}</small> ) }</div>
                    <div className={ ListStyles.subitems }>{ item.email }</div>
                </a>
            </Link>
            <div className={ ListStyles.action }>
                <BtnIcon><span className="material-icons-round">edit</span></BtnIcon>
                <Btn data-type="danger">Excluir</Btn>
            </div>
        </div>
    )
}

const handler = ({ data }) => {
    return (
        <Main>
            <>
                <Header>
                    <h2>Usuários</h2>
                </Header>
                <Contant>
                    { data.length > 0 ? 
                        data.map( item => (<ListItem key={item._id} data={ item } />) ) : <EmptyState /> }
                </Contant>
            </>
        </Main>
    )
}

export default handler