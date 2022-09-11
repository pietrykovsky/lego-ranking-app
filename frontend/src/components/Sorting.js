import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

const Sorting = ({value, handleChange}) => {

    return (
        <>
            <FloatingLabel controlId="floatingSelect" label='Sortuj według'>
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
            </FloatingLabel>
            <Button variant="primary" type="submit">Sortuj</Button>
        </>
    )
}

export default Sorting