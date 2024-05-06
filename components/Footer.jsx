import Link from 'next/link'

const Footer = () => {
	return (
		<footer className="footer">
			<p>Copyright &copy; DJ Events {new Date().getFullYear()}</p>
			<p>
				<Link href="/about">About DJ Events</Link>
			</p>
		</footer>
	)
}

export default Footer
