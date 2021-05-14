import React, { useEffect, useState } from 'react'
import './style.css'

import Header from '../../components/header'
import Footer from '../../components/footer'
import { useAuth } from '../../provider'
import VendorRegister from '../admin/vendorregister'

function Cart() {

    // const { products, setProducts } = useAuth();
    const [ data, setData ] = useState([]);
    const [ dataExists, setDataExists ] = useState(false);
    const [ totalValue, setTotalValue ] = useState(0);

    useEffect(async () => {

        const verify = await JSON.parse(localStorage.getItem('products'))
    
        if (verify != null && verify.length > 1){
            setData(verify)
            setDataExists(true)

            var total = 0

            verify.map((item)=>{

                if(item.data != undefined){

                    var value = ( Number(item.data.price) * Number(item.amount) )
                    total = value + total
                        
                }

                setTotalValue(total)
            })

        }
        else
            setDataExists(false)

    },[])

    function sendOrder () {

        // Ver como vamos fazer o envio. E-mail, whatsapp... ou só deixar numa dashboard de pedidos
        return 0;

    }

    if (dataExists) {

        return (
            <div className="CartPage">

                <Header />

                <div className='textIntroCart' >
                    <h2>Seus itens no carrinho de compras: </h2>
                    <p>Após revisar os itens, clique no botão para finalizar o pedido </p>
                </div>

                <section id='sectionCart flexDisplay'>

                    {
                        data.map((item,index) => {

                            if (index != 0) {

                                return (

                                    <div className='boxCart flexDisplay'>

                                        <div className='lineBoxCardProduct' >

                                            <img src={item.data.imageSrc} alt='teste' />
                                            <h3>{item.data.title}</h3>

                                        </div>

                                        <div className='lineBoxCardProduct flexDisplay'>

                                            <h4>R$ {((item.data.price) * item.amount).toFixed(2)}</h4>
                                            <h5>qnt.:{item.amount}</h5>

                                        </div>

                                    </div>
                                )
                            }

                        })
                    }

                    <h3>Valor total: {totalValue.toFixed(2)}</h3>


                </section>

                <div className='checkOut' >
                    <a>Finalizar pedido</a>
                </div>

                <Footer />

            </div>
        )

    }else {

        return (

            <div className="CartPage">

                <Header />

                <div className="emptyCart" style={{height: "60vh", display: "flex", alignItems: "center", justifyContent: "center"}} >
                    <h2>Seu carrinho de compras está vazio :( </h2>
                </div>

                <Footer />

            </div>

        )

    }
}

export default Cart