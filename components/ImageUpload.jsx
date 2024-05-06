import { useState } from 'react'
import { API_URL } from '@/config/index'

const ImageUpload = ({ evtId, imageUploaded, auth }) => {
	const [image, setImage] = useState(null)

	const handleSubmit = async e => {
		e.preventDefault()
		let formData = new FormData()
		formData.append('files', image)
		formData.append('ref', 'api::event.event')
		formData.append('refId', evtId)
		formData.append('field', 'image')

		const res = await fetch(`${API_URL}/upload`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			body: formData,
		})

		if (res.ok) {
			imageUploaded()
		}
	}

	const handleFileChange = e => {
		setImage(e.target.files[0])
	}

	return (
		<div className="form">
			<h1>Upload Event Image</h1>
			<form onSubmit={handleSubmit}>
				<div className="file">
					<input type="file" onChange={handleFileChange} />
				</div>
				<input type="submit" value="Upload" className="btn" />
			</form>
		</div>
	)
}

export default ImageUpload
