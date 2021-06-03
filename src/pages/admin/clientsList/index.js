import React, { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'

function Admin() {

    const [dataUsers, setDataUsers] = useState([])

    useEffect(()=>{

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('users').get('/users')
        .then(function(snapshot) {

            if (snapshot.exists()){

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setDataUsers(temp)
            }
            else {
                console.log("No data available");
            }
        })

    },[])

    return (

        <div className='ClientListPage'>

            <Header />

            <main id='mainAdmin' >

                {dataUsers.map((item)=>(

                    <div className="boxClientList" >

                        <h3>{item.name}</h3>

                        <p>{item.phoneNumber}</p>
                        <p>{item.email}</p>
                        <p>{item.district}</p>
                        <p>{item.street}</p>
                        <p>N°: {item.houseNumber}</p>

                    </div>

                ))}
                
            </main>

            <Footer />
        </div>

    )
    
}

export default Admin