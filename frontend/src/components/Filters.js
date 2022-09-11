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
    }

    const handleSubmit = event => {
        event.preventDefault()
        const params = {}
        for (const [key, value] of Object.entries(filters))
            if (value !== '')
                params[key] = value
        setSearchParams(params)
        console.log('filters: ', filters)
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
        <div className='row justify-content-center p-5'>   
            <div className="d-flex-inline text-center">
                <Button variant="primary" className="d-md-none" onClick={handleShow}>Filtruj</Button>
                <Form onSubmit={handleSubmit}>
                    <Sorting value={filters.ordering} handleChange={handleChange}/>
                    
                </Form>
                
            </div>
            <Offcanvas show={show} onHide={handleClose} responsive="md">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filtruj zestawy</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="justify-content-center">
                    <Form onSubmit={handleSubmit}>   
                        <SearchBar value={filters.search} handleChange={handleChange} />    
                    </Form>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="price">
                            <Form.Label>Cena</Form.Label>
                            <Form.Control type='number' name='price_min' value={filters.price_min} onChange={handleChange} placeholder="Od" /> - <Form.Control type='number' value={filters.price_max} onChange={handleChange} name='price_max' placeholder="Do" />
                        </Form.Group>
                        <Form.Group controlId="elements">
                            <Form.Label>Liczba elementów</Form.Label>
                            <Form.Control type='number' name='elements_min' value={filters.elements_min} onChange={handleChange} placeholder="Od" /> - <Form.Control type='number' value={filters.elements_max} onChange={handleChange} name='elements_max' placeholder="Do" />
                        </Form.Group>
                        <Form.Group controlId="minifigures">
                            <Form.Label>Minifigurki</Form.Label>
                            <Form.Control type='number' name='minifigures_min' value={filters.minifigures_min} onChange={handleChange} placeholder="Od" /> - <Form.Control type='number' value={filters.minifigures_max} onChange={handleChange} name='minifigures_max' placeholder="Do" />
                        </Form.Group>
                        <Select items={themes} value={filters.theme} handleChange={handleChange} parameter='theme' label='Wybierz kategorię' />
                        <Select items={age_categories} value={filters.age} handleChange={handleChange} parameter='age' label='Wybierz wiek' />
                        <Select items={availables} value={filters.available} handleChange={handleChange} parameter='available' label='Wybierz dostępność' />
                        <Button type="submit">Filtruj</Button>
                        <Button type='reset' onClick={handleReset}>Resetuj filtry</Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Filters