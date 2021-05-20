import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

import { Link, useHistory } from "react-router-dom";

function UserProfile() {

    const [dataUsers, setDataUsers] = useState([]);
    const [dataItems, setDataItems] = useState([]);
    const [selectedClient, setSelectedClient] = useState('')
    const [selectedItem, setSelectedItem] = useState('')
    const [displayDivAlterInfos, setDisplayDivAlterInfos] = useState("none");
    const [registerData,setRegisterData] = useState({

        name: '',
        phoneNumber: '',
        street: '',
        houseNumber: '',
        complement: '',
        district: '',
        cepNumber: '',

    })
    
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

                // temp.map((item)=>{ 

                //     if(item.email == userEmail)
                //         setDataAccount(item)

                // })

            }else {
                console.log("No data available");
            }
        })

        firebase.database().ref('items').get('/items')
        .then(function (snapshot) {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
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

    return (

        <div className="sellerScreen flexDisplay">

            <Header />

            <h2>Selecione o cliente</h2>

            <select 
            onChange={handleSelectedClient}
            className="selectOrder" >

                <option className="optionSelectOrder" >Selecionar</option>

                {dataUsers.map((item)=> (
                    <option className="optionSelectOrder" value={item.id} key={item.id}>{item.name}: {item.id}</option>
                ))}

            </select>

            <h2>Adicionar item</h2>

            <select 
            onChange={handleSelectedItem}
            className="selectOrder" >

                <option className="optionSelectOrder" >Selecionar</option>

                {dataItems.map((item)=> (
                    <option className="optionSelectOrder" value={item.id} key={item.id}>{item.title}</option>
                ))}

            </select>

            <div className="addProductButton" onClick={()=>{}}>
                <a>Adicionar</a>
            </div>

            <Footer />

        </div>

    )

}

export default UserProfile;
