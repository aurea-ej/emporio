import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Header from '../../../components/header'
import Footer from '../../../components/footer'
import ProviderInfo from '../../../components/providerInfo'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'
import { isCompositeComponent } from 'react-dom/test-utils'

function Provider() {

    const [wasChanged, setWasChanged] = useState(false)
    const [ data, setData ] = useState([]);
    const [dataAlterProvider, setDataAlterProvider] = useState({
        
        company: '',
        name: '',
        email: '',
        phone: 0,
        products: data
        
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

    const [dataKeysAdm, setDataKeysAdm] = useState([])
    const [dataProvider, setDataProvider] = useState([])
    const [newDataProvider, setNewDataProvider] = useState({

        company: '',
        name: '',
        email: '',
        phone: 0,
        products: data

    })

    const [dataProduct, setDataProduct] = useState([])
    const [newDataProduct, setNewDataProduct] = useState({

        product: '',
        qntd: 0,
        unity: '',
        imageSrc: '',
        sellPrice: 0,
        buyPrice: 0

    })

    function handleInputProviderChange(event) {

        const {name, value} = event.target

        setNewDataProvider ({

            ...newDataProvider, [name]: value,

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

    useEffect(() => {

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var ref = firebase.database().ref("providers");

        var keys = []

        ref.orderByKey().on("child_added", function(snapshot) {
            keys.push(snapshot.key);
        });

        setDataKeysAdm(keys)

    }, []);

    useEffect(()=>{

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

            firebase.database().ref('providers/').child('products/').get('/products')
            .then(function(snapshot) {

                if (snapshot.exists()){

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataProduct(temp)
                    
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
                    products: [{}]
                    
                })

                alert("Fornecedor cadastrado com sucesso!");
                
            } 
            
        } 
        
    }

    function insertNewProduct() {

        const id = firebase.database().ref().child('posts').push().key

        firebase.database().ref('providers/' + dataKeysAdm[selectProvider]).child('products/' + id).set({

            id: id,
            product: newDataProduct.product,
            imageSrc: newDataProduct.imageSrc,
            qntd: newDataProduct.qntd,
            unity: newDataProduct.unity,
            sellPrice: newDataProduct.sellPrice,
            buyPrice: newDataProduct.buyPrice

        })

        alert("Produto cadastrado com sucesso!")
    
    }
        
    function updateProvider() {

        if (wasChanged) {
            
            firebase.database().ref('providers/' + dataKeysAdm[selectProvider]).update({
                
                company: dataAlterProvider.company != '' ? dataAlterProvider.company : dataProvider[selectProvider].company,
                name: dataAlterProvider.name != '' ? dataAlterProvider.name : dataProvider[selectProvider].name,
                email: dataAlterProvider.email != '' ? dataAlterProvider.name : dataProvider[selectProvider].email,
                phone: dataAlterProvider.phone != '' ? dataAlterProvider.phone : dataProvider[selectProvider].phone,
    
            })
            .then(()=>alert("Item atualizado com sucesso!"))
        }
        
    }

    function deleteProvider() {

        firebase.database()
        .ref('providers/' + dataKeysAdm[selectProviderToDelete])
        .remove()
        .then(()=>alert("Item removido com sucesso!"))
        
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
    

    const [itemsOfProvider, setItemsOfProvider] = useState([])

    function handleSelectProviderProducts (event) {

        var position = event.target.value

        setSelectProvider(position)

        var data = dataProvider[position].products

        if (data != undefined && data != null){

            var items = Object.keys(data).map((key) => data[key])
            var temp = []

            items.map((products) => {

                console.log(products)
                temp.push(products)

            })

            setItemsOfProvider(temp)

        }else
            setItemsOfProvider([])

    }



    return (

        <div className='Provider'>

            <Header />

            <div style={{display:displayHistory }} tabindex="-1" role="dialog" className='divHistory' >
                <span onClick={closeHistory}>X</span>
                <ProviderInfo displayProperty={displayHistory} HistoryData={HistoryData} />
            </div>

            <main id='mainProvider' >

                <div className='titleProvider' >

                    <h1>O que deseja fazer?</h1>
                
                    <div className="btn-style">

                        <span onClick={()=>{handleHistoryInfos()}}>Informação dos fornecedores</span>
                        <Link to='/AdminHistorico' >Histórico de pedidos</Link>

                    </div>
                    
                </div>

                <div className='providerOptions' >

                    <fieldset className='brownBackGround' >

                        <legend className='brownBackGround'>
                            <h2>Inserir novo fornecedor</h2>
                            <h5>Preencha os dados do fornecedor e do produto abaixo</h5>
                        </legend>

                        <input name='company' onChange={handleInputProviderChange} placeholder='Nome da empresa' />

                        <input name='name' onChange={handleInputProviderChange} placeholder='Nome de contato' />

                        <input name='email' onChange={handleInputProviderChange} placeholder='E-mail' />
                        
                        <input name='phone' onChange={handleInputProviderChange} placeholder='Telefone com DDD' />
                        
                        <a onClick={()=>{insertNewProvider()}} >Cadastrar</a>

                        </fieldset>

                        <fieldset className='greenBackGround' >

                        <legend>
                            <h2>Inserir novo pedido</h2>
                            <h5>Selecione o fornecedor e preencha os dados do produto abaixo</h5>
                        </legend>

                        <select onChange={handleSelectProviderProducts} >

                            <option>Selecione o fornecedor</option>
        
                                {dataProvider.map((providers, index) => {

                                    return (

                                        <option value={index} key={index}>{providers.company}</option>

                                    )

                                })}

                        </select>

                        <select onChange={handleSelectProviderProducts} >

                            <option>Selecione o produto</option>

                            {itemsOfProvider.map((products, index)=>(

                                <option value={index} key={index}>{products.product}, R${products.buyPrice}</option>
                                    
                            ))}

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