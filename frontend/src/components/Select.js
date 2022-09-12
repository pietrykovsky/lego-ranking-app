import Form from 'react-bootstrap/Form';

const Select = ({items, value, handleChange, parameter, label}) => {

    return (
        <Form.Group className='p-2' controlId="floatingSelect">
            <Form.Label>{label}</Form.Label>
            <Form.Select name={parameter} value={value} onChange={handleChange} aria-label={parameter}>
                <option value=''>-</option>
                {items.map((item) => (<option key={item.id} value={item.id}>{item.name}</option>))}
            </Form.Select>
        </Form.Group>
    )
}

export default Select