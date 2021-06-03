import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Modal from '../../components/modal'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../FIREBASECONFIG.js'

import heroImg from '../../img/heroImg3.jpg'

function Home() {

    const [data, setData] = useState([])
    const [dataBackup, setDataBackup] = useState([])
    const [searchInput, setSearchInput] = useState([])
    const [minProductPrice, setMinProductPrice] = useState(0)
    const [maxProductPrice, setMaxProductPrice] = useState(999)
    const [displaySearchResult, setDisplaySearchResult] = useState('none')
    const [displayMobileSearch, setDisplayMobileSearch] = useState('none')
    const [heightPageWhenOpenModal, setHeightPageWhenOpenModal] = useState(0)
    const [displayButtonFinishOrder, setDisplayButtonFinishOrder] = useState('none')

    const [displayModal, setDisplayModal] = useState("none");
    const [modalData, setModalData] = useState({});

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('items').get('/items')
        .then(function (snapshot) {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setData(temp)
                setDataBackup(temp)
            }
            else {
                console.log("No data available");
            }
        })

    }, [])

    useEffect(() => {

        window.scrollTo(0, 0);

    }, []);

    useEffect(() => {

        const products = JSON.parse(localStorage.getItem('products'))

    }, []);

    function handleModalInfos(item) {

        setModalData(item)
        setHeightPageWhenOpenModal(document.body.getBoundingClientRect().top)
        window.scrollTo(0, 0);
        displayModal == "none" ? setDisplayModal("flex") : setDisplayModal("none")

    }

    function closeModal() {

        if (displayModal == "none")
            setDisplayModal("flex")
        else {
            window.scrollTo( -heightPageWhenOpenModal, - heightPageWhenOpenModal)
            setDisplayModal("none");
        }

        const products = JSON.parse(localStorage.getItem('products'))

        if (products != null) {
            if (!(products.id))
                setDisplayButtonFinishOrder('block')
        }

    }

    function handleSearchInput(event) {

        if (event.key == 'Enter') {

            clearSearchItem()
            searchItem()

        }
        setSearchInput(event.target.value)

    }

    function handleMinProductPrice(event) {

        if (event.key == 'Enter')
            filterItemByPrice()

    }

    function handleMaxProductPrice(event) {

        if (event.key == 'Enter')
            filterItemByPrice()

    }

    function handleDisplaySearchMobile() {

        if( displayMobileSearch == 'none')
            setDisplayMobileSearch('flex')
        else
            setDisplayMobileSearch('none')
        
    }

    function searchItem() {

        var itens = []

        data.map((item) => {

            if (item.title.includes(searchInput) || item.desc.includes(searchInput))
                itens.push(item)

        })

        setData(itens)
        setDisplaySearchResult('flex')

    }

    function filterItemByPrice() {

        var itens = []

        data.map((item) => {

            if (Number(item.price) >= minProductPrice && Number(item.price) <= maxProductPrice)
                itens.push(item)

        })

        setData(itens)
        setDisplaySearchResult('flex')

    }

    function clearSearchItem() {

        setDisplaySearchResult('none')
        setData(dataBackup)

    }

    return (

        <div className="App" >

            <Header />

            <div style={{ display: displayModal }} role="dialog" className='divModal' >

                <span onClick={closeModal}>X</span>
                <Modal displayProperty={displayModal} modalData={modalData} />

            </div>

            <section id='heroSection'>

                <div className='introHome' >

                    <img src={heroImg} alt="Imagem inicial" />

                    <div className="heroText">

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                    </div>
                    
                </div>

                <div className="borderImg" />

            </section>

            <div className="filterProductsOptions" onClick={()=>handleDisplaySearchMobile()} >
                <h3>Filtrar produtos</h3>
            </div>

            <section className='sectionMobileSearch' style={{display: displayMobileSearch}} >

                <div className='menuProductsHomeMobile' >

                    <div className='filterProductsMobile' >

                        <h4>Pesquisar produto</h4>

                        <div className='searchMobile'>

                            <input type="text" placeholder="Procurar.." onKeyDown={handleSearchInput} />

                        </div>

                    </div>

                    <div className='filterProductsMobile' >

                        <h4>Preço</h4>

                        <div className='filtersInputsMobile'>
                            <input
                                placeholder='min'
                                type='number'
                                onChange={(event) => setMinProductPrice(Number(event.target.value))}
                                onKeyDown={handleMinProductPrice} />
                            <p> - </p>
                            <input
                                placeholder='max'
                                type='number'
                                onChange={(event) => setMaxProductPrice(Number(event.target.value))}
                                onKeyDown={handleMaxProductPrice} />
                        </div>

                    </div>

                </div>

            </section>

            <section style={{ display: displaySearchResult }} className='sectionSearchResult' >

                <div className='divSearchResult'>

                    <h3>Resultado da busca:</h3>
                    <a onClick={() => { clearSearchItem() }}>Limpar pesquisa</a>

                </div>

            </section>

            <p className="tipHome" >Clique no item para selecionar a quantidade</p>
            
            <div className='containerHome' >

                <div className='productsHome'>

                    <section id='sectionHome'>

                        {
                            data.map((item, index) => {

                                if (item.itemAvailability == 'true') {

                                    return (

                                        <div className='boxHome'
        
                                            onClick={() => { handleModalInfos(item) }}>
        
                                            <img src={item.imageSrc} alt='teste' />
        
                                            <div className="itemInfo">
        
                                            <h3>{item.title}</h3>
        
                                            <div className='lineBoxProduct'>
        
                                                <h4>R$ {item.price}</h4>
        
                                            </div>
        
                                            <p>{item.desc}</p>
        
                                            </div>
        
                                        </div>
        
        
                                    )
                                    
                                }
                            
                            })
                        }

                    </section>

                </div>

                <div className="areaLateral" >

                    <div className='menuProductsHome' >

                        <div className='filterProducts' >

                            <h4>Pesquisar produto</h4>

                            <div className='search'>

                                <input type="text" placeholder="Procurar.." onKeyDown={handleSearchInput} />

                            </div>

                        </div>

                        <div className='filterProducts' style={{borderBottom: '10px solid #ffc05c', paddingBottom: '15px'}}>

                            <h4>Preço</h4>

                            <div className='filtersInputs'>
                                <input
                                    placeholder='min'
                                    type='number'
                                    onChange={(event) => setMinProductPrice(Number(event.target.value))}
                                    onKeyDown={handleMinProductPrice} />
                                -
                            <input
                                    placeholder='max'
                                    type='number'
                                    onChange={(event) => setMaxProductPrice(Number(event.target.value))}
                                    onKeyDown={handleMaxProductPrice} />
                            </div>

                        </div>

                        <div className='balloonHome' >

                            <div className='insideOfBalloonHome'>

                                <p>Para comprar, clique em um produto e escolha a quantidade que deseja. Assim que selecionar todos os produtos, vá ao carrinho</p>

                            </div>

                        </div>

                        <div className='balloonHome' >

                            <p>colocar num esquema de "balões"</p>

                        </div>


                    </div>

                </div>

            </div>

            <div className="buttonFinishOrder" style={{display: displayButtonFinishOrder }}>
                <Link to='Carrinho'>FINALIZAR PEDIDO</Link>
            </div>

            <Footer />

        </div>

    );
}

export default Home;
