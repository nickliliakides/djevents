import qs from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import EventItem from '@/components/EventItem'
import MetaLayout from '@/components/MetaLayout'
import { API_URL } from '@/config/index'

export const SearchPage = ({ events }) => {
  const router = useRouter();

	return (
		<MetaLayout title='Search results'>
    <Link href="/events">{'< Go back'}</Link>
			<h1>Search Results for {router.query.term}</h1>
			{events && !events.length && <h2>No events to display!</h2>}
			{events.length
				? events.map(evt => <EventItem key={evt.id} evt={evt} />)
				: null}
		</MetaLayout>
	)
}

export default SearchPage

export const getServerSideProps = async ({ query: { term } }) => {
	const query = qs.stringify({
		_where: {
			_or: [
				{ name_contains: term },
				{ venue_contains: term },
				{ performers_contains: term },
				{ description_contains: term },
			],
		},
	})
	const res = await fetch(`${API_URL}/events?${query}`)
	const events = await res.json()

	return {
		props: { events },
	}
}
