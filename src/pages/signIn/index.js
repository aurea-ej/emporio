import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

import { Link, Redirect } from "react-router-dom";

function Register() {

    const [loginData,setLoginData] = useState({

        email: '',
        password: ''

    })

    const [userIsLogged, setUserIsLogged] = useState(false);
    const [requestData, setRequestData] = useState([{}]);

    function makeLogin () {

        firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
        .then((userCredential) => {
            var user = userCredential.user;
            localStorage.setItem('userEmail',loginData.email)

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        }); 
        
    }

    function handleInputLoginChange(event) {

        const {name, value} = event.target

        setLoginData ({

            ...loginData, [name]: value

        })
        
    }

    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) 
              setUserIsLogged(true)
          });

        
    }
    
    useEffect(() => {
        
        window.scrollTo(0, 0);

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)
        onAuthStateChanged();

    }, []);
    
    useEffect(() => {
        
        firebase.database().ref('requests').get('/requests')
        .then(function (snapshot) {

            if (snapshot.exists()) {

                // var phoneNumber = localStorage.getItem('userPhoneNumber')

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])

                var requestDataTemp = []

                temp.map((item) => {

                    if(item.phoneNumber == '12345678')
                        requestDataTemp.push(item)

                })
                setRequestData(requestDataTemp)
            }
            else {
                console.log("No data available");
            }
        })

    }, []);

    if (userIsLogged) {

        return (

            <Redirect to='/Perfil' />

        )
        
    }
    else {

        return (

            <div className="Register">

                <Header />

                <main id='mainRegister'> 

                    <div className='formsRegister'>

                        <div className='titleSignIn' >
                            <h1>Faça login</h1>
                        </div>

                        <div className='haveAccount' >
                            <h5>Ainda não tem uma conta? <Link to='/Cadastro' >cadrastar-se</Link></h5>
                        </div>

                        <fieldset>

                            <legend>
                                <h2>Entrar</h2>
                            </legend>

                            <input name='email' onChange={handleInputLoginChange} placeholder='E-mail' />

                            <input name='password' type='password' onChange={handleInputLoginChange} placeholder='Senha' />

                        </fieldset>

                        <div className='buttonsFormRegister' >

                            <Link id='enterButtonSignIn' onClick={makeLogin}>Entrar</Link>

                        </div>

                    </div>

                </main>

                <Footer />

            </div>

        );

    }
}

export default Register;
