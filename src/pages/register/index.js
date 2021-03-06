import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

import { Link, Redirect } from "react-router-dom";

import logoEmporio2 from '../../img/logoEmporio2.png'

function Register() {

    const [registerData, setRegisterData] = useState({

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
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [registerDone, setRegisterDone] = useState(false);

    function makeRegister() {

        firebase.auth()
            .createUserWithEmailAndPassword(registerData.email, registerData.password)
            .then((user) => {

                const id = firebase.database().ref().child('posts').push().key

                firebase.database().ref('users/' + id).set({

                    name: registerData.name,
                    phoneNumber: registerData.phoneNumber,
                    birthDate: registerData.birthDate,
                    personWhoIndicated: registerData.personWhoIndicated,
                    whoIndicated: selectedOption,
                    street: registerData.street,
                    houseNumber: registerData.houseNumber,
                    complement: registerData.complement,
                    district: registerData.district,
                    cepNumber: registerData.cepNumber,
                    email: registerData.email,
                    id: id

                })

                localStorage.setItem('id', id)

                alert('Cadastro realizado com sucesso!')

                setRegisterDone(true)

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            });

    }

    function handleInputRegisterChange(event) {

        const { name, value } = event.target

        setRegisterData({

            ...registerData, [name]: value

        })

    }

    function handleSelect(event) {

        const { name, value } = event.target

        setSelectedOption(value)

    }

    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                setUserIsLogged(true)
        });


    }

    useEffect(() => {

        window.scrollTo(0, 0);
        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)
        onAuthStateChanged();

    }, []);

    function searchCepData(event) {

        const inputValue = event.target.value

        const validCep = inputValue?.replace(/[^0-9]/g, '')

        if (validCep.length !== 8) {

            window.alert('CEP inv??lido')

        } else {

            fetch(`https://viacep.com.br/ws/${validCep}/json/`)
                .then((item) => item.json())
                .then((data) => {

                    if (!("erro" in data)) {

                        document.getElementById('street').value = (data.logradouro);
                        document.getElementById('district').value = (data.bairro)

                    } else {

                        window.alert('CEP inv??lido')
                        cleanForm()

                    }


                })

        }
    }

    function cleanForm() {

        document.getElementById('street').value = ('');
        document.getElementById('district').value = ('');

    }

    function makeVerifications() {

        var counter = 0
        
        registerData.name != '' ? counter = counter + 1 : counter = counter
        registerData.birthDate != '' ? counter ++ : counter = counter
        registerData.cepNumber != '' ? counter ++ : counter = counter
        registerData.complement != '' ? counter ++ : counter = counter
        registerData.district != '' ? counter ++ : counter = counter
        registerData.email != '' ? counter ++ : counter = counter
        registerData.houseNumber != '' ? counter ++ : counter = counter
        registerData.password != '' ? counter ++ : counter = counter
        registerData.phoneNumber != '' ? counter ++ : counter = counter
        registerData.street != '' ? counter ++ : counter = counter


        if(counter == 10)
            makeRegister()
        else
            alert('Voc?? precisa preencher todos os campos!')

        
    }


    if (userIsLogged) {

        return (

            <Redirect to='/Perfil' />

        )

    } else {

        if (registerDone) {

            return (

                <Redirect to='/Entrar' />

            )

        } else {

            return (

                <div className="SigIn">

                    <Header />

                    <main id='mainSignIn'>

                        <div className='formsSignIn'>

                            <img src={logoEmporio2} alt="Logo Emporio" />

                            <div className='titleSignIn' >
                                <h1>Cadastrar-se</h1>
                            </div>

                            <div className='haveAccount' >
                                <h5>J?? tem uma conta? <Link to='/Entrar' >entrar</Link></h5>
                            </div>

                            <fieldset>

                                <legend>
                                    <h2>Informa????es pessoais</h2>
                                </legend>

                                <input name='name' onChange={handleInputRegisterChange} placeholder='Nome completo' />

                                <input name='phoneNumber' type='tel' onChange={handleInputRegisterChange} placeholder='Telefone com DDD' />

                                <input name='birthDate' type='date' onChange={handleInputRegisterChange} placeholder='Data de nascimento' />

                                <select onChange={handleSelect} >
                                    <option value='0' >Como ficou sabendo de n??s?</option>
                                    <option value='1' >Indica????o (digite o nome abaixo)</option>
                                    <option value='2' >Recebi contato da empresa: abrir campo lista com nome dos vendedores</option>
                                    <option value='3' >Facebook</option>
                                    <option value='4' >Instagram</option>
                                    <option value='5' >Pesquisa no Google</option>
                                </select>

                                {/* fazer depois esse campo s?? aparecer se a pessoa selecionar o item 2 do select */}
                                <input name='personWhoIndicated' onChange={handleInputRegisterChange} placeholder='Quem indicou?' />

                            </fieldset>

                            <fieldset>

                                <legend>
                                    <h2>Endere??o</h2>
                                </legend>

                                <input id='cep' name='cepNumber' type='text' onBlur={searchCepData} onChange={handleInputRegisterChange} placeholder='CEP' />

                                <input id='street' name='street' type='text' onChange={handleInputRegisterChange} placeholder='Nome da rua' />

                                <input id='district' name='district' type='text' onChange={handleInputRegisterChange} placeholder='Bairro' />

                                <input name='houseNumber' type='number' onChange={handleInputRegisterChange} placeholder='N??mero' />

                                <input name='complement' onChange={handleInputRegisterChange} placeholder='Complemento' />

                            </fieldset>

                            <fieldset>

                                <legend>
                                    <h2>E-mail e senha</h2>
                                </legend>

                                <input name='email' onChange={handleInputRegisterChange} placeholder='E-mail' />

                                <input name='password' type="password" onChange={handleInputRegisterChange} placeholder='Senha para o site' />

                            </fieldset>

                            <div className='buttonsFormSignIn' >

                                <Link onClick={() => { makeVerifications() }}>Cadastrar</Link>

                            </div>

                        </div>

                    </main>

                    <Footer />

                </div>

            );

        }

    }
}

export default Register;
