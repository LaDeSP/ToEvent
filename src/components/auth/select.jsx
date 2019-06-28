import React from 'react'

export const Select = (props) => {
    return (
        <div>
            <label htmlFor="group"> { props.name } </label>
            <div className="form-label-group rounded">
                <select name={ props.id } className="form-control" value={ props.value } onChange={ props.onChange } id={ props.id }>
                    { props.children }
                </select>
            </div>
        </div>
    )
}

export const Option = (props) => {
    return (
        <option { ...props }> { props.children } </option>
    )
}