import SearchBar from "./SearchBar";

const Filters = ({filters, setFilters}) => {

    return (
        <div className='row justify-content-center p-5'>
            <div className='col-md-6'>
                <SearchBar setFilters={setFilters} />    
            </div>
        </div>
    )
}

export default Filters