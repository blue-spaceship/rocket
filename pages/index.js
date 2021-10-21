import Link from 'next/link'
import Auth from '/components/auth/acm'

const Page = () => {
	return (
		<div style={ { flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem'} }>
			<h1>Blue Crystal</h1>
			<div style={ { display: 'flex', gap: '1rem' }}>
				Oi!
			</div>
		</div>
	)
}

export default Page