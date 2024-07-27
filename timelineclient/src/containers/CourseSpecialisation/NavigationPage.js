import React, { Component } from 'react';
import Specialisation from './Specialisation';
import { Card, Container } from 'react-bootstrap';
import SpecialisationTypes from './SpecialisationTypes'
import SpecialisationSubjectsForSem3 from './SpecialisationSubjets/SpecialisationSubjectsForSem3'
import SpecialisationSubjectsForSem4 from './SpecialisationSubjets/SpecialisationSubjectsForSem4'
import ConfirmationPage from './ConfirmationPage/ConfirmationPage'
import StepperPage from './StepperPage'
import Success from './ConfirmationPage/Success'
import Error from './ConfirmationPage/Error'

import SpecialisationHome from './SpecialisationHome'
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner'

class NavigationPage extends Component{

    state = {
        serviceRequest : this.props.serviceRequest,
        step : this.props.step
    }

    render(){
        const { values } = this.props;

        if(this.state.serviceRequest){
            switch(this.state.step) {
                case 1:
                    return <Specialisation 
                            nextStep={this.nextStep} 
                            handleCheck = {this.handleCheck}
                            values={values}
                            />
                case 2:
                    return <SpecialisationTypes 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleCheckBox = {this.handleCheckBox}
                            isDisabled = {this.isDisabled}
                            values={values}
                            specialisationType={this.props.specialisationType}
                            />
    
                case 3:
                    return <SpecialisationSubjectsForSem3
                            values={values}
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            addSpecializationForSem3 = {this.addSpecializationForSem3}
                        />
    
                case 4:
                    return <SpecialisationSubjectsForSem4
                            values={values}
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            addSpecializationForSem4 = {this.addSpecializationForSem4}
                        />
        
                case 5:
                    return <ConfirmationPage 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            values={values}
                            sapId={this.props.sapId}
                            savesaveSpecialisationToDB={this.savesaveSpecialisationToDB}
                            />
                case 6:
                    if (this.state.savedDetails && !this.state.error) {
                        return <Success 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            isSpecialisationDone={this.isSpecialisationDone}
                            />
                    }else if (!this.state.savedDetails && this.state.error){
                        return <Error 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            isSpecialisationDone={this.isSpecialisationDone}
                            />
                    }else{
                        return(
                            <>
                                <br />
                                <Card className="mx-auto text-center p-2">
                                    <LoadingSpinner noSpace loadingText={'Saving Details...'}/>
                                </Card>
                            </>
                        )
                    }
                    
                case 7:
                    return <SpecialisationHome
                            sapId={this.props.sapId}
                            values={values}
                            />
                }
            }else{
                switch(this.state.step) {
                    case 1:
                        if (this.state.isSpecialisationTypeLoaded) {
                            return <SpecialisationSubjectsForSem3
                                values={values}
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                addSpecializationForSem3 = {this.addSpecializationForSem3}
                            />
                        } else {
                            return(
                                <Card className="mx-auto text-center p-2">
                                    <LoadingSpinner noSpace loadingText={'Fetching Details...'}/>
                                </Card>
                            )
                        }
        
                    case 2:
                        return <SpecialisationSubjectsForSem4
                                values={values}
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                addSpecializationForSem4 = {this.addSpecializationForSem4}
                            />
            
                    case 3:
                        return <ConfirmationPage 
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                values={values}
                                sapid={this.props.sapId}
                                savesaveSpecialisationToDB={this.savesaveSpecialisationToDB}
                                />
                    case 4:
                        if (this.state.savedDetails && !this.state.error) {
                            return <Success 
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                isSpecialisationDone={this.isSpecialisationDone}
                                />
                        }else if (!this.state.savedDetails && this.state.error){
                            return <Error 
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                isSpecialisationDone={this.isSpecialisationDone}
                                />
                        }else{
                            return(
                                <>
                                    <br />
                                    <Card className="mx-auto text-center p-2">
                                        <LoadingSpinner noSpace loadingText={'Saving Details...'}/>
                                    </Card>
                                </>
                            )
                        }
                        
                    case 5:
                        return <SpecialisationHome 
                                sapId={this.props.sapId}
                                values={values}
                                />
                    }
                }
    }

}
export default NavigationPage