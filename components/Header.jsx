import { Fragment, useContext } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import AuthContext from '@/context/AuthContext'
import Search from './Search'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useRouter } from 'next/router'

const Header = () => {
	const { user, logout } = useContext(AuthContext)
	const { pathname } = useRouter()

	return (
		<header className="header">
			<Link href="/">
				<Image
					className="logo"
					src="/images/logo.png"
					alt="logo"
					width={100}
					height={80}
				/>
			</Link>

			<Search />
			<nav>
				<ul>
					<li className={clsx({ active: pathname === '/events' })}>
						<Link href="/events">
							<a>Events</a>
						</Link>
					</li>
					{user ? (
						<Fragment>
							<li
								className={clsx({
									active: pathname === '/events/add',
								})}
							>
								<Link href="/events/add">
									<a>Add Event</a>
								</Link>
							</li>
							<li
								className={clsx({
									active: pathname === '/account/dashboard',
								})}
							>
								<Link href="/account/dashboard">
									<a>Dashboard</a>
								</Link>
							</li>
							<li>
								<button className="btn-icon" onClick={logout}>
									<FaSignOutAlt /> Sign Out
								</button>
							</li>
						</Fragment>
					) : (
						<li>
							<Link href="/account/login">
								<a className="btn-icon">
									<FaSignInAlt /> Login
								</a>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	)
}

export default Header
