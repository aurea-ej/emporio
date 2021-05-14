import { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'


function Admin() {

    const [wasChanged, setWasChanged] = useState(false)
    const [dataAlterItem, setDataAlterItem] = useState({
        
        imageSrc: '',
        title: '',
        desc: '',
        price: 0
        
    })
    
    const [selectItem, setSelectItem] = useState('')
    const [selectItemToDelete, setSelectItemToDelete] = useState('')

    const [dataAdmin, setDataAdmin] = useState([])
    const [dataKeysAdm, setDataKeysAdm] = useState([])
    const [newDataAdmin, setNewDataAdmin] = useState({

        imageSrc: '',
        title: '',
        desc: '',
        price: 0

    })

    useEffect(()=>{

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('items').get('/items')
        .then(function(snapshot) {

            if (snapshot.exists()){

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setDataAdmin(temp)
            }
            else {
                console.log("No data available");
            }
        })

    },[])

    useEffect(() => {

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var ref = firebase.database().ref("items");

        var keys = []

        ref.orderByKey().on("child_added", function(snapshot) {
            keys.push(snapshot.key);
        });

        setDataKeysAdm(keys)

    }, []);

    function handleInputAdminChange(event) {

        const {name, value} = event.target

        setNewDataAdmin ({

            ...newDataAdmin, [name]: value

        })
        
    }

    function handleInputAdminChangeAlter(event) {

        const {name, value} = event.target

        setDataAlterItem ({

            ...dataAlterItem, [name]: value

        })
        
    }

    function handleSelectItem (event) {

        setSelectItem(event.target.value)

    }

    function handleSelectItemToDelete (event) {

        setSelectItemToDelete(event.target.value)

    }

    function insertNewItem() {

        const id = firebase.database().ref().child('posts').push().key

        if (newDataAdmin.imageSrc != '' && newDataAdmin.title != '') {

            if ( newDataAdmin.desc != '' && newDataAdmin.price != 0 ) {

                firebase.database().ref('items/' + id).set({

                    imageSrc: newDataAdmin.imageSrc,
                    title: newDataAdmin.title,
                    desc: newDataAdmin.desc,
                    price: newDataAdmin.price,
                    id: id
                })

                alert("Item inserido com sucesso!.")
                
            } 
            
        } 
        
    }

    function updateItem() {

        if (wasChanged) {
            
            firebase.database().ref('items/' + dataKeysAdm[selectItem]).update({

                imageSrc: dataAlterItem.imageSrc != '' ? dataAlterItem.imageSrc : dataAdmin[selectItem].imageSrc,
                title: dataAlterItem.title != '' ? dataAlterItem.title : dataAdmin[selectItem].title,
                desc:  dataAlterItem.desc != '' ? dataAlterItem.desc : dataAdmin[selectItem].desc,
                price: dataAlterItem.price != 0 ? dataAlterItem.price : dataAdmin[selectItem].price
            })
            .then(()=>alert("Item atualizado com sucesso!"))

        }
        
    }

    function deleteItem() {

        firebase.database()
        .ref('items/' + dataKeysAdm[selectItemToDelete])
        .remove()
        .then(()=>alert("Item removido com sucesso!"))
        
    }

    return (

        <div className='Admin'>

            <Header />

            <main id='mainAdmin' >

                <div className='adminOptions' >

                    <fieldset>

                        <legend>
                            <h2>Inserir novo item</h2>
                        </legend>

                        <input name='title' onChange={handleInputAdminChange} placeholder='Nome' />

                        <input name='desc' onChange={handleInputAdminChange} placeholder='Descrição' />

                        <input name='price' onChange={handleInputAdminChange} placeholder='Preço' type='number' />
                        
                        <input name='imageSrc' onChange={handleInputAdminChange} placeholder='URL da imagem' />

                        <a onClick={()=>{insertNewItem()}} >Inserir</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Alterar item</h2>
                        </legend>

                        <select onChange={handleSelectItem} >

                            <option>Selecione o item</option>

                                {dataAdmin.map((item, index) => {

                                    return (

                                        <option value={index} key={index}>{item.title}</option>

                                    )

                                })}

                        </select>

                        <h6>Preencha o que deseja alterar</h6>

                        <input name='title' onChange={handleInputAdminChangeAlter} placeholder='Nome' />

                        <input name='desc' onChange={handleInputAdminChangeAlter} placeholder='Descrição' />

                        <input name='price' onChange={handleInputAdminChangeAlter} placeholder='Preço' type='number' />
                        
                        <input name='imageSrc' onChange={handleInputAdminChangeAlter} placeholder='URL da imagem' />

                        <a onClick={()=>{setWasChanged(true);updateItem();}} >Alterar</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Apagar item</h2>
                        </legend>

                        <select onChange={handleSelectItemToDelete} >

                            <option>Selecione o item</option>

                            {dataAdmin.map((item, index) => {

                                return (

                                    <option value={index} key={index}>{item.title}</option>

                                )

                            })}

                        </select>

                        <a onClick={()=>{deleteItem()}} >Apagar</a>

                    </fieldset>

                </div>

            </main>

            <Footer />
        </div>

    )
    
}

export default Admin