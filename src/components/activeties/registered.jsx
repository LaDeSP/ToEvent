import React, { Component } from 'react'

import { LoadApplicationState } from '../utils/localStorage'
import { objectToArray } from '../utils/document'
import { getActiveties, getUserActiveties } from './effects'


import { ListGroup, ListGroupContent } from './list/list'
import { ItemGroup, ItemGroupContent } from './list/item'

export default class ActivetiesRegistered extends Component {
    constructor(props){
        
        super(props)
        this.state = {
            user: LoadApplicationState()
        }

        this.renderActivies = this.renderActivies.bind(this)
        this.reload = this.reload.bind(this)
    }

    async componentWillMount(){
        this.setState({
            activeties: objectToArray(await getActiveties()),
            myActiveties: await getUserActiveties(this.state.user.rga)
        })
    }

    async reload(){
        this.setState({
            activeties: objectToArray(await getActiveties()),
            myActiveties: await getUserActiveties(this.state.user.rga)
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
            
            var hasInscription = hasActiveties ? this.state.myActiveties[activity.name] ? true : false : false

            return (
                <ItemGroupContent 
                    key={ index }
                    title={ activity.name }
                    description={ activity.description }
                    id={ index }
                    vacancies={ activity.vacancies }
                    hasInscription={ hasInscription }
                    rga={ this.state.user.rga }
                    reload={ this.reload }
                    type={ activity.inscription }
                    name={ this.state.user.name }
                />
            )
        });

        return (
            <div className="mt-2 mb-2 p-3">
                <div className="row">
                    <ListGroup>
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
        return this.renderActivies()
    }
}