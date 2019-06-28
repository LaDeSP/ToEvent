import React from 'react'

import { False } from '../constant'

export const Submit = (props) => {
    if( props.error === False ){
        return (
            <button id={ props.id } className="error-submit btn btn-lg btn-primary btn-block text-uppercase" type="submit"> { props.children } </button>
        )
    } else {
        return (
            <button id={ props.id } className="btn btn-lg btn-primary btn-block text-uppercase" type="submit"> { props.children } </button>
        )
    }
}