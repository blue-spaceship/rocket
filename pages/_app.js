import Head from 'next/head'
import Router from 'next/router'

import { useEffect } from 'react'
import { useSession, SessionProvider, signIn } from "next-auth/react"

import Notify from '/components/notify'

import Layout from '/layouts/default'
import Loading from '/components/auth/loading'
import Badge from '/components/dev/badge'

import '../styles/globals.scss'

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, maximum-scale=1.0, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
			</Head>

			<Notify />
			
			<SessionProvider session={ pageProps.session }>
				<Layout>					
				<Badge />
				{ Component.auth ? (
					<Auth config={ Component.auth }>
						<Component {...pageProps} />
					</Auth>
				) : (
					<Component {...pageProps} />
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
	  if (!isUser && config.loggedIn) signIn() // If not authenticated, force log in
	}, [isUser, status])
  
	const isAllowed = () => {
		let roles = ( config.roles ) ? config.roles : 'default,admin'
		roles = roles.split(',')
		const userRoles = (session?.user?.roles) ? session?.user?.roles.split(',') : ['default','admin']

		if(roles.find((r)=>{ return userRoles.includes(r) } )){
			return true
		}
		return false
	}
  
	if(status === "unauthenticated"){
		if(!config.loggedIn){
			return children
		}
	}

	if(status === "authenticated"){
		if(config.loggedIn && isAllowed()){
			return children
		}else{
			Router.push(config.unauthorized || '/')
		}
	}
	
	return <Loading />
}
