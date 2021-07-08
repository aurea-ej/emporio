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
                    <h2>Sua lista de produtos adquiridos: {modalData.provider}</h2>

                    <h4>{modalData.listTitle}</h4>
                    <h4>{modalData.orderDate} - {modalData.orderTime}</h4>



                    {modalData.listItem != undefined ?
                        modalData.listItem.map((item) => {

                            return <p>{item.product}</p>

                        }
                        ) : <p></p>

                    }



                </div>

            </main>

        </div>

    )
}


export default BuyInfo