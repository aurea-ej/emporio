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

        var firebaseRef = firebase.database().ref('providers-requests/');

        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setDataAdmin(temp)

            }

        })

    }, [])

    return (

        <div style={{ display: displayProperty }} className='modalBuyInfo'>

            <main id='mainBuyInfo' >

                <div className="buyInfoTitle">
                    <h2>Sua lista de produtos adquiridos: {modalData.provider}</h2>
                    
                    <h4>{modalData.listTitle}</h4>
                    <h4>{modalData.orderDate} - {modalData.orderTime}</h4>

                    {console.log(modalData.listItem)}

                </div>

            </main>

        </div>

    )

}

export default BuyInfo