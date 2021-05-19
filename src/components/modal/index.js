import React, { useState} from "react";
import "./style.css";

import addIcon from '../../img/addIcon.png'
import removeIcon from '../../img/removeIcon.png'

function Modal (props) {

    const { displayProperty, modalData } = props;
    const [amount, setAmount] = useState(1);

    function add() {

        amount >= 0 ? setAmount( amount + 1) : setAmount(0)
        
    }

    function remove() {

        amount > 0 ? setAmount( amount - 1) : setAmount(0)
        
    }

    function addToCart() {

        const listOfItems = JSON.parse(localStorage.getItem('products'))

        if (listOfItems != null) {
        
            if(listOfItems === [{}]){
                
                localStorage.removeItem('products')
                const newItem = []
                newItem.push({data: modalData, amount: amount})
                localStorage.setItem('products', JSON.stringify(newItem))
                alert("Adicionado com sucesso!")

            }else {

                const newItem = JSON.parse(localStorage.getItem('products'))
                newItem.push({data: modalData, amount: amount})
                localStorage.setItem('products', JSON.stringify(newItem))
                alert("Adicionado com sucesso!")

            }

            setAmount(1)

        }else {

            const newItem = [{data: modalData, amount: amount}]
            localStorage.setItem('products', JSON.stringify(newItem))
            alert("Adicionado com sucesso!")
            setAmount(1)

        }
        
        // const newItem = [...products]
        // newItem.push({id: modalData.id, amount: amount})
        // setProducts(newItem)
        // Tentativa de fazer com providers
        
    }

    return(

        <div style={{display: displayProperty}} className='modal'>

            <main>

                <p>Selecione a quantidade e depois adicione o item ao carrinho</p>

                <img src={modalData.imageSrc} alt='imagem do produto' className='productImageModal' />
                <h1>{modalData.title}</h1>

                <div className='lineBoxProductModal'>

                    <h3>R$ {(modalData.price * amount).toFixed(2)}</h3>

                    <div className="quantityOfProduct" >

                        <img src={removeIcon} onClick={()=>{remove()}} alt="Item de remover" />

                        <p>Quantidade</p>

                        <img src={addIcon} onClick={()=>{add()}} alt="Item de adicionar" />

                    </div>

                </div>

                    <div>
                        Quantidade selecionada: {amount}
                    </div>

                    <a onClick={()=>{addToCart()}} >ADICIONAR AO CARRINHO</a>

                <p>{modalData.desc}</p>

            </main>

        </div>
    )
}

export default Modal;