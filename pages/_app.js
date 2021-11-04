import Head from 'next/head'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'
import { useSession, SessionProvider, signIn } from "next-auth/react"
import Rules from '../components/auth/rules'

import Notify from '/components/notify'
import Loading from '/components/notify/loading'

import Layout from '/layouts/default'

import '../styles/globals.scss'

function App({ Component, pageProps }) {

	const AuthRules = Rules[ useRouter().pathname ]
	const [ loading, setLoading ] = useState(false)

	function changeLoading(value){
		setLoading(value)
	}

	return (
		<>
			<Head>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, viewport-fit=cover' />

				<meta name="title" content="Blue Spaceship" />
				<meta name="description" content="Blue Spaceship is a next.js based site" />
				<meta name="keywords" content="blue spaceship" />
				<meta name="robots" content="index, follow" />
				<meta name="language" content="Portuguese" />
				<meta name="author" content="@walmeidaw" />
				
				<title>Blue Spaceship</title>
			</Head>

			<Notify />
			
			<SessionProvider session={ pageProps.session }>
				<Layout ignore={ Component.noLayout }>
				<Loading visible={ loading } />
				{ AuthRules ? (
					<Auth config={ AuthRules }>
						<Component {...pageProps} setLoading={changeLoading} />
					</Auth>
				) : (
					<Component {...pageProps} setLoading={changeLoading} />
				)}
				</Layout>
			</SessionProvider>
		</>
	)
}

function Auth({ config, children}) {
    if(!config){
        return children
    }

	const { data: session, status } = useSession()
	const isUser = !!session?.user  
  
	useEffect(() => {
	  if (status === 'loading') return // Do nothing while loading
	  if (!isUser && config.auth) signIn() // If not authenticated, force log in
	}, [isUser, status])
  
	const isAllowed = () => {
		let roles = ( config.roles ) ? config.roles : ['default']
		const userRoles = (session?.user?.roles) ? session?.user?.roles : ['default']

		if(roles.find((r)=>{ return userRoles.includes(r) } )){
			return true
		}
		return false
	}
  
	if(status === "unauthenticated"){
		if(!config.auth){
			return children
		}
	}

	if(status === "authenticated"){
		if(config.auth && isAllowed()){
			return children
		}else{
			useRouter().push(config.unauthorized || '/')
		}
	}
	
	return <Loading />
}

export default App