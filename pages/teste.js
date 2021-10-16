import Link from 'next/link'

const Page = () => {
	return (
		<div style={ { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem'} }>
			<h1>Blue Crystal</h1>
			<div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 256, gap: '1rem'}}>
				<Link href="/"><a>Home</a></Link>
			</div>
		</div>
	)
}

Page.auth = {
    loggedIn: true,
    unauthorized: '/',
	roles: "admin"
}

export default Page