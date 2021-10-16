import Auth from "../../components/auth/api"

const handler = async (req, res) => {
    return res.status(200).end('deu certo')
}

export default Auth(handler)