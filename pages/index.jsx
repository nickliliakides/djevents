import Link from 'next/link'
import EventItem from '@/components/EventItem'
import MetaLayout from '@/components/MetaLayout'
import { API_URL } from '@/config/index'

export default function Home({ events }) {
	console.log('🚀 ~ API_URL:', API_URL)
	return (
		<MetaLayout>
			<h1>Latest events</h1>
			{events && !events.length && <h2>No events to display!</h2>}
			{events.length &&
				events.map(evt => (
					<EventItem key={evt.id} evt={evt.attributes} />
				))}
			{events.length > 3 && (
				<div className="link-container">
					<Link href="/events">
						<a className="btn-secondary">View All Events</a>
					</Link>
				</div>
			)}
		</MetaLayout>
	)
}

export async function getServerSideProps() {
	const res = await fetch(
		`${API_URL}/events?populate=*&sort=date:asc&pagination[limit]=4`
	)
	const events = await res.json()

	return {
		props: { events: events.data },
	}
}
