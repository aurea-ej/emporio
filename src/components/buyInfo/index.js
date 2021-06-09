import { useEffect, useState } from 'react'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../FIREBASECONFIG.js'


function BuyInfo() {

    const [dataAdmin, setDataAdmin] = useState([])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('providers-requests').get('/providers-requests')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataAdmin(temp)

                }

            })

    }, [])

    return (

        <div className='buyModal'>

            <main id='mainBuyInfo' >

                <div className="buyInfoTitle">
                    <h2>Sua lista de produtos adquiridos</h2>
                    <h5>08/06/2021</h5>
                </div>

                {dataAdmin.map((products) => (

                        <div className="buyInfo" >

                            <h4>Fornecedor</h4>
                            <p>Nome do produto - (qntd) - <b>R$ 00,00 </b> </p>
                            <p>Nome do produto - (qntd) - <b>R$ 00,00 </b> </p>
                            <h4>Total: R$ 00,00</h4>

                        </div>

                ))}

                <h2>Total da compra: R$ 00,00</h2>

            </main>

        </div>

    )

}

export default BuyInfo