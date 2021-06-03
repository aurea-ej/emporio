import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import addIcon from '../../img/addIcon.png'
import removeIcon from '../../img/removeIcon.png'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

import { Link, useHistory } from "react-router-dom";

function UserProfile() {

    const [SelectOptions, setSelectOptions] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [dataAccount, setDataAccount] = useState([]);
    const [amount, setAmount] = useState(1);

    const [ totalValue, setTotalValue ] = useState(0);
    const [dataUsers, setDataUsers] = useState([]);
    const [dataItems, setDataItems] = useState([]);
    const [selectedClient, setSelectedClient] = useState('')
    const [selectedItem, setSelectedItem] = useState('')
    var [selectedItems, setSelectedItems] = useState([])
    
    useEffect(() => {
        
        window.scrollTo(0,0);

        const id = localStorage.getItem('id')
        const userEmail = localStorage.getItem('userEmail')

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

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

            }else {
                console.log("No data available");
            }
        })

        firebase.database().ref('items').get('/items')
        .then(function (snapshot) {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])

                var selectOptions = []

                temp.map((item,index)=> {

                    selectOptions.push({value: index, label: item.title})

                })

                setSelectOptions(selectOptions)
                setDataItems(temp)
            }
            else {
                console.log("No data available");
            }
        })

    }, []);

    function handleSelectedClient (event) {

        setSelectedClient(event.target.value)

    }

    function handleSelectedItem (event) {

        setSelectedItem(event.target.value)

    }

    function handleSelectPayment (event) {

        setSelectedPayment(event.target.value)

    }

    function sendOrder () {

        const id = firebase.database().ref().child('posts').push().key

        firebase.database().ref('requests/' + id).set({

            id: id,
            listItem: selectedItems,
            totalValue: totalValue.toFixed(2),
            userName: dataUsers[selectedClient].name,
            phoneNumber: dataUsers[selectedClient].phoneNumber,
            street: dataUsers[selectedClient].street,
            houseNumber: dataUsers[selectedClient].houseNumber,
            district: dataUsers[selectedClient].district,
            cepNumber: dataUsers[selectedClient].cepNumber,
            complement: dataUsers[selectedClient].complement,
            paymentType: selectedPayment,
            seller: dataAccount.name


        }).then(()=>{
            localStorage.setItem('products', '[{}]')
            alert("Pedido finalizado com sucesso!.")
        })

    }

    function add() {

        amount >= 0 ? setAmount( amount + 1) : setAmount(0)
        
    }

    function remove() {

        amount > 0 ? setAmount( amount - 1) : setAmount(0)
        
    }

    function addProduct() {

        selectedItems.push({
            amount: amount,
            data: JSON.parse(selectedItem)
        })

        setAmount(1)
        
    }

    return (

        <div className="sellerScreen flexDisplay">

            <Header />

            <div className="outerbox">

                <h2>Selecione o cliente</h2>

                <select 
                onChange={handleSelectedClient}
                className="selectOrder" >

                    <option className="optionSelectOrder" >Selecionar</option>

                    {dataUsers.map((item, index)=> (
                        <option className="optionSelectOrder" value={index} key={item.id}>{item.name}: {item.id}</option>
                    ))}

                </select>

                <h2>Adicionar item</h2>

                <select 
                onChange={handleSelectedItem}
                className="selectOrder" >

                    <option className="optionSelectOrder" >Selecionar</option>

                    {dataItems.map((item)=> (
                        <option className="optionSelectOrder" value={JSON.stringify(item)} key={item.id}>{item.title}</option>
                    ))}

                </select>

                <div className='lineBoxProductModal'>

                    <div className="quantityOfProduct" >

                        <img src={removeIcon} onClick={()=>{remove()}} alt="Icone de remover" />

                        <p>Quantidade</p>

                        <img src={addIcon} onClick={()=>{add()}} alt="Icone de adicionar" />

                    </div>

                    <div className='amountDivSellerPage' >
                        <h3>{amount}</h3>
                    </div>

                </div>

                <div className="addProductButton" onClick={()=>{addProduct()}}>
                    <a>Adicionar</a>
                </div>
                
                <select className="selectOrder" onChange={handleSelectPayment} >

                    <option>Selecione o tipo de pagamento</option>
                    <option value="Cartão" >Cartão de crédito ou débito</option>
                    <option value="Dinheiro" >Dinheiro</option>
                    <option value="Pix" >Pix</option>

                </select>

                <div className="addProductButton" onClick={()=>{sendOrder()}}>
                    <a>Finalizar</a>
                </div>

            </div>

            <Footer />

        </div>

    )

}

export default UserProfile;
