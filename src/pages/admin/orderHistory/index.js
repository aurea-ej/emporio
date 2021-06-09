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

    const [dataAdmin, setDataAdmin] = useState([])
    const [dataExists, setDataExists] = useState(false);

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('providers-requests').get('/providers-requests')
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

    const [displayHistory, setDisplayHistory] = useState("none");
    const [HistoryData, setHistoryData] = useState({});
    const [pageHeight, setPageHeight] = useState(0);

    useEffect(() => {

        window.scrollTo(0, 0);
        setPageHeight(window.screen.height)

    }, []);

    function handleHistoryInfos() {

        setHistoryData();

        displayHistory == "none" ? setDisplayHistory("flex") : setDisplayHistory("none")

    }

    function closeHistory() {

        displayHistory == "none" ? setDisplayHistory("flex") : setDisplayHistory("none")

    }

    if (dataExists) {

        return (

            <div className="historyPage">

                <Header />

                <div style={{ display: displayHistory }} tabindex="-1" role="dialog" className='divBuyInfo' >
                    <span onClick={closeHistory}>X</span>
                    <BuyInfo displayProperty={displayHistory} HistoryData={HistoryData} />
                </div>

                <section id='sectionHistory'>

                    <div className='textHistory' >
                        <h2>Seu histórico de compras com fornecedores: </h2>
                        <p>Selecione um pedido para ver seus detalhes</p>
                    </div>

                    {
                        dataAdmin.map((requests) => {

                            return (

                                <div className='boxHistory' onClick={() => { handleHistoryInfos() }}>

                                    <div className='lineBoxCardHistory' >

                                        <h3>{requests.id}</h3>

                                        <p>Data do pedido: </p>

                                        <p>


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