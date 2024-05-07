import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaImage } from 'react-icons/fa'
import Modal from './Modal'
import ImageUpload from './ImageUpload'
import AuthContext from '@/context/AuthContext'
import { useRouter } from 'next/router'
import MetaLayout from './MetaLayout'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import slugify from 'slugify'
import { API_URL } from '../config'
import 'react-toastify/dist/ReactToastify.css'

const AddEditEventForm = ({ title, evt, auth }) => {
	const [showModal, setShowModal] = useState(false)
	const [imagePreview, setImagePreview] = useState(
		evt?.attributes?.image?.data
			? evt.attributes.image.data.attributes.formats.thumbnail.url
			: null
	)
	const { user } = useContext(AuthContext)
	const router = useRouter()
	const nameInputRef = useRef()
	const performersInputRef = useRef()
	const venueInputRef = useRef()
	const addressInputRef = useRef()
	const dateInputRef = useRef()
	const timeInputRef = useRef()
	const descriptionInputRef = useRef()

	useEffect(() => {
		if (evt) {
			const currentEvent = evt.attributes
			nameInputRef.current.value = currentEvent.name
			performersInputRef.current.value = currentEvent.performers
			venueInputRef.current.value = currentEvent.venue
			addressInputRef.current.value = currentEvent.address
			dateInputRef.current.value = currentEvent.date.split('T')[0]
			timeInputRef.current.value = currentEvent.time
			descriptionInputRef.current.value = currentEvent.description
		}
	}, [evt])

	const isModalOverlay = e => {
		if (
			!!e.target.className &&
			e.target.className.toString().includes('Modal_overlay')
		)
			setShowModal(false)
	}

	useEffect(() => {
		document.addEventListener('click', isModalOverlay)
		return () => document.removeEventListener('click', isModalOverlay)
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		const dataToSubmit = {
			name: nameInputRef.current.value.trim(),
			performers: performersInputRef.current.value.trim(),
			venue: venueInputRef.current.value.trim(),
			address: addressInputRef.current.value.trim(),
			date: dateInputRef.current.value,
			time: timeInputRef.current.value.trim(),
			description: descriptionInputRef.current.value.trim(),
			slug: slugify(nameInputRef.current.value.trim()),
		}

		if (!evt) {
			dataToSubmit.userId = user?.id
		}

		//Validation
		const hasEmptyfield = Object.values(dataToSubmit).some(el => el === '')
		if (hasEmptyfield) {
			toast.error('Please fill in all fields')
			return
		}
		let res

		if (evt) {
			res = await fetch(`${API_URL}/events/${evt.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`,
				},
				body: JSON.stringify({ data: dataToSubmit }),
			})
		} else {
			res = await fetch(`${API_URL}/events`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`,
				},
				body: JSON.stringify({ data: dataToSubmit }),
			})
		}

		if (!res.ok) {
			if (res.status === 401 || res.status === 403) {
				toast.error(
					'Not authorized. Please make sure you are signed in.'
				)
				return
			}
			toast.error(
				res.error.message ??
					'Something went wrong. Please try again later.'
			)
		} else {
			const event = await res.json()
			if (evt) {
				router.push(`/events/${event.data.attributes.slug}`)
			} else {
				router.push('/account/dashboard')
			}
		}
	}

	const openFileUploadModal = () => {
		window.scrollTo({ top: 0 })
		setShowModal(true)
	}

	const imageUploaded = async e => {
		const res = await fetch(`${API_URL}/events/${evt.id}?populate=*`)
		const event = await res.json()
		setImagePreview(
			event.data.attributes.image.data.attributes.formats.thumbnail.url
		)
		setShowModal(false)
		toast.success('Image uploaded successfully!')
	}

	return (
		<MetaLayout title={title}>
			<Link href="/events">{'< Go back'}</Link>
			<ToastContainer />
			<h1>{title}</h1>
			<form onSubmit={handleSubmit} className="form">
				<div className="grid">
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
			{evt ? (
				<>
					<div className="imagePreview">
						<h2>Image Preview</h2>
						<div className="image">
							<Image
								src={imagePreview || '/images/no-image.png'}
								height={120}
								width={200}
								alt="image-preview"
							/>
						</div>
						<button
							onClick={openFileUploadModal}
							className="btn-secondary"
							disabled={!evt}
						>
							<FaImage /> Set Image
						</button>
					</div>
					<Modal show={showModal} onClose={() => setShowModal(false)}>
						<ImageUpload
							evtId={evt.id}
							imageUploaded={imageUploaded}
							auth={auth}
						/>
					</Modal>
				</>
			) : (
				<p>
					Create your event first, after saving you will be able to
					attach an image to it from your dashboard page. Please add
					correct postcode to the address for more accuracy on the
					maps.
				</p>
			)}
		</MetaLayout>
	)
}

export default AddEditEventForm
