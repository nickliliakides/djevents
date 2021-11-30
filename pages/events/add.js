import { useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MetaLayout from '@/components/MetaLayout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import { parseCookies } from '@/utils/index'

const AddEventPage = ({ auth }) => {
	const nameInputRef = useRef()
	const performersInputRef = useRef()
	const venueInputRef = useRef()
	const addressInputRef = useRef()
	const dateInputRef = useRef()
	const timeInputRef = useRef()
	const descriptionInputRef = useRef()

	const router = useRouter()

	const handleSubmit = async e => {
		e.preventDefault()

		const dataToSubmit = {
			name: nameInputRef.current.value.trim(),
			performers: performersInputRef.current.value.trim(),
			venue: venueInputRef.current.value.trim(),
			address: addressInputRef.current.value.trim(),
			date: dateInputRef.current.value.trim(),
			time: timeInputRef.current.value.trim(),
			description: descriptionInputRef.current.value.trim(),
		}

		//Validation
		const hasEmptyfield = Object.values(dataToSubmit).some(el => el === '')
		if (hasEmptyfield) {
			toast.error('Please fill in all fields')
			return
		}

		const res = await fetch(`${API_URL}/events`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${auth.token}`,
			},
			body: JSON.stringify(dataToSubmit),
		})

		if (!res.ok) {
			if (res.status === 401 || res.status === 403) {
				toast.error(
					'Not authorized. Please make sure you are signed in.'
				)
				return
			}
			toast.error('Something went wrong. Please try again later.')
		} else {
			const evt = await res.json()
			router.push(`/events/${evt.slug}`)
		}
	}

	return (
		<MetaLayout title="Add New Event">
			<Link href="/events">{'< Go back'}</Link>
			<h1>Add Event</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor="name">Name</label>
						<input type="text" name="name" ref={nameInputRef} />
					</div>
					<div>
						<label htmlFor="name">Performers</label>
						<input
							type="text"
							name="performers"
							ref={performersInputRef}
						/>
					</div>
					<div>
						<label htmlFor="name">Venue</label>
						<input type="text" name="venue" ref={venueInputRef} />
					</div>
					<div>
						<label htmlFor="name">Address</label>
						<input
							type="text"
							name="address"
							ref={addressInputRef}
						/>
					</div>
					<div>
						<label htmlFor="name">Date</label>
						<input type="date" name="date" ref={dateInputRef} />
					</div>
					<div>
						<label htmlFor="name">Time</label>
						<input type="text" name="time" ref={timeInputRef} />
					</div>
				</div>
				<div>
					<label htmlFor="description">Description</label>
					<textarea
						type="text"
						name="description"
						ref={descriptionInputRef}
					/>
				</div>
				<input type="submit" value="Save Event" className="btn" />
			</form>
			<ToastContainer />
		</MetaLayout>
	)
}

export default AddEventPage

export const getServerSideProps = async ({ req }) => {
	const auth = parseCookies(req)

	return {
		props: {
			auth,
		},
	}
}
