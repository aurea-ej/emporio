import {React} from 'react'
import { Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/home'
import Contact from './pages/contact'
import Register from './pages/register'
import About from './pages/about'
import Cart from './pages/cart'
import SignIn from './pages/signIn'
import Admin from './pages/admin'
import Provider from './pages/admin/cadProvider'
import VendorRegister from './pages/vendorregister'

const Routes = () => {

    return (

        <BrowserRouter>

            <Route component={Home} path='/' exact />
            <Route component={Contact} path='/contato'/>
            <Route component={Register} path='/entrar'/>
            <Route component={SignIn} path='/Cadrastro'/>
            <Route component={About} path='/Quem-somos-nos' />
            <Route component={Cart} path='/Carrinho' />
            <Route component={Admin} path='/Admin' />
            <Route component={Provider} path='/Fornecedor' />
            <Route component={VendorRegister} path='/vendorregister' />
        
        </BrowserRouter>

    )

}

export default Routes;