import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../../FIREBASECONFIG.js'

import { Link } from "react-router-dom";

function VendorRegister() {

    const [registerData,setRegisterData] = useState({

        name: '',
        phoneNumber: '',
        birthDate: '',
        personWhoIndicated: '',
        street: '',
        houseNumber: '',
        complement: '',
        district: '',
        cepNumber: '',
        email: '',
        password: '',

    })
    const [selectedOption, setSelectedOption] = useState('')

    function makeRegister () {

        // SO PODE FAZER O REGISTRO SE OS DOIS DEREM OK (AINDA TEM QUE FAZER ). fé kkkkkkkkk

        firebase.auth().createUserWithEmailAndPassword(registerData.email, registerData.password)
        .then((user) => {
            console.log('logado')
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        }); 

        const id = firebase.database().ref().child('posts').push().key

        firebase.database().ref('sellers/' + id).set({

            name: registerData.name,
            phoneNumber: registerData.phoneNumber,
            birthDate: registerData.birthDate,
            email: registerData.email,
            id: id

        }).then(()=>alert('Cadastro realizado com sucesso'))
        
    }

    function handleInputRegisterChange(event) {

        const {name, value} = event.target

        setRegisterData ({

            ...registerData, [name]: value

        })
        
    }

    function handleSelect(event) {

        const {name, value} = event.target

        setSelectedOption(value)
        
    }
    
    useEffect(() => {
        
        // window.scrollTo(0, 0);
        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

    }, []);


    // FALTA FAZER A VALIDAÇÃO. TIPO: VERIFICAR SE OS CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS E ETC

    return (

        <div className="SigIn">

            <Header />

            <main id='mainSignIn'> 

                <div className='formsSignIn'>

                    <div className='titleSignIn' >
                        <h1>Cadrastar vendedor</h1>
                    </div>
                    
                    <fieldset>

                        <legend>
                            <h2>Informações pessoais</h2>
                        </legend>

                        <input name='name' onChange={handleInputRegisterChange} placeholder='Nome completo' />

                        <input name='phoneNumber' type='number' onChange={handleInputRegisterChange} placeholder='Telefone com DDD' />

                        <input name='birthDate' type='date' onChange={handleInputRegisterChange} placeholder='Data' />

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Nome de usuário e senha</h2>
                        </legend>

                        <input name='email' onChange={handleInputRegisterChange} placeholder='Nome de Usuário' />

                        <input name='password' type='password' onChange={handleInputRegisterChange} placeholder='Senha' />

                    </fieldset>

                    <div className='buttonsFormSignIn' >

                        <Link onClick={()=> {makeRegister()}}>Cadastrar</Link>

                    </div>

                </div>

            </main>

            <Footer />

        </div>

    );

}

export default VendorRegister;
