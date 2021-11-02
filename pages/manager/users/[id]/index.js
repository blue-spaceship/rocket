import { Header, Main, Content } from "/components/default/page"
import { getUser } from "/pages/api/users"

export const getServerSideProps = async ({ query }) => {
    const { id } = query

    const data = await getUser(id)
    
    return { props:{ data } }
}

const handler = ({ data }) => {
    return (
        <Main>
            <>
                <Header>
                    <h2>Usuário</h2>
                </Header>
                <Content>{ JSON.stringify(data)}</Content>
            </>
        </Main>
    )
}

export default handler