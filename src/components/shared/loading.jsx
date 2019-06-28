import React from 'react'

export const Loading = (props) => {
    if(props.isLoading){
        return (
            <div className="text-center mt-5 mb-5">
                <div>
                    <i className="fas fa-sync fa-7x" id="loading"></i>
                </div>
                <div className="mt-4">
                    Carregando
                </div>
            </div>
        )
    } else {
        return props.children
    }
}