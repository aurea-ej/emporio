import { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'
import BuyInfo from '../../../components/buyInfo'

function OrderHistory() {

    const [dataProduct, setDataProduct] = useState([])
    const [dataExists, setDataExists] = useState(false);
    const [displayModal, setDisplayModal] = useState("none");
    const [heightPageWhenOpenModal, setHeightPageWhenOpenModal] = useState(0)
    const [modalData, setModalData] = useState({});

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('providers-requests').get('/providers-requests')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataProduct(temp)
                    setDataExists(true)

                }

            })

    }, [])

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

        if (dataExists) {

            return (

                <div className="historyPage">

                    <Header />

                    <div style={{ display: displayModal }} tabindex="-1" role="dialog" className='divBuyInfo' >
                        <span onClick={closeModal}>X</span>
                        <BuyInfo displayProperty={displayModal} modalData={modalData} />
                    </div>

                    <section id='sectionHistory'>

                        <div className='textHistory' >
                            <h2>Seu histórico de compras com fornecedores: </h2>
                            <h4>Selecione um pedido para ver seus detalhes</h4>
                        </div>

                        {
                            dataProduct.map((item) => {

                                return (

                                    <div className='boxHistory' onClick={() => { handleModalInfos(item) }}>

                                        <div className='cardHistory' >

                                            <div className="historyInfos">

                                                <h2>{item.listTitle}</h2>

                                                <div className="listSchedule">

                                                    <h3>{item.orderDate}</h3>
                                                    <h4>{item.orderTime}</h4>

                                                </div>

                                            </div>

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