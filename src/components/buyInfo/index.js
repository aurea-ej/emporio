import React from 'react'
import './style.css'

import 'firebase/auth'
import 'firebase/database'


function BuyInfo(props) {

    const { displayProperty, modalData } = props;


    return (

        <div style={{ display: displayProperty }} className='modalBuyInfo'>

            {console.log("props:", props)}

            <main id='mainBuyInfo' >

                <div className="buyInfoTitle">
                    <h2>Sua lista de produtos adquiridos: <br/>{modalData.listTitle}</h2>

                    <h3>{modalData.provider}</h3>
                    <h4>{modalData.orderDate} - {modalData.orderTime}</h4>

                    {modalData.listItem != undefined ?
                        modalData.listItem.map((item) => {

                            return (

                                <div className="productList">

                                    <p>{item.product} ({item.amount} {item.unity}) : <strong>R$ {item.buyPrice * item.amount}</strong></p>

                                </div>

                            )

                        }

                        ) : <p></p>

                    }

                        <h2>Valor total: R$ {modalData.totalValue}</h2>

                </div>

            </main>

        </div>

    )
}


export default BuyInfo