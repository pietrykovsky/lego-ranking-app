import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'

const LegoSetsListPage = () => {

    let [legosets, setLegoSets] = useState([])

    useEffect(() => {
        getLegoSets()
    }, [])

    let getLegoSets = async () => {
        let response = await fetch('http://127.0.0.1/api/legosets')
        let data = await response.json()
        console.log('data: ', data)
        setLegoSets(data)
    }

    return (
        <div>
            <div className='legosets-list'>
                {legosets.map((legoset, index) => (
                    <h3>{legoset.body}</h3>
                ))}
            </div>
        </div>
    )
}

export default LegoSetsListPage