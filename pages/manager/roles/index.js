import { useState } from 'react'
import Link from 'next/link'
import { Header, Main, Content } from "/components/default/page"
import { getRoles } from '/pages/api/roles'
import EmptyState from '/components/states/empty'
import { Btn, BtnIcon } from '/components/default/btn'

import ListStyles from '/components/default/page.module.scss'

export const getServerSideProps = async () => {
    const data = await getRoles()
    return { props:{ data } }
}

const handler = ({ data }) => {
    const [roles, setRoles] = useState(data)

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
                    <BtnIcon><span className="material-icons-round">edit</span></BtnIcon>
                    <Btn data-type="danger">Excluir</Btn>
                </div>
            </div>
        )
    }

    return (
        <Main>
            <>
                <Header>
                    <h2>Papeis</h2>
                </Header>
                <Content>
                    { roles.length > 0 ? 
                        roles.map( item => (<ListItem key={item._id} data={ item } />) ) : <EmptyState /> }
                </Content>
            </>
        </Main>
    )
}

export default handler