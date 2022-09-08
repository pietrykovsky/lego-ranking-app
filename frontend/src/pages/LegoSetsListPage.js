import React, {useState, useEffect} from 'react';
import LegoSet from '../components/LegoSet';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import Filters from '../components/Filters';

const serialize = (obj) => {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

const LegoSetsListPage = () => {

    const API_URL = 'http://127.0.0.1:8000/api/'

    const [legosets, setLegoSets] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [filters, setFilters] = useState({
        page: 1
    })
    const [pagination, setPagination] = useState({})

    useEffect(() => {
        fetchLegosets(filters)
    }, [filters])

    const fetchLegosets = (filters) => {
        let url = API_URL + 'legosets/';
        if (Object.keys(filters).length) {
            url += '?' + serialize(filters);
        }
        console.log(url)
        setIsLoaded(false);
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setIsLoaded(true)
            let number_of_pages = data.count%20 === 0 ? data.count/20 : Math.ceil(data.count/20); 
            setLegoSets(data.results);
            setPagination(pag => ({
                ...pag,
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
            <Filters filters={filters} setFilters={setFilters} />
            {isLoaded ? legosets.map((legoset, index) => (<LegoSet key={index} legoset={legoset} />)) : <Loading />}
            <Pagination pagination={pagination} current_page={filters.page} setPagination={setFilters} />
        </div> 
    )
}

export default LegoSetsListPage