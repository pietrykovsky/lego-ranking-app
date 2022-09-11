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
    const [detail, setDetail] = useState('')

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
        .then((data) => {
            if (!isCancelled) {
                setIsLoaded(true);
                let number_of_pages = data.count%20 === 0 ? data.count/20 : Math.ceil(data.count/20); 
                setLegoSets(data.results);
                setPagination(prev => ({
                    ...prev,
                    prev: data.previous,
                    next: data.next,
                    count: data.count,
                    last: number_of_pages
                }));
                data.detail && setDetail(data.detail);
                console.log('data: ', data);
            }
        })
        .catch()

        return () => {
            isCancelled = true
        }
    }

    return (
        <div className='container-fluid'>
            <Filters API_URL={API_URL} search_params={search_params} setSearchParams={setSearchParams} />
            {isLoaded ? 
            <>
                {detail !== '' && 
                <div className='row p-5 justify-content-center'>
                    <div className='col-md-6 alert alert-danger text-center'>{detail}</div>
                </div>}
                {legosets?.map((legoset, index) => (<LegoSet key={index} legoset={legoset} />))}
                <Pagination pagination={pagination} search_params={search_params} setSearchParams={setSearchParams} />
            </> : 
            <Loading />}
        </div> 
    )
}

export default LegoSetsListPage