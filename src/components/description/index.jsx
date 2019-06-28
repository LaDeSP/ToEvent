import React, { Component } from 'react'

import Main from '../shared/container/main'
import ModalButton from '../shared/modal/button'
import Markdown from '../shared/markdown'
import Login from '../auth/login'
import Inscription from '../auth/inscription'
import About from '../about';

export default class Description extends Component {

    constructor(props){
        super(props)

        if(this.props.isLoggedIn){
            if(this.props.history.location.pathname === '/')
                this.props.history.push('users')
            else
                this.props.history.push('users')
            
        }
    }

    render(){
        return (
            <Main>
                <div className="col-md-7 col-lg-8 bg-white rounded"> 
                    <div className="text-right">
                        <ModalButton target="#login"> Entrar </ModalButton>
                        <ModalButton target="#register"> Inscreva-se </ModalButton>
                        <ModalButton target="#about"> Sobre </ModalButton>
                    </div>
                    <Markdown />
                </div>
                <Login history={ this.props.history }/>
                <Inscription />
                <About/>
            </Main>
        )
    }
}