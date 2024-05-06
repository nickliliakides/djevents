import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MetaLayout from '@/components/MetaLayout'
import { API_URL } from '@/config/index'
import EventMap from '@/components/EventMap'

const EventPage = ({ evt }) => {
	const event = evt?.attributes
	if (!event) return null

	return (
		<MetaLayout>
			<ToastContainer />
			<div className="event">
				<span>
					{new Date(event.date).toLocaleDateString('en-GB', {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}{' '}
					at {event.time}
				</span>
				<h1>{event.name}</h1>
				{event.image.data && (
					<div className="image">
						<Image
							src={event.image.data.attributes.formats.large.url}
							width={960}
							height={600}
						/>
					</div>
				)}
				<h3>Performers:</h3>
				<p>{event.performers}</p>
				<h3>Description:</h3>
				<p>{event.description && event.description}</p>
				<h3>Venue: {event.venue}</h3>
				<p>{event.address}</p>

				<EventMap evt={event} />

				<Link href="/events">
					<a className="back">{'<'} Go Back</a>
				</Link>
			</div>
		</MetaLayout>
	)
}

export default EventPage

// Static Generation option

// export const getStaticPaths = async () => {
// 	const res = await fetch(`${API_URL}/events`)
// 	const events = await res.json()
// 	const paths = events.map(evt => ({
// 		params: { slug: evt.slug },
// 	}))

// 	return {
// 		paths,
// 		fallback: true,
// 	}
// }

// export const getStaticProps = async ({ params: { slug } }) => {
// 	const res = await fetch(`${API_URL}/events?slug=${slug}`)
// 	const events = await res.json()

// 	return {
// 		props: { evt: events.length ? events[0] : null },
// 		revalidate: 1,
// 	}
// }

// Server side rendering option

export const getServerSideProps = async ({ query: { slug } }) => {
	const res = await fetch(
		`${API_URL}/events?populate=*&filters[slug]=${slug}`
	)
	const events = await res.json()

	return {
		props: { evt: events.data.length ? events.data[0] : null },
	}
}
