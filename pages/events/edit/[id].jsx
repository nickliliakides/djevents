import { API_URL } from '@/config/index'
import { parseCookies } from '@/utils/index'
import AddEditEventForm from '@/components/AddEditEventForm'

const EditEventPage = ({ evt, auth }) => {
	return <AddEditEventForm title="Edit Event" auth={auth} evt={evt} />
}

export default EditEventPage

export const getServerSideProps = async ({ params: { id }, req }) => {
	const res = await fetch(`${API_URL}/events/${id}?populate=*`)
	const evt = await res.json()
	const auth = parseCookies(req)

	return {
		props: {
			evt: evt.data,
			auth,
		},
	}
}
