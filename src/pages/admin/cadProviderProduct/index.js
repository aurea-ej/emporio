import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'

function ProviderProducts() {

    const [wasChangedProduct, setWasChangedProduct] = useState(false)

    const [selectProvider, setSelectProvider] = useState('')

    const [selectedUnity, setSelectedUnity] = useState('')

    const [imageUrl, setImageUrl] = useState('')
    const [dataAlterProduct, setDataAlterProduct] = useState({

        product: '',
        qntd: '',
        unity: '',
        imageSrc: '',
        buyPrice: '',
        sellPrice: '',

    })

    const [selectProductToAlter, setSelectProductToAlter] = useState([])

    const [selectProductToDelete, setSelectProductToDelete] = useState('')

    const [dataKeysAdm, setDataKeysAdm] = useState([])
    const [dataProvider, setDataProvider] = useState([])

    const [newDataProduct, setNewDataProduct] = useState({

        product: '',
        unity: '',
        imageSrc: '',
        sellPrice: '',
        buyPrice: '',
        qntd: ''

    })

    function handleInputProductChange(event) {

        const { name, value } = event.target

        setNewDataProduct({

            ...newDataProduct, [name]: value

        })

    }

    function handleInputProductChangeAlter(event) {

        const { name, value } = event.target

        setDataAlterProduct({

            ...dataAlterProduct, [name]: value

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

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var ref = firebase.database().ref('providers/').child('products/')

        var productKeys = []

        ref.orderByKey().on("child_added", function (snapshot) {
            productKeys.push(snapshot.key);
        });


    }, []);

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('providers').get('/products')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])

                    var dataProductTemp = []

                    temp.map(item => {

                        if (item.products != undefined)
                            dataProductTemp.push(item.products)

                    })

                } else {
                    console.log("No data available");
                }
            })

    }, [])

    // function handleSelectProviderToDelete(event) {

    //     setSelectProviderToDelete(event.target.value)
    //     console.log(event.target.value)

    // }

    function handleSelectedUnity(event) {

        setSelectedUnity(event.target.value)

    }

    function handleSelectProductToDelete(event) {

        setSelectProductToDelete(event.target.value)
        console.log(event.target.value)

    }

    function handleSelectProvider(event) {

        setSelectProvider(event.target.value)

    }

    function insertNewProduct() {

        const id = firebase.database().ref().child('posts').push().key

        const data = {

            id: id,
            product: newDataProduct.product,
            imageSrc: imageUrl,
            unity: selectedUnity,
            sellPrice: newDataProduct.sellPrice,
            buyPrice: newDataProduct.buyPrice,
            amount: 0

        }

        firebase.database().ref('providers/' + dataKeysAdm[selectProvider])
            .child('products/' + id)
            .set(data)
            .then(err => console.log(err))
        setNewDataProduct({

            product: '',
            unity: '',
            imageSrc: '',
            sellPrice: '',
            buyPrice: '',
            qntd: ''

        })

        alert("Produto cadastrado com sucesso!")

    }

    const [itemsOfProvider, setItemsOfProvider] = useState([])

    function handleSelectProviderProducts(event) {

        var position = event.target.value

        setSelectProvider(position)

        var data = dataProvider[position].products

        if (data != undefined && data != null) {

            var items = Object.keys(data).map((key) => data[key])
            var temp = []

            items.map((products) => {

                temp.push(products)
                console.log(products)

            })

            setItemsOfProvider(temp)

        } else

            setItemsOfProvider([])

    }

    function handleSelectProduct(event) {

        // console.log(itemsOfProvider[event.target.value])

        var position = event.target.value

        setSelectProductToAlter(itemsOfProvider[position].id)
        console.log(itemsOfProvider[position].product)

    }

    function updateProduct() {

        // return(console.log(dataAlterProduct))
        // return(console.log(dataProvider[selectProvider].products[selectProductToAlter]))

        if (wasChangedProduct) {

            var products = dataProvider[selectProvider].products

            products[selectProductToAlter] = {

                buyPrice: dataAlterProduct.buyPrice != '' ? dataAlterProduct.buyPrice : products[selectProductToAlter].buyPrice,
                imageSrc: dataAlterProduct.imageSrc != '' ? dataAlterProduct.imageSrc : products[selectProductToAlter].imageSrc,
                product: dataAlterProduct.product != '' ? dataAlterProduct.product : products[selectProductToAlter].product,
                sellPrice: dataAlterProduct.sellPrice != '' ? dataAlterProduct.sellPrice : products[selectProductToAlter].sellPrice,
                unity: dataAlterProduct.unity != '' ? dataAlterProduct.unity : products[selectProductToAlter].unity,
                // qntd: dataAlterProduct.qntd != 0 ? dataAlterProduct.qntd : products[selectProductToAlter].qntd,

            }

            // return(console.log(products))


            // .child('products/' + dataKeysAdmProduct[selectProduct])
            firebase.database()
                .ref('providers/' + dataKeysAdm[selectProvider])
                .update({

                    city: dataProvider[selectProvider].city,
                    corporateName: dataProvider[selectProvider].corporateName,
                    id: dataProvider[selectProvider].id,
                    email: dataProvider[selectProvider].email,
                    district: dataProvider[selectProvider].district,
                    ownerName: dataProvider[selectProvider].ownerName,
                    phone: dataProvider[selectProvider].phone,
                    street: dataProvider[selectProvider].street,
                    tradeName: dataProvider[selectProvider].tradeName,
                    products: products

                })
                .then(() => alert("Item atualizado com sucesso!"))
        }

    }

    function deleteProduct() {

        var products = dataProvider[selectProvider].products
        var temp = Object.keys(products).map((key) => products[key])

        firebase.database()
            .ref('providers/'+ dataProvider[selectProvider].id)
            .child('products/' + temp[selectProductToDelete].id)
            .remove()
            .then(() => alert("Item removido com sucesso!"))
    }

    function uploadImage(event) {

        const file = event.target.files[0]

        var storageRef = firebase.storage().ref();

        storageRef.child('images/' + file.name.trim())
            .put(file)
            .then(snapshot => {
                snapshot.ref.getDownloadURL()
                    .then(url => setImageUrl(url))
            });

    }

    return (

        <div className='ProviderProducts'>

            <Header />

            <main id='mainProviderProducts' >

                <div className='titleProviderProducts' >

                    <h1>Painel de cadastro de produto dos fornecedores</h1>

                    <div className="optionProvider">

                        <ul>

                            <Link to='/AdminFornecedor' >Voltar para painel de cadastro de fornecedores</Link>
                            <Link to='/PedidoFornecedor' >Realizar pedido do fornecedor</Link>
                            <Link to='/AdminHistorico' >Histórico de pedidos</Link>

                        </ul>

                    </div>

                </div>

                <div className='providerProductsOptions' >

                    <fieldset className='greenBackGround' >

                        <legend>
                            <h2>Cadastrar produto</h2>
                            <h5>Selecione o fornecedor e preencha os dados do produto abaixo.</h5>
                        </legend>

                        <select onChange={handleSelectProvider} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((providers, index) => {

                                return (

                                    <option value={index} key={index}>{providers.tradeName}</option>

                                )

                            })}

                        </select>

                        <legend>
                            <h3>Insira os dados do produto</h3>
                        </legend>

                        <input name='product' onChange={handleInputProductChange} placeholder='Produto' value={newDataProduct.product} />

                        <select name='unity' onChange={handleSelectedUnity} value={newDataProduct.unity}>

                            <option value='' >Selecione a unidade</option>
                            <option value='Quilograma' >Quilograma</option>
                            <option value='Unidade' >Unidade</option>

                        </select>

                        <input type='file' onChange={uploadImage} accept="image/png, image/jpeg" placeholder='Imagem' />

                        <input name='buyPrice' onChange={handleInputProductChange} placeholder='Preço de compra' value={newDataProduct.buyPrice} />

                        <input name='sellPrice' onChange={handleInputProductChange} placeholder='Preço de venda' value={newDataProduct.sellPrice} />

                        <a onClick={() => { insertNewProduct() }} >Inserir</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Alterar dados dos produtos</h2>
                        </legend>

                        <select onChange={handleSelectProviderProducts} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((providers, index) => {

                                return (

                                    <option value={index} key={index}>{providers.tradeName}</option>

                                )

                            })}

                        </select>

                        <select onChange={handleSelectProduct} >

                            <option>Selecione o produto</option>

                            {itemsOfProvider.map((products, index) => (

                                <option value={index} key={index}>{products.product}</option>

                            ))}

                        </select>

                        <h6>Preencha o que deseja alterar</h6>

                        <input name='product' onChange={handleInputProductChangeAlter} placeholder='Produto' />

                        <input name='imageSrc' onChange={handleInputProductChangeAlter} placeholder='Imagem' />

                        <select name='unity' onChange={handleInputProductChangeAlter} >

                            <option value='' >Unidade de medida</option>
                            <option value='Quilograma' >Quilograma</option>
                            <option value='Unidade' >Unidade</option>

                        </select>

                        <input name='sellPrice' onChange={handleInputProductChangeAlter} placeholder='Valor de venda' />

                        <input name='buyPrice' onChange={handleInputProductChangeAlter} placeholder='Valor de compra' />

                        <a onClick={() => { setWasChangedProduct(true); updateProduct(); }} >Alterar</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Apagar produto</h2>
                        </legend>

                        <select onChange={handleSelectProviderProducts} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((providers, index) => {

                                return (

                                    <option key={index} value={index} >{providers.tradeName}</option>

                                )

                            })}

                        </select>

                        <select onChange={handleSelectProductToDelete} >

                            <option>Selecione o produto</option>

                            {itemsOfProvider.map((products, index) => (

                                <option value={index} key={index}>{products.product}</option>

                            ))}

                        </select>

                        <a onClick={() => { deleteProduct() }} >Apagar</a>

                    </fieldset>

                </div>

            </main>

            <Footer />

        </div>

    )

}

export default ProviderProducts