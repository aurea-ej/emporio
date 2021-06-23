import React from 'react'
import { useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/header'
import Footer from '../../components/footer'
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
    const [displayButtonFinishOrder, setDisplayButtonFinishOrder] = useState('none')
    const [totalValue, setTotalValue] = useState(0)

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var firebaseRef = firebase.database().ref('items/');

        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                console.log(temp)
                setData(temp)
                setDataBackup(temp)

            }
            else {
                console.log("No data available");
            }

        });

    }, [])

    useEffect(() => {

        // window.scrollTo(0, 0);

    }, []);

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

        if (displayMobileSearch == 'none')
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

    function add(index) {

        var dataTemp = data
        dataTemp[index].amount = dataTemp[index].amount + 1

        var totalValueTemp = Number(dataTemp[index].price) + totalValue

        setData(dataTemp)
        setTotalValue(totalValueTemp)
        setDisplayButtonFinishOrder('block')

    }

    function remove(index) {

        var dataTemp = data

        if (dataTemp[index].amount > 0){

            dataTemp[index].amount = dataTemp[index].amount - 1
            var totalValueTemp = totalValue - Number(dataTemp[index].price)

            setData(dataTemp)
            setTotalValue(totalValueTemp)
            
        }
        
    }

    let history = useHistory();

    function addToCart() {

        const listOfItems = JSON.parse(localStorage.getItem('products'))

        const newItems = []

        var newListOfItems = {}

        data.map((item) => {

            if (item.amount > 0)
                newItems.push(item)

        })

        if (listOfItems != null) {

            newListOfItems = {
                ...listOfItems,
                ...newItems
            }

            localStorage.setItem('products', JSON.stringify({ ...newListOfItems }))

        }
        else {

            newListOfItems = {
                ...newItems
            }

            localStorage.setItem('products', JSON.stringify({ ...newListOfItems }))

        }

        history.push('/Carrinho')

    }

    return (

        <div className="App" >

            <Header />

            <section id='heroSection'>

                <div className='introHome' >

                    <img src={heroImg} alt="Imagem inicial" />

                    <div className="heroText">

                        <h2>
                            Alimentos orgânicos: mais saúde na sua mesa!
                            <br/>Produtos selecionados.
                        </h2>

                    </div>

                </div>

                <div className="borderImg" />

            </section>

            <div className="filterProductsOptions" onClick={() => handleDisplaySearchMobile()} >
                <h3>Filtrar produtos</h3>
            </div>

            <section className='sectionMobileSearch' style={{ display: displayMobileSearch }} >

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

            <p className="tipHome" >Selecione a quantidade e depois clique para finalizar o pedido</p>
            
            <div className='containerHome' >

                <div className='productsHome'>

                    <section id='sectionHome'>

                        {
                            data.map((item, index) => {

                                if (item.itemAvailability == 'true') {

                                    return(

                                        <div className='boxHome'

                                        // onClick={() => { handleModalInfos(item) }}
                                        key={index}
                                        >

                                            <div className='infoDivHome' >

                                                <img src={item.imageSrc} alt='imagem do produto' />

                                                <div className="itemInfo">

                                                    <h3>{item.title}</h3>

                                                    <h4>
                                                        R$ {item.price}
                                                        <p>({item.unity})</p>
                                                    </h4>

                                                    <p>{item.desc}</p>

                                                    <div>

                                                        <p><b>Categoria: </b>{item.category}</p>
                                                        
                                                        {
                                                            (item.unityPrice) != undefined ?
                                                            (<p>
                                                                <b>Unidade R$:  </b>
                                                                {Number(item.unityPrice).toFixed(2)}
                                                            </p>)
                                                            : (<p></p>)
                                                        }
                                                    </div>

                                                </div>

                                            </div>

                                            <div className='amountDiv' >

                                                <div>

                                                    <span onClick={() => { remove(index) }}>-</span>
                                                    quantidade: <b>{item.amount}</b>
                                                    <span onClick={() => { add(index) }}>+</span>

                                                </div>

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

                        <div className='filterProducts' style={{ borderBottom: '10px solid #ffc05c', paddingBottom: '15px' }}>

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

            <div className="buttonFinishOrder" style={{ display: displayButtonFinishOrder }}>
                <a onClick={() => addToCart()}>FINALIZAR PEDIDO - R$ {totalValue.toFixed(2)}</a>
            </div>

            <Footer />

        </div>

    );
}


export default Home;
