import React from 'react'
import { useEffect, useState } from 'react'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../FIREBASECONFIG.js'


function BuyInfo(props) {

    const { displayProperty, modalData } = props;
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

    console.log(modalData)

    return (

        <div style={{ display: displayProperty }} className='modalBuyInfo'>

            <main id='mainBuyInfo' >

                <div className="buyInfoTitle">
                    <h2>Sua lista de produtos adquiridos</h2>
                    <h4>{modalData.orderDate}</h4>

                    {dataAdmin.map((item) => (

                        <div className="test">

                            <ul>

                                {item.listItem.map((item) => (
                                    <div className='aaa' >

                                        <li><b>{item.data.product}</b> ({item.amount})</li>

                                    </div>
                                ))}

                            </ul>

                        </div>
 
                    ))} 

                </div>

            </main>

        </div>

    )

}

export default BuyInfo