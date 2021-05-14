import Header from '../../components/header'
import Footer from '../../components/footer'
import { Link } from 'react-router-dom'
import './style.css'

function Admin() {


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
                        <li> <Link to="/AdminItems" >Cadastro/alteração de itens</Link> </li>
                        <li> <Link to="/AdminVendor" >Cadastro/alteração de vendedores</Link> </li>
                        <li> <Link to="/AdminFornecedor" >Cadastro/alteração de fornecedores </Link> </li>
                        <li> <Link to="/" >Pedidos em andamento</Link> </li>
                        <li> <Link to="/" >Relatórios</Link> </li>
                    </ul>

                </div>
                
            </main>

            <Footer />
        </div>

    )
    
}

export default Admin