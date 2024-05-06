import { useRef } from 'react'
import { useRouter } from 'next/router'

const Search = () => {
	const router = useRouter()
	const inputRef = useRef()

	const handleSubmit = e => {
		e.preventDefault()
		router.push(`/events/search?term=${inputRef.current.value}`)
	}

	return (
		<div className="search">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					ref={inputRef}
					placeholder="Search events ..."
					onChange={handleSubmit}
				/>
			</form>
		</div>
	)
}

export default Search
