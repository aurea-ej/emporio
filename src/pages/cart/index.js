import React, { useEffect, useState } from 'react'
import './style.css'

import Header from '../../components/header'
import Footer from '../../components/footer'

import imgTeste2 from '../../img/imgTeste2.jpeg'
import imgTeste4 from '../../img/imgTeste4.png'
import imgTeste5 from '../../img/imgTeste5.png'
import imgTeste6 from '../../img/imgTeste6.webp'


import { useAuth } from '../../provider'

function Cart() {

    const { products, setProducts } = useAuth();

    useEffect(() => {

        console.log(products)

    })

    const data = [

        {
            imageSrc: imgTeste4,
            title: 'Cesta de frutas',
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            price: 43.35

        },
        {
            imageSrc: imgTeste2,
            title: 'Maçãs',
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
            price: 32.50

        },
        {
            imageSrc: imgTeste5,
            title: 'Abacate',
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.",
            price: 215.50

        },
        {
            imageSrc: imgTeste5,
            title: 'Abacate',
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            price: 235.50

        },
        {
            imageSrc: imgTeste2,
            title: 'Maçãs',
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            price: 10.00

        },
        {
            imageSrc: imgTeste6,
            title: 'Uva',
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.",
            price: 5.42

        }

    ]

    const [num, setNum] = useState(1);

    const incNum = () => {
        setNum(num + 1);
    };

    const decNum = () => {
        if (num > 0) {
            setNum(num - 1);
        }
        else {
            setNum(0);
        }
    };

    const cleanCart = () => {
        if (num > 0) {
            setNum(0);
        }
    };

    let sumValue = data.reduce(function (previousValue, currentValue) {
        return {
            price: previousValue.price + currentValue.price,
            total: num * (previousValue.price + currentValue.price)
        }
    });

    return (
        <div className="App">

            <Header />

            <div className="cartPage">

                <div className="cart-left">
                    <h2>Seu carrinho de compras: </h2>

                    <section id='sectionHome'>

                        {
                            data.map(item => (

                                <div className='boxHome'>

                                    <img src={item.imageSrc} alt='teste' />
                                    <h3>{item.title}</h3>

                                    <div className='lineBoxProduct'>

                                        <h4>R$ {item.price}</h4>

                                    </div>

                                    <p>{item.desc}</p>

                                    <div className="counter">
                                        <div className="btn-qntd">

                                            <button
                                                type="button"
                                                className="btn-minus"
                                                onClick={decNum}>
                                                -
                                            </button>

                                        </div>

                                        <span>{num}</span>

                                        <div className="btn-qntd">

                                            <button
                                                type="button"
                                                className="btn-plus"
                                                onClick={incNum}>
                                                +
                                            </button>

                                        </div>
                                    </div>

                                </div>

                            ))
                        }

                    </section>

                </div>

                <section id="sectionPayment">
                    {
                        <div className="cart-right">
                            <h2>Resumo do pedido</h2>

                            <div className="valor">
                                <span>Quantidade de produtos: {num} </span>
                                <span>Preço: R$ {sumValue.total} </span>
                                <span>Desconto: R$ 0.00</span>
                                <span>Entrega: R$ 0.00</span>
                                <strong><span>Total: R$ {sumValue.total}</span></strong>

                                <button
                                    type="button"
                                    className="btn-clean"
                                    onClick={cleanCart}>
                                    Limpar carrinho
                                </button>

                            </div>
                            <button
                                type="button"
                                className="btn-pay">
                                Continuar pagamento
                            </button>

                        </div>

                    }
                </section>
            </div>

            <Footer />

        </div>
    )
}

export default Cart
