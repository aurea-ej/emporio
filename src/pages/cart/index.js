import React, { useEffect, useState } from 'react'

import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../FIREBASECONFIG.js'

function Cart() {

    const [dataAccount, setDataAccount] = useState([]);
    const [ data, setData ] = useState([]);
    const [ dataExists, setDataExists ] = useState(false);
    const [ totalValue, setTotalValue ] = useState(0);

    useEffect(async () => {

        const verify = await JSON.parse(localStorage.getItem('products'))
    
        if (verify != null && verify.length > 1){
            console.log(localStorage.getItem('userEmail'))
            setData(verify)
            setDataExists(true)

            var total = 0

            verify.map((item)=>{

                if(item.data != undefined){

                    var value = ( Number(item.data.price) * Number(item.amount) )
                    total = value + total
                        
                }

                setTotalValue(total)
            })

        }
        else
            setDataExists(false)

    },[])

    useEffect(()=>{

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

    },[])

    useEffect(() => {

        const userEmail = localStorage.getItem('userEmail')        

        firebase.database().ref('users/').get('/users')
        .then(function (snapshot) {

            if (snapshot.exists()){

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])

                temp.map((item)=>{ 

                    if(item.email == userEmail){
                        setDataAccount(item)
                    }

                })

            }else 
                console.log("No data available");

        })

    }, []);

    function sendOrder () {

        const id = firebase.database().ref().child('posts').push().key

        firebase.database().ref('requests/' + id).set({

            id: id,
            listItem: data,
            totalValue: totalValue.toFixed(2),
            userName: dataAccount.name,
            phoneNumber: dataAccount.phoneNumber,
            street: dataAccount.street,
            houseNumber: dataAccount.houseNumber,
            district: dataAccount.district,
            cepNumber: dataAccount.cepNumber,
            complement: dataAccount.complement


        })

        alert("Pedido finalizado com sucesso!.")

        return 0;

    }

    if (dataExists) {

        return (
            <div className="CartPage">

                <Header />

                <div className='textIntroCart' >
                    <h2>Seus itens no carrinho de compras: </h2>
                    <p>Após revisar os itens, clique no botão para finalizar o pedido </p>
                </div>

                <section id='sectionCart flexDisplay'>

                    {
                        data.map((item,index) => {

                            if (index != 0) {

                                return (

                                    <div className='boxCart flexDisplay'>

                                        <div className='lineBoxCardProduct' >

                                            <img src={item.data.imageSrc} alt='teste' />
                                            <h3>{item.data.title}</h3>

                                        </div>

                                        <div className='lineBoxCardProduct flexDisplay'>

                                            <h4>R$ {((item.data.price) * item.amount).toFixed(2)}</h4>
                                            <h5>qnt.:{item.amount}</h5>

                                        </div>

                                    </div>
                                )
                            }

                        })
                    }

                    <h3>Valor total: {totalValue.toFixed(2)}</h3>


                </section>

                <div className='checkOut' >
                    <a onClick={()=>sendOrder()} >Finalizar pedido</a>
                </div>

                <Footer />

            </div>
        )

    }else {

        return (

            <div className="CartPage">

                <Header />

                <div className="emptyCart" style={{height: "60vh", display: "flex", alignItems: "center", justifyContent: "center"}} >
                    <h2>Seu carrinho de compras está vazio 😧 </h2>
                </div>

                <Footer />

            </div>

        )

    }
}

export default Cart