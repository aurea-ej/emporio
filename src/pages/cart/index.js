import React, { useEffect, useState } from 'react'
import './style.css'

import Header from '../../components/header'
import Footer from '../../components/footer'
import { useAuth } from '../../provider'

function Cart() {

    // const { products, setProducts } = useAuth();
    const [ data, setData ] = useState([]);

    useEffect(async () => {

        setData( await JSON.parse(localStorage.getItem('products')))

    },[])


    return (
        <div className="CartPage">

            <Header />

            <h2>Seu carrinho de compras: </h2>

            <section id='sectionHome'>

                {
                    data.map(item => (

                        <div className='boxHome'>

                            <img src={item.data.imageSrc} alt='teste' />
                            <h3>{item.data.title}</h3>

                            <div className='lineBoxProduct'>

                                <h4>R$ {((item.data.price) * item.amount).toFixed(2)}</h4>
                                <h5>qnt.:{item.amount}</h5>

                            </div>

                        </div>

                    ))
                }

            </section>

            <Footer />

        </div>
    )
}

export default Cart
