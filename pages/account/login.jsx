import { useEffect, useContext, useRef } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from '@/context/AuthContext'
import MetaLayout from '@/components/MetaLayout'
import { FaUser } from 'react-icons/fa'

const LoginPage = () => {
	const emailInputRef = useRef()
	const passwordInputRef = useRef()

	const { login, error } = useContext(AuthContext)

	useEffect(() => error && toast.error(error))

	const handleSubmit = e => {
		e.preventDefault()
		login({
			email: emailInputRef.current.value,
			password: passwordInputRef.current.value,
		})
	}

	return (
		<MetaLayout title="User Login">
			<ToastContainer />
			<div className="auth">
				<h1>
					<FaUser /> Log In
				</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email">Email Address</label>
						<input type="email" name="email" ref={emailInputRef} />
					</div>
					<div>
						<label htmlFor="email">Password</label>
						<input
							type="password"
							name="password"
							ref={passwordInputRef}
						/>
					</div>
					<input type="submit" value="Login" className="btn" />
				</form>
				<p>
					Don't have an account?{' '}
					<Link href="/account/register">Register</Link>
				</p>
			</div>
		</MetaLayout>
	)
}

export default LoginPage
