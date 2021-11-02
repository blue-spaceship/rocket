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
                <div className={ ListStyles.content }>
                    <div className={ ListStyles.title }>{ item.name }</div>
                    <div className={ ListStyles.subitems }>{ item.email }</div>
                </div>
                <div className={ ListStyles.action }>
                    <BtnIcon href={ `/manager/roles/${ item._id }/edit` }><span className="material-icons-round">edit</span></BtnIcon>
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
            </>
        </Main>
    )
}

export default handler