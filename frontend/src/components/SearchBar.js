import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBar = ({setFilters}) => {

    const [search_value, setSearchValue] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        setFilters({search: search_value})
    }

    useEffect(() => {
        const params = new URLSearchParams(document.location.search)
        if (params.has('search')) {
            const search = params.get('search')
            setSearchValue(search)
        }
    }, [])

    return (  
        <div>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <Form.Control value={search_value} onChange={e => setSearchValue(e.target.value)} placeholder="Wpisz frazę"/>
                    <Button type='submit'>Szukaj</Button>
                </InputGroup>  
            </Form>
        </div>
    );
}

export default SearchBar