import Pag from 'react-bootstrap/Pagination';

const Pagination = ({pagination, setPagination}) => {

    return (
        <div className='row'>
            <div className='d-flex justify-content-center mt-3'>
                <Pag>
                    {pagination.prev && pagination.page > 2 && <Pag.First onClick={() => setPagination(prev => ({...prev, page: 1}))}/>}
                    {pagination.prev && pagination.page > 1 && <Pag.Item onClick={() => setPagination(prev => ({...prev, page: prev.page-1}))}>{pagination.page-1}</Pag.Item>}
                    <Pag.Item active>{pagination.page}</Pag.Item>
                    {pagination.next && pagination.page < pagination.last && <Pag.Item onClick={() => setPagination(prev => ({...prev, page: prev.page+1}))}>{pagination.page+1}</Pag.Item>}
                    {pagination.last > pagination.page && pagination.page+1 < pagination.last && <Pag.Last onClick={() => setPagination(prev => ({...prev, page: prev.last}))}/>}
                </Pag>
            </div>
        </div>
    )
}

export default Pagination;