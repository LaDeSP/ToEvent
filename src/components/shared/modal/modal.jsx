import React from 'react'

const Modal = (props) => {
    return (
        <div className="modal fade" id={ props.id } tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog bg-white rounded" role="document">
                <div className="modal-content login d-flex py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9 col-lg-9 mx-auto">
                                { props.children }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button id={ `close${ props.id }` } type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    )
}

export default Modal