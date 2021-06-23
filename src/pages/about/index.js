import React from 'react'
import './style.css'

import logoEmporio2 from '../../img/logoEmporio2.png'

import Header from '../../components/header'
import Footer from '../../components/footer'

function About() {
    return (

        <div className="App">

            <Header />

            <div className="about-section">
                <div className="about-container">
                    <video src='/videos/video-2.mp4' autoPlay loop muted />
                    <h1>Delivery de orgânicos</h1>
                    <div className="bar" />
                </div>

                <div className="about-text">
                    <h2>Sobre a Empório</h2>

                    <p>
                        Nossa história começa em 2018, com uma chácara herdada na região metropolitana de Curitiba.
                        Chamo-me Lucimara, e junto com meu marido Norberto, resolvemos reativar a chácara que era do meu pai e que estava inativa desde 2011.
                        Queríamos obter renda da chácara, já que ele havia sido demitido da empresa em que trabalhava por causa da crise da época. Nossa ideia era criar galinhas para comercializar ovos orgânicos.
                        Enquanto arrumávamos a chácara, eu fazia vários cursos sobre criação de galinhas e cultivo orgânico.
                        Ao mesmo tempo, iniciamos a comercialização de morangos sem agrotóxicos de um vizinho. Já que íamos toda semana para a chácara, trazíamos os morangos. E a clientela foi aumentando. Depois começamos a trazer também os ovos e hortaliças da chácara; pouca coisa ainda.
                        Iniciamos o processo de obtenção da certificação para a produção de ovos, a fim de comercializar em Curitiba, mas infelizmente a legislação dificultava muito para o pequeno produtor. Por causa desses empecilhos, desistimos da criação de galinhas. Além do alto custo, não podíamos aguardar o longo processo de certificação para ter retorno. Isso foi em 2019.
                        Continuamos trazendo morangos e alguns produtos da chácara para alguns clientes em Curitiba. Com a pandemia, alguns clientes pediram outras frutas orgânicas, e assim aumentamos nossa oferta de produtos. Conversamos com outros produtores orgânicos e iniciamos a comercializar seus produtos.
                        Assim surgiu o Empório Bom Jardim, nome originário da nossa chácara.
                        Buscamos sempre aumentar o leque de produtos orgânicos ofertados para facilitar para melhor atender os nossos clientes.

                        Também ofertamos alimentos congelados e de panificação, produtos que sempre gostei de fazer, aumentando assim a oferta de itens de qualidade para nossos clientes.
                    </p>

                    <div className="logo-2">
                        <img src={logoEmporio2} alt="logo 2 Emporio Bom Jardim" />
                    </div>

                </div>

                <div className="cards-section">

                    <h1>Nosso diferencial</h1>

                    <div className="cards">
                        <div className="card-item">
                            <h2>01</h2>
                            <h3>Atendimento personalizado</h3>
                            <p>
                                O cliente pode fazer seu pedido de acordo com seu consumo, não se prendendo a pesos e quantidades pré-determinados.
                            </p>
                        </div>
                        <div className="card-item">
                            <h2>02</h2>
                            <h3>Variedade de produtos</h3>
                            <p>
                                Além da diversidade de frutas e verduras, temos muitos outros produtos, incluindo cereais e processados.
                            </p>
                        </div>
                        <div className="card-item">
                            <h2>03</h2>
                            <h3>Alimentos prontos congelados</h3>
                            <p>
                                Produção própria.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="process-section">
                    <div className="process-text">
                        <h1>Nosso<br />Processo</h1>

                        <p>
                            Nossa lista de produtos disponíveis é atualizada toda quinta-feira, e os clientes podem fazer os pedidos até sábado para programação da colheita e produção dos itens de panificação. Na segunda-feira, as hortaliças são colhidas e, na terça, separamos todos os pedidos e entregamos tudo fresquinho para os clientes.
                        </p>
                    </div>

                    <div className="process-wrapper">
                        <div className="cards-process">
                            <div className="card-process">
                                <h2>01. Panificação </h2>
                                <p>
                                    Pães e bolos caseiros produzidos na segunda-feira com matéria prima orgânica, tendo todo o cuidado com a higiene, com muito carinho para nossos clientes.
                                </p>
                            </div>
                            <div className="card-process">
                                <h2>02. Hortaliças</h2>
                                <p>
                                    Pequenos agricultores parceiros, todos com certificação orgânica e boas práticas de manipulação de alimentos.
                                </p>
                            </div>
                            <div className="card-process">
                                <h2>03. Produtos orgânicos</h2>
                                <p>
                                    Verduras e legumes são cultivados sem uso de agrotóxicos. somente com controle biológico e adubos orgânicos.
                                </p>
                            </div>
                            <div className="card-process">
                                <h2>04. Jornada do produto até sua mesa</h2>
                                <p>
                                    Todos os pedidos são recebidos pelos produtores até domingo à noite. Na segunda, os produtos são colhidos e entregues ao Empório. E, na terça, são separados e entregues aos clientes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About
