import React from 'react'

const ModalButton = (props) => {
    return (
        <button type="button" className="btn btn-outline-primary m-2" data-toggle="modal" data-target={ props.target }>
            { props.children }
        </button>
    )
}

export default ModalButton