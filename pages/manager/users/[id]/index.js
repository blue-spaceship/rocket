import { Pipeless, RelationshipTypesLabels, ObjectTypesLabels } from '/services/pipeless'
import { useSession } from "next-auth/react"

import { Header, Main, Content } from "/components/default/page"
import { getUser } from "/pages/api/users"

import Empty from '/components/states/empty'
import { Tag } from "/components/default/tag"

import ActivityStyle from "/components/stream/activity.module.scss"

export async function getServerSideProps({ query }) {    
    const user = await getUser(query.id)
    const activities = await Pipeless.getActivity({
        object: { id: query.id, type: 'user' },
        direction: 'all'
    })

    return {
        props: { user, activities : activities.events }
    }
}


const handler = ({ user, activities }) => {
    const { data: session } = useSession()

    return (
        <Main>
            <>
                <Header>
                    <h2>Usuário</h2><small><strong>id:</strong> { user._id }</small>
                </Header>
                <Content>
                    <div className="flex-flow">
                        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', flex: 1, alignItems: 'flex-start' }}>
                            <Tag data-type={ user.active ? 'success' : 'danger' }>{ user.active ? 'ativo' : 'inativo' }</Tag>
                            <dl className="data-list">
                                <dt>ID</dt>
                                <dd>{ user._id }</dd>
                                <dt>E-mail</dt>
                                <dd>{ user.email }</dd>
                                <dt>Usuário</dt>
                                <dd>{ user.username }</dd>
                                <dt>Nome</dt>
                                <dd>{ user.name }</dd>
                                <dt>Papeis</dt>
                                <dd>{ user.roles.join(',') }</dd>
                            </dl>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', flex: 2 }}>
                            <h3>Atividades</h3>
                            <ul className={ ActivityStyle.list }>
                                { 
                                    activities.length > 0 ?
                                        activities.map( item =>                                
                                            <li className={ ActivityStyle.item }>
                                                <div className={ ActivityStyle.activity }>
                                                    O { ObjectTypesLabels[item.object.type] } { RelationshipTypesLabels[item.direction][item.relationship.type] } { (session.user._id === item.object.id) ? 'você' : `${item.object.id}`}
                                                </div>
                                                <span className={ ActivityStyle.datetime }>{ item.relationship.created_on }</span>
                                            </li>
                                        ) :
                                        <Empty />
                                }
                            </ul>
                        </div>
                    </div>
                </Content>
            </>
        </Main>
    )
}

export default handler