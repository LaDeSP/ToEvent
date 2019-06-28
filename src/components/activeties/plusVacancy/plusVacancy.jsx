import React, { Component } from 'react'

import Modal from '../../shared/modal/modal'
import { Error } from '../../auth/error'
import { Loading } from '../../shared/loading'
import { Input } from '../../auth/input'
import { Submit } from '../../auth/submit'

import { Null, Nothing, False, True } from '../../constant'
import { updateVacanciesActivity } from '../effects'

export default class PlusVacancy extends Component {
    constructor(props){
        super(props)

        this.state = {
            changeVacancyState: {
                isSuccess: Null,
                message: Nothing
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

        var hasUpdated = await updateVacanciesActivity(this.props.activityName, this.state.form.plusVacancy)

        if(hasUpdated){
            this.setState({
                changeVacancyState: {
                    isSuccess: True,
                    message: 'As vagas foram atualizadas'
                }
            })
        } else {
            this.setState({
                changeVacancyState: {
                    isSuccess: False,
                    message: 'Aconteceu algum erro'
                }
            })
        }
        
        this.props.reload()

        setTimeout( this.LoadingOff , 1500);
    }

    render(){
        return (
            <Modal id="plusVacancyModal"> 
                <h3 className="login-heading mb-4">Aumentar Vagas</h3>
                <form onSubmit={ this.handleSubmit }>
                    <Loading isLoading={ this.state.isLoading }>
                        <Input
                            type="number"
                            id="plusVacancy"
                            placeholder="Mais Vagas"
                            onChange={ this.inputChange }
                        >
                            Mais Vagas
                        </Input>
                        <hr className="my-4"></hr>
                        <Error { ...this.state.changeVacancyState }/>
                        <Submit id="submitPlusVacancy"> Salvar </Submit>
                    </Loading>
                </form>
            </Modal>
        )
    }
}