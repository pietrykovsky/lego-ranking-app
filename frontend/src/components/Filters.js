import SearchBar from "./SearchBar";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ThemeSelect from './ThemeSelect'
import {useState, useEffect} from 'react'

const Filters = ({API_URL, filters, setFilters}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [themes, setThemes] = useState([])
    const [search_value, setSearchValue] = useState('')
    const [theme_value, setThemeValue] = useState('')

    const handleReset = event => {
        setFilters({})
    }

    const handleSubmit = event => {
        event.preventDefault()
        const params = {}
        for (const [k, v] of filters) {
            if (k === 'page')
                continue
            params[k] = v
        }
        console.log('params: ', params)
        params.search = search_value
        params.theme = theme_value
        setFilters(params)
    }

    const fetchThemes = () => {
        const url = API_URL + 'legosets/themes/' 
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setThemes(data)
        })
        .catch()
    }

    useEffect(() => {
        
        fetchThemes()
    }, [])

    return (
        <div className='row justify-content-center p-5'>   
            <div className="d-flex-inline text-center">
                <Button variant="primary" className="d-md-none" onClick={handleShow}>Filtruj</Button>
                <Button variant="primary" className="d-md-none">Sortuj</Button>
            </div>
            <Offcanvas show={show} onHide={handleClose} responsive="md">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filtruj zestawy</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="justify-content-center">
                    <Form onSubmit={handleSubmit}>
                        <div className=''>
                            <SearchBar search_value={search_value} setSearchValue={setSearchValue} />    
                        </div>
                        <ThemeSelect themes={themes} theme_value={theme_value} setThemeValue={setThemeValue} />
                        <Button type="submit">Filtruj</Button>
                        <Button type='reset' onClick={handleReset}>Resetuj filtry</Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Filters