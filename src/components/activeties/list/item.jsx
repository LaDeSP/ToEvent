import React from 'react'
import { Link } from "react-router-dom";

import { 
    activityInscription, 
    removeActivityInscription,
    updateIncrementVacanciesActivity
} from '../effects'
import { objectToArray } from '../../utils/document'
import { Null } from '../../constant';


export const ItemGroup = ( props ) => {
    var className = `list-group-item list-group-item-action ` + ( props.id === 0 ? 'active' : '' )
    var itemId = `item-${props.id}`
    var contentId = `#content-${props.id}`
    return (
        <a className={ className } id={ itemId } data-toggle="list" href={ contentId } role="tab" aria-controls="home">
            { props.title }
            { props.hasInscription ? (<span className="badge badge-success badge-pill">inscrito</span>) : null }
        </a>
    )
}

export const ItemGroupContent = ( props ) => {
    var className = `mt-2 text-justify tab-pane fade show ` + ( props.id === 0 ? 'active' : '' )
    var itemId = `content-${props.id}`
    
    var inscriptionButton = props.vacancies !== 0 ? props.hasInscription ? (
        <button type="button" onClick={ 
            async () => {
                await removeActivityInscription(props.rga, props.title) 
                await updateIncrementVacanciesActivity(props.title)
                props.reload()
            }
        } className="btn btn-outline-danger">Sair da atividade</button>
    ) : (
        <button type="button" onClick={ 
            async () => {
                await activityInscription(props.rga, props.title, props.name) 
                props.reload()
            }
        } className="btn btn-outline-primary">Inscrever-se na atividade</button>
    ) : null

    return (
        <div className={ className } id={ itemId } role="tabpanel" aria-labelledby="list-home-list">
            <p>{ props.description }</p>
            { props.type !== "ALL" ? inscriptionButton : null }
            { props.vacancies ? (
                <div>
                    <span className="badge badge-success badge-pill"> { `Vagas: ${props.vacancies}` }</span>
                </div>
            ) : null }
        </div>
    )
}

//Support

export const ItemGroupContentSupport = (props) => {
    var className = `mt-2 text-justify tab-pane fade show ` + ( props.id === 0 ? 'active' : '' )
    var itemId = `content-${props.id}`
    var users = objectToArray( props.users ? props.users : [] )

    var listUsers = users.map((user, index) => {
        return (
            <tr key={ index }>
                <th scope="row">{ user.name }</th>
                <td>{ user.rga }</td>
                <td>{ user.presence === true ? 'PRESENTE' : 'PENDENTE'}</td>
            </tr>
        )
    })

    return (
        <div className={ className } id={ itemId } role="tabpanel" aria-labelledby="list-home-list">
            <Link to={ `${props.match.url}/${props.activityName}/qrcode/${props.type}` } className="btn btn-outline-info mb-1">Frequência</Link>
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">RGA</th>
                            <th scope="col">Frequência</th>
                        </tr>
                    </thead>
                    <tbody>
                        { listUsers }
                    </tbody>
                </table>
            </div>
        </div>
    )
}


//Administrator
export const ItemGroupContentAdministrator = (props) => {
    var className = `mt-2 text-justify tab-pane fade show ` + ( props.id === 0 ? 'active' : '' )
    var itemId = `content-${props.id}`
    var users = objectToArray( props.users ? props.users : [] )

    var listUsers = users.map((user, index) => {
        return (
            <tr key={ index }>
                <th scope="row">{ user.name }</th>
                <td>{ user.rga }</td>
                <td>{ user.presence === true ? 'PRESENTE' : 'PENDENTE'}</td>
            </tr>
        )
    })

    return (
        <div className={ className } id={ itemId } role="tabpanel" aria-labelledby="list-home-list">
            <span className="mr-1 badge badge-info">
                <a onClick={ () => {
                    props.exportToCsv(users, props.activityName)
                } } className="mr-1 button-none">
                    <i className="fas mr-1 fa-download"></i>
                    Exportar para CSV
                </a>
            </span>
            { props.vacancies ? (
                <span className="mr-1 badge badge-info">Vagas: { props.vacancies }</span>
            ) : Null }
            <span className="mr-1 badge badge-success">Inscritos: { users.length }</span>
            { props.vacancies ? (
                <span className="mr-1 badge badge-info">
                    <a onClick={ () => {
                        props.handleActivity(props.activityName)
                    } } className="mr-1 button-none" data-toggle="modal" data-target="#plusVacancyModal">
                        <i className="fas mr-1 fa-plus"></i>
                        Aumentar Vagas
                    </a>
                </span>
            ) : Null }
            
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">RGA</th>
                            <th scope="col">Frequência</th>
                        </tr>
                    </thead>
                    <tbody>
                        { listUsers }
                    </tbody>
                </table>
            </div>
        </div>
    )
}