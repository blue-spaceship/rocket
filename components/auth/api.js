import { getToken } from "next-auth/jwt"

const secret = process.env.SESSION_SECRET

const Auth = (handler) => async (req, res) => {
	const token = await getToken({ req, secret })

	// If there's a token check permissions
	if (token) {
		// If user has access, return request
		if(handler.roles === undefined || handler.roles.split(',').find( role => token.roles.includes(role) ) ){
			return handler(req, res)
		}else{
			res.status(403).end('No permission to use this')
		}
	} else {
		res.status(401).end('Not loggedIn')
	}
}

export default Auth