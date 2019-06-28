import React, { Component } from 'react'

import QrReader from "react-qr-reader";
import { Error } from '../auth/error'

import { Loading } from '../shared/loading'
import { False, True, Void, InitialInput } from '../constant';
import { presence } from './effects'

export default class Reader extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            presenceState: {
                isSuccess: Void,
                message: InitialInput
            },
            activityName: this.props.match.params.activity,
            activityType: this.props.match.params.type,
            delay: 500,
            isLoading: False,
            startPresence: False
        }

        this.handleScan = this.handleScan.bind(this)
    }

    async handleScan(data) {
        if (data && !this.state.startPresence) {
            this.setState({
                isLoading: True,
                startPresence: True
            })

            var isSuccess = await presence(this.state.activityName, data, this.state.activityType)
            var presenceState = isSuccess ? {
                isSuccess: True,
                message: 'Presença realizada'
            } : {
                isSuccess: False,
                message: 'Erro ao realizar a presença'
            }

            setTimeout(() => {
                this.setState({
                    isLoading: False,
                    presenceState: presenceState,
                    startPresence: False
                })
            }, 1500);
        }
    }
    
    handleError(err) {
        console.error(err);
    }

    render(){
        return (
            <div className="mt-2 mb-2 p-3">
                <div className="row justify-content-center">
                    <div className="card col-lg-5 col-md-8 col-sm-8">
                        <Loading isLoading={ this.state.isLoading }>
                            <QrReader
                                delay={this.state.delay}
                                onError={this.handleError}
                                onScan={this.handleScan}
                                style={{ width: "100%" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">Leitor de Frequência</h5>
                                <p className="card-text text-justify">
                                    Coloque o leitor em frente do código do inscrito. Quando for reconhecido, será alertado se a frequência foi efetuada ou se deu erro.
                                </p>
                            </div>
                            <Error { ...this.state.presenceState }/>
                        </Loading>
                    </div>
                </div>
            </div>
        )
    }
}