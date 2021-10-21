import { getUsers } from '/pages/api/users'
import EmptyState from '../../../components/states/empty'

export const getServerSideProps = async () => {
    const data = await getUsers()

    return {
        props:{
            data
        }
    }
}

const handler = ({ data }) => {
    return data ? data.map( item => JSON.stringify(item) ) : <EmptyState />
}

export default handler