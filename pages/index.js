import Link from 'next/link'
import { useSession } from "next-auth/react"
import Auth from '/components/auth/acm'

const Page = () => {
	const { data: session } = useSession()

	return (
		<div style={ { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem'} }>
			<h1>Blue Crystal</h1>
			<div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 256, gap: '1rem', textAlign: 'center'}}>
				<Auth auth={true}><div>Signed in as { session && session.user?.email} / { session.user?.roles }</div></Auth>
				<Auth auth={true} role={'admin'}><div>Logado como admin</div></Auth>
				<Auth auth={true}><Link href="/auth/logout"><a>Logout</a></Link></Auth>
				<Auth auth={false}><div>Não logado</div></Auth>
				<Auth auth={false}><Link href="/login"><a>Login</a></Link></Auth>
				<Auth auth={null}><Link href="/teste"><a>Teste</a></Link></Auth>
			</div>
		</div>
	)
}

Page.auth = {
    loggedIn: true,
    unauthorized: '/'
}

export default Page