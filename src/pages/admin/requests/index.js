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
    const [noteAdmin, setNoteAdmin] = useState('')
    const [displayModal, setDisplayModal] = useState("none");
    const [heightPageWhenOpenModal, setHeightPageWhenOpenModal] = useState(0)
    const [modalData, setModalData] = useState({});

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

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

    function removeItemOfClient(indexItem,indexListItem) {

        var dataTemp = dataAdmin

        var confirm = window.confirm("Tem certeza que deseja remover este item?")

        if(confirm){

            dataTemp[indexItem].listItem.splice(indexListItem,1)

            firebase.database()
            .ref('requests/' + dataTemp[indexItem].id)
            .update({

                id: dataTemp[indexItem].id,
                listItem: dataTemp[indexItem].listItem,
                totalValue: dataTemp[indexItem].totalValue,
                userName: dataTemp[indexItem].userName,
                phoneNumber: dataTemp[indexItem].phoneNumber,
                street: dataTemp[indexItem].street,
                houseNumber: dataTemp[indexItem].houseNumber,
                district: dataTemp[indexItem].district,
                cepNumber: dataTemp[indexItem].cepNumber,
                complement: dataTemp[indexItem].complement,
                paymentType: dataTemp[indexItem].paymentType,
                clientNote: dataTemp[indexItem].clientNote,
                userEmail: dataTemp[indexItem].userEmail,
                adminNote: dataTemp[indexItem].adminNote

            }).then(()=>{
                alert('Item removido com sucesso')
            })
        }

    }

    function handleModalInfos(item) {

        setModalData(item)
        setHeightPageWhenOpenModal(document.body.getBoundingClientRect().top)
        window.scrollTo(0, 0);
        displayModal == "none" ? setDisplayModal("flex") : setDisplayModal("none")

    }

    function handleInputNote(event) {

        setNoteAdmin(event.target.value)

    }

    function closeModal() {

        if (displayModal == "none")
            setDisplayModal("flex")
        else {
            window.scrollTo(-heightPageWhenOpenModal, - heightPageWhenOpenModal)
            setDisplayModal("none");
        }
    }

    function sendNoteAdmin(indexItem) {

        var dataTemp = dataAdmin

        firebase.database()
        .ref('requests/' + dataTemp[indexItem].id)
        .update({

            id: dataTemp[indexItem].id,
            listItem: dataTemp[indexItem].listItem,
            totalValue: dataTemp[indexItem].totalValue,
            userName: dataTemp[indexItem].userName,
            phoneNumber: dataTemp[indexItem].phoneNumber,
            street: dataTemp[indexItem].street,
            houseNumber: dataTemp[indexItem].houseNumber,
            district: dataTemp[indexItem].district,
            cepNumber: dataTemp[indexItem].cepNumber,
            complement: dataTemp[indexItem].complement,
            paymentType: dataTemp[indexItem].paymentType,
            clientNote: dataTemp[indexItem].clientNote,
            userEmail: dataTemp[indexItem].userEmail,
            adminNote: noteAdmin


        }).then(()=>{
            alert("Recado enviado!")
        })
        setNoteAdmin('')

    }

    return (

        <div className='Request'>

            <Header />

            <div style={{ display: displayModal }} tabindex="-1" role="dialog" className='modalDelivery' >
                <span onClick={closeModal}>X</span>
                <DeliveryModal displayProperty={displayModal} modalData={modalData} />
            </div>

            <main id='mainRequest' >

                {dataAdmin.map((item, indexItem) => (

                    <div className="boxOrder">

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

                                {
                                    item.listItem.map((item, indexListItem) => (

                                        <div className='flexDisplayRequestPage' >

                                            <li><b>{item.title}</b> ({item.amount})</li>

                                            <img src={closeIcon}
                                                className="imgRemoveIconCart"
                                                alt='opção de remover item'
                                                onClick={() => {
                                                    removeItemOfClient(indexItem,indexListItem)
                                                }}
                                            />

                                        </div>

                                    ))
                                }

                            </ul>

                            <p>Tipo de pagamento: <b>{item.paymentType}</b></p>

                            {

                                item.clientNote != '' ?
                                    <p>Observações do cliente: <b>{item.clientNote}</b></p>
                                    : ''

                            }

                            <p>ID do pedido: <b>{item.id}</b></p>
                            <p>Valor Total do pedido: <b>R$ {item.totalValue}</b></p>
                            
                            {
                                item.deliveryman != undefined ?
                                <p>Entregador: <b>{item.deliveryman}</b></p>
                                : ''

                            }

                            {

                            item.adminNote != '' ?
                                <p>Observações da Empório: <b>{item.adminNote}</b></p>
                                : ''

                            }

                            <div>
                                <input 
                                    placeholder='Recado para cliente'
                                    onChange={handleInputNote} />
                                    
                                    <div > 
                                        <a onClick={()=>{sendNoteAdmin(indexItem)}} >Enviar Recado</a>
                                        <a onClick={() => { handleModalInfos(item) }}>Designar Entregador</a>
                                    </div>
                            </div>

                            

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