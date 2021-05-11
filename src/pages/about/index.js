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
                    <h1>Uma frase daora aqui</h1>
                    <div className="bar" />
                </div>

                <div className="about-text">
                    <h2>Sobre a Empório</h2>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis nibh a nibh congue maximus a ut neque. Integer lectus enim, sollicitudin eget magna ac, posuere iaculis orci. Ut sollicitudin tincidunt varius. Etiam ut nibh in turpis vulputate ultrices. Aliquam imperdiet sem at nisl sollicitudin molestie a a elit. Curabitur sodales dolor tortor, a pretium neque vulputate molestie. Donec sagittis orci nulla, non aliquet velit egestas eget. Nulla in efficitur ipsum. Nullam sed quam congue, laoreet ex nec, imperdiet sapien. Sed venenatis euismod gravida. Sed maximus rutrum eros, sit amet viverra diam venenatis sed. Morbi nisl metus, gravida nec mauris ut, aliquam porta nunc. Integer vehicula leo at felis sollicitudin porttitor.
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
                            <h3>Tópico um</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula neque vel tellus vestibulum, et congue magna finibus.
                            </p>
                        </div>
                        <div className="card-item">
                            <h2>02</h2>
                            <h3>Tópico dois</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula neque vel tellus vestibulum, et congue magna finibus.
                            </p>
                        </div>
                        <div className="card-item">
                            <h2>03</h2>
                            <h3>Tópico três</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula neque vel tellus vestibulum, et congue magna finibus.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="process-section">
                    <div className="process-text">
                        <h1>Nosso<br />Processo</h1>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis nibh a nibh congue maximus a ut neque. Integer lectus enim, sollicitudin eget magna ac, posuere iaculis orci. Ut sollicitudin tincidunt varius. Etiam ut nibh in turpis vulputate ultrices. Aliquam imperdiet sem at nisl sollicitudin molestie a a elit. Curabitur sodales dolor tortor, a pretium neque vulputate molestie. Donec sagittis orci nulla, non aliquet velit egestas eget. Nulla in efficitur ipsum. Nullam sed quam congue, laoreet ex nec, imperdiet sapien. Sed venenatis euismod gravida. Sed maximus rutrum eros, sit amet viverra diam venenatis sed. Morbi nisl metus, gravida nec mauris ut, aliquam porta nunc. Integer vehicula leo at felis sollicitudin porttitor.
                        </p>
                    </div>

                    <div className="process-wrapper">
                        <div className="cards-process">
                            <div className="card-process">
                                <h2>01. Processo um</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula neque vel tellus vestibulum, et congue magna finibus.
                                </p>
                            </div>
                            <div className="card-process">
                                <h2>02. Processo dois</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula neque vel tellus vestibulum, et congue magna finibus.
                                </p>
                            </div>
                            <div className="card-process">
                                <h2>03. Processo três</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula neque vel tellus vestibulum, et congue magna finibus.
                                </p>
                            </div>
                            <div className="card-process">
                                <h2>04. Processo quatro</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula neque vel tellus vestibulum, et congue magna finibus.
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
