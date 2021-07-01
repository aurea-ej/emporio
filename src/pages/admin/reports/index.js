import { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'


function Request() {

    const [data, setData] = useState([])
    const [thisWeek, setThisWeek] = useState([])

    const [totalValueThisWeek, setTotalValueThisWeek] = useState(0)
    const [thisMonth, setThisMonth] = useState([])

    const [totalValueThisMonth, setTotalValueThisMonth] = useState(0)
    const [totalValue, setTotalValue] = useState(0)

    const [totalValueThreeMonths, setTotalValueThreeMonths] = useState(0)
    const [threeMonths, setThreeMonths] = useState([])
    
    const [totalValueSixMonths, setTotalValuesixMonths] = useState(0)
    const [sixMonths, setSixMonths] = useState([])

    const [allMonthsIsSelected, setAllMonthsIsSelected] = useState(false)

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var firebaseRef = firebase.database().ref('reportsSales/');

        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setData(temp.reverse())

                const today = new Date()
                const thisWeekTemp = []
                var totalValueThisWeekTemp = 0
                var totalValueTemp = 0

                temp.map((item)=> {

                    const saleDate = new Date(item.dateToCompare)
                    const difference = ((Math.abs(today - saleDate) / 1000.0)/86400)
                    totalValueTemp = totalValueTemp + Number(item.totalValue)

                    if( difference <= 7 ){
                        thisWeekTemp.push(item)
                        totalValueThisWeekTemp = totalValueThisWeekTemp + Number(item.totalValue)
                    }

                })

                setThisWeek(thisWeekTemp)
                setTotalValueThisWeek(totalValueThisWeekTemp)

                setTotalValue(totalValueTemp)

            }

        });

    }, [])

    useEffect(() => {
        
        window.scrollTo(0, 0);

    }, []);

    function salesThisMonth() {

        const today = new Date()
        const thisMonthTemp = []
        var totalValueThisMonthTemp = 0

        data.map((item)=> {

            const saleDate = new Date(item.dateToCompare)
            const difference = ((Math.abs(today - saleDate) / 1000.0)/86400)

            if( difference > 7 && difference <= 30) {
                thisMonthTemp.push(item)
                totalValueThisMonthTemp = totalValueThisMonthTemp + Number(item.totalValue)
            }

        })

        setThisMonth(thisMonthTemp)
        setTotalValueThisMonth(totalValueThisMonthTemp)
        
    }

    function salesThreeMonths() {

        const today = new Date()
        const period = []
        var totalValueTemp = 0

        data.map((item)=> {

            const saleDate = new Date(item.dateToCompare)
            const difference = ((Math.abs(today - saleDate) / 1000.0)/86400)

            if( difference > 30 && difference <= 90) {
                period.push(item)
                totalValueTemp = totalValueTemp + Number(item.totalValue)
            }

        })

        setThreeMonths(period)
        setTotalValueThreeMonths(totalValueTemp)
        
    }

    function salesSixMonths() {

        const today = new Date()
        const period = []
        var totalValueTemp = 0

        data.map((item)=> {

            const saleDate = new Date(item.dateToCompare)
            const difference = ((Math.abs(today - saleDate) / 1000.0)/86400)

            if( difference > 30 && difference <= 180) {
                period.push(item)
                totalValueTemp = totalValueTemp + Number(item.totalValue)
            }

        })

        setSixMonths(period)
        setTotalValuesixMonths(totalValueTemp)
        
    }

    function salesAllMonths() {

        setAllMonthsIsSelected(true)
        
    }

    return (

        <div className='Reports'>

            <Header />

            <main>

                <p className="tipHome" >Clique em um período para consultar as vendas</p>

                <a><h3>Vendas esta semana: R${totalValueThisWeek.toFixed(2)}</h3></a>

                {
                    thisWeek.map((item)=> {

                        return (

                            <div className='boxSallerReports' >

                                <div>

                                    <h4>{item.userName}: </h4>

                                    {
                                        item.listItem.length > 1 ?

                                            item.listItem.map(product => (
                                                <p>{product.title} ({`${product.amount} ${product.unity} por: R$ ${product.price}`});</p>
                                            ))

                                        :
                                            <p>{item.listItem[0].title} ({`${item.listItem[0].amount} ${item.listItem[0].unity} por: R$ ${item.listItem[0].price}`});</p>
                                            
                                    }

                                </div>

                                <h4>Data da venda: <span>{item.date}</span>  </h4>
                                <h4>Valor total: <span>R$ {item.totalValue}</span>  </h4>
                            </div>

                        )

                    })
                }

                
                <a onClick={()=>salesThisMonth()}><h3>Vendas este mês: R${totalValueThisMonth.toFixed(2)}</h3></a>

                {

                    thisMonth != [] ?

                        thisMonth.map((item)=> {

                            return (

                                <div className='boxSallerReports' >

                                    <div>

                                        <h4>{item.userName}: </h4>

                                        {
                                            item.listItem.length > 1 ?
                                                item.listItem.map(product => (
                                                    <p>{product.title} ({`${product.amount} ${product.unity}`});</p>
                                                ))
                                            :
                                                <p>{item.listItem[0].title} ({`${item.listItem[0].amount} ${item.listItem[0].unity}`});</p>
                                                
                                        }

                                    </div>

                                    <h4>Data da venda: <span>{item.date}</span>  </h4>
                                    <h4>Valor total: <span>R$ {item.totalValue}</span>  </h4>
                                </div>

                            )

                        })
                    :
                    <p></p>
                }

                <a onClick={()=>salesThreeMonths()}><h3>Último trimestre: R${totalValueThreeMonths.toFixed(2)}</h3></a>

                {

                    sixMonths != [] ?

                        threeMonths.map((item)=> {

                            return (

                                <div className='boxSallerReports' >

                                    <div>

                                        <h4>{item.userName}: </h4>

                                        {
                                            item.listItem.length > 1 ?
                                                item.listItem.map(product => (
                                                    <p>{product.title} ({`${product.amount} ${product.unity}`});</p>
                                                ))
                                            :
                                                <p>{item.listItem[0].title} ({`${item.listItem[0].amount} ${item.listItem[0].unity}`});</p>
                                                
                                        }

                                    </div>

                                    <h4>Data da venda: <span>{item.date}</span>  </h4>
                                    <h4>Valor total: <span>R$ {item.totalValue}</span>  </h4>
                                </div>

                            )

                        })
                    :
                    <p></p>
                }

                <a onClick={()=>salesSixMonths()}><h3>Último semestre: R${totalValueSixMonths.toFixed(2)}</h3></a>

                {

                    sixMonths != [] ?

                    sixMonths.map((item)=> {

                            return (

                                <div className='boxSallerReports' >

                                    <div>

                                        <h4>{item.userName}: </h4>

                                        {
                                            item.listItem.length > 1 ?
                                                item.listItem.map(product => (
                                                    <p>{product.title} ({`${product.amount} ${product.unity}`});</p>
                                                ))
                                            :
                                                <p>{item.listItem[0].title} ({`${item.listItem[0].amount} ${item.listItem[0].unity}`});</p>
                                                
                                        }

                                    </div>

                                    <h4>Data da venda: <span>{item.date}</span>  </h4>
                                    <h4>Valor total: <span>R$ {item.totalValue}</span>  </h4>
                                </div>

                            )

                        })
                    :
                    <p></p>
                }

                <a onClick={()=>salesAllMonths()}><h3>Todas as vendas: R${totalValue.toFixed(2)}</h3></a>

                {

                    allMonthsIsSelected ?

                        data.map((item)=> {

                            return (

                                <div className='boxSallerReports' >

                                    <div>

                                        <h4>{item.userName}: </h4>

                                        {
                                            item.listItem.length > 1 ?
                                                item.listItem.map(product => (
                                                    <p>{product.title} ({`${product.amount} ${product.unity}`});</p>
                                                ))
                                            :
                                                <p>{item.listItem[0].title} ({`${item.listItem[0].amount} ${item.listItem[0].unity}`});</p>
                                                
                                        }

                                    </div>

                                    <h4>Data da venda: <span>{item.date}</span>  </h4>
                                    <h4>Valor total: <span>R$ {item.totalValue}</span>  </h4>
                                </div>

                            )

                        })
                    :
                    <p></p>
                }

            </main>

            <Footer />
        </div>

    )

}

export default Request