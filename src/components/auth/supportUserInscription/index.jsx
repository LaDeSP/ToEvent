import React, { Component } from 'react'

import Modal from '../../shared/modal/modal'
import { Error } from '../error'
import { doInscription } from '../auth'

import { Loading } from '../../shared/loading'
import { Input } from '../input'
import { Submit } from '../submit'
import { Null, False, True, Nothing } from '../../constant';


export default class SupportUserInscription extends Component{
    constructor(props){
        super(props)

        this.state = {
            changeSupportUserInscriptionState: {
                isSuccess: Null,
                message: Nothing
            },
            form: {
                type: 'SUPPORT'
            },
            isLoading: False,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.LoadingOn = this.LoadingOn.bind(this)
        this.LoadingOff = this.LoadingOff.bind(this)
    }

    LoadingOn(){
        this.setState({
            isLoading: True
        })
    }

    LoadingOff(){
        this.setState({
            isLoading: False
        })
    }

    inputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
            form: { ...this.state.form, [name]: value },
        });
    }

    async handleSubmit(event){
        event.preventDefault()

        this.LoadingOn()

        var hasSuccess = await doInscription(this.state.form)
        if(hasSuccess.isSuccess){
            this.setState({
                changeSupportUserInscriptionState: {
                    isSuccess: True,
                    message: 'Criado com successo o usuário'
                }
            })
        } else {
            this.setState({
                changeSupportUserInscriptionState: {
                    isSuccess: False,
                    message: 'Houve um erro ao criar o usuário'
                }
            })
        }

        this.props.reload()

        setTimeout( this.LoadingOff , 1500);
    }

    render(){
        return (
            <Modal id="createSupportUser"> 
                <h3 className="login-heading mb-4">Novo Usuário de Apoio</h3>
                <form onSubmit={ this.handleSubmit }>
                    <Loading isLoading={ this.state.isLoading }>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Insira um nome"
                            onChange={ this.inputChange }
                        >
                            Nome
                        </Input>
                        <Input
                            type="text"
                            id="rga"
                            placeholder="Insira um rga"
                            onChange={ this.inputChange }
                        >
                            RGA
                        </Input>
                        <hr className="my-4"></hr>
                        <Error { ...this.state.changeSupportUserInscriptionState }/>
                        <Submit id="idCreateSupportUser"> Salvar </Submit>
                    </Loading>
                </form>
            </Modal>
        )
    }
}