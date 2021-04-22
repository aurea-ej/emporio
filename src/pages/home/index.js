import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../FIREBASECONFIG.js'

import shoppingCart from '../../img/shoppingCart.png'

import { useAuth } from '../../provider'

function Home() {

    const [data, setData] = useState([])
    const { products, setProducts } = useAuth();

    useEffect(()=>{

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

            firebase.database().ref('items').get('/items')
            .then(function(snapshot) {

                if (snapshot.exists()) 
                    setData(snapshot.val());
                else {
                    console.log("No data available");
                }
            })

    },[])

    useEffect(() => {

        window.scrollTo(0, 0);

    }, []);

    function ttt() {

        const teste = [...products]

        teste.push({id: 2, amount: 3})

        setProducts (teste)

        console.log(products)
        
    }
        

  return (

    <div className="App">

        <Header />

        <div className='search' >

            <h1 onClick={()=>{ttt()}} >Empório Bom Jardim</h1>

            <input type="text" placeholder="Procurar.." />

        </div>

        <div className='containerHome' >

            <div className='productsHome'>

                <section id='sectionHome'>

                {
                    data.map(item => (

                        <div className='boxHome'>

                            <img src={item.imageSrc} alt='teste' />
                            <h3>{item.title}</h3>

                            <div className='lineBoxProduct'>

                                <h4>R$ {item.price}</h4>
                                <img src={shoppingCart}/>

                            </div>

                            <p>{item.desc}</p>

                            {/* <Button /> */}

                        </div>

                    ))
                }

                </section>

            </div>

            <div className="areaLateral">
        
                <div className='menuProductsHome' >

                    <div className='filterProducts' >

                        <h4>Preço</h4>

                        <div className='filtersInputs'>
                            <input placeholder='min' />
                                -    
                            <input placeholder='max' />
                        </div>

                    </div>

                    <div className='filterProducts' >

                        <h4>Tipo</h4>

                        <ul>
                            <li>Frutas</li>
                            <li>Verduras</li>
                            <li>Legume</li>
                            <li>Grãos</li>
                            <li>Kits</li>
                        </ul>

                    </div>

                </div>

                {/* <div className="BarraLateral">

                    <nav>
                        <ul class="SubProduto">
                            <li><a href="#">SubProdutos</a>
                                <ul>
                                    <li><a href="#">Produto 1</a></li>
                                    <li><a href="#">Produto 2</a></li>
                                    <li><a href="#">Produto 3</a></li>
                                </ul>
                            </li>
                        </ul>

                        <ul class="SubProduto">
                            <li><a href="#">SubProdutos</a>
                                <ul>
                                    <li><a href="#">Produto 1</a></li>
                                    <li><a href="#">Produto 2</a></li>
                                    <li><a href="#">Produto 3</a></li>
                                </ul>
                            </li>
                        </ul>

                        <ul class="SubProduto">
                            <li><a href="#">SubProdutos</a>
                                <ul>
                                    <li><a href="#">Produto 1</a></li>
                                    <li><a href="#">Produto 2</a></li>
                                    <li><a href="#">Produto 3</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>

                </div> */}
            </div>
        </div>

        <Footer />

    </div>

  );
}

export default Home;
