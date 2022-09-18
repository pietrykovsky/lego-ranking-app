import SearchBar from "./SearchBar";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from './Select'
import Sorting from './Sorting'
import {useState, useEffect} from 'react'

const Filters = ({API_URL, search_params, setSearchParams}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [themes, setThemes] = useState([])
    const [age_categories, setAgeCategories] = useState([])
    const availables = [{id: true, name: 'Dostępne'}, {id: false, name: 'Niedostępne'}]
    const defaultFilters = {
        search: '',
        theme: '',
        age: '',
        available: '',
        price_min: '',
        price_max: '',
        elements_min: '',
        elements_max: '',
        minifigures_min: '',
        minifigures_max: '',
        ordering: ''
    }
    const [filters, setFilters] = useState(defaultFilters)

    const handleReset = event => {
        event.preventDefault()
        setFilters(defaultFilters)
        setSearchParams({})
        handleClose()
    }

    const handleSubmit = event => {
        event.preventDefault()
        const params = {}
        for (const [key, value] of Object.entries(filters))
            if (value !== '')
                params[key] = value
        setSearchParams(params)
        handleClose()
    }

    const handleChange = event => {
        setFilters(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const fetchItems = (items_name, setItems) => {
        const url = API_URL + 'legosets/' + items_name + '/' 
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setItems(data)
        })
        .catch()
    }

    useEffect(() => {
        const params = {}
        for (const [key, value] of search_params)
            if (key !== 'page' && value !== '')
                params[key] = value
        setFilters(prev => ({...prev, ...params}))
        fetchItems('age-categories', setAgeCategories)
        fetchItems('themes', setThemes)
    }, [])

    return (
        <div className='p-1'>
            <div className='row justify-content-center p-1 mb-5'>
                <Form className='col-lg-6 p-2' onSubmit={handleSubmit}>   
                    <SearchBar value={filters.search} handleChange={handleChange} />    
                </Form>
            </div>
            <Offcanvas show={show} onHide={handleClose} responsive="md">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filtruj zestawy</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="justify-content-center">
                    <Form className='d-md-flex flex-wrap justify-content-center align-items-end filters-container' onSubmit={handleSubmit}>
                        <Form.Group className='p-2' controlId="price">
                            <Form.Label>Cena</Form.Label>
                            <div className='d-flex align-items-center container-range'>
                                <div>
                                    <Form.Control type='number' name='price_min' value={filters.price_min} onChange={handleChange} placeholder="Od" />
                                </div>
                                <div>
                                    <span>&nbsp;-&nbsp;</span>
                                </div>
                                <div>
                                    <Form.Control type='number' value={filters.price_max} onChange={handleChange} name='price_max' placeholder="Do" />
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className='p-2' controlId="elements">
                            <Form.Label>Liczba elementów</Form.Label>
                            <div className='d-flex align-items-center container-range'>
                                <div>
                                    <Form.Control type='number' value={filters.elements_min} onChange={handleChange} name='elements_min' placeholder="Od" />
                                </div>
                                <div>
                                    <span>&nbsp;-&nbsp;</span>
                                </div>
                                <div>
                                    <Form.Control type='number' value={filters.elements_max} onChange={handleChange} name='elements_max' placeholder="Do" />
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className='p-2' controlId="minifigures">
                            <Form.Label>Minifigurki</Form.Label>
                            <div className='d-flex align-items-center container-range'>
                                <div>
                                    <Form.Control type='number' name='minifigures_min' value={filters.minifigures_min} onChange={handleChange} placeholder="Od" />
                                </div>
                                <div>
                                    <span>&nbsp;-&nbsp;</span>
                                </div>
                                <div>
                                    <Form.Control type='number' value={filters.minifigures_max} onChange={handleChange} name='minifigures_max' placeholder="Do" />
                                </div>
                            </div>
                        </Form.Group>
                        
                        <Select items={themes} value={filters.theme} handleChange={handleChange} parameter='theme' label='Wybierz kategorię' />
                        <Select items={age_categories} value={filters.age} handleChange={handleChange} parameter='age' label='Wybierz wiek' />
                        <Select items={availables} value={filters.available} handleChange={handleChange} parameter='available' label='Wybierz dostępność' />
                        <div className='d-flex mb-2'>
                            <Button className='ms-3 me-1' type="submit">Filtruj</Button>
                            <Button type='reset' onClick={handleReset}>Resetuj filtry</Button>
                        </div>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
            <div className='d-flex justify-content-between align-items-center mt-2'>
                <div className='me-5'>
                    <Button variant="primary" className="d-md-none" onClick={handleShow}>Filtry</Button>
                </div>
                <div>
                    <Form onSubmit={handleSubmit}>
                        <Sorting value={filters.ordering} handleChange={handleChange}/>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Filters