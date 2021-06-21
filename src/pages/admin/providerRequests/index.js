import { useEffect, useState } from 'react'

import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'

function ProviderRequests() {

    const [dataProvider, setDataProvider] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('providers').get('/providers')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataProvider(temp)

                } else {
                    console.log("No data available");
                }
            })

    }, [])

    useEffect(async () => {

        const verify = await JSON.parse(localStorage.getItem('provider-products'))

        if (verify != null) {

            console.log(verify)
            setData(verify)

            var total = 0

            verify.map((item) => {

                if (item.data != undefined) {

                    var value = (Number(item.data.buyPrice))
                    total = value + total

                }

                setTotalValue(total)

            })

        }

    }, [])

    function insertNewRequest() {

        var confirm = window.confirm('Tem certeza que deseja finalizar o cadastro do pedido?')

        if (confirm) {

            var title = window.prompt('Insira um título para a lista')

            var today = new Date();
            var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
            var hour = today.getHours()+':'+today.getMinutes();

            const selectedProducts = JSON.parse(localStorage.getItem('provider-products'))

            const id = firebase.database().ref().child('posts').push().key

            firebase.database().ref('providers-requests/' + id).set({

                id: id,
                listItem: selectedProducts,
                totalValue: totalValue.toFixed(2),
                orderDate: date,
                orderTime: hour,
                listTitle: title

            }).then(() => {
                localStorage.setItem('provider-products', '[{}]')
                alert("Pedido finalizado com sucesso!")
            })

        }

    }

    function addToCart(products) {


        var productAmount = window.prompt('Insira a quantidade desejada')

        if (productAmount) {

            const listOfItems = JSON.parse(localStorage.getItem('provider-products'))

            if (listOfItems != null) {

                if (listOfItems === [{}]) {

                    localStorage.removeItem('provider-products')
                    const newItem = []
                    newItem.push({ data: products, amount: productAmount})
                    localStorage.setItem('provider-products', JSON.stringify(newItem))
                    alert("Produto adicionado à lista de pedidos!")

                } else {

                    const newItem = JSON.parse(localStorage.getItem('provider-products'))
                    newItem.push({ data: products, amount: productAmount})
                    localStorage.setItem('provider-products', JSON.stringify(newItem))
                    alert("Produto adicionado à lista de pedidos!")

                }

            } else {

                const newItem = [{ data: products, amount: productAmount}]
                localStorage.setItem('provider-products', JSON.stringify(newItem))
                alert("Produto adicionado à lista de pedidos!")

            }

        }

    }

    const [itemsOfProvider, setItemsOfProvider] = useState([])

    function handleSelectProviderProducts(event) {
        
        var position = event.target.value
        var data = dataProvider[position].products
        var selectedProvider = dataProvider[position].tradeName
        console.log(selectedProvider)

        if (data != undefined && data != null) {

            var items = Object.keys(data).map((key) => data[key])
            var temp = []

            items.map((products) => {

                console.log(products)
                temp.push(products)

            })

            setItemsOfProvider(temp)

        } else

            setItemsOfProvider([])

    }

    return (

        <div className='providerRequests'>

            <Header />

            <main id='mainProviderRequest' >

                <div className='requestOption' >

                    <fieldset>

                        <legend>
                            <h2>Realizar pedido</h2>
                            <h5>Selecione o fornecedor e clique nos produtos para ver suas informações e adicionar à lista de compras.</h5>
                        </legend>

                        <select onChange={handleSelectProviderProducts} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((item, index) => {

                                return (

                                    <option value={index} key={index}>{item.tradeName}</option>

                                )

                            })}

                        </select>


                        <a onClick={() => { insertNewRequest() }}>Finalizar pedido</a>

                        <div className="containerProviderRequest">

                            <section id="sectionProvider">

                                {itemsOfProvider.map((item) => (

                                    <div className="boxProducts" onClick={() => { addToCart(item) }}>

                                        <div className="productTitle">

                                            <img src={item.imageSrc} alt='Imagem do produto' />
                                            <h2>{item.product}</h2>

                                        </div>

                                        <div className="productInfo">

                                            <p>Preço de compra: R$ <b>{item.buyPrice}</b> </p>
                                            <p>Preço de venda: R$ <b>{item.sellPrice}</b></p>

                                        </div>

                                    </div>

                                ))}

                            </section>

                        </div>

                    </fieldset>

                </div>

            </main>

            <Footer />

        </div>

    )

}

export default ProviderRequests