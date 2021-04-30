import React, { useEffect, useState } from 'react'
import './style.css'

import Header from '../../components/header'
import Footer from '../../components/footer'
import { useAuth } from '../../provider'
import VendorRegister from '../vendorregister'

function Cart() {

    // const { products, setProducts } = useAuth();
    const [ data, setData ] = useState([]);
    const [ dataExists, setDataExists ] = useState(false);

    useEffect(async () => {

        const verify = await JSON.parse(localStorage.getItem('products'))
    
        if (verify != null && verify.length > 1){
            console.log(verify)
            setData(verify)
            setDataExists(true)
        }
        else
            setDataExists(false)

    },[])

    if (dataExists) {

        return (
            <div className="CartPage">

                <Header />

                <h2>Seu carrinho de compras: </h2>

                <section id='sectionHome'>

                    {
                        data.map((item,index) => {

                            console.log(item)

                            if (index != 0) {

                                return (

                                <div className='boxHome'>

                                    <img src={item.data.imageSrc} alt='teste' />
                                    <h3>{item.data.title}</h3>

                                    <div className='lineBoxProduct'>

                                        <h4>R$ {((item.data.price) * item.amount).toFixed(2)}</h4>
                                        <h5>qnt.:{item.amount}</h5>

                                    </div>

                                </div>
                            )}

                        })
                    }

                </section>

                <Footer />

            </div>
        )

    }else {

        return (

            <div className="CartPage">

                <Header />

                <div style={{height: "60vh", display: "flex", alignItems: "center", justifyContent: "center"}} >
                    <h2>Seu carrinho de compras está vazio :( </h2>
                </div>

                <Footer />

            </div>

        )

    }
}

export default Cart