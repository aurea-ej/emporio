import React, { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import ModalUsers from '../../../components/modalUsers'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'

function Admin() {

    const [dataUsers, setDataUsers] = useState([])
    const [searchInput, setSearchInput] = useState([])
    const [data, setData] = useState([])
    const [displaySearchResult, setDisplaySearchResult] = useState('none')
    const [dataBackup, setDataBackup] = useState([])

    const [displayModal, setDisplayModal] = useState("none");
    const [modalDataUsers, setModalDataUsers] = useState({});

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('users').get('/users')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataUsers(temp)
                    setData(temp)
                    setDataBackup(temp)
                }
                else {
                    console.log("No data available");
                }
            })

    }, [])

    function handleSearchInput(event) {

        if (event.key == 'Enter') {

            clearSearchName()
            searchName()

        }
        setSearchInput(event.target.value)

    }

    function searchName() {

        var name = []

        data.map((item) => {

            if (item.name.includes(searchInput))
                name.push(item)

        })

        setDataUsers(name)
        setDisplaySearchResult('flex')

    }

    function clearSearchName() {

        setDisplaySearchResult('none')
        setDataUsers(dataBackup)

    }

    function handleModalInfos(item) {

        setModalDataUsers(item)
        window.scrollTo(0, 0);
        displayModal == "none" ? setDisplayModal("flex") : setDisplayModal("none")

    }

    function closeModal() {

        if (displayModal == "none")
            setDisplayModal("flex")
        else {
            setDisplayModal("none");
        }

    }

    return (
        
        <div className='ClientListPage'>

            <Header />

            <div style={{ display: displayModal }} role="dialog" className='divModalUser' >

                <span onClick={closeModal}>X</span>
                <ModalUsers displayProperty={displayModal} modalDataUsers={modalDataUsers} />

            </div>

            <main id='mainAdmin' >

                <h1>Informações dos usuários</h1>
                <h4>Clique em um cartão para alterar os dados dos usuários</h4>

                <div className='filterName' >

                    <h3>Pesquisa por nome</h3>

                    <div className='searchName'>

                        <input type="text" placeholder="Procurar..." onKeyDown={handleSearchInput} />

                    </div>

                </div>

                <section style={{ display: displaySearchResult }} className='searchNameResult' >

                    <div className='divSearchNameResult'>

                        <a onClick={() => { clearSearchName() }}>Limpar pesquisa</a>
                        <h3>Resultado da busca:</h3>

                    </div>

                </section>

                {dataUsers.map((item) => (

                    <div onClick={() => { handleModalInfos(item) }} className="boxClientList" >

                        <h3>{item.name}</h3>

                        <p><b>Telefone</b>: {item.phoneNumber}</p>
                        <p><b>E-mail</b>: {item.email}</p>
                        <p><b>Rua</b>: {item.street}</p>
                        <p><b>Bairro</b>: {item.district}</p>
                        <p><b>N°</b>: {item.houseNumber}</p>

                    </div>

                ))}

            </main>

            <Footer />
        </div>

    )

}

export default Admin