import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBar = ({search_value, setSearchValue}) => {


    useEffect(() => {
        const params = new URLSearchParams(document.location.search)
        if (params.has('search')) {
            const search = params.get('search')
            setSearchValue(search)
        }
    }, [])

    return (  
        <div>
            <InputGroup className="mb-3">
                <Form.Control value={search_value} onChange={e => setSearchValue(e.target.value)} placeholder="Wpisz frazę"/>
                <Button type='submit'>Szukaj</Button>
            </InputGroup>  
        </div>
    );
}

export default SearchBar