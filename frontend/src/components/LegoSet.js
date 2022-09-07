const LegoSet = ({legoset}) => {
    return (
        <a className='legoset-link' href={legoset.link}>
            <div className='row align-items-center justify-content-center border rounded m-1 p-1'>
                <div className='col-md-4 text-center'>
                    <img src={legoset.img_src} className='lego-thumbnail' alt='failed to load the image' />
                </div>
                <div className='col-md'>
                    <div className='d-flex justify-content-between align-items-center mt-2'>
                        <div>
                            <h2>{legoset.title}</h2>
                        </div>
                        <div>
                            <h5>{ legoset.available ? <span className='badge text-bg-success'>Dostępny</span> : <span className='badge text-bg-danger'>Niedostępny</span>}</h5>
                        </div>
                    </div>
                    <div className='d-flex flex-wrap justify-content-around align-items-center mt-2 color-dark'>
                        <div className='p-1'>
                            <div className='p-2 fs-5'>
                                <div>Kategoria: {legoset.theme.name}</div>
                                <div>Kategoria wiekowa: {legoset.age.name}</div>
                            </div>
                        </div>
                        <div className='p-2 fs-5'>
                            <div>Cena: {legoset.price} <span className='small'>PLN</span></div>
                            <div>Elementy: {legoset.elements}</div>
                            <div>Minifigurki: {legoset.minifigures!=null ? legoset.minifigures : "brak"}</div>
                        </div>
                        <div className='p-2 fs-5'>
                            <strong>{legoset.price_per_element} <span className='small'>PLN/element</span></strong>
                        </div>
                    </div>
                </div>
            </div>  
        </a>      
    )
}

export default LegoSet;