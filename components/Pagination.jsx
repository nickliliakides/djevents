import Link from 'next/link'
import clsx from 'clsx'
import { PER_PAGE } from '@/config/index'

const Pagination = ({ page, total }) => {
	const lastPage = Math.ceil(total / PER_PAGE)
	return (
		<div className="pagination">
			<Link href={`/events?page=${page - 1}`}>
				<a className={clsx('btn-secondary', { hidden: page < 2 })}>
					{'< '}Prev Page
				</a>
			</Link>
			<Link href={`/events?page=${page + 1}`}>
				<a
					className={clsx('btn-secondary', {
						hidden: page > lastPage - 1,
					})}
				>
					Next Page{' >'}
				</a>
			</Link>
		</div>
	)
}

export default Pagination
