import React, { Component } from 'react'

import Modal from '../../shared/modal/modal'
import { Error } from '../error'
import { isNothing, isRga, isEmail, checkForm } from '../../utils/auth'
import { doInscription } from '../auth'

import { True, False, Void, InitialInput, InscriptionType } from '../../constant'
import { Input } from '../input'
import { Submit } from '../submit'
import { Loading } from '../../shared/loading'
import { Select, Option } from '../select'
import { Textarea } from '../textarea'

export default class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            isLoading: False,
            isSuccessSubmit: Void,
            inscriptionState: {
                isSuccess: Void,
                message: InitialInput
            },

            is:{
                isRga: Void,
                isName: Void,
                isEmail: Void,
                isCourse: Void,
                isContact: Void,
                isEmergencyContact: Void
            },

            form: {
                rga: InitialInput,
                name: InitialInput,
                email: InitialInput,
                course: InitialInput,
                contact: InitialInput,
                emergencyContact: InitialInput,
                group: 'Três Lagoas - Conexões de Saberes Matemáticos',
                gender: 'Feminino',
                ethnicity: 'Branco',
                arrivalDate: '22/03/2018',
                departureDate: '23/03/2018',
                allergy: '',
                deficiency: '',
                type: InscriptionType
            }
        }

        this.rgaChange = this.rgaChange.bind(this)
        this.nameChange = this.nameChange.bind(this)
        this.emailChange = this.emailChange.bind(this)
        this.courseChange = this.courseChange.bind(this)
        this.contactChange = this.contactChange.bind(this)
        this.emergencyContactChange = this.emergencyContactChange.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
        this.LoadingOn = this.LoadingOn.bind(this)
        this.LoadingOff = this.LoadingOff.bind(this)
        this.submitError = this.submitError.bind(this)
        this.submitDefault = this.submitDefault.bind(this)
    }

    inputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
            form: { ...this.state.form, [name]: value },
        });
    }

    rgaChange(event){
        var rga = event.target.value
        this.setState({
            form: { ...this.state.form, rga: rga },
            is: { ...this.state.is, isRga: isRga(rga) }
        });
    }

    emailChange(event){
        var email = event.target.value
        this.setState({
            form: { ...this.state.form, email: email },
            is: { ...this.state.is, isEmail: isEmail(email) }
        });
    }

    nameChange(event){
        var name = event.target.value
        this.setState({
            form: { ...this.state.form, name: name },
            is: { ...this.state.is, isName: !isNothing(name) }
        });
    }

    courseChange(event){
        var course = event.target.value
        this.setState({
            form: { ...this.state.form, course: course },
            is: { ...this.state.is, isCourse: !isNothing(course) }
        });
    }

    contactChange(event){
        var contact = event.target.value
        this.setState({
            form: { ...this.state.form, contact: contact },
            is: { ...this.state.is, isContact: !isNothing(contact) }
        });
    }

    emergencyContactChange(event){
        var emergencyContact = event.target.value
        this.setState({
            form: { ...this.state.form, emergencyContact: emergencyContact },
            is: { ...this.state.is, isEmergencyContact: !isNothing(emergencyContact) }
        });
    }

    LoadingOn(){
        this.setState({
            isLoading: True
        })
    }

    LoadingOff(){
        this.setState({
            isLoading: False
        })
    }

    submitError(){
        this.setState({
            isSuccessSubmit: False
        })
    }

    submitDefault(){
        this.setState({
            isSuccessSubmit: Void
        })
    }

    async handleSubmit(event){
        event.preventDefault()
        if( !checkForm( this.state.is ) ){
            this.submitError()
            setTimeout( this.submitDefault, 2000)
        } else {
            this.LoadingOn()

            let doInscriptionResponse = await doInscription( this.state.form )
            this.setState({
                inscriptionState: doInscriptionResponse
            })

            setTimeout( this.LoadingOff, 2000)
        }
    }

    render(){
        return(
            <Modal id="register"> 
                <Loading isLoading={ this.state.isLoading }>
                    <h3 className="login-heading mb-4">Inscreva-se no evento</h3>
                    <form onSubmit={ this.handleSubmit }>
                        <Input
                            type="text"
                            id="nameInscription"
                            placeholder="Nome"
                            onChange={ this.nameChange }
                            isValid={ this.state.is.isName }
                            value={ this.state.form.name }
                            invalidMessage="Insira um nome"
                        >
                            Nome
                        </Input>
                        <Input
                            type="text"
                            id="rgaInscription"
                            placeholder="Insira o seu RGA. O RGA será o seu user"
                            onChange={ this.rgaChange }
                            isValid={ this.state.is.isRga }
                            value={ this.state.form.rga }
                            invalidMessage="Insira um rga válido."
                        >
                            Insira o seu RGA. O RGA será o seu user
                        </Input>
                        <Input
                            type="email"
                            id="emailInscription"
                            placeholder="Email"
                            onChange={ this.emailChange }
                            isValid={ this.state.is.isEmail }
                            value={ this.state.form.email }
                            invalidMessage="Insira um email válido"
                        >
                            Email
                        </Input>
                        <Input
                            type="text"
                            id="courseInscription"
                            placeholder="Curso"
                            onChange={ this.courseChange }
                            isValid={ this.state.is.isCourse }
                            value={ this.state.form.course }
                            invalidMessage="Insira um curso"
                        >
                            Curso
                        </Input>

                        <hr className="my-4"></hr>
                        <Select name="Grupo" id="group" value={ this.state.form.group } onChange={ this.inputChange }>
                            <Option>Três Lagoas - Conexões de Saberes Matemáticos</Option>
                            <Option>Três Lagoas - Geografia</Option>
                            <Option>Três Lagoas - Enfermagem</Option>
                            <Option>Três Lagoas - História</Option>
                            <Option>Três Lagoas - Matemática</Option>

                            <Option>Chapadão do Sul - Agronomia e Engenharia Florestal</Option>

                            <Option>Campo Grande - Farmácia</Option>
                            <Option>Campo Grande - Zootecnia</Option>
                            <Option>Campo Grande - Química</Option>
                            <Option>Campo Grande - Educação Física</Option>
                            <Option>Campo Grande - Engenharia Elétrica</Option>
                            <Option>Campo Grande - Materiais</Option>
                            <Option>Campo Grande - Ciência da Computação</Option>
                            <Option>Campo Grande - Sistemas</Option>

                            <Option>Ponta Porã - Fronteira</Option>
                            <Option>Ponta Porã - Conexões de Saberes Matemática</Option>

                            <Option>Naviral - Pedagogia e Ciência Sociais</Option>
                        </Select>
                        <Select name="Sexo" id="gender" value={ this.state.form.gender } onChange={ this.inputChange }>
                            <Option>Feminino</Option>
                            <Option>Masculino</Option>
                        </Select>
                        <Select name="Etnia" id="ethnicity" value={ this.state.form.ethnicity } onChange={ this.inputChange }>
                            <Option>Branco</Option>
                            <Option>Negro</Option>
                            <Option>Indígena</Option>
                            <Option>Pardo</Option>
                            <Option>Caboclo</Option>
                            <Option>Cafuzo</Option>
                        </Select>
                        <Select name="Data de Chegada" id="arrivalDate" value={ this.state.form.arrivalDate } onChange={ this.inputChange }>
                            <Option>22/03/2018</Option>
                            <Option>23/03/2018</Option>
                        </Select>
                        <Select name="Data de Saída" id="departureDate" value={ this.state.form.departureDate } onChange={ this.inputChange }>
                            <Option>23/03/2018</Option>
                            <Option>24/03/2018</Option>
                        </Select>

                        <hr className="my-4"></hr>
                        <Input
                            type="text"
                            id="contactInscription"
                            placeholder="Contato"
                            onChange={ this.contactChange }
                            isValid={ this.state.is.isContact }
                            value={ this.state.form.contact }
                            invalidMessage="Insira um contato"
                        >
                            Contato
                        </Input>
                        <Input
                            type="text"
                            id="emergencyContactInscription"
                            placeholder="Contato de Emergência"
                            onChange={ this.emergencyContactChange }
                            isValid={ this.state.is.isEmergencyContact }
                            value={ this.state.form.emergencyContact }
                            invalidMessage="Insira um contato de emergência"
                        >
                            Contato de Emergência
                        </Input>

                        <hr className="my-4"></hr>
                        <Textarea id="allergy" name="Intolerância/Alergia" onChange={ this.inputChange } value={ this.state.form.allergy }/>
                        <Textarea id="deficiency" name="Deficiência" onChange={ this.inputChange } value={ this.state.form.deficiency }/>

                        <hr className="my-4"></hr>
                        <Error { ...this.state.inscriptionState }/>
                        <Submit error={ this.state.isSuccessSubmit } id="idInscription"> Inscreva-se </Submit>
                    </form>
                </Loading>
            </Modal>
        )
    }
}