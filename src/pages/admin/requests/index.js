import { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'

import DeliveryModal from '../../../components/modalDelivery'

import closeIcon from '../../../img/removeIconWhite.png'


function Request() {

    const [dataAdmin, setDataAdmin] = useState([])
    const [selectItem, setSelectItem] = useState('')
    const [displayModal, setDisplayModal] = useState("none");
    const [heightPageWhenOpenModal, setHeightPageWhenOpenModal] = useState(0)
    const [modalData, setModalData] = useState({});

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        // firebase.database().ref('requests').get('/requests')
        //     .then(function (snapshot) {

        //         if (snapshot.exists()) {

        //             var data = snapshot.val()
        //             var temp = Object.keys(data).map((key) => data[key])
        //             console.log(temp)
        //             setDataAdmin(temp)

        //         }

        //     })
        

        var firebaseRef = firebase.database().ref('requests/');

        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                console.log(temp)
                setDataAdmin(temp)

            }

        });

    }, [])

    function handleIdSelected(event) {

        setSelectItem(event.target.value)

    }

    function finishOrder() {

        firebase.database()
            .ref('requests/' + selectItem)
            .remove()
            .then(() => alert("Pedido finalizado com sucesso!"))

    }

    function removeItemOfClient(params) {

        alert('ainda nao implementado')

    }

    function handleModalInfos(item) {

        setModalData(item)
        setHeightPageWhenOpenModal(document.body.getBoundingClientRect().top)
        window.scrollTo(0, 0);
        displayModal == "none" ? setDisplayModal("flex") : setDisplayModal("none")

    }

    function closeModal() {

        if (displayModal == "none")
            setDisplayModal("flex")
        else {
            window.scrollTo(-heightPageWhenOpenModal, - heightPageWhenOpenModal)
            setDisplayModal("none");
        }
    }

    return (

        <div className='Request'>

            <Header />

            <div style={{ display: displayModal }} tabindex="-1" role="dialog" className='modalDelivery' >
                <span onClick={closeModal}>X</span>
                <DeliveryModal displayProperty={displayModal} modalData={modalData} />
            </div>

            <main id='mainRequest' >

                {dataAdmin.map((item) => (

                    <div className="boxOrder" onClick={() => { handleModalInfos(item) }}>

                        <div className="leftSizeBoxOrder" >

                            <p>Nome:</p>
                            <b>{item.userName}</b>

                            <p>Telefone: </p>
                            <b>{item.phoneNumber}</b>

                            <p>Rua:</p>
                            <b>{item.street}</b>

                            <p>Bairro:</p>
                            <b>{item.district}</b>

                            <p>Número da casa:</p>
                            <b>{item.houseNumber}</b>

                            <p>CEP:</p>
                            <b>{item.cepNumber}</b>

                        </div>

                        <div className="rightSizeBoxOrder" >

                            {item.seller != undefined ? <p>Vendedor: {item.seller}</p> : ''}

                            <p>Itens:</p>

                            <ul>

                                {item.listItem.map((item, index) => (
                                    <div className='flexDisplayRequestPage' >
                                        <li><b>{item.title}</b> ({item.amount})</li>
                                        <img src={closeIcon}
                                            className="imgRemoveIconCart"
                                            alt='opção de remover item'
                                            onClick={() => {
                                                removeItemOfClient(index)
                                            }}
                                        />
                                    </div>
                                ))}

                            </ul>

                            <p>Tipo de pagamento: <b>{item.paymentType}</b></p>

                            {

                                item.clientNote != undefined ?
                                    <p>Observações: <b>{item.clientNote}</b></p>
                                    : ''

                            }

                            <p>ID do pedido: <b>{item.id}</b></p>
                            <p>Valor Total do pedido: <b>R$ {item.totalValue}</b></p>
                            
                            {
                                item.deliveryman != undefined ?
                                <p>Entregador: <b>{item.deliveryman}</b></p>
                                : ''

                            }

                        </div>

                    </div>

                ))}

                <h3 className="texTripRequest" >Finalizar pedido</h3>

                <select onChange={handleIdSelected} className="selectFinishOrder" >

                    <option className="optionSelectOrder" >Selecionar</option>

                    {dataAdmin.map((item) => (
                        <option className="optionSelectOrder" value={item.id} key={item.id}>{item.userName.split(' ')[0]}: {item.id}</option>
                    ))}

                </select>

                <a className="finishButton" onClick={() => finishOrder()} >Finalizar</a>

            </main>

            <Footer />
        </div>

    )

}

export default Request