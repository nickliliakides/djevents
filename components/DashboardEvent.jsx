import Link from 'next/link'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

const DashboardEvent = ({ evt, evtId, handleDelete }) => {
	return (
		<div className="dash-event">
			<h4>
				<Link href={`/events/${evt.slug}`}>
					<a>{evt.name}</a>
				</Link>
			</h4>
			<Link href={`/events/edit/${evtId}`}>
				<a className="edit">
					<FaPencilAlt /> <span>Edit Event</span>
				</a>
			</Link>
			<a href="#" className="delete" onClick={() => handleDelete(evtId)}>
				<FaTimes /> <span>Delete Event</span>
			</a>
		</div>
	)
}

export default DashboardEvent
