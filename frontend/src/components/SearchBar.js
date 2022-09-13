import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBar = ({value, handleChange}) => {

    return (  
        <div>
            <InputGroup size='lg'>
                <Form.Control name='search' value={value} onChange={handleChange} placeholder="Wpisz frazę"/>
                <Button type='submit'>Szukaj</Button>
            </InputGroup>  
        </div>
    );
}

export default SearchBar