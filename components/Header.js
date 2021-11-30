import { Fragment, useContext } from 'react'
import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import AuthContext from '@/context/AuthContext'
import Search from './Search'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'

const Header = () => {
	const { user, logout } = useContext(AuthContext)

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href="/">
					<a>Music Events</a>
				</Link>
			</div>
			<Search />
			<nav>
				<ul>
					<li>
						<Link href="/events">
							<a>Events</a>
						</Link>
					</li>
					{user ? (
						<Fragment>
							<li>
								<Link href="/events/add">
									<a>Add Event</a>
								</Link>
							</li>
							<li>
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
