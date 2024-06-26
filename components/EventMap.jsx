import { useEffect, useState } from 'react'
import Image from 'next/image'
import ReactMapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const EventMap = ({ evt }) => {
	const [lat, setLat] = useState()
	const [lng, setLng] = useState()
	const [loading, setLoading] = useState(true)
	const [viewport, setViewport] = useState({
		latitude: 51.524370017742434,
		longitude: -0.12494494476665748,
		width: '100%',
		height: '500px',
		zoom: 16,
	})

	useEffect(() => {
		fetch(
			`https://api.geoapify.com/v1/geocode/search?text=${evt.address}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
		)
			.then(response => response.json())
			.then(result => {
				const { lat, lon } = result.features[0].properties
				setLat(lat)
				setLng(lon)
				setViewport({ ...viewport, latitude: lat, longitude: lon })
				setLoading(false)
			})
			.catch(error => console.log('error', error))
	}, [])

	if (loading) return null

	return (
		<ReactMapGl
			{...viewport}
			mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
			onViewportChange={vp => setViewport(vp)}
		>
			<Marker key={evt.id} latitude={lat} longitude={lng}>
				<Image
					src="/images/pin.svg"
					width={30}
					height={30}
					alt="map-pin"
				/>
			</Marker>
		</ReactMapGl>
	)
}

export default EventMap
