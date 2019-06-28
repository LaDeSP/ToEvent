import React from 'react'

import { True, False, Valid, Invalid, Nothing } from '../constant'
import { isVoid } from '../utils/auth'

const validation = (value) => {
    return value ? True : False
}

export const Input = (props) => {
    var isValid = props.isValid
    var inputValidation = validation(isValid) ? Valid : Invalid
        inputValidation = !isVoid(isValid) ? inputValidation : Nothing

    return (
        <div className="form-label-group">
            <input 
                type={ props.type } 
                id={ props.id } 
                name={ props.id }
                className={ "form-control " + inputValidation } 
                placeholder={ props.placeholder } 
                onChange={ props.onChange }
                value={ props.value }
                required
            />
            <div className="text-center valid-feedback">
                { props.validMessage }
            </div>
            <div className="text-center invalid-feedback">
                { props.invalidMessage }
            </div>
            <label htmlFor={ props.id }> { props.children } </label>
        </div>
    )
}