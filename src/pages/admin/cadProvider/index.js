import { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import History from '../../../components/history'
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
            products: {}
            
        })

        const [selectProvider, setSelectProvider] = useState('')
        const [selectProviderToDelete, setSelectProviderToDelete] = useState('')
        
        const [dataAlterProduct, setDataAlterProduct] = useState({

        product: '',
        qntd: 0,
        unity: '',
        imageSrc: '',
        buyPrice: 0,
        sellPrice: 0,

        })

        const [selectProduct, setSelectProduct] = useState('')
        const [selectProductToDelete, setSelectProductToDelete] = useState('')

        const [dataProvider, setDataProvider] = useState([])
        const [newDataProvider, setNewDataProvider] = useState({

            company: '',
            name: '',
            email: '',
            phone: 0,
            products: {}

        })

        const [dataProduct, setDataProduct] = useState([])
        const [newDataProduct, setNewDataProduct] = useState({

            product: '',
            qntd: 0,
            unity: '',
            imageSrc: '',
            buyPrice: 0,
            sellPrice: 0

        })

        function handleInputProviderChange(event) {

            const {name, value} = event.target

            setNewDataProvider ({

                ...newDataProvider, [name]: value

            })
            
        }

        function handleInputProductChange(event) {

            const {name, value} = event.target

            setNewDataProduct ({

                ...newDataProduct, [name]: value

            })
            
        }

        function handleInputProviderChangeAlter(event) {

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

                    if (snapshot.exists()){

                        var data = snapshot.val()
                        var temp = Object.keys(data).map((key) => data[key])
                        setDataProvider(temp)
                        
                    }else {
                        console.log("No data available");
                    }
                })

        },[])

        useEffect(()=>{

            if(!firebase.apps.length)
                firebase.initializeApp(firebaseConfig);

                firebase.database().ref('providers').get('/providers/products')
                .then(function(snapshot) {

                    if (snapshot.exists()){

                        var data = snapshot.val()
                        var temp = Object.keys(data).map((key) => data[key])
                        setDataProvider(temp)
                        
                    }else {
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

            if (newDataProvider.company != '' && newDataProvider.name != '') {
                
                if ( newDataProvider.email != '' && newDataProvider.phone != '' ) {
                    
                    const id = firebase.database().ref().child('posts').push().key
                    
                    firebase.database().ref('providers/' + id).set({

                        company: newDataProvider.company,
                        name: newDataProvider.name,
                        email: newDataProvider.email,
                        phone: newDataProvider.phone,
                        id: id,
                        products: {}
                        
                    })

                    alert("Fornecedor cadastrado com sucesso!");
                    
                } 
                
            } 
            
        }

        function insertNewProduct() {

            if (newDataProduct.product != '' && newDataProvider.qntd != '') {
                
                if ( newDataProvider.unity != '' && newDataProvider.imageSrc != '' ) {
                    
                    const id = firebase.database().ref().child('posts').push().key
                    
                    firebase.database().ref('providers/products' + id).set({

                        product: newDataProvider.product,
                        qntd: newDataProvider.qntd,
                        unity: newDataProvider.unity,
                        imageSrc: newDataProvider.imageSrc,
                        buyPrice: newDataProvider.buyPrice,
                        sellPrice: newDataProvider.sellPrice,
                        id: id,
                        
                    })

                    alert("Produto cadastrado com sucesso!");
                    
                } 
                
            } 
            
        }

        function updateProvider() {

            if (wasChanged) {

                console.log(selectProvider)
                
                firebase.database().ref('providers/' + selectProvider).update({
                    
                    company: dataAlterProvider.company != '' ? dataAlterProvider.company : null,
                    name: dataAlterProvider.name != '' ? dataAlterProvider.name : null,
                    email: dataAlterProvider.email != '' ? dataAlterProvider.name : null,
                    phone: dataAlterProvider.phone != '' ? dataAlterProvider.phone : null,
        
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

        const [ displayHistory, setDisplayHistory ] = useState("none");
        const [ HistoryData, setHistoryData ] = useState({});
        const [ pageHeight, setPageHeight ] = useState(0);

        useEffect(() => {

            window.scrollTo(0, 0);
            setPageHeight(window.screen.height)
    
        }, []);

        function handleHistoryInfos() {

            setHistoryData();
    
            displayHistory == "none" ? setDisplayHistory("flex") : setDisplayHistory("none")
            
        }
    
        function closeHistory() {
    
            displayHistory == "none" ? setDisplayHistory("flex") : setDisplayHistory("none")
    
        }

    return (

        <div className='Provider'>

            <Header />

            <div style={{display:displayHistory }} tabindex="-1" role="dialog" className='divHistory' >
                <span onClick={closeHistory}>X</span>
                <History displayProperty={displayHistory} HistoryData={HistoryData} />
            </div>

            <main id='mainProvider' >

                <div className='titleProvider' >
                    <h1>Bem-vindo ao cadastro de fornecedores da Empório Bom Jardim 💛</h1>
                </div>

                <div className='titleProvider' >
                    <h3>O que deseja fazer?</h3>
                    <a onClick={()=>{handleHistoryInfos()}}>Histórico de pedidos</a>
                </div>

                <div className='providerOptions' >

                    <fieldset>

                        <legend>
                            <h2>Inserir novo fornecedor</h2>
                            <h5>Preencha os dados do fornecedor e do produto abaixo</h5>
                        </legend>

                        <input name='company' onChange={handleInputProviderChange} placeholder='Nome da empresa' />

                        <input name='name' onChange={handleInputProviderChange} placeholder='Nome de contato' />

                        <input name='email' onChange={handleInputProviderChange} placeholder='E-mail' />
                        
                        <input name='phone' onChange={handleInputProviderChange} placeholder='Telefone com DDD' />
                        
                        <a onClick={()=>{insertNewProvider()}} >Cadastrar</a>

                        <legend>
                            <h2>Inserir novo pedido</h2>
                            <h5>Selecione o fornecedor e preencha os dados do produto abaixo</h5>
                        </legend>

                        <select onChange={handleSelectProvider} >

                            <option>Selecione o fornecedor</option>
        
                                {dataProvider.map((providers, index) => {

                                    return (

                                        <option value={index} key={index}>{providers.company}</option>

                                    )

                                })}

                        </select>

                        <legend>
                            <h3>Insira os dados do pedido</h3>
                        </legend>

                        <input name='product' onChange={handleInputProductChange} placeholder='Produto' />

                        <input name='qntd' onChange={handleInputProductChange} placeholder='Quantidade' />

                        <select name='unity' onChange={handleSelect} >
                            <option value='0' >Unidade de medida</option>
                            <option value='1' >Quilograma</option>
                            <option value='2' >Unidade</option>
                        </select>

                        <input name='imageSrc' onChange={handleInputProductChange} placeholder='URL da imagem' />

                        <input name='buyPrice' onChange={handleInputProductChange} placeholder='Preço de compra' />

                        <input name='sellPrice' onChange={handleInputProductChange} placeholder='Preço de venda' />

                        <a onClick={()=>{insertNewProduct()}} >Inserir</a>

                    </fieldset>
                    
                    <fieldset>

                        <legend>
                            <h2>Alterar dados</h2>
                        </legend>

                        <select onChange={handleSelectProvider} >

                            <option>Selecione o fornecedor</option>
        
                                {dataProvider.map((providers, index) => {

                                    return (

                                        <option value={index} key={index}>{providers.company}</option>

                                    )

                                })}

                        </select>

                        <h6>Preencha o que deseja alterar</h6>

                        <input name='company' onChange={handleInputProviderChangeAlter} placeholder='Fornecedor' />

                        <input name='name' onChange={handleInputProviderChangeAlter} placeholder='Nome de contato' />

                        <input name='email' onChange={handleInputProviderChangeAlter} placeholder='E-mail' />
                        
                        <input name='phone' onChange={handleInputProviderChangeAlter} placeholder='Telefone' />

                        <input name='product' onChange={handleInputProviderChangeAlter} placeholder='Produto' />

                        <input name='qntd' onChange={handleInputProviderChangeAlter} placeholder='Quantidade' />

                        <select onChange={handleInputProviderChangeAlter} > {/* n funcionou */}
                            <option value='0' >Unidade de medida</option>
                            <option value='1' >Quilograma</option>
                            <option value='2' >Unidade</option>
                        </select>

                        <input name='buyPrice' onChange={handleInputProviderChangeAlter} placeholder='Preço de compra' />

                        <input name='sellPrice' onChange={handleInputProviderChangeAlter} placeholder='Preço de venda' />

                        <a onClick={()=>{setWasChanged(true);updateProvider();}} >Alterar</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Apagar fornecedor</h2>
                        </legend>

                        <select onChange={handleSelectProviderToDelete} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((providers,index) => {

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