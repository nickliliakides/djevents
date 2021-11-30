import { useRef } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/Search.module.css'

const Search = () => {
  const router = useRouter()
  const inputRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/events/search?term=${inputRef.current.value}`)
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input type='text' ref={inputRef} placeholder="Search events ..." onChange={handleSubmit} />
      </form>
    </div>
  )
}

export default Search
