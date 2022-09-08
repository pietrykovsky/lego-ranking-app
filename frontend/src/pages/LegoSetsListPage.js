import React, {useState, useEffect} from 'react';
import LegoSet from '../components/LegoSet';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';

const LegoSetsListPage = () => {

    const API_URL = 'http://127.0.0.1:8000/api/'

    const [legosets, setLegoSets] = useState([])
    const [filters, setFilters] = useState({
        page: 1
    })
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetchLegosets(filters)
    }, [filters.page])

    const fetchLegosets = (filters) => {
        let page_url = ''
        if (filters.page > 1) {
            page_url = '?page=' + filters.page
        } 
        setIsLoaded(false);
        fetch(API_URL + 'legosets/' + page_url)
        .then((response) => response.json())
        .then((data) => {
            setIsLoaded(true)
            let number_of_pages = data.count%20 === 0 ? data.count/20 : Math.ceil(data.count/20); 
            setLegoSets(data.results);
            setFilters(filters => ({
                ...filters,
                prev: data.previous,
                next: data.next,
                count: data.count,
                last: number_of_pages
            }));
            console.log('data: ', data);
            console.log('filters: ', filters);
        })
    }

    return (
        <div className='container-fluid'>
            {isLoaded ? legosets.map((legoset, index) => (<LegoSet key={index} legoset={legoset} />)) : <Loading />}
            <Pagination pagination={filters} setPagination={setFilters} />
        </div> 
    )
}

export default LegoSetsListPage