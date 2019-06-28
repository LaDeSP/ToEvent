import React from 'react'

import { LoadApplicationState } from '../utils/localStorage'

const ShowQrCode = (props) => {
    var user = LoadApplicationState()
    return (
        <div className="mt-2 mb-2 p-3">
            <div className="row justify-content-center">
                <div className="card col-lg-5 col-md-8 col-sm-8">
                    <img 
                        className="card-img-top" 
                        src={ `https://chart.googleapis.com/chart?cht=qr&chl=${user.rga}&chs=180x180&choe=UTF-8&chld=L|2` } 
                    />
                    <div className="card-body">
                        <h5 className="card-title">Código de Frequência</h5>
                        <p className="card-text text-justify">Antes de entrar na sala da atividade, mostre para o supervisor o código acima.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowQrCode