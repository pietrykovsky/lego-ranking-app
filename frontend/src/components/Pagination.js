import Pag from 'react-bootstrap/Pagination';
import {useState, useEffect} from 'react'

const Pagination = ({pagination, search_params, setSearchParams}) => {

    const [current_page, setCurrentPage] = useState(1)

    const changePage = (page_number) => {
        const params = page_number === 1 ? {} : {page: page_number}
        for (const [k, v] of search_params) {
            if (k === 'page')
                continue
            params[k] = v
        }
        setSearchParams(params)
    }

    useEffect(() => {
        if (search_params.has('page')) {
            const page = parseInt(search_params.get('page'))
            setCurrentPage(page)
        }
    }, [])
    
    return (
        <div className='row'>
            <div className='d-flex justify-content-center mt-3'>
                {pagination.count > 0 && <Pag>
                    {pagination.prev && current_page > 2 && <Pag.First onClick={() => changePage(1)}/>}
                    {pagination.prev && current_page > 1 && <Pag.Item onClick={() => changePage(current_page - 1)}>{current_page-1}</Pag.Item>}
                    <Pag.Item active>{current_page}</Pag.Item>
                    {pagination.next && current_page < pagination.last && <Pag.Item onClick={() => changePage(current_page + 1)}>{current_page+1}</Pag.Item>}
                    {pagination.last > current_page && current_page+1 < pagination.last && <Pag.Last onClick={() => changePage(pagination.last)}/>}
                </Pag>}
            </div>
        </div>
    )
}

export default Pagination;