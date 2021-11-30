import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MetaLayout from '@/components/MetaLayout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import { useRouter } from 'next/router'
import EventMap from '@/components/EventMap'

const EventPage = ({ evt }) => {
	const router = useRouter()

	return (
		<MetaLayout>
		<ToastContainer />
			<div className={styles.event}>
				<span>
					{new Date(evt.date).toLocaleDateString('en-GB', {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}{' '}
					at {evt.time}
				</span>
				<h1>{evt.name}</h1>
				{evt.image && (
					<div className={styles.image}>
						<Image
							src={evt.image.formats.large.url}
							width={960}
							height={600}
						/>
					</div>
				)}
				<h3>Performers:</h3>
				<p>{evt.performers}</p>
				<h3>Description:</h3>
				<p>{evt.description}</p>
				<h3>Venue: {evt.venue}</h3>
				<p>{evt.address}</p>

				<EventMap evt={evt} />

				<Link href="/events">
					<a className={styles.back}>{'<'} Go Back</a>
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
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await res.json()

  return {
    props: {evt: events.length ? events[0] : null}
  }
}
