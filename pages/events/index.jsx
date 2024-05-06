import EventItem from '@/components/EventItem'
import MetaLayout from '@/components/MetaLayout'
import { API_URL, PER_PAGE } from '@/config/index'
import Pagination from '@/components/Pagination'

export const EventsPage = ({ events, page, total }) => {
	return (
		<MetaLayout>
			<h1>Upcoming Events</h1>
			{events && !events.length && <h2>No events to display!</h2>}
			{events.length &&
				events.map(evt => (
					<EventItem key={evt.id} evt={evt.attributes} />
				))}
			<Pagination page={page} total={total} />
		</MetaLayout>
	)
}

export default EventsPage

export const getServerSideProps = async ({ query: { page = 1 } }) => {
	//Calculate start page
	const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

	//Fetch total/count
	const totalRes = await fetch(`${API_URL}/events/count`)
	const total = await totalRes.json()

	//Fetch events
	const eventsRes = await fetch(
		`${API_URL}/events?populate=*&sort=date:asc&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`
	)
	const events = await eventsRes.json()

	return {
		props: {
			events: events.data,
			page: +page,
			total: events.meta.pagination.total,
		},
	}
}
