import Pag from 'react-bootstrap/Pagination';

const Pagination = ({pagination, current_page, setPagination}) => {

    return (
        <div className='row'>
            <div className='d-flex justify-content-center mt-3'>
                {pagination.count > 0 && <Pag>
                    {pagination.prev && current_page > 2 && <Pag.First onClick={() => setPagination(prev => ({...prev, page: 1}))}/>}
                    {pagination.prev && current_page > 1 && <Pag.Item onClick={() => setPagination(prev => ({...prev, page: current_page-1}))}>{current_page-1}</Pag.Item>}
                    <Pag.Item active>{current_page}</Pag.Item>
                    {pagination.next && current_page < pagination.last && <Pag.Item onClick={() => setPagination(prev => ({...prev, page: current_page+1}))}>{current_page+1}</Pag.Item>}
                    {pagination.last > current_page && current_page+1 < pagination.last && <Pag.Last onClick={() => setPagination(prev => ({...prev, page: pagination.last}))}/>}
                </Pag>}
            </div>
        </div>
    )
}

export default Pagination;