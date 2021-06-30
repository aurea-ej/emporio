import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'

function ProviderRequests() {

    const [dataProvider, setDataProvider] = useState([]);
    const [data, setData] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [selectProvider, setSelectProvider] = useState('');
    const [displayButtonFinishOrder, setDisplayButtonFinishOrder] = useState('none')

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('providers').get('/providers')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataProvider(temp)
                    setData(temp)

                } else {
                    console.log("No data available");
                }
            })

    }, [])

    const [itemsOfProvider, setItemsOfProvider] = useState([])

    function handleSelectProviderProducts(event) {

        var verify = totalValue

        if (verify === 0) {

            var position = event.target.value
            var data = dataProvider[position].products

            if (data != undefined && data != null) {

                var items = Object.keys(data).map((key) => data[key])
                var temp = []

                setSelectProvider(dataProvider[position].tradeName)

                items.map((products) => {

                    console.log(products)
                    temp.push(products)

                })

                setItemsOfProvider(temp)

            } else

                setItemsOfProvider([])

        } else window.alert('Finalize o pedido antes de trocar de fornecedor!')

    }

    function add(index) {

        var dataTemp = itemsOfProvider
        dataTemp[index].amount = dataTemp[index].amount + 1

        var totalValueTemp = Number(dataTemp[index].buyPrice) + totalValue

        setData(dataTemp)
        setTotalValue(totalValueTemp)
        setDisplayButtonFinishOrder('block')

    }

    function remove(index) {

        var dataTemp = itemsOfProvider

        if (dataTemp[index].amount > 0) {

            dataTemp[index].amount = dataTemp[index].amount - 1
            var totalValueTemp = totalValue - Number(dataTemp[index].buyPrice)

            setData(dataTemp)
            setTotalValue(totalValueTemp)

        }

    }

    let history = useHistory();

    function addToCart() {

        const listOfItems = JSON.parse(localStorage.getItem('providers-products'))
        const provider = selectProvider

        const newItems = []

        var newListOfItems = {}

        itemsOfProvider.map((item) => {

            if (item.amount > 0)
                newItems.push(item)

        })

        if (listOfItems != null) {

            newListOfItems = {
                ...listOfItems,
                ...newItems
            }

            localStorage.setItem('provider-products', JSON.stringify({ ...newListOfItems }))
            localStorage.setItem('provider', provider)

        }

        else {

            newListOfItems = {
                ...newItems
            }

            localStorage.setItem('provider-products', JSON.stringify({ ...newListOfItems }))
            localStorage.setItem('provider', provider)

        }

        history.push('/CarrinhoFornecedor')

    }

    return (

        <div className="App" >

            <div className='providerRequests'>

                <Header />

                <main id='mainProviderRequest' >

                    <div className='requestOption' >

                        <fieldset>

                            <legend>

                                <h1>Realizar pedido de fornecedor</h1>
                                <h5>Selecione o fornecedor e insira a quantidade para adicionar à lista de compras.</h5>

                            </legend>

                            <select onChange={handleSelectProviderProducts} >

                                <option>Selecione o fornecedor</option>

                                {dataProvider.map((item, index) => {

                                    return (

                                        <option value={index} key={index}>{item.tradeName}</option>

                                    )

                                })}

                            </select>

                            <div className="containerProviderRequest">

                                <div className="productsProvider">

                                    <section id="sectionProvider">

                                        {itemsOfProvider.map((item, index) => (

                                            <div className="boxProducts">

                                                    <div className="productTitle">

                                                        <img src={item.imageSrc} alt='Imagem do produto' />
                                                        <h2>{item.product}</h2>

                                                    </div>

                                                    <div className="productInfo">

                                                        <p>Preço de compra: R$ <b>{item.buyPrice}</b> </p>
                                                        <p>Preço de venda: R$ <b>{item.sellPrice}</b></p>

                                                    </div>

                                                    <div className='providerAmountDiv' >

                                                        <div>

                                                            <span onClick={() => { remove(index) }}>-</span>
                                                            Quantidade: <b>{item.amount}</b>
                                                            <span onClick={() => { add(index) }}>+</span>

                                                        </div>

                                                    </div>

                                                </div>
                                                
                                        ))}

                                    </section>

                                </div>

                            </div>

                        </fieldset>

                    </div>

                    <div className="buttonFinishOrder" style={{ display: displayButtonFinishOrder }}>
                        <a onClick={() => addToCart()}>FINALIZAR PEDIDO - R$ {totalValue.toFixed(2)}</a>
                    </div>

                </main>

                <Footer />

            </div>

        </div>

    )

}

export default ProviderRequests