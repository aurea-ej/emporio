import React, { useEffect, useState } from 'react'

import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'

import closeIcon from '../../../img/removeIcon.png'

function CartProvider() {

    const [data, setData] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [dataExists, setDataExists] = useState(false);

    useEffect(async () => {

        const verify = await JSON.parse(localStorage.getItem('provider-products'))

        if (verify != null) {

            var temp = Object.keys(verify).map((key) => verify[key])

            setData(temp)
            setDataExists(true)

            var total = 0

            temp.map((item) => {

                var value = (Number(item.buyPrice) * Number(item.amount))
                total = value + total

                setTotalValue(total)
            })

        }
        else
            setDataExists(false)

    }, [])

    useEffect(() => {

        window.scrollTo(0, 0);

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);
    }, [])

    function sendOrder() {

        var title = window.prompt('Insira um título para a lista')

        const productProvider = localStorage.getItem('provider')

        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var hour = today.getHours() + ':' + today.getMinutes();

        const id = firebase.database().ref().child('posts').push().key

        firebase.database().ref('providers-requests/' + id).set({

            id: id,
            listItem: data,
            totalValue: totalValue.toFixed(2),
            orderDate: date,
            orderTime: hour,
            listTitle: title,
            provider: productProvider

        }).then(() => {
            localStorage.setItem('provider-products', '{}')
            localStorage.setItem('provider', '')
            alert("Pedido finalizado com sucesso!")
        })

        return 0;

    }

    function removeItemInCart(index) {

        var confirm = window.confirm('Tem certeza que deseja remover este item ?')

        if (confirm) {

            data.splice(index, 1);
            localStorage.setItem('provider-products', JSON.stringify(data))
            window.location.reload()

        }

    }

    if (dataExists) {

        return (
            <div className="CartPage">

                <Header />

                <div className='textIntroCart' >
                    <p>Após revisar os itens, clique no botão para finalizar o pedido </p>
                </div>

                <section className='sectionCart flexDisplay'>

                    {
                        data.map((item, index) => {

                            return (

                                <div className='boxCart flexDisplayCart'>

                                    <div className='lineBoxCardProduct nameProductInCart' >

                                        <img src={item.imageSrc} alt='imagem do produto' className="imgProductCart" />
                                        <h3>{item.product}</h3>
                                        {/* {console.log(item)} */}

                                    </div>

                                    <div className='lineBoxCardProduct flexDisplayCart infoProductInCart'>

                                        <h4>R$ {((item.buyPrice) * item.amount).toFixed(2)}</h4>
                                        <h5>Quantidade.:{item.amount}</h5>
                                        <h5>({item.unity})</h5>

                                    </div>

                                    <img src={closeIcon}
                                        className="imgRemoveIconCart"
                                        alt='opção de remover item'
                                        onClick={() => {
                                            removeItemInCart(index)
                                        }}
                                    />

                                </div>
                            )

                        })
                    }

                    <h3>Valor total: R$ {totalValue.toFixed(2)}</h3>

                    <div className='checkOut' >
                        <a onClick={()=>sendOrder()} >Finalizar pedido</a>
                    </div>

                </section>

                <Footer />

            </div>
        )

    } else {

        return (

            <div className="CartPage">

                <Header />

                <div className="emptyCart" style={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }} >
                    <h2>Seu carrinho de compras está vazio 😧 </h2>
                </div>

                <Footer />

            </div>

        )

    }
}

export default CartProvider