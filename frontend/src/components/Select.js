import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Select = ({items, value, handleChange, parameter, label}) => {

    return (
        <FloatingLabel controlId="floatingSelect" label={label}>
            <Form.Select name={parameter} value={value} onChange={handleChange} aria-label={parameter}>
                <option value=''>-</option>
                {items.map((item) => (<option key={item.id} value={item.id}>{item.name}</option>))}
            </Form.Select>
        </FloatingLabel>
    )
}

export default Select