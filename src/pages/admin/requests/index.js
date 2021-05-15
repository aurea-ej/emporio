import { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'


function Request() {

    const [dataAdmin, setDataAdmin] = useState([])
    const [selectItem, setSelectItem] = useState('')
  
    useEffect(()=>{

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('requests').get('/requests')
        .then(function(snapshot) {

            if (snapshot.exists()){

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setDataAdmin(temp)

            }
            
        })

    },[])

    function handleIdSelected (event) {

        setSelectItem(event.target.value)

    }

    function finishOrder() {

        firebase.database()
        .ref('requests/' + selectItem)
        .remove()
        .then(()=>alert("Pedido finalizado com sucesso!"))
        
    }

    return (

        <div className='Request'>

            <Header />

            <main id='mainRequest' >
    
                {dataAdmin.map((item)=> (

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

                            <p>Itens:</p>

                            <ul>

                                {/* {item.listItem.map((item)=>(console.log(item.)))} */}
                                {item.listItem.map((item)=>(
                                    <li><b>{item.data.title}</b> ({item.amount})</li>
                                ))}

                            </ul>

                            <p>ID do pedido: <b>{item.id}</b></p>
                            <p>Valor Total do pedido: <b>{item.totalValue}</b></p>

                        </div>

                    </div>

                ))}

                <h3 className="texTripRequest" >Finalizar pedido</h3>

                <select onChange={handleIdSelected} className="selectOrder" >

                    <option className="optionSelectOrder" >Selecionar</option>

                    {dataAdmin.map((item)=> (
                        <option className="optionSelectOrder" value={item.id} key={item.id}>{item.userName.split(' ')[0]}: {item.id}</option>
                    ))}

                </select>

                <a className="finishButton" onClick={()=>finishOrder()} >Finalizar</a>

            </main>

            <Footer />
        </div>

    )
    
}

export default Request