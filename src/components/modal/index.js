import React, {useEffect, useState} from "react";
import "./style.css";

import addIcon from '../../img/addIcon.png'
import removeIcon from '../../img/removeIcon2.png'

function Modal (props) {

    const { displayProperty, modalData } = props;
    const [amount, setAmount] = useState(1);
    const [hasChanged, setHasChanged] = useState(false);

    function add() {

        amount >= 0 ? setAmount( amount + 1) : setAmount(0)
        
    }

    function remove() {

        amount > 0 ? setAmount( amount - 1) : setAmount(0)
        
    }

    function addToCart() {

        const listOfItems = JSON.parse(localStorage.getItem('products'))

        if(listOfItems === null){
            
            // localStorage.removeItem('products')
            const newItem = [{data: modalData, amount: amount}]
            localStorage.setItem('products', JSON.stringify(newItem))
            alert("Adicionado com sucesso!")
            setAmount(1)

        }else {

            const newItem = JSON.parse(localStorage.getItem('products'))
            newItem.push({data: modalData, amount: amount})
            localStorage.setItem('products', JSON.stringify(newItem))
            alert("Adicionado com sucesso!")
                
            setAmount(1)

        }

        console.log(listOfItems)

        const verify = JSON.parse(localStorage.getItem('products'))
    
        if (verify != null){
        // if (verify != null && verify.length >= 1){
            
            var total = 0

            verify.map((item)=>{

                if(item.data != undefined){

                    var value = ( Number(item.data.price) * Number(item.amount) )
                    total = value + total
                    localStorage.setItem('totalValue', total.toFixed(2))
                    
                }
                
            })

        }
        
    }

    return(

        <div style={{display: displayProperty}} className='modal'>

            <main>

                <div className='imageAndTitleModal' >

                    <img src={modalData.imageSrc} alt='imagem do produto' />
                    <h1>{modalData.title}</h1>

                </div>

                <div className='lineBoxProductModal'>

                    <h3>R$ {(modalData.price * amount).toFixed(2)}</h3>

                    <div className="quantityOfProduct" >

                        <img src={removeIcon} onClick={()=>{remove()}} alt="Item de remover" />

                        <p>Quantidade</p>

                        <img src={addIcon} onClick={()=>{add()}} alt="Item de adicionar" />

                    </div>

                </div>

                    <div className='amountItensModal' >
                        Quantidade selecionada: {amount}
                    </div>

                    <a onClick={()=>{addToCart(); setHasChanged(true)}} >ADICIONAR AO CARRINHO</a>

                <p className='itemDescModal' >{modalData.desc}</p>

            </main>

        </div>
    )
}

export default Modal;