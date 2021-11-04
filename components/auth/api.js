import { getToken } from "next-auth/jwt"

const secret = process.env.SESSION_SECRET

const Auth = (handler) => async (req, res) => {	
	const token = await getToken({ req, secret })
	
	const userRole = token ? 
		{ 
			isLogged: !!token,
			roles: token.roles,
			method: req.method
		} : { 
			isLogged: false,
			roles: [],
			method: req.method
		}

	if(token) {
		req.body = { ...req.body, token }
	}

	if(handler.auth === undefined) {
		return handler(req, res)
	}

	if(handler.auth.isLogged === false) {
		if(!userRole.isLogged) {
			return handler(req, res)
		}
		
		res.status(403).end('You must be not logged to use this')
	}

	if(handler.auth.isLogged === true) {
		if(userRole.isLogged){
			if(  !handler.auth.roles[req.method] || handler.auth.roles[req.method].find( role => userRole.roles.includes(role) ) ) {
				return handler(req, res)
			}else{
				res.status(401).end('You have no role to use this')
			}
		}

		res.status(401).end('You must be logged to use this')
	}

	return res.status(204).end('Nothing here')
}

export default Auth