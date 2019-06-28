import React from 'react'

const Main = (props) => {
    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                { props.children }
            </div>
        </div>
    )
}

export default Main