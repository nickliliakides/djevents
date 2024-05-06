import { parseCookies } from '@/utils/index'
import AddEditEventForm from '@/components/AddEditEventForm'

const AddEventPage = ({ auth }) => {
	return <AddEditEventForm title="Add Event" auth={auth} />
}

export default AddEventPage

export const getServerSideProps = async ({ req }) => {
	const auth = parseCookies(req)

	return {
		props: {
			auth,
		},
	}
}
