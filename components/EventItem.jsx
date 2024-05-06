import Link from 'next/link'
import Image from 'next/image'

const EventItem = ({ evt }) => {
	return (
		<div className="event-item">
			<div className="img">
				{evt.image.data && (
					<Image
						src={
							evt.image
								? evt.image.data.attributes.formats.thumbnail
										.url
								: '/images/event-default.png'
						}
						layout="fill"
					/>
				)}
			</div>
			<div className="info">
				<span>
					{new Date(evt.date).toLocaleDateString('en-GB', {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}{' '}
					at {evt.time}
				</span>
				<h3>{evt.name}</h3>
			</div>
			<div className="link">
				<Link href={`/events/${evt.slug}`}>
					<a className="btn">Details</a>
				</Link>
			</div>
		</div>
	)
}

export default EventItem
