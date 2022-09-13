import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Sorting = ({value, handleChange}) => {

    return (
        <Form.Group className='d-flex align-items-center' controlId="floatingSelect">
            <Form.Select name='ordering' value={value} onChange={handleChange} aria-label='sortuj'>
                <option value=''>Domyślnie (cena/element)</option>
                <option value='title'>Tytuł (rosnąco)</option>
                <option value='-title'>Tytuł (malejąco)</option>
                <option value='price'>Cena (rosnąco)</option>
                <option value='-price'>Cena (malejąco)</option>
                <option value='elements'>Elementy (rosnąco)</option>
                <option value='-elements'>Elementy (malejąco)</option>
                <option value='minifigures'>Minifigurki (rosnąco)</option>
                <option value='-minifigures'>Minifigurki (malejąco)</option>
                <option value='available'>Dostępność (rosnąco)</option>
                <option value='-available'>Dostępność (malejąco)</option>
            </Form.Select>
            <Button variant="primary" type="submit">Sortuj</Button>
        </Form.Group>
    )
}

export default Sorting