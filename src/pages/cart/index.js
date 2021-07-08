import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../FIREBASECONFIG.js'

import closeIcon from '../../img/removeIcon.png'

function Cart() {

    const [ data, setData ] = useState([]);
    const [seller, setSeller] = useState([]);
    const [dataUsers, setDataUsers] = useState([]);
    const [isSeller, setIsSeller] = useState(false);
    const [ totalValue, setTotalValue ] = useState(0);
    const [dataAccount, setDataAccount] = useState([]);
    const [ dataExists, setDataExists ] = useState(false);
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [selectedClient, setSelectedClient] = useState('')
    const [clientNote, setClientNote] = useState('')
    
    const [selectedPayment, setSelectedPayment] = useState('');

    const [redirect, setRedirect] = useState(useHistory());

    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) 
              setUserIsLogged(true)
          });
        
    }

    useEffect(async () => {

        const verify = await JSON.parse(localStorage.getItem('products'))

        // console.log(verify)
    
        if (verify != null ){

            var temp = Object.keys(verify).map((key) => verify[key])
            
            setData(temp)
            setDataExists(true)

            console.log(verify)

            var total = 0

            temp.map((item)=>{

                var value = ( Number(item.price) * Number(item.amount) )
                total = value + total

                setTotalValue(total)
            })

        }
        else
            setDataExists(false)

    },[])

    useEffect(()=>{

        window.scrollTo(0, 0);
        
        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);
        onAuthStateChanged()

    },[])

    useEffect(() => {

        const userEmail = localStorage.getItem('userEmail')        

        firebase.database().ref('users/').get('/users')
        .then(function (snapshot) {

            if (snapshot.exists()){

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])

                setDataUsers(temp)

                temp.map((item)=>{ 

                    if(item.email == userEmail){
                        setDataAccount(item)
                    }

                })

            }else 
                console.log("No data available");

        })

        firebase.database().ref('sellers/').get('/sellers')
        .then(function (snapshot) {

            if (snapshot.exists()){

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])

                temp.map((item)=>{ 

                    if(item.email == userEmail){
                        setSeller(item)
                        setIsSeller(true)
                    }

                })

            }else 
                console.log("No data available");

        })

    }, []);

    function sendOrder () {

        if(userIsLogged){

            if (selectedPayment != '') {

                const id = firebase.database().ref().child('posts').push().key
                const now = new Date()

                const dataToSend = {

                    id: id,
                    listItem: data,
                    totalValue: totalValue.toFixed(2),
                    userName: dataAccount.name,
                    phoneNumber: dataAccount.phoneNumber,
                    street: dataAccount.street,
                    houseNumber: dataAccount.houseNumber,
                    district: dataAccount.district,
                    cepNumber: dataAccount.cepNumber,
                    complement: dataAccount.complement,
                    paymentType: selectedPayment,
                    clientNote: clientNote,
                    userEmail: dataAccount.email,
                    adminNote: '',
                    dateToCompare: new Date().toDateString(),
                    date: `${now.getUTCDate()}/${now.getMonth()}/${now.getFullYear()}-${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`

                }

                firebase.database().ref('requests/' + id).set(dataToSend)
                .then(()=>{
                    localStorage.setItem('products', '{}')
                })

                firebase.database().ref('reportsSales/' + id).set(dataToSend)
                .then(()=>{
                    localStorage.setItem('products', '{}')
                    alert("Pedido finalizado com sucesso!.")
                })

            }else alert('Você precisa selecionar o tipo de pagamento!')

        }
        else {
            
            var confirm = window.confirm("Você precisa ter uma conta para finalizar um pedido!.")

            if(confirm)
                redirect.push("/Cadastro")

        }

        return 0;

    }

    function sendOrderSeller () {

        const id = firebase.database().ref().child('posts').push().key

        firebase.database().ref('requests/' + id).set({

            id: id,
            listItem: data,
            totalValue: totalValue.toFixed(2),
            userName: dataUsers[selectedClient].name,
            phoneNumber: dataUsers[selectedClient].phoneNumber,
            street: dataUsers[selectedClient].street,
            houseNumber: dataUsers[selectedClient].houseNumber,
            district: dataUsers[selectedClient].district,
            cepNumber: dataUsers[selectedClient].cepNumber,
            complement: dataUsers[selectedClient].complement,
            paymentType: selectedPayment,
            seller: seller.name

        }).then(()=>{
            localStorage.setItem('products', '[{}]')
            alert("Pedido finalizado com sucesso!.")
        })

    }

    function handleSelectPayment (event) {

        setSelectedPayment(event.target.value)

    }

    function handleSelectedClient (event) {

        setSelectedClient(event.target.value)

    }

    function handleClientNote (event) {

        setClientNote(event.target.value)

    }

    function removeItemInCart(index) {

        var confirm = window.confirm('Tem certeza que deseja remover este item ?')

        if(confirm) {

            data.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(data))
            window.location.reload()

            // localStorage.setItem('totalValue', totalValue.toFixed(2))
            
        }

        
    }

    if (dataExists) {

        return (
            <div className="CartPage">

                <Header />

                <div className='textIntroCart' >
                    <p>Após revisar os itens, clique no botão para finalizar o pedido </p>
                </div>

                <section className='sectionCart flexDisplay'>

                    {
                        data.map((item,index) => {
                            
                            return (

                                <div className='boxCart flexDisplayCart'>

                                    <div className='lineBoxCardProduct nameProductInCart' >

                                        <img src={item.imageSrc} alt='imagem do produto' className="imgProductCart" />
                                        <h3>{item.title}</h3>
                                        {/* {console.log(item)} */}

                                    </div>

                                    <div className='lineBoxCardProduct flexDisplayCart infoProductInCart'>

                                        <h4>R$ {((item.price) * item.amount).toFixed(2)}</h4>
                                        <h5>qnt.:{item.amount}</h5>
                                        <h5>({item.unity})</h5>

                                    </div>

                                    <img src={closeIcon}
                                        className="imgRemoveIconCart"
                                        alt='opção de remover item'
                                        onClick={()=>{
                                            removeItemInCart(index)
                                        }}
                                    />

                                </div>
                            )

                        })
                    }

                    <h3>Valor total: R$ {totalValue.toFixed(2)}</h3>

                    <select className="paymentSelect" onChange={handleSelectPayment} >

                        <option value=''>Selecione o tipo de pagamento (obrigatório)</option>
                        <option value="Cartão" >Cartão de débito</option>
                        <option value="Dinheiro" >Dinheiro</option>
                        <option value="Pix" >PicPay</option>
                        <option value="Pix" >PIX</option>
                        <option value="Pix" >TED</option>

                    </select>

                    <input className="clientNoteInput" onChange={handleClientNote} placeholder='Escreva aqui alguma observação sobre seu pedido (opcional)' />

                </section>

                {isSeller ? 

                    <section>

                        <h2>Selecione o cliente</h2>

                        <select
                        onChange={handleSelectedClient}
                        className="selectOrder" >

                            <option className="optionSelectOrder" >Selecionar</option>

                            {dataUsers.map((item, index)=> (
                                <option className="optionSelectOrder" value={index} key={item.id}>{item.name}: {item.id}</option>
                            ))}

                        </select>

                    </section>

                    : <p></p>

                }

                {isSeller ? 
                    <div className='checkOut' >
                        <a onClick={()=>sendOrderSeller()} >Finalizar pedido</a>
                    </div>
                :
                    <div className='checkOut' >
                        <a onClick={()=>sendOrder()} >Finalizar pedido</a>
                    </div>
    
                }
                
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