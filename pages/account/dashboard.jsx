import { useRouter } from 'next/router'
import MetaLayout from '@/components/MetaLayout'
import { parseCookies } from '@/utils/index'
import { API_URL } from '@/config/index'
import DashboardEvent from '@/components/DashboardEvent'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'

const DashboardPage = ({ events, auth }) => {
	const router = useRouter()
	const { user } = useContext(AuthContext)
	const userEvents = events.filter(e => e.attributes?.userId == user?.id)
	const deleteEvent = async id => {
		if (confirm('Are you sure you want to delete this event?')) {
			const res = await fetch(`${API_URL}/events/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth}`,
				},
			})

			const data = await res.json()

			if (!res.ok) {
				toast.error(data.message)
			} else {
				router.push('/events')
			}
		}
	}

	return (
		<MetaLayout title="User Dashboard">
			<div className="dash">
				<h1>Dashboard</h1>
				<h3>My events</h3>

				{userEvents?.length ? (
					userEvents.map(evt => (
						<DashboardEvent
							key={evt.id}
							evt={evt.attributes}
							evtId={evt.id}
							handleDelete={deleteEvent}
						/>
					))
				) : (
					<div>You haven't created any event yet.</div>
				)}
			</div>
		</MetaLayout>
	)
}

export default DashboardPage

export const getServerSideProps = async ({ req }) => {
	const { token } = parseCookies(req)
	const res = await fetch(`${API_URL}/events?populate=*`)
	const events = await res.json()

	return {
		props: {
			events: events.data,
			auth: token,
		},
	}
}
