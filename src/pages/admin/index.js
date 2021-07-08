import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Link } from 'react-router-dom'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

function Admin() {

    const [loginData,setLoginData] = useState({

        email: '',
        password: ''

    })
    const [userIsLogged, setUserIsLogged] = useState(false);


    function makeLogin () {

        firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
        .then(() => {

            var userEmail = localStorage.getItem('userEmail')
        
            firebase.database().ref('admins').get('/admins')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])

                    temp.map((item) => {

                        if(item.email == userEmail)
                            setUserIsLogged(true)

                    })
                }
                else {
                    console.log("No data available");
                }
            })
            
            
            localStorage.setItem('userEmail',loginData.email)

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        }); 
        
    }

    function handleInputLoginChange(event) {

        const {name, value} = event.target

        setLoginData ({

            ...loginData, [name]: value

        })
        
    }

    useEffect(() => {
        
        window.scrollTo(0, 0);

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

    }, []);

    useEffect(() => {

        var userEmail = localStorage.getItem('userEmail')
        
        firebase.database().ref('admins').get('/admins')
        .then(function (snapshot) {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])

                temp.map((item) => {

                    if(item.email == userEmail)
                        setUserIsLogged(true)

                })
            }
            else {
                console.log("No data available");
            }
        })

    }, []);

    if (userIsLogged) {

        return (

            <div className='Admin'>

            <Header />

            <main id='mainAdmin' >

                <div className='titleAdmin' >
                    <h1>Bem vindos, equipe Empório Bom Jardim 💛</h1>
                </div>

                <div className='titleAdmin' >
                    <h3>O que deseja fazer?</h3>
                </div>

                <div className='optionAdminPage' >

                    <ul>

                        <Link to="/Pedidos" >Pedidos em andamento</Link>
                        <Link to="/AdminItems" >Cadastro/alteração de itens</Link>
                        <Link to="/AdminVendedor" >Cadastro/alteração de vendedores</Link>
                        <Link to="/AdminFornecedor" >Cadastro/alteração de fornecedores </Link>
                        <Link to='/AdminProdutoFornecedor' >Cadastro/alteração de produtos dos fornecedores</Link>
                        <Link to='/PedidoFornecedor' >Realizar pedido do fornecedor</Link>
                        <Link to="/ListaDeClientes" >Listagem de clientes</Link>
                        <Link to="/relatorios" >Relatórios</Link>
                        <Link to="/Estoque" >Estoque</Link>
                        
                    </ul>

                </div>
                
            </main>

            <Footer />
        </div>

        )
        
    } else {

        return (

            <div className='Admin'>

                <Header />

                <main id='mainRegister'> 

                        <div className='formsRegister'>

                            <div className='titleAdmin' >
                                <h1>Bem vindos, equipe Empório Bom Jardim 💛</h1>
                            </div>

                            <fieldset>

                                <legend>
                                    <h2>Entrar</h2>
                                </legend>

                                <input name='email' onChange={handleInputLoginChange} placeholder='E-mail' />

                                <input name='password' type='password' onChange={handleInputLoginChange} placeholder='Senha' />

                            </fieldset>

                            <div className='buttonsFormRegister' >

                                <Link id='enterButtonSignIn' onClick={makeLogin}>Entrar</Link>

                            </div>

                        </div>

                    </main>

                <Footer />
            </div>

        )
    
    }
    
}

export default Admin