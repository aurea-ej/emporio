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

                        <Link to="/AdminItems" >Cadastro/alteração de itens</Link>
                        <Link to="/AdminVendedor" >Cadastro/alteração de vendedores</Link>
                        <Link to="/AdminFornecedor" >Cadastro/alteração de fornecedores </Link>
                        <Link to='/AdminProdutoFornecedor' >Cadastro/alteração de produtos dos fornecedores</Link>
                        <Link to='/PedidoFornecedor' >Realizar pedido do fornecedor</Link>
                        <Link to="/Pedidos" >Pedidos em andamento</Link>
                        <Link to="/ListaDeClientes" >Listagem de clientes</Link>
                        <Link to="/" >Relatórios</Link>
                        
                    </ul>

                </div>
                
            </main>

            <Footer />
        </div>

    )
    
}

export default Admin