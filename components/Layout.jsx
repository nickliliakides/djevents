import { useRouter } from 'next/router'
import Footer from './Footer'
import Header from './Header'
import Showcase from './Showcase'

const Layout = ({ children }) => {
	const router = useRouter()

	return (
		<>
			<Header />
			{router.pathname === '/' && <Showcase />}
			<div className="container">{children}</div>
			<Footer />
		</>
	)
}

export default Layout
