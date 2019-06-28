import React, { Component } from 'react'

import { LoadApplicationState } from '../utils/localStorage'
import { objectToArray } from '../utils/document'
import { getActiveties, getUserActiveties, getUsers } from './effects'
import { dataToCsv, downloadCsv } from '../utils/document'


import { ListGroup, ListGroupContent } from './list/list'
import { ItemGroup, ItemGroupContentAdministrator } from './list/item'
import { Nothing, False, InscriptionType } from '../constant';

export default class ActivetiesAdministrator extends Component {
    constructor(props){
        
        super(props)
        this.state = {
            user: LoadApplicationState(),
            activitySelected: Nothing
        }

        this.renderActivies = this.renderActivies.bind(this)
        this.reload = this.reload.bind(this)
        this.exportUsersToCsv = this.exportUsersToCsv.bind(this)
        this.exportToCsv = this.exportToCsv.bind(this)

    }

    async componentWillMount(){
        this.setState({
            activeties: objectToArray(await getActiveties()),
            myActiveties: await getUserActiveties(this.state.user.rga)
        })
    }

    async reload(){
        this.props.reload(False)
        this.setState({
            activeties: objectToArray(await getActiveties()),
            myActiveties: await getUserActiveties(this.state.user.rga)
        })
    }

    async exportUsersToCsv(){
        var users = objectToArray(await getUsers())
        var usersFormated = []

        users.forEach((user) => {
            if(user.type === InscriptionType){
                usersFormated.push({
                    ...user,
                    password: ''
                })
            }
        })

        dataToCsv(usersFormated, (err, csv) => {
            downloadCsv(csv, 'Inscritos')
        })
    }

    async exportToCsv(data, filename){
        dataToCsv(data, (err, csv) => {
            downloadCsv(csv, filename)
        })
    }

    renderActivies(){
        if(!this.state.activeties)
            return null
        
        var hasActiveties = !this.state.myActiveties ? false : true
        const itemGroup = this.state.activeties.map((activity, index) => {

            var hasInscription = hasActiveties ? this.state.myActiveties[activity.name] ? true : false : false

            return (
                <ItemGroup 
                    key={ index }
                    title={ activity.name }
                    id={ index }
                    hasInscription={ hasInscription } 
                />
            )
        });

        const itemGroupContent = this.state.activeties.map((activity, index) => {
            
            return (
                <ItemGroupContentAdministrator
                    exportToCsv={ this.exportToCsv }
                    handleActivity={ this.props.handleActivity } 
                    key={ index }
                    id={ index }
                    vacancies={ activity.vacancies }
                    users={ activity.users }
                    activityName={ activity.name }
                    match={ this.props.match }
                    type={ activity.inscription }
                />
            )
        });

        return (
            <div className="mt-2 mb-2 p-3">
                <div className="row">
                    <ListGroup>
                        <a onClick={ this.exportUsersToCsv } className="btn btn-outline-info mb-1">Exportar Inscritos</a>
                        { itemGroup }
                    </ListGroup>
                    <ListGroupContent>
                        { itemGroupContent }
                    </ListGroupContent>
                </div>
            </div>
        )
    }

    render(){
        if(this.props.reloadingPage){
            this.reload()
        }
        
        return this.renderActivies()
    }
}