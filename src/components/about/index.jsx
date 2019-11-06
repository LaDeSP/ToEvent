import React from 'react'
import Modal from '../shared/modal/modal';

const About = () => {
    return (
        <Modal id="about">
            <h3 className="login-heading mb-4">Sobre</h3>
            <img className="w-75 mx-auto d-block" src={ `${process.env.PUBLIC_URL}/logo.png` } alt=""/>
            <p className="text-justify">
                To Event é um sistema para controle de frequências e vagas, como também de inscrições focado em evento. 
                O sistema foi construido dentro do projeto Fábrica de Software.
                O projeto é realizado dentro do laboratório LADESP situada na Universidade Federal de Mato Grosso do Sul de Corumbá.
            </p>
            <img className="w-100 mx-auto d-block" src={ `${process.env.PUBLIC_URL}/logoLadesp.png` } alt=""/>
        </Modal>
    )
}

export default About