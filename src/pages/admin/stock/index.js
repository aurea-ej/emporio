import { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'


function Request() {

    const [items, setItems] = useState([])
    const [itemsBackUp, setItemsBackUp] = useState([])
    const [searchInput, setSearchInput] = useState([])
    const [selectedItem, setSelectedItem] = useState([])
    const [selectedAmount, setSelectedAmount] = useState([])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var firebaseRef = firebase.database().ref('items/');

        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])

                temp.sort((a,b)=> {

                    return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)

                })
               
                setItems(temp)
                setItemsBackUp(temp)

            }

        });

    }, [])

    useEffect(() => {
        
        window.scrollTo(0, 0);

    }, []);

    function handleSelectedItem(event) {

        setSelectedItem(event.target.value)
        
    }

    function handleSelectedAmount(event) {

        setSelectedAmount(event.target.value)
        
    }

    function alterProduct() {

        var product = []

        items.map(item => {

            if(item.id == selectedItem)
                product = item

        })

        firebase.database()
            .ref('items/' + selectedItem)
            .update({

                imageSrc: product.imageSrc,
                title: product.title,
                desc: product.desc,
                price: product.price,
                itemAvailability: product.itemAvailability ,
                unity: product.unity,
                category: product.category,
                id: product.id,
                amountInStock: selectedAmount,
                amount: product.amount
            })
            .then(() => alert("Item atualizado com sucesso!"))
        
    }

    function searchItem() {

        var itensTemp = []

        items.map((item) => {

            var title = item.title.toLowerCase()
            var search = searchInput.toLowerCase()

            if (title.includes(search) )
                itensTemp.push(item)

        })

        setItems(itensTemp)

    }

    function clearSearchItem() {

        setItems(itemsBackUp)

    }

    function handleSearchInput(event) {

        if (event.key == 'Enter') {

            clearSearchItem()
            searchItem()

        }
        setSearchInput(event.target.value)

    }

    return (

        <div className='Stock'>

            <Header />

            <section>

                <div>

                    <h2>Alterar produtos</h2>

                    <select onChange={handleSelectedItem}>

                        <option value='' >Selecionar produto</option>
                        {
                            items.map((item, index) => (
                                <option value={item.id}>{item.title} ({item.amountInStock} {item.unity})</option>
                            ))
                        }

                    </select>

                    <input placeholder='Quantidade' type='number' onChange={handleSelectedAmount} />

                    <a onClick={()=>{alterProduct()}} >Alterar</a>
                
                </div>

                <div>

                    <h2>Pesquisar produtos</h2>

                    <input placeholder='Pesquisar' onChange={handleSearchInput} />

                    <div>
                        <a onClick={()=>{clearSearchItem()}} >Limpar pesquisa</a>
                        <a onClick={()=>{searchItem()}} >Pesquisar</a>
                    </div>
                
                </div>

            </section>

            <main>

                {
                    items.map(item => (
                        <div>
                            <h4>{item.title}: {item.amountInStock} ({item.unity})</h4>
                        </div>
                    ))
                }

            </main>

            <section>

            </section>

            <Footer />
        </div>

    )

}

export default Request