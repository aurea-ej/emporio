import { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'

function OrderHistory() {

    const [dataAdmin, setDataAdmin] = useState([])
    const [dataExists, setDataExists] = useState(false);

    useEffect( () => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('providers').get('/providers')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataAdmin(temp)
                    setDataExists(true)

                }
                
             else setDataExists(false)

            })

    }, [])

    if (dataExists) {

        return (

            <div className="historyPage">

                <Header />

                    <section id='sectionHistory'>

                        <div className='textHistory' >
                            <h2>Seu histórico de compras com fornecedores: </h2>
                            <p>Selecione um pedido para ver seus detalhes</p>
                        </div>


                        {
                            dataAdmin.map((providers) => {

                                    return (

                                        <div className='boxHistory'>

                                            <div className='lineBoxCardHistory' >

                                                <h3>{providers.company}</h3>

                                                <p>Nome de contato: {providers.name}</p>

                                                <p>
                                                    
                                                    {/* Produto:
                                                    {providers.products.map((products)=>(
                                                    <b>{products.product}</b>
                                                    ))} */}
                                                    
                                                </p>

                                            </div>

                                        </div>
                                    )   

                            })
                        }

                    </section>

                <Footer />

            </div>
        )
    }

    else {

        return (

            <div className="HistoryPage">

                <Header />

                <div className="emptyHistory" style={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }} >
                    <h2>Seu histórico de pedidos está vazio </h2>
                </div>

                <Footer />

            </div>

        )

    }

}

export default OrderHistory