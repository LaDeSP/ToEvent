import React from 'react'

export const Textarea = (props) => {
    return (
        <div>
            <label htmlFor={ props.id } className="mt-3"> { props.name } </label>
            <div className="form-label-group">
                <textarea 
                    name={ props.id }
                    className="form-control" 
                    id={ props.id } 
                    rows="3" 
                    onChange={ props.onChange } 
                    value={ props.value }
                />
            </div>
        </div>
    )
}