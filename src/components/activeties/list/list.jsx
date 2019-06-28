import React from 'react'

export const ListGroup = ( props ) => {
    return (
        <div className="col-md-4 p-2">
            <div className="list-group rounded shadow" id="list-tab-activities" role="tablist">
                { props.children }
            </div>
        </div>
    )
}

export const ListGroupContent = ( props ) => {
    return (
        <div className="col-md-8">
            <div className="tab-content" id="nav-tabContent">
                { props.children }
            </div>
        </div>
    )
}

export const ListGroupContentSupport = ( props ) => {
    return (
        <div class="col-md-8">
            <div class="tab-content" id="nav-tabContent">
                { props.children }
            </div>
        </div>
    )
}