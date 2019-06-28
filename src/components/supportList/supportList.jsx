import React, { Component } from 'react'

import { getSupportUsers, deleteSupportUsers } from './effects'
import { False } from '../constant';

export default class SupportList extends Component {
    constructor(props){
        super(props)

        this.state = {
            supportUsers: []
        }

        this.loadSupportUsers = this.loadSupportUsers.bind(this)
        this.deleteSupportUser = this.deleteSupportUser.bind(this)
        this.renderSupportUsers = this.renderSupportUsers.bind(this)
        this.reload = this.reload.bind(this)
    }

    async loadSupportUsers(){
        this.setState({
            supportUsers: await getSupportUsers()
        })
    }

    reload(){
        this.props.reload(False)
        this.loadSupportUsers()
    }

    componentDidMount(){
        this.loadSupportUsers()
    }

    async deleteSupportUser(rga){
        await deleteSupportUsers(rga)
        this.reload()
    }

    renderSupportUsers(){
        const supportUsers = this.state.supportUsers.map((user, index) => {
            return (
                <tr key={ index }>
                    <td scope="row">{ user.name }</td>
                    <td>{ user.rga }</td>
                    <td>
                        <a onClick={ () => this.deleteSupportUser(user.rga) } className="btn btn-outline-danger mb-1">Excluir</a>
                    </td>
                </tr>
            )
        })

        return supportUsers
    }

    render(){
        if(this.props.reloadingPage){
            this.reload()
        }
        return (
            <div className="mt-2 mb-2 p-3">
                <h1> Time de Suporte </h1>
                <div>
                    <span className="badge badge-info mr-1">Time de apoio: { this.state.supportUsers.length }</span>
                    <span className="badge badge-info mr-1">
                        <a className="button-none" data-toggle="modal" data-target="#createSupportUser">
                            <i className="fas fa-plus"></i>
                            Adicionar
                        </a>
                    </span>
                </div>
                <div className="table-responsive">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">RGA</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderSupportUsers() }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}