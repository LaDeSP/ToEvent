import React from 'react'

import { False, True, Null } from '../constant'

export const Error = (props) => {
    if(props.isSuccess === False){
        return <span className="badge badge-danger"> { props.message } </span>
    } else {
        if(props.isSuccess === True) return <span className="badge badge-success"> { props.message } </span>
    }
    return Null
}