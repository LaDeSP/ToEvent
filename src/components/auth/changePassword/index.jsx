import React, { Component } from 'react'

import Modal from '../../shared/modal/modal'
import { Error } from '../error'
import { changePassword } from '../auth'

import { Loading } from '../../shared/loading'
import { Input } from '../input'
import { Submit } from '../submit'
import { Null, False, True, Nothing } from '../../constant';
import { LoadApplicationState } from '../../utils/localStorage';


export default class ChangePassword extends Component{
    constructor(props){
        super(props)

        this.state = {
            changePasswordState: {
                isSuccess: Null,
                message: Nothing
            },
            isLoading: False,
            rga: LoadApplicationState().rga
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

        if(this.state.form.newPassword.length < 8 || this.state.form.newPasswordConfirmation < 8){
            this.setState({
                changePasswordState: {
                    isSuccess: False,
                    message: 'Insira uma senha com no mínimo 8 caracteres'
                }
            })

            return false
        }

        if(this.state.form.newPassword !== this.state.form.newPasswordConfirmation){
            this.setState({
                changePasswordState: {
                    isSuccess: False,
                    message: 'As senha não se correspondem'
                }
            })
            return false
        }

        this.LoadingOn()

        var hasUpdated = await changePassword(this.state.form.newPassword, this.state.rga)
        if(hasUpdated){
            this.setState({
                changePasswordState: {
                    isSuccess: True,
                    message: 'A Senha foi mudada'
                }
            })
        } else {
            this.setState({
                changePasswordState: {
                    isSuccess: True,
                    message: 'Houve algum erro...'
                }
            })
        }

        setTimeout( this.LoadingOff , 1500);
    }

    render(){
        return (
            <Modal id="changePassword"> 
                <h3 className="login-heading mb-4">Login</h3>
                <form onSubmit={ this.handleSubmit }>
                    <Loading isLoading={ this.state.isLoading }>
                        <Input
                            type="password"
                            id="newPassword"
                            placeholder="Insira uma senha com no mínimo 8 caracteres"
                            onChange={ this.inputChange }
                            invalidMessage="Insira um rga válido"
                        >
                            Senha
                        </Input>
                        <Input
                            type="password"
                            id="newPasswordConfirmation"
                            placeholder="Repita a senha"
                            onChange={ this.inputChange }
                        >
                            Repita a senha
                        </Input>
                        <hr className="my-4"></hr>
                        <Error { ...this.state.changePasswordState }/>
                        <Submit id="idChangePassword"> Trocar Senha </Submit>
                    </Loading>
                </form>
            </Modal>
        )
    }
}