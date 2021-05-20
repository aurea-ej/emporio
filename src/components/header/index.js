import React, {useState, createRef} from 'react'
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logoEmporio from '../../img/logoEmporio.png'
import './headerStyle.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

export default function Header (props) {

    const [isChecked,setIsChecked] = useState(false)
    const [userIsLogged, setUserIsLogged] = useState(false);

    const menuMobile = createRef()

    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) 
              setUserIsLogged(true)
          });

        
    }

    function showMenuMobile() {

        if (isChecked)
            menuMobile.current.style.display = 'none'
        else
            menuMobile.current.style.display = 'flex'
        
    }

    useEffect(() => {
        
        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)
        onAuthStateChanged();

    }, []);

    return (

        <div>

            <header>

                <div className='logo' >

                    <Link to='/'> <img src={logoEmporio} alt="logo Emporio Bom Jardim" /> </Link>

                </div>

                <div className='menu' >

                    <ul>

                        <li> <Link to='/' > Início </Link> </li>
                        <li> <Link to='/Quem-somos-nos'> Quem Somos </Link> </li>
                        <li> <Link to='/Carrinho'> Carrinho </Link> </li>
                        <li> <Link to='/Entrar'> Login/Perfil </Link> </li>

                    </ul>
                    
                </div>

                <div className="sandwich" >

                    <input type="checkbox" id="checkbox" onClick={ () => {

                        setIsChecked(!isChecked);
                        showMenuMobile()

                    }} />

                    <label htmlFor="checkbox" >

                        <span></span>
                        <span></span>
                        <span></span>

                    </label>

                </div>

            </header>

            <div className='menu-mobile' ref = {menuMobile} >

                <ul>

                    <li> <Link to='/' > Início </Link> </li>
                    <li> <Link to='/Quem-somos-nos'> Quem Somos </Link> </li>
                    <li> <Link to='/Carrinho'> Carrinho </Link> </li>
                    <li> <Link to='/Entrar'> Login </Link> </li>

                </ul>

            </div>

        </div>

    )
}