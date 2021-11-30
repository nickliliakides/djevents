import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MetaLayout from '@/components/MetaLayout'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import { FaImage } from 'react-icons/fa'
import { parseCookies } from '@/utils/index'

const EditEventPage = ({ evt, auth }) => {
	const nameInputRef = useRef()
	const performersInputRef = useRef()
	const venueInputRef = useRef()
	const addressInputRef = useRef()
	const dateInputRef = useRef()
	const timeInputRef = useRef()
	const descriptionInputRef = useRef()

  const [showModal, setShowModal] = useState(false)

	const [imagePreview, setImagePreview] = useState(
		evt.image ? evt.image.formats.thumbnail.url : null
	)

  const isModalOverlay = (e) => {
    if (!!e.target.className && e.target.className.toString().includes('Modal_overlay')) setShowModal(false)
  }

  useEffect(() => {
    document.addEventListener('click', isModalOverlay)
    return () => document.removeEventListener('click', isModalOverlay)
  }, [])

	useEffect(() => {
		if (evt) {
			nameInputRef.current.value = evt.name
			performersInputRef.current.value = evt.performers
			venueInputRef.current.value = evt.venue
			addressInputRef.current.value = evt.address
			dateInputRef.current.value = evt.date.split('T')[0]
			timeInputRef.current.value = evt.time
			descriptionInputRef.current.value = evt.description
		}
	}, [evt])

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

		const res = await fetch(`${API_URL}/events/${evt.id}`, {
			method: 'PUT',
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

  const openFileUploadModal = () => {
    window.scrollTo({ top: 0 });
    setShowModal(true)
  }

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`)
    const data = await res.json()
    setImagePreview(data.image.formats.thumbnail.url)
    setShowModal(false)
    toast.success('Image uploaded successfully!')
  }

	return (
		<MetaLayout title="Edit Event">
			<Link href="/events">{'< Go back'}</Link>
			<ToastContainer />
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
				<input type="submit" value="Update Event" className="btn" />
			</form>
			<div className={styles.imagePreview}>
				<h2>Image Preview</h2>
				<div className={styles.image}>
					<Image
						src={imagePreview || '/images/no-image.png'}
						height={120}
						width={200}
					/>
				</div>
				<button onClick={openFileUploadModal} className="btn-secondary">
					<FaImage /> Set Image
				</button>
			</div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} auth={auth}/>
      </Modal>
		</MetaLayout>
	)
}

export default EditEventPage

export const getServerSideProps = async ({ params: { id }, req }) => {
	const res = await fetch(`${API_URL}/events/${id}`)
	const evt = await res.json()
	const auth = parseCookies(req)

	return {
		props: {
			evt,
			auth
		},
	}
}
