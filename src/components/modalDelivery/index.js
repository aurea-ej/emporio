import React from 'react'
import { useEffect, useState } from 'react'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../FIREBASECONFIG.js'


function ModalDelivery(props) {

    const { displayProperty, modalData } = props;
    const [dataAdmin, setDataAdmin] = useState([])
    const [dataRequest, setDataRequest] = useState([])
    const [selectedDeliveryman, setSelectedDeliveryman] = useState('')

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('sellers').get('/sellers')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataAdmin(temp)

                }

            })

    }, [])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('delivery-requests').get('/delivery-requests')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataRequest(temp)

                }

            })

    }, [])

    function handleSelectedDeliveryman(event) {

        setSelectedDeliveryman(event.target.value)

    }

    function sendDeliveryRequest() {

        const id = firebase.database().ref().child('posts').push().key

        firebase.database().ref('delivery-requests/' + id).set({

            customerData: {

                name: modalData.userName,
                phoneNumber: modalData.phoneNumber,
                street: modalData.street,
                district: modalData.district,
                houseNumber: modalData.houseNumber,
                cepNumber: modalData.cepNumber

            },

            id: id,
            deliveryman: selectedDeliveryman

        })

        window.alert(`${selectedDeliveryman} foi definido como entregador para o pedido de ${modalData.userName}!`);

    }

    return (

        <div style={{ display: displayProperty }} className='modalMotoboyInfo'>

            <main id='mainMotoboyInfo' >

                <div className="motoboyInfo">

                    <h2>Selecione o entregador</h2>

                    <div className="motoboyList">

                        {dataAdmin.map((item) => (

                            <ul>

                                <input type="radio" value={item.name} name='selectedDeliveryman' onChange={handleSelectedDeliveryman} />
                                <label for="selectedDeliveryman ">{item.name}</label>

                            </ul>

                        ))}

                    </div>

                    <a onClick={() => { sendDeliveryRequest() }}> Designar entregador</a>

                </div>

            </main>

        </div>

    )

}

export default ModalDelivery