import {useState} from 'react';
import SearchBar from "./SearchBar";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';

const Filters = ({setFilters}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='row justify-content-center p-5'>
            <div className=''>
                <SearchBar setFilters={setFilters} />    
            </div>
            <div className="d-flex-inline text-center">
                <Button variant="primary" className="d-md-none" onClick={handleShow}>Filtruj</Button>
                <Button variant="primary" className="d-md-none">Sortuj</Button>
            </div>
            
            <Offcanvas show={show} onHide={handleClose} responsive="md">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filtruj zestawy</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="justify-content-center">
                    <Button>test</Button>
                    <Button>test</Button>
                    <Button>test</Button>
                    <Button>test</Button>
                </Offcanvas.Body>
            </Offcanvas>
            
        </div>
    )
}

export default Filters