import React, {useState, useEffect} from 'react';
import LegoSet from '../components/LegoSet';

const LegoSetsListPage = () => {

    let [legosets, setLegoSets] = useState([])

    useEffect(() => {
        getLegoSets()
    }, [])

    let getLegoSets = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/legosets')
        let data = await response.json()
        console.log('data: ', data)
        setLegoSets(data.results)
    }

    return (
        <div className='container-fluid'>
            {legosets.map((legoset, index) => (<LegoSet key={index} legoset={legoset} />))}
        </div>  
    )
}

export default LegoSetsListPage