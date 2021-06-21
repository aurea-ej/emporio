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

function Provider() {

    const [wasChanged, setWasChanged] = useState(false)
    const [data, setData] = useState([]);
    const [dataAlterProvider, setDataAlterProvider] = useState({

        corporateName: '',
        tradeName: '',
        ownerName: '',
        email: '',
        street: '',
        district: '',
        city: '',
        phone: '',
        products: data

    })

    const [selectProvider, setSelectProvider] = useState('')
    const [selectProviderToDelete, setSelectProviderToDelete] = useState('')

    const [dataKeysAdm, setDataKeysAdm] = useState([])
    const [dataProvider, setDataProvider] = useState([])

    const [newDataProvider, setNewDataProvider] = useState({

        corporateName: '',
        tradeName: '',
        ownerName: '',
        email: '',
        street: '',
        district: '',
        city: '',
        phone: '',
        products: data

    })

    function handleInputProviderChange(event) {

        const { name, value } = event.target

        setNewDataProvider({

            ...newDataProvider, [name]: value,

        })

    }

    function handleInputProviderChangeAlter(event) {

        const { name, value } = event.target

        setDataAlterProvider({

            ...dataAlterProvider, [name]: value

        })

    }

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('providers').get('/providers')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataProvider(temp)

                } else {
                    console.log("No data available");
                }
            })

    }, [])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var ref = firebase.database().ref("providers");

        var keys = []

        ref.orderByKey().on("child_added", function (snapshot) {
            keys.push(snapshot.key);
        });

        setDataKeysAdm(keys)

    }, []);

    function handleSelectProvider(event) {

        setSelectProvider(event.target.value)

    }

    function handleSelectProviderToDelete(event) {

        setSelectProviderToDelete(event.target.value)

    }

    function insertNewProvider() {

        const id = firebase.database().ref().child('posts').push().key

        firebase.database().ref('providers/' + id).set({

            corporateName: newDataProvider.corporateName,
            tradeName: newDataProvider.tradeName,
            ownerName: newDataProvider.ownerName,
            email: newDataProvider.email,
            street: newDataProvider.street,
            district: newDataProvider.district,
            city: newDataProvider.city,
            phone: newDataProvider.phone,
            id: id,
            products: [{}]

        })

        alert("Fornecedor cadastrado com sucesso!");

    }

    function updateProvider() {

        if (wasChanged) {

            firebase.database().ref('providers/' + dataKeysAdm[selectProvider]).update({

                corporateName: dataAlterProvider.corporateName != '' ? dataAlterProvider.corporateName : dataProvider[selectProvider].corporateName,
                tradeName: dataAlterProvider.tradeName != '' ? dataAlterProvider.tradeName : dataProvider[selectProvider].tradeName,
                ownerName: dataAlterProvider.ownerName != '' ? dataAlterProvider.ownerName : dataProvider[selectProvider].ownerName,
                email: dataAlterProvider.email != '' ? dataAlterProvider.email : dataProvider[selectProvider].email,
                street: dataAlterProvider.street != '' ? dataAlterProvider.street : dataProvider[selectProvider].street,
                district: dataAlterProvider.district != '' ? dataAlterProvider.district : dataProvider[selectProvider].district,
                city: dataAlterProvider.city != '' ? dataAlterProvider.city : dataProvider[selectProvider].city,
                phone: dataAlterProvider.phone != '' ? dataAlterProvider.phone : dataProvider[selectProvider].phone,

            })
                .then(() => alert("Item atualizado com sucesso!"))
        }

    }

    function deleteProvider() {

        firebase.database()
            .ref('providers/' + dataKeysAdm[selectProviderToDelete])
            .remove()
            .then(() => alert("Item removido com sucesso!"))

    }

    const [displayHistory, setDisplayHistory] = useState("none");
    const [HistoryData, setHistoryData] = useState({});
    const [pageHeight, setPageHeight] = useState(0);

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

            <div style={{ display: displayHistory }} tabindex="-1" role="dialog" className='divHistory' >
                <span onClick={closeHistory}>X</span>
                <ProviderInfo displayProperty={displayHistory} HistoryData={HistoryData} />
            </div>

            <main id='mainProvider' >

                <div className='titleProvider' >

                    <h1>Painel de cadastrado de fornecedores</h1>

                    <div className="optionProvider">

                        <ul>

                            <span onClick={() => { handleHistoryInfos() }}>Informação dos fornecedores</span>
                            <Link to='/AdminProdutoFornecedor' >Cadastrar produtos dos fornecedores</Link>
                            <Link to='/PedidoFornecedor' >Realizar pedido do fornecedor</Link>
                            <Link to='/AdminHistorico' >Histórico de pedidos</Link>

                        </ul>

                    </div>

                </div>

                <div className='providerOptions' >

                    <fieldset className='registerSection' >

                        <legend className='registerTitle'>
                            <h2>Cadastrar fornecedor</h2>
                            <h5>Preencha os dados do fornecedor abaixo.</h5>
                        </legend>

                        <input name='corporateName' onChange={handleInputProviderChange} placeholder='Razão social da empresa' />

                        <input name='tradeName' onChange={handleInputProviderChange} placeholder='Nome fantasia da empresa' />

                        <input name='ownerName' onChange={handleInputProviderChange} placeholder='Pessoa responsável' />

                        <input name='city' onChange={handleInputProviderChange} placeholder='Município' />

                        <input name='district' onChange={handleInputProviderChange} placeholder='Bairro' />

                        <input name='street' onChange={handleInputProviderChange} placeholder='Rua' />

                        <input name='email' onChange={handleInputProviderChange} placeholder='E-mail' />

                        <input name='phone' onChange={handleInputProviderChange} placeholder='Telefone com DDD' />

                        <a onClick={() => { insertNewProvider() }} >Cadastrar</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Alterar dados de fornecedor</h2>
                        </legend>

                        <select onChange={handleSelectProvider} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((providers, index) => {

                                return (

                                    <option value={index} key={index}>{providers.tradeName}</option>

                                )

                            })}

                        </select>

                        <h6>Preencha o que deseja alterar</h6>

                        <input name='corporateName' onChange={handleInputProviderChangeAlter} placeholder='Razão social da empresa' />

                        <input name='tradeName' onChange={handleInputProviderChangeAlter} placeholder='Nome fantasia da empresa' />

                        <input name='ownerName' onChange={handleInputProviderChangeAlter} placeholder='Pessoa responsável' />

                        <input name='city' onChange={handleInputProviderChangeAlter} placeholder='Município' />

                        <input name='district' onChange={handleInputProviderChangeAlter} placeholder='Bairro' />

                        <input name='street' onChange={handleInputProviderChangeAlter} placeholder='Rua' />

                        <input name='email' onChange={handleInputProviderChangeAlter} placeholder='E-mail' />

                        <input name='phone' onChange={handleInputProviderChangeAlter} placeholder='Telefone com DDD' />

                        <a onClick={() => { setWasChanged(true); updateProvider(); }} >Alterar</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Apagar fornecedor</h2>
                        </legend>

                        <select onChange={handleSelectProviderToDelete} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((providers, index) => {

                                return (

                                    <option key={index} value={index} >{providers.tradeName}</option>

                                )

                            })}

                        </select>

                        <a onClick={() => { deleteProvider() }} >Apagar</a>

                    </fieldset>

                </div>

            </main>

            <Footer />

        </div>

    )

}

export default Provider