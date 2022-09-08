import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBar = ({setFilters}) => {

    const [search_value, setSearch] = useState('');

    const handleClick = event => {
        console.log(search_value)
        setFilters(prev => ({...prev, search: search_value, page: 1}))
    }

    return (  
        <div>
            <InputGroup className="mb-3">
                <Form.Control value={search_value} onChange={event => setSearch(event.target.value)} placeholder="Wpisz frazę" aria-describedby="basic-addon2"/>
                <Button  id="button-addon2" onClick={handleClick}>Szukaj</Button>
            </InputGroup>  
        </div>
    );
}

export default SearchBar