import { useRouter } from 'next/router'
import MetaLayout from '@/components/MetaLayout'
import { parseCookies } from '@/utils/index'
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'
import DashboardEvent from '@/components/DashboardEvent'
import { toast } from 'react-toastify'

const DashboardPage = ({ events, auth }) => {
  const router = useRouter()
	const deleteEvent = async (id) => {
		if(confirm('Are you sure you want to delete this event?')) {
			const res = await fetch(`${API_URL}/events/${id}`, {
				method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth}`,
        },
			})

			const data = await res.json()

			if(!res.ok) {
				toast.error(data.message)
			} else {
				router.push('/events')
			}
		}
	}

	return (
		<MetaLayout title="User Dashboard">
			<div className={styles.dash}>
				<h1>Dashboard</h1>
				<h3>My events</h3>

        {events.map(evt => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
			</div>
		</MetaLayout>
	)
}

export default DashboardPage

export const getServerSideProps = async ({ req }) => {
	const { token } = parseCookies(req)

	const res = await fetch(`${API_URL}/events/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	const events = await res.json()

	return {
		props: {
			events,
      auth: token
		},
	}
}
