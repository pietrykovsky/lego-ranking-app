import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div className='row'>
            <div className='d-flex justify-content-center my-5'>
                <Spinner animation='border' variant='light' />
            </div>
        </div>
    )
}

export default Loading;