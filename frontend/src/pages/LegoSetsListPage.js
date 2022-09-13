import React, {useState, useEffect} from 'react';
import LegoSet from '../components/LegoSet';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import Filters from '../components/Filters';
import {useSearchParams} from 'react-router-dom';

const LegoSetsListPage = () => {

    const API_URL = 'http://127.0.0.1:8000/api/'

    const [search_params, setSearchParams] = useSearchParams()
    const [legosets, setLegoSets] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [pagination, setPagination] = useState({})
    const [results, setResults] = useState('')

    useEffect(() => {
        fetchLegosets()
    }, [search_params])

    const fetchLegosets = () => {
        let isCancelled = false
        let url = new URL(API_URL + 'legosets')
        url.search =  new URLSearchParams(search_params).toString()
        setIsLoaded(false)
        fetch(url)
        .then((response) => response.json())
        .catch()
        .then((data) => {
            if (!isCancelled) {
                setIsLoaded(true);
                if (data.hasOwnProperty('count')) {
                    let number_of_pages = data.count%20 === 0 ? data.count/20 : Math.ceil(data.count/20); 
                    setLegoSets(data.results);
                    setPagination(prev => ({
                        ...prev,
                        prev: data.previous,
                        next: data.next,
                        count: data.count,
                        last: number_of_pages
                    }));
                    setResults(`Znaleziono ${data.count} wyników.`)
                } else
                    setResults('Nie znaleziono.')
            }
        })
        .catch()

        return () => {
            isCancelled = true
        }
    }

    return (
        <div className='container'>
            <Filters API_URL={API_URL} search_params={search_params} setSearchParams={setSearchParams} />
            {isLoaded ? 
            <>
                <div className='row p-2 justify-content-center'>
                    <div className='col-md-6 alert text-center'>
                        {results}
                    </div>
                </div>
                {legosets?.map((legoset, index) => (<LegoSet key={index} legoset={legoset} />))}
                {pagination.count > 20 ? <Pagination pagination={pagination} search_params={search_params} setSearchParams={setSearchParams} /> : <div className='m-5'></div>}
            </> : 
            <Loading />}
        </div> 
    )
}

export default LegoSetsListPage