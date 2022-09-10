import {useState, useEffect} from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const ThemeSelect = ({themes, theme_value, setThemeValue}) => {

    useEffect(() => {
        const params = new URLSearchParams(document.location.search)
        if (params.has('theme')) {
            const theme = params.get('theme')
            setThemeValue(theme)
        }
    }, [])

    return (
        <FloatingLabel controlId="floatingSelect" label="Wybierz kategorię">
            <Form.Select value={theme_value} onChange={e => setThemeValue(e.target.value)} aria-label="Kategoria">
                <option value=''>-</option>
                {themes.map((theme) => (<option key={theme.id} value={theme.id}>{theme.name}</option>))}
            </Form.Select>
        </FloatingLabel>
    )
}

export default ThemeSelect