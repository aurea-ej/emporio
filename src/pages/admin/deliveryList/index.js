import { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'


function DeliveryList() {

    const [deliveryData, setDeliveryData] = useState([])
    const [dataKeysAdm, setDataKeysAdm] = useState([])
    const [selectAddressToDelete, setSelectAddressToDelete] = useState('')


    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('delivery-requests').get('/delivery-requests')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDeliveryData(temp)
                    setListData(temp)

                }

            })

    }, [])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var ref = firebase.database().ref("delivery-requests");

        var keys = []

        ref.orderByKey().on("child_added", function (snapshot) {
            keys.push(snapshot.key);
        });

        setDataKeysAdm(keys)

    }, []);

    const [listData, setListData] = useState([]);

    function handleOnDragEnd(result) {

        console.log(result)

        if (!result.destination) return;

        const items = Array.from(listData);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setListData(items);

    }

    function handleSelectAddressToDelete(event) {

        setSelectAddressToDelete(event.target.value)

    }

    function deleteDeliveryAddres() {

        firebase.database()
            .ref('delivery-requests/' + dataKeysAdm[selectAddressToDelete])
            .remove()
            .then(() => alert("Pedido finalizado com sucesso!"))

    }

    return (

        <div className='deliveryRequest'>

            <Header />

            <main id='mainDeliveryRequest' >

                <h1>Sua lista de entregas</h1>
                <h4>Selecione e arraste para definir a posição dos pedidos</h4>

                <DragDropContext onDragEnd={handleOnDragEnd} >

                    <Droppable droppableId='listPosition'>
                        {(provided) => (

                            <ul className="listPosition" {...provided.droppableProps} ref={provided.innerRef}>
                                {listData.map((item, index) => {

                                    return (

                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided) => (

                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div className="boxDeliveryInfo">

                                                        <p>Cliente: <b>{item.customerData.name}</b></p>
                                                        <p>Endereço: <b>{item.customerData.street}</b></p>
                                                        <p>Bairro: <b>{item.customerData.district}</b></p>
                                                        <p>Número: <b>{item.customerData.houseNumber}</b></p>
                                                        <p>Telefone: <b>{item.customerData.phoneNumber}</b></p>

                                                    </div>

                                                </li>
                                            )}

                                        </Draggable>
                                    )
                                }
                                )}

                                {provided.placeholder}

                            </ul>
                        )}

                    </Droppable>
                </DragDropContext>


                <h3 className='textFinishOrder'>Finalizar pedido</h3>

                <select className='selectFinishDeliveryOrder' onChange={handleSelectAddressToDelete} >

                            <option>Selecione o cliente</option>

                            {deliveryData.map((item, index) => {

                                return (

                                    <option key={index} value={index} >{item.customerData.name}</option>

                                )

                            })}

                        </select>

                <a className="finishButton" onClick={() => deleteDeliveryAddres()} >Finalizar</a>

            </main>

            <Footer />

        </div>

    )

}

export default DeliveryList