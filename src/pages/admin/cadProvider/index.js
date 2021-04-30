import { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'

    function Provider() {

        const [wasChanged, setWasChanged] = useState(false)
        const [dataAlterProvider, setDataAlterProvider] = useState({
            
            company: '',
            name: '',
            email: '',
            phone: 0,
            product: '',
            qntd: 0,
            imageSrc: '',
            buyPrice: 0,
            sellPrice: 0,
            
        })

        const [selectProvider, setSelectProvider] = useState('')
        const [selectProviderToDelete, setSelectProviderToDelete] = useState('')

        const [dataAdmin, setDataAdmin] = useState([])
        const [newDataAdmin, setNewDataAdmin] = useState({

            company: '',
            name: '',
            email: '',
            phone: 0,
            product: '',
            qntd: 0,
            imageSrc: '',
            buyPrice: 0,
            sellPrice: 0

        })

        function handleInputAdminChange(event) {

            const {name, value} = event.target

            setNewDataAdmin ({

                ...newDataAdmin, [name]: value

            })
            
        }

        function handleInputAdminChangeAlter(event) {

            const {name, value} = event.target

            setDataAlterProvider({

                ...dataAlterProvider, [name]: value

            })
            
        }

        useEffect(()=>{

            if(!firebase.apps.length)
                firebase.initializeApp(firebaseConfig);

                firebase.database().ref('providers').get('/providers')
                .then(function(snapshot) {

                    if (snapshot.exists()) 
                        setDataAdmin(snapshot.val());
                    else {
                        console.log("No data available");
                    }
                })

        },[])

        function handleSelectProvider (event) {

            setSelectProvider(event.target.value)

        }

        function handleSelectProviderToDelete (event) {

            setSelectProviderToDelete(event.target.value)

        }

        function insertNewProvider() {

            if (newDataAdmin.imageSrc != '' && newDataAdmin.company != '') {

                if ( newDataAdmin.name != '' && newDataAdmin.phone != '' ) {

                    firebase.database().ref('providers/' + 1).set({ //alterar

                        company: newDataAdmin.company,
                        name: newDataAdmin.name,
                        email: newDataAdmin.email,
                        phone: newDataAdmin.phone,
                        product: newDataAdmin.product,
                        qntd: newDataAdmin.qntd,
                        imageSrc: newDataAdmin.imageSrc,
                        buyPrice: newDataAdmin.buyPrice,
                        sellPrice: newDataAdmin.sellPrice
                        
                    })
                    
                } 
                
            } 
            
        }

        function updateProvider() {

            if (wasChanged) {

                console.log(selectProvider)
                
                firebase.database().ref('providers/' + selectProvider).update({
                    
                    company: dataAlterProvider.company != '' ? dataAlterProvider.company : null,
                    name: dataAlterProvider.name != '' ? dataAlterProvider.name : null,
                    email: dataAlterProvider.name != '' ? dataAlterProvider.name : null,
                    phone: dataAlterProvider.phone != '' ? dataAlterProvider.phone : null,
                    product: dataAlterProvider.product != '' ? dataAlterProvider.product : null,
                    qntd: dataAlterProvider.qntd != '' ? dataAlterProvider.qntd : null,
                    imageSrc: dataAlterProvider.imageSrc != '' ? dataAlterProvider.imageSrc : null,
                    buyPrice: dataAlterProvider.buyPrice != '' ? dataAlterProvider.buyPrice : null,
                    sellPrice: dataAlterProvider.sellPrice != '' ? dataAlterProvider.sellPrice : null,
        
                })

            }
            
        }

        function deleteProvider() {

            firebase.database().ref('providers/' + selectProviderToDelete).remove()
            
        }

        const [selectedOption, setSelectedOption] = useState('')

        function handleSelect(event) {

            const {name, value} = event.target
    
            setSelectedOption(value)
            
        }

    return (

        <div className='Provider'>

            <Header />

            <main id='mainProvider' >

                <div className='titleProvider' >
                    <h1>Bem-vindo ao cadastro de fornecedores da Empório Bom Jardim 💛</h1>
                </div>

                <div className='titleProvider' >
                    <h3>O que deseja fazer?</h3>
                </div>

                <div className='providerOptions' >

                    <fieldset>

                        <legend>
                            <h2>Inserir novo fornecedor</h2>
                            <h5>Preencha os dados do fornecedor e do produto abaixo</h5>
                        </legend>

                        <input name='company' onChange={handleInputAdminChange} placeholder='Nome da empresa' />

                        <input name='name' onChange={handleInputAdminChange} placeholder='Nome de contato' />

                        <input name='email' onChange={handleInputAdminChange} placeholder='E-mail' />
                        
                        <input name='phone' onChange={handleInputAdminChange} placeholder='Telefone de contato com DDD' />

                        <legend>
                            <h3>Dados do pedido</h3>
                        </legend>

                        <input name='product' onChange={handleInputAdminChange} placeholder='Produto' />

                        <input name='qntd' onChange={handleInputAdminChange} placeholder='Quantidade' />

                        <select onChange={handleSelect} >
                            <option value='0' >Unidade de medida</option>
                            <option value='1' >Quilograma</option>
                            <option value='2' >Unidade</option>
                        </select>

                        <input name='imageSrc' onChange={handleInputAdminChange} placeholder='URL da imagem' />

                        <input name='buyPrice' onChange={handleInputAdminChange} placeholder='Preço de compra' />

                        <input name='sellPrice' onChange={handleInputAdminChange} placeholder='Preço de venda' />

                        <a onClick={()=>{insertNewProvider()}} >Inserir</a>

                    </fieldset>
                    
                    <fieldset>

                        <legend>
                            <h2>Alterar dados</h2>
                        </legend>

                        <select onChange={handleSelectProvider} >

                            <option>Selecione o fornecedor</option>
        
                                {dataAdmin.map((providers, index) => {

                                    return (

                                        <option value={index} key={index}>{providers.company}</option>

                                    )

                                })}

                        </select>

                        <h6>Preencha o que deseja alterar</h6>

                        <input name='company' onChange={handleInputAdminChangeAlter} placeholder='Fornecedor' />

                        <input name='name' onChange={handleInputAdminChangeAlter} placeholder='Nome de contato' />

                        <input name='email' onChange={handleInputAdminChangeAlter} placeholder='E-mail' />
                        
                        <input name='phone' onChange={handleInputAdminChangeAlter} placeholder='Telefone' />

                        <input name='product' onChange={handleInputAdminChangeAlter} placeholder='Produto' />

                        <input name='qntd' onChange={handleInputAdminChangeAlter} placeholder='Quantidade' />

                        <select onChange={handleInputAdminChangeAlter} > {/* n funcionou */}
                            <option value='0' >Unidade de medida</option>
                            <option value='1' >Quilograma</option>
                            <option value='2' >Unidade</option>
                        </select>

                        <input name='buyPrice' onChange={handleInputAdminChangeAlter} placeholder='Preço de compra' />

                        <input name='sellPrice' onChange={handleInputAdminChangeAlter} placeholder='Preço de venda' />

                        <a onClick={()=>{setWasChanged(true);updateProvider();}} >Alterar</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Apagar fornecedor</h2>
                        </legend>

                        <select onChange={handleSelectProviderToDelete} >

                            <option>Selecione o fornecedor</option>

                            {dataAdmin.map((providers,index) => {

                                return (

                                    <option key={index} value={index} >{providers.company}</option>

                                )

                            })}

                        </select>

                        <a onClick={()=>{deleteProvider()}} >Apagar</a>

                    </fieldset>

                </div>

            </main>

            <Footer />

        </div>

    )
    
}

export default Provider