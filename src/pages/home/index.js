import React from 'react'
import { useEffect, useState, useRef } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Modal from '../../components/modal'
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

    const [ displayModal, setDisplayModal ] = useState("none");
    const [ modalData, setModalData ] = useState({});


    useEffect(()=>{

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

            firebase.database().ref('items').get('/items')
            .then(function(snapshot) {

                if (snapshot.exists()){

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setData(temp)
                }
                else {
                    console.log("No data available");
                }
            })

    },[])

    useEffect(() => {

        window.scrollTo(0, 0);

    }, []);

    useEffect(() => {

        const products = JSON.parse(localStorage.getItem('products'))

        if(products != null){
            if(!(products.id))
                localStorage.setItem('products','[{}]')
        }

    }, []);
        
    function handleModalInfos(item) {

        setModalData(item)
        console.log(modalData)

        displayModal == "none" ? setDisplayModal("flex") : setDisplayModal("none")
        
    }

  return (

    <div className="App">

        <Header />

        <button onClick={handleModalInfos} >Abrir/fechar Modal - teste</button>

        <Modal displayProperty={displayModal} modalData={modalData} />

        <div className='search' >

            <h1>Empório Bom Jardim</h1>

            <input type="text" placeholder="Procurar.." />

        </div>

        <div className='containerHome' >

            <div className='productsHome'>

                <section id='sectionHome'>

                {
                    data.map((item,index) => (

                        <div className='boxHome' 

                            onClick={()=>{handleModalInfos(item)}}>

                            <img src={item.imageSrc} alt='teste' />
                            <h3>{item.title}</h3>

                            <div className='lineBoxProduct'>

                                <h4>R$ {item.price}</h4>
                                <img src={shoppingCart}/>

                            </div>

                            <p>{item.desc}</p>

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

            </div>

        </div>

        <Footer />

    </div>

  );
}

export default Home;
