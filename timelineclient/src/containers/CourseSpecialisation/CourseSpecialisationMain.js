import React, { Component } from 'react';
import Specialisation from './Specialisation';
import { connect } from 'react-redux'
import { Card, Container } from 'react-bootstrap';
import SpecialisationTypes from './SpecialisationTypes'
import SpecialisationSubjectsForSem3 from './SpecialisationSubjets/SpecialisationSubjectsForSem3'
import SpecialisationSubjectsForSem4 from './SpecialisationSubjets/SpecialisationSubjectsForSem4'
import SpecialisationSubjectsForSem5 from './SpecialisationSubjets/SpecialisationSubjectsForSem5'

import ConfirmationPage from './ConfirmationPage/ConfirmationPage'
import Success from './ConfirmationPage/Success'
import Error from './ConfirmationPage/Error'
import './Specialisation.css'

import SpecialisationHome from './SpecialisationHome'
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner'

import StepperPage from './StepperPage'

import axios from 'axios';
import { API } from '../../shared/config';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

let getSpecialisationTypes = API.getSpecialisationTypes
let getSpecialisationSubjects = API.getSpecialisationSubjects
let isSpecialisationDone = API.isSpecialisationDone
let saveStudentSpecialisationSubjects = API.saveStudentSpecialisationSubjects

class CourseSpecialisationMain extends Component {
    constructor(props) {
        super(props)
    this.state = {
        step: 1,
        isSpecialisationDoneLoaded : false,
        isSpecialisationDone : false,
        isSpecialisationTypeLoaded : false,
        appliedSpecialisationList : [],
        specialisation : '',             //Single , Dual
        isSpecialisationLoaded : false,
        checkedId : null,
        specialisationType : [],         //LS, OS, AF
        specialisationSubjects : [],     //OB, ME, FA, OM
        SpecialisationList : null,
        count : 0,                      // For Check selected subject
        selectedSequence : [],            //

        //For Subjects
        SpecialisationSubjectList : null,

        specialisation1SubjectList : [],

        specialisation1Sem3SubjectList : [],
        specialisation1Sem4SubjectList : [],
        specialisation1Sem5SubjectList : [],

        specialisation2SubjectList : [],
        specialisation2Sem3SubjectList : [],
        specialisation2Sem4SubjectList : [],
        specialisation2Sem5SubjectList : [],
        
        specialisation3SubjectList : [],
        specialisation3Sem3SubjectList : [],
        specialisation3Sem4SubjectList : [],
        //not is use right now as only 4 subjects in two rows are present in sem five
        specialisation3Sem5SubjectList : [],

        specialisation4SubjectList : [],
        specialisation4Sem3SubjectList : [],
        specialisation4Sem4SubjectList : [],
        //not is use right now as only 4 subjects in two rows are present in sem five
        specialisation4Sem5SubjectList : [],

        specialisation5SubjectList : [],
        specialisation5Sem3SubjectList : [],
        specialisation5Sem4SubjectList : [],
        //not is use right now as only 4 subjects in two rows are present in sem five
        specialisation5Sem5SubjectList : [],

        specialisation6SubjectList : [],
        specialisation6Sem3SubjectList : [],
        specialisation6Sem4SubjectList : [],
        //not is use right now as only 4 subjects in two rows are present in sem five
        specialisation6Sem5SubjectList : [],

        specialisation7SubjectList : [],
        specialisation7Sem3SubjectList : [],
        specialisation7Sem4SubjectList : [],
        //not is use right now as only 4 subjects in two rows are present in sem five
        specialisation7Sem5SubjectList : [],

        specialisation8SubjectList : [],
        specialisation8Sem3SubjectList : [],
        specialisation8Sem4SubjectList : [],
        //not is use right now as only 4 subjects in two rows are present in sem five
        specialisation8Sem5SubjectList : [],

        specialisation9SubjectList : [],
        specialisation9Sem3SubjectList : [],
        specialisation9Sem4SubjectList : [],
        //not is use right now as only 4 subjects in two rows are present in sem five
        specialisation9Sem5SubjectList : [],
        
        specialisation10SubjectList : [],
        specialisation10Sem3SubjectList : [],
        specialisation10Sem4SubjectList : [],
        //not is use right now as only 4 subjects in two rows are present in sem five
        specialisation10Sem5SubjectList : [],

        selectedSubjects:[],

        //For Confirmation
        savingDetails : false,
        savedDetails : false,
        error: false,

        //For SR Request
        serviceRequest   : false,

        maxTerm : 0,
        term3SelectedSubjects : [],
        isReSelect : false,
        showReSelect : true,
        subjectWithPrerequisite : null,
        coreSubject : null,
        specialisationSubjectCount : null,
        
        termThreeAutoSelectSubject : [],
        termFourAutoSelectSubject : [],
        commonSubjectList : []
    }
}

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }

    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }

    handleCheck = checked => event => {
        alert('Selected : '+event.target.value)
        this.setState({
            [checked]: event.target.value,
            checkedId: event.target.id
        });
    }

    handleCheckBox = checked => event => {
        
        let selectedSpecialisation = {
            "id" : event.target.id,
            "Specialisation" : event.target.value
        }
        let val = event.target.value
        let specialisationType = this.state.specialisationType
        let exists = specialisationType.some(specialization => { return specialization.Specialisation == val})
        
        if(exists) {
            specialisationType = specialisationType.filter(specialization => {return specialization.Specialisation != val})
        } else {
            specialisationType.push(selectedSpecialisation)
        }

        this.setState({specialisationType: specialisationType});
    }

    isDisabled = id => {
        return (
            this.state.specialisationType.length >= this.state.checkedId 
                && this.state.specialisationType.some(specialization => { return specialization.id != id})
        )
    }

    checkBlock5And6ElementsForTerm3 = () => {
        let isSpl5Or6Selected = this.state.selectedSubjects.some((subject) => {
            return subject.sequence == 9 || subject.sequence == 10
        })
        // if any subject from 5 or 6 is selected, then disable all other 5 or 6 subjects
        if(isSpl5Or6Selected) {
            this.toggleSplIfNotSelected('specialisation9Sem3SubjectList')
            this.toggleSplIfNotSelected('specialisation10Sem3SubjectList')
        }
    }

    toggleSplIfNotSelected = (specializationSubjectListKey) => {
        var splSubjects = this.state[specializationSubjectListKey]
        let newSpecializationList = []
        
        splSubjects.forEach((splSub) => {
            let output = {}
            let selectedSubjects = this.state.selectedSubjects
            let splSelected = selectedSubjects.some((subject) => {
                return subject.id === splSub.id
            })

            if (splSelected) {
                let subject = selectedSubjects.filter((subject) => {
                    return subject.id === splSub.id
                })
                output = subject[0]
            } else {
                let isSubjectDiabled = true
                
                output = {
                    ...splSub,
                    isDisabled : isSubjectDiabled,
                    isActive : false
                }
            }
            newSpecializationList.push(output)
            this.setState({
                [specializationSubjectListKey] : newSpecializationList
            })
        })
    }

    disableBlockElementsTerm3 = (specializationSubjectListKey, count) => {
        var splSubjects = this.state[specializationSubjectListKey]
        let specialisation = this.state.specialisation
        let newSpecializationList = []
        //To disabled block after 2 selection for Single & 3 selection for Dual Specialisation
        //let count = specialisation === 'Single Specialisation' ? 1 : 2

        splSubjects.forEach((splSub) => {
            let output = {}

            let selectedSubjects = this.state.selectedSubjects

            let splSelected = selectedSubjects.some((subject) => {
                return subject.id === splSub.id && subject.specializationType === splSub.specializationType
            })

            let blockSelected = selectedSubjects.some((subject) => {
                
                //updated the sequence so as to disable two sequences from one block after selecting a subject from that block
                if( subject.sequence == 1 || subject.sequence == 2 ){
                    return splSub.sequence == 1 || splSub.sequence == 2
                }else if( subject.sequence == 3 || subject.sequence == 4 ){
                    return splSub.sequence == 3 || splSub.sequence == 4
                }else if( subject.sequence == 5 || subject.sequence == 6 ){
                    return splSub.sequence == 5 || splSub.sequence == 6
                }else if( subject.sequence == 7 || subject.sequence == 8 ){
                    return splSub.sequence == 7 || splSub.sequence == 8
                }else if( subject.sequence == 9 || subject.sequence == 10 ){
                    return splSub.sequence == 9 || splSub.sequence == 10
                }

            })

            let numberOfSubjectsFromSpecializationSelected = selectedSubjects.filter((subject) => {
                
                if (specialisation === 'Single Specialisation' && count < 2) {
                    return subject.specializationType === splSub.specializationType && (subject.sequence != 9 && subject.sequence != 10)
                } else {
                    return subject.specializationType === splSub.specializationType
                }
                
            }).length

            if (splSelected) {
                let subject = selectedSubjects.filter((subject) => {
                    return subject.id === splSub.id && subject.specializationType === splSub.specializationType
                })
                output = subject[0]
            } else {

                let isSubjectDiabled = blockSelected || numberOfSubjectsFromSpecializationSelected > count

                output = {
                    ...splSub,
                    isDisabled : isSubjectDiabled,
                    isActive : false
                }
            }
            newSpecializationList.push(output)

            this.setState({
                [specializationSubjectListKey] : newSpecializationList
            })
        })
    }

    addSpecializationForSem3 = (subjectIn) => {

        var count = this.state.count

        let subject = {
            ...subjectIn,
            isDisabled : false,
            isActive : subjectIn.isActive ? false : true
        }

        let disabledAfter = 2
        let disableSubjectAfterTwoSelection = false

        //Toggling subjects from a block, if a subject is selected. Ever block is made of two sequences, for eg: block one will have 
        // sequence 1 and sequence 2 and so on
        if (subject.sequence == 1 || subject.sequence == 2 ) {
            let specializationList1 = this.toggleSpecialization(this.state.specialisation1Sem3SubjectList, subject)
            let specializationList2 = this.toggleSpecialization(this.state.specialisation2Sem3SubjectList, subject)
            this.setState({
                specialisation1Sem3SubjectList : specializationList1,
                specialisation2Sem3SubjectList : specializationList2
            })

        }else if (subject.sequence == 3 || subject.sequence == 4 ) {
            
            let specializationList3 = this.toggleSpecialization(this.state.specialisation3Sem3SubjectList, subject)
            let specializationList4 = this.toggleSpecialization(this.state.specialisation4Sem3SubjectList, subject)
            this.setState({
                specialisation3Sem3SubjectList : specializationList3,
                specialisation4Sem3SubjectList : specializationList4
            })

        }else if (subject.sequence == 5 || subject.sequence == 6 ) {
            let specializationList5 = this.toggleSpecialization(this.state.specialisation5Sem3SubjectList, subject)
            let specializationList6 = this.toggleSpecialization(this.state.specialisation6Sem3SubjectList, subject)
            this.setState({
                specialisation5Sem3SubjectList : specializationList5,
                specialisation6Sem3SubjectList : specializationList6
            })

        }else if (subject.sequence == 7 || subject.sequence == 8 ) {
            let specializationList7 = this.toggleSpecialization(this.state.specialisation7Sem3SubjectList, subject)
            let specializationList8 = this.toggleSpecialization(this.state.specialisation8Sem3SubjectList, subject)
            this.setState({
                specialisation7Sem3SubjectList : specializationList7,
                specialisation8Sem3SubjectList : specializationList8
            })

        }else if (subject.sequence == 9 || subject.sequence == 10 ) {
             let specializationList9 = this.toggleSpecialization(this.state.specialisation9Sem3SubjectList, subject)
             let specializationList10 = this.toggleSpecialization(this.state.specialisation10Sem3SubjectList, subject)
            this.setState({
                specialisation9Sem3SubjectList : specializationList9,
                specialisation10Sem3SubjectList : specializationList10
            })
        }

        //Check if subject already selected
        let selectedSubjects = this.state.selectedSubjects
        let exists = selectedSubjects.some(selectedSubjects => {
            return selectedSubjects.id == subject.id && selectedSubjects.specializationType == subject.specializationType
        })

        //If already selected subject then de-select or add in selected list
        if (exists) {
            selectedSubjects = selectedSubjects.filter( selectedsubject =>{
                return selectedsubject.id !== subject.id
            })
        }else{
            selectedSubjects.push(subject)
        }
        
        this.state.specialisationType.map( (specilization) => {
            
            this.state.specialisationSubjectCount.map( ( subjectCount ) => {

                if( specilization.id != 13 && this.state.specialisationType.length < 2 && 
                    specilization.id == subjectCount.specializationType && subjectCount.subjectCount < 7 ){

                    disabledAfter = 1
                    disableSubjectAfterTwoSelection = true

                }
            })
        })

        if (subject.isActive) {
            var selectedSequence = this.state.selectedSequence
            selectedSequence.push(subject.sequence)
            this.setState({
                count: this.state.count + 1,
                selectedSequence : selectedSequence

                },()=>{
                    this.disableBlockElementsTerm3('specialisation1Sem3SubjectList', disabledAfter)
                    this.disableBlockElementsTerm3('specialisation2Sem3SubjectList', disabledAfter)
                    this.disableBlockElementsTerm3('specialisation3Sem3SubjectList', disabledAfter)
                    this.disableBlockElementsTerm3('specialisation4Sem3SubjectList', disabledAfter)
                    this.disableBlockElementsTerm3('specialisation5Sem3SubjectList', disabledAfter)
                    this.disableBlockElementsTerm3('specialisation6Sem3SubjectList', disabledAfter)
                    this.disableBlockElementsTerm3('specialisation7Sem3SubjectList', disabledAfter)
                    this.disableBlockElementsTerm3('specialisation8Sem3SubjectList', disabledAfter)
                    if( !disableSubjectAfterTwoSelection ){
                        this.disableBlockElementsTerm3('specialisation9Sem3SubjectList', disabledAfter)
                        this.disableBlockElementsTerm3('specialisation10Sem3SubjectList', disabledAfter)
                    }
            })
        } else {
            var selectedSequence = this.state.selectedSequence
            var index = selectedSequence.indexOf(subject.sequence)
            selectedSequence.splice(index, 1)

            this.setState({
                count: this.state.count - 1,
                selectedSequence : selectedSequence
                },()=>{    
                    this.disableBlockElementsTerm3('specialisation1Sem3SubjectList', disabledAfter)
                    this.disableBlockElementsTerm3('specialisation2Sem3SubjectList', disabledAfter)
                    this.disableBlockElementsTerm3('specialisation3Sem3SubjectList', disabledAfter)
                    this.disableBlockElementsTerm3('specialisation4Sem3SubjectList', disabledAfter)
                    this.disableBlockElementsTerm3('specialisation5Sem3SubjectList', disabledAfter)
                    this.disableBlockElementsTerm3('specialisation6Sem3SubjectList', disabledAfter)
                    this.disableBlockElementsTerm3('specialisation7Sem3SubjectList', disabledAfter)
                    this.disableBlockElementsTerm3('specialisation8Sem3SubjectList', disabledAfter)
                    if( !disableSubjectAfterTwoSelection ){
                        this.disableBlockElementsTerm3('specialisation9Sem3SubjectList', disabledAfter)
                        this.disableBlockElementsTerm3('specialisation10Sem3SubjectList', disabledAfter)
                    }
                    this.checkBlock5And6ElementsForTerm3()
            }) 
        }

        this.setState({selectedSubjects: selectedSubjects});
    }

    // new logic for sem 4 electives selection
    disableBlockElementsTerm4 = (specializationSubjectListKey, count) => {
        var splSubjects = this.state[specializationSubjectListKey]
        let specialisation = this.state.specialisation
        let newSpecializationList = []
        //To disabled block after 2 selection for Single & 3 selection for Dual Specialisation
        // let count = specialisation === 'Single Specialisation' ? 1 : 2

        splSubjects.forEach((splSub) => {
            let output = {}

            let selectedSubjects = this.state.selectedSubjects
            let splSelected = selectedSubjects.some((subject) => {
                return subject.id === splSub.id && subject.specializationType === splSub.specializationType
            })

            let blockSelected = selectedSubjects.some((subject) => {
                
                    if( subject.sequence == 1 || subject.sequence == 2 ){
                        return splSub.sequence == 1 || splSub.sequence == 2
                    }else if( subject.sequence == 3 || subject.sequence == 4 ){
                        return splSub.sequence == 3 || splSub.sequence == 4
                    }else if( subject.sequence == 5 || subject.sequence == 6 ){
                        return splSub.sequence == 5 || splSub.sequence == 6
                    }else if( subject.sequence == 7 || subject.sequence == 8 ){
                        return splSub.sequence == 7 || splSub.sequence == 8
                    }else if( subject.sequence == 9 || subject.sequence == 10 ){
                        return splSub.sequence == 9 || splSub.sequence == 10
                    }

            })

            let numberOfSubjectsFromSpecializationSelected = selectedSubjects.filter((subject) => {
                
                if (specialisation === 'Single Specialisation' && count < 2) {
                    return subject.specializationType === splSub.specializationType && (subject.sequence != 9 && subject.sequence != 10)
                } else {
                    return subject.specializationType === splSub.specializationType
                }
                    
            }).length
    
            if (splSelected) {

                let subject = selectedSubjects.filter((subject) => {
                    return subject.id === splSub.id && subject.specializationType === splSub.specializationType
                })
                
                output = subject[0]
            } else {
    
                let isSubjectDiabled = blockSelected || numberOfSubjectsFromSpecializationSelected > count
    
                output = {
                    ...splSub,
                    isDisabled : isSubjectDiabled,
                    isActive : false
                }
            }

            newSpecializationList.push(output)

            this.setState({
                [specializationSubjectListKey] : newSpecializationList
            })
        })
    }

    //new logic for sem 4 electives 
    addSpecializationForSem4 = (subjectIn) => {
        
        let subject = {
            ...subjectIn,
            isDisabled : subjectIn.isAutoSelected ? true : false,
            isActive : subjectIn.isActive ? false : true
        }

        let disabledAfter = 2
        let disableSubjectAfterTwoSelection = false

        if (subject.sequence == 1 || subject.sequence == 2 ) {
            let specializationList1 = this.toggleSpecialization(this.state.specialisation1Sem4SubjectList, subject)
            let specializationList2 = this.toggleSpecialization(this.state.specialisation2Sem4SubjectList, subject)
            this.setState({
                specialisation1Sem4SubjectList : specializationList1,
                specialisation2Sem4SubjectList : specializationList2
        })
    
        }else if (subject.sequence == 3 || subject.sequence == 4 ) {
            let specializationList3 = this.toggleSpecialization(this.state.specialisation3Sem4SubjectList, subject)
            let specializationList4 = this.toggleSpecialization(this.state.specialisation4Sem4SubjectList, subject)
            this.setState({
                specialisation3Sem4SubjectList : specializationList3,
                specialisation4Sem4SubjectList : specializationList4
            })
    
        }else if (subject.sequence == 5 || subject.sequence == 6 ) {
            let specializationList5 = this.toggleSpecialization(this.state.specialisation5Sem4SubjectList, subject)
            let specializationList6 = this.toggleSpecialization(this.state.specialisation6Sem4SubjectList, subject)
            this.setState({
                specialisation5Sem4SubjectList : specializationList5,
                specialisation6Sem4SubjectList : specializationList6
            })
    
        }else if (subject.sequence == 7 || subject.sequence == 8) {
            let specializationList7 = this.toggleSpecialization(this.state.specialisation7Sem4SubjectList, subject)
            let specializationList8 = this.toggleSpecialization(this.state.specialisation8Sem4SubjectList, subject)
            this.setState({
                specialisation7Sem4SubjectList : specializationList7,
                specialisation8Sem4SubjectList : specializationList8
            })
    
        }else if (subject.sequence == 9 || subject.sequence == 10 ) {
            let specializationList9 = this.toggleSpecialization(this.state.specialisation9Sem4SubjectList, subject)
            let specializationList10 = this.toggleSpecialization(this.state.specialisation10Sem4SubjectList, subject)
            this.setState({
                specialisation9Sem4SubjectList : specializationList9,
                specialisation10Sem4SubjectList : specializationList10
            })
        }

        let selectedSubjects = this.state.selectedSubjects
        let exists = selectedSubjects.some(selectedSubjects => {
            return selectedSubjects.subject == subject.subject && selectedSubjects.specializationType == subject.specializationType
        })
           
        if (exists) {
            selectedSubjects = selectedSubjects.filter(selectedSubjects =>{
                return selectedSubjects.subject != subject.subject
            })
        }else{
            selectedSubjects.push(subject)
        }

        this.state.specialisationType.map( (specilization) => {
            
            this.state.specialisationSubjectCount.map( ( subjectCount ) => {

                if( specilization.id != 13 && this.state.specialisationType.length < 2 && 
                    specilization.id == subjectCount.specializationType && subjectCount.subjectCount < 7 ){

                    disabledAfter = 1
                    disableSubjectAfterTwoSelection = true

                }
            })
        })

        if (subject.isActive) {
            var selectedSequence = this.state.selectedSequence
            selectedSequence.push(subject.sequence)
            this.setState({
                count: this.state.count + 1,
                selectedSequence : selectedSequence

                },()=>{
                    this.disableBlockElementsTerm4('specialisation1Sem4SubjectList', disabledAfter)
                    this.disableBlockElementsTerm4('specialisation2Sem4SubjectList', disabledAfter)
                    this.disableBlockElementsTerm4('specialisation3Sem4SubjectList', disabledAfter)
                    this.disableBlockElementsTerm4('specialisation4Sem4SubjectList', disabledAfter)
                    this.disableBlockElementsTerm4('specialisation5Sem4SubjectList', disabledAfter)
                    this.disableBlockElementsTerm4('specialisation6Sem4SubjectList', disabledAfter)
                    this.disableBlockElementsTerm4('specialisation7Sem4SubjectList', disabledAfter)
                    this.disableBlockElementsTerm4('specialisation8Sem4SubjectList', disabledAfter)
                    if( !disableSubjectAfterTwoSelection ){
                        this.disableBlockElementsTerm4('specialisation9Sem4SubjectList', disabledAfter)
                        this.disableBlockElementsTerm4('specialisation10Sem4SubjectList', disabledAfter)
                    }
            })
        } else {
            var selectedSequence = this.state.selectedSequence
            var index = selectedSequence.indexOf(subject.sequence)
            selectedSequence.splice(index, 1)

            this.setState({
                count: this.state.count - 1,
                selectedSequence : selectedSequence
                },()=>{    
                    this.disableBlockElementsTerm4('specialisation1Sem4SubjectList', disabledAfter)
                    this.disableBlockElementsTerm4('specialisation2Sem4SubjectList', disabledAfter)
                    this.disableBlockElementsTerm4('specialisation3Sem4SubjectList', disabledAfter)
                    this.disableBlockElementsTerm4('specialisation4Sem4SubjectList', disabledAfter)
                    this.disableBlockElementsTerm4('specialisation5Sem4SubjectList', disabledAfter)
                    this.disableBlockElementsTerm4('specialisation6Sem4SubjectList', disabledAfter)
                    this.disableBlockElementsTerm4('specialisation7Sem4SubjectList', disabledAfter)
                    this.disableBlockElementsTerm4('specialisation8Sem4SubjectList', disabledAfter)
                    if( !disableSubjectAfterTwoSelection ){
                        this.disableBlockElementsTerm4('specialisation9Sem4SubjectList', disabledAfter)
                        this.disableBlockElementsTerm4('specialisation10Sem4SubjectList', disabledAfter)
                    }
                    this.checkBlock5And6ElementsForTerm4()
            }) 
        }


        this.setState({selectedSubjects: selectedSubjects});
    }

    addSpecializationForSem5 = (subjectIn) => {
        
        let subject = {
            ...subjectIn,
            isActive : subjectIn.isActive ? false : true
        }

        //to diabled other subject once one subject is selected from the block
        let disabledAfter = 1

        if (subject.sequence == 1 || subject.sequence == 2 ) {
            let specializationList1 = this.toggleSpecialization(this.state.specialisation1Sem5SubjectList, subject)
            let specializationList2 = this.toggleSpecialization(this.state.specialisation2Sem5SubjectList, subject)
            this.setState({
                specialisation1Sem5SubjectList : specializationList1,
                specialisation2Sem5SubjectList : specializationList2
        })
    
        }else if (subject.sequence == 3 || subject.sequence == 4 ) {
            let specializationList3 = this.toggleSpecialization(this.state.specialisation3Sem5SubjectList, subject)
            let specializationList4 = this.toggleSpecialization(this.state.specialisation4Sem5SubjectList, subject)
            this.setState({
                specialisation3Sem5SubjectList : specializationList3,
                specialisation4Sem5SubjectList : specializationList4
            })
    
        }else if (subject.sequence == 5 || subject.sequence == 6 ) {
            let specializationList5 = this.toggleSpecialization(this.state.specialisation5Sem5SubjectList, subject)
            let specializationList6 = this.toggleSpecialization(this.state.specialisation6Sem5SubjectList, subject)
            this.setState({
                specialisation5Sem5SubjectList : specializationList5,
                specialisation6Sem5SubjectList : specializationList6
            })
    
        }else if (subject.sequence == 7 || subject.sequence == 8) {
            let specializationList7 = this.toggleSpecialization(this.state.specialisation7Sem5SubjectList, subject)
            let specializationList8 = this.toggleSpecialization(this.state.specialisation8Sem5SubjectList, subject)
            this.setState({
                specialisation7Sem5SubjectList : specializationList7,
                specialisation8Sem5SubjectList : specializationList8
            })
    
        }else if (subject.sequence == 9 || subject.sequence == 10 ) {
            let specializationList9 = this.toggleSpecialization(this.state.specialisation9Sem5SubjectList, subject)
            let specializationList10 = this.toggleSpecialization(this.state.specialisation10Sem5SubjectList, subject)
            this.setState({
                specialisation9Sem5SubjectList : specializationList9,
                specialisation10Sem5SubjectList : specializationList10
            })
        }

        let selectedSubjects = this.state.selectedSubjects
        let exists = selectedSubjects.some(selectedSubjects => {
            return selectedSubjects.subject == subject.subject && selectedSubjects.specializationType == subject.specializationType
        })
           
        if (exists) {
            selectedSubjects = selectedSubjects.filter(selectedSubjects =>{
                return selectedSubjects.subject != subject.subject
            })
        }else{
            selectedSubjects.push(subject)
        }

        this.setState({selectedSubjects: selectedSubjects});
    }

    toggleSpecialization = (specializationList, subject) => {

        let newSpecializationList = []

        specializationList.forEach((specilization) => {
            let output = {}

            if(subject.id == specilization.id && subject.specializationType == specilization.specializationType ) {
                output = subject
            } else {
                output = {
                    ...specilization,
                    isDisabled : subject.isActive ? true : false,
                    isActive : false
                }
            }

            newSpecializationList.push(output)
        })

        return newSpecializationList
    }

    checkBlock5And6ElementsForTerm4 = () => {
        let isSpl5Or6Selected = this.state.selectedSubjects.some((subject) => {
            return subject.sequence == 9 || subject.sequence == 10
        })
        // if any subject from 5 or 6 is selected, then disable all other 5 or 6 subjects
        if(isSpl5Or6Selected) {
            this.toggleSplIfNotSelected('specialisation9Sem3SubjectList')
            this.toggleSplIfNotSelected('specialisation10Sem3SubjectList')
        }
    }

    //When Student Click on Back button reset there all selected subjects
    onBackResetAllSelectedSubjects = () => {

        const {specialisation1Sem3SubjectList, specialisation2Sem3SubjectList, specialisation3Sem3SubjectList, 
                specialisation4Sem3SubjectList, specialisation5Sem3SubjectList, specialisation6Sem3SubjectList,
                specialisation7Sem3SubjectList, specialisation8Sem3SubjectList, specialisation9Sem3SubjectList,
                specialisation10Sem3SubjectList} = this.state

        let resetSequence1SubjectList = this.resetFunction(specialisation1Sem3SubjectList)
        let resetSequence2SubjectList = this.resetFunction(specialisation2Sem3SubjectList)
        let resetSequence3SubjectList = this.resetFunction(specialisation3Sem3SubjectList)
        let resetSequence4SubjectList = this.resetFunction(specialisation4Sem3SubjectList)
        let resetSequence5SubjectList = this.resetFunction(specialisation5Sem3SubjectList)
        let resetSequence6SubjectList = this.resetFunction(specialisation6Sem3SubjectList)
        let resetSequence7SubjectList = this.resetFunction(specialisation7Sem3SubjectList)
        let resetSequence8SubjectList = this.resetFunction(specialisation8Sem3SubjectList)
        let resetSequence9SubjectList = this.resetFunction(specialisation9Sem3SubjectList)
        let resetSequence10SubjectList = this.resetFunction(specialisation10Sem3SubjectList)

        this.setState({
            specialisation1Sem3SubjectList : resetSequence1SubjectList,
            specialisation2Sem3SubjectList : resetSequence2SubjectList,
            specialisation3Sem3SubjectList : resetSequence3SubjectList,
            specialisation4Sem3SubjectList : resetSequence4SubjectList,
            specialisation5Sem3SubjectList : resetSequence5SubjectList,
            specialisation6Sem3SubjectList : resetSequence6SubjectList,
            specialisation7Sem3SubjectList : resetSequence7SubjectList,
            specialisation8Sem3SubjectList : resetSequence8SubjectList,
            specialisation9Sem3SubjectList : resetSequence9SubjectList,
            specialisation10Sem3SubjectList : resetSequence10SubjectList,
            selectedSubjects : []
        })
    }

    resetFunction = (subjectList) => {
        let updatedSubjectList = []
        subjectList.forEach(subject => {
            let newSubject = {
                ...subject,
                isDisabled : false,
                isActive : false,
                isPreselected : false,
                isCoreSubject : false,
                isCoreSubjectNextSem : false
            }
            updatedSubjectList.push(newSubject)
        });

        return updatedSubjectList
    }
    
    isSpecialisationDone = () => {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        return axios.post(isSpecialisationDone,
            JSON.stringify({
                "sapid": this.props.sapId
            })   
        ).then(response => {
            
            if(response.data.status == 'Applied'){

                this.setState({
                    appliedSpecialisationList : response.data.specialisationList,
                    isSpecialisationDone : true,
                    isSpecialisationDoneLoaded : true,
                    specialisation : response.data.specialisationList[0].specializationType,
                    maxTerm : response.data.maxTerm,
                    term3SelectedSubjects : response.data.term3SelectedSubjects
                })

                if (!this.state.serviceRequest) {
                    var sp1, sp2
                    let specialisationType1 = response.data.specialisation.specialisation1
                    let specialisationType2 = response.data.specialisation.specialisation2
                    let specialisation = response.data.specialisation.specializationType
                    var defaultSpecialisation = [] 

                    if (specialisation == 'Single Specialisation') {
                        this.setState({checkedId : 1})
                    }else if(specialisation == 'Dual Specialisation'){
                        this.setState({checkedId : 2})
                    }
                
                    if(specialisationType1 && !isNaN(specialisationType1)) {
                        sp1 = parseInt(specialisationType1);
                        defaultSpecialisation.push(sp1)
                    }
                    if(specialisationType2 && !isNaN(specialisationType2)) {
                        sp2 = parseInt(specialisationType2);
                        defaultSpecialisation.push(sp2)
                    }
                    
                    this.setState({
                        specialisation : specialisation,
                        maxTerm : response.data.maxTerm,
                        isSpecialisationDoneLoaded : true,
                        defaultSpecialisation : defaultSpecialisation,
                        term3SelectedSubjects : response.data.term3SelectedSubjects
                    })
                }

            }else if(response.data.status == 'Not Applied'){

                if (!this.state.serviceRequest) {
                    var sp1, sp2
                    let specialisationType1 = response.data.specialisation.specialisation1
                    let specialisationType2 = response.data.specialisation.specialisation2
                    let specialisation = response.data.specialisation.specializationType
                    var defaultSpecialisation = [] 

                    if (specialisation == 'Single Specialisation') {
                        this.setState({checkedId : 1})
                    }else if(specialisation == 'Dual Specialisation'){
                        this.setState({checkedId : 2})
                    }
                
                    if(specialisationType1 && !isNaN(specialisationType1)) {
                        sp1 = parseInt(specialisationType1);
                        defaultSpecialisation.push(sp1)
                    }
                    if(specialisationType2 && !isNaN(specialisationType2)) {
                        sp2 = parseInt(specialisationType2);
                        defaultSpecialisation.push(sp2)
                    }
                    
                    this.setState({
                        specialisation : specialisation,
                        maxTerm : response.data.maxTerm,
                        isSpecialisationDoneLoaded : true,
                        defaultSpecialisation : defaultSpecialisation,
                        term3SelectedSubjects : response.data.term3SelectedSubjects
                    })
                }else{
                    this.setState({
                        isSpecialisationDoneLoaded : true,
                        maxTerm : response.data.maxTerm
                    })
                }
                
            }else if(response.data.status == 'Not Applicable'){
                this.setState({
                    isSpecialisationDoneLoaded : true,
                    maxTerm : response.data.maxTerm
                })
            }
            // this.getSpecialisationTypes()
        }).catch((error) => {
            console.debug(error);
        })
    }

    getSpecialisationTypes = () => {
        
        axios.defaults.headers.post['Content-Type'] = false;
        return axios.post(getSpecialisationTypes, 
        ).then(response =>{
            this.setState({
                isSpecialisationLoaded: true,
                status : response.data.status,
                SpecialisationList : response.data.specialisationList
            },()=>{

                let specialisationType = []
                let specialisationList = this.state.SpecialisationList

                if( this.state.maxTerm == 4 ){

                    specialisationList = specialisationList.filter(function( specialisation ) {
                        return specialisation.id !== 13;
                    });

                }
                
                this.setState({
                    SpecialisationList : specialisationList
                })

                this.state.SpecialisationList.forEach(specialisation => {

                    if (this.state.defaultSpecialisation && this.state.defaultSpecialisation.includes(specialisation.id)) {
                        specialisationType.push({
                            id : specialisation.id,
                            specialisation : specialisation
                        })
                    }
                });
                // alert('specialisationType : '+specialisationType)
                this.setState({
                    specialisationType : specialisationType,
                    // isSpecialisationTypeLoaded : true
                })
            })
        }).catch((error) => {
            console.debug(error);
        })
    }

    //fetching specialization subjects with all applicable subject list, core subject list and pre-requisite subject list
    getSpecialisationSubject = () => {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        return axios.post(getSpecialisationSubjects,
            JSON.stringify({
            "sapid": this.props.sapId
            }) 
        ).then(response =>{

            console.debug('fetched getSpecialisationSubject')

                let autoSelectSubjects = response.data.autoSelectSubject
                let termThreeAutoSelectSubject = []
                let termFourAutoSelectSubject = []

                autoSelectSubjects.map( subject => {
                    if( subject.sem == 3)
                        termThreeAutoSelectSubject.push( subject )
                    else if( subject.sem == 4)
                        termFourAutoSelectSubject.push( subject )
                })

                this.setState({
                    isSubjectLoaded: true,
                    status : response.data.status,
                    SpecialisationSubjectList : response.data.specialisationSubjectList,
                    subjectWithPrerequisite : response.data.subjectWithPrerequisite,
                    coreSubject : response.data.coreSubject,
                    specialisationSubjectCount : response.data.specialisationSubjectCount,
                    termThreeAutoSelectSubject : termThreeAutoSelectSubject,
                    termFourAutoSelectSubject : termFourAutoSelectSubject,
                    commonSubjectList : response.data.commonSubject
                })

                this.state.SpecialisationSubjectList.forEach(subject => {
                   
                    // creating subject list based on the sequence of the subject
                    if (subject.sequence == 1) {
                        this.state.specialisation1Sem3SubjectList.push(subject)
                        this.state.specialisation1Sem4SubjectList.push(subject)
                        this.state.specialisation1Sem5SubjectList.push(subject)
                    }else if (subject.sequence == 2) {
                        this.state.specialisation2Sem3SubjectList.push(subject)
                        this.state.specialisation2Sem4SubjectList.push(subject)
                        this.state.specialisation2Sem5SubjectList.push(subject)
                    }else if (subject.sequence == 3) {
                        this.state.specialisation3Sem3SubjectList.push(subject)
                        this.state.specialisation3Sem4SubjectList.push(subject)
                        this.state.specialisation3Sem5SubjectList.push(subject)
                    }else if (subject.sequence == 4) {
                        this.state.specialisation4Sem3SubjectList.push(subject)
                        this.state.specialisation4Sem4SubjectList.push(subject)
                        this.state.specialisation4Sem5SubjectList.push(subject)
                    }else if (subject.sequence == 5) {
                        this.state.specialisation5Sem3SubjectList.push(subject)
                        this.state.specialisation5Sem4SubjectList.push(subject)
                        this.state.specialisation5Sem5SubjectList.push(subject)
                    }else if (subject.sequence == 6) {
                        this.state.specialisation6Sem3SubjectList.push(subject)
                        this.state.specialisation6Sem4SubjectList.push(subject)
                        this.state.specialisation6Sem5SubjectList.push(subject)
                    }else if (subject.sequence == 7) {
                        this.state.specialisation7Sem3SubjectList.push(subject)
                        this.state.specialisation7Sem4SubjectList.push(subject)
                        this.state.specialisation7Sem5SubjectList.push(subject)
                    }else if (subject.sequence == 8) {
                        this.state.specialisation8Sem3SubjectList.push(subject)
                        this.state.specialisation8Sem4SubjectList.push(subject)
                        this.state.specialisation8Sem5SubjectList.push(subject)
                    }else if (subject.sequence == 9) {
                        this.state.specialisation9Sem3SubjectList.push(subject)
                        this.state.specialisation9Sem4SubjectList.push(subject)
                        this.state.specialisation9Sem5SubjectList.push(subject)
                    }else if (subject.sequence == 10) {
                        this.state.specialisation10Sem3SubjectList.push(subject)
                        this.state.specialisation10Sem4SubjectList.push(subject)
                        this.state.specialisation10Sem5SubjectList.push(subject)
                    }

                });

                switch( this.state.maxTerm ){
                    //getting the updated list with missing subject for specialization and sequence
                    case 2:
                        this.getUpdatedSubjectList(this.state.specialisation1Sem3SubjectList, 1)
                        this.getUpdatedSubjectList(this.state.specialisation2Sem3SubjectList, 2)
                        this.getUpdatedSubjectList(this.state.specialisation3Sem3SubjectList, 3)
                        this.getUpdatedSubjectList(this.state.specialisation4Sem3SubjectList, 4)
                        this.getUpdatedSubjectList(this.state.specialisation5Sem3SubjectList, 5)
                        this.getUpdatedSubjectList(this.state.specialisation6Sem3SubjectList, 6)
                        this.getUpdatedSubjectList(this.state.specialisation7Sem3SubjectList, 7)
                        this.getUpdatedSubjectList(this.state.specialisation8Sem3SubjectList, 8)
                        this.getUpdatedSubjectList(this.state.specialisation9Sem3SubjectList, 9)
                        this.getUpdatedSubjectList(this.state.specialisation10Sem3SubjectList, 10)
                        break;
                    case 3:
                        this.getUpdatedSubjectList(this.state.specialisation1Sem4SubjectList, 1)
                        this.getUpdatedSubjectList(this.state.specialisation2Sem4SubjectList, 2)
                        this.getUpdatedSubjectList(this.state.specialisation3Sem4SubjectList, 3)
                        this.getUpdatedSubjectList(this.state.specialisation4Sem4SubjectList, 4)
                        this.getUpdatedSubjectList(this.state.specialisation5Sem4SubjectList, 5)
                        this.getUpdatedSubjectList(this.state.specialisation6Sem4SubjectList, 6)
                        this.getUpdatedSubjectList(this.state.specialisation7Sem4SubjectList, 7)
                        this.getUpdatedSubjectList(this.state.specialisation8Sem4SubjectList, 8)
                        this.getUpdatedSubjectList(this.state.specialisation9Sem4SubjectList, 9)
                        this.getUpdatedSubjectList(this.state.specialisation10Sem4SubjectList, 10)
                        break;
                    case 4:
                        this.getUpdatedSubjectList(this.state.specialisation1Sem5SubjectList, 1)
                        this.getUpdatedSubjectList(this.state.specialisation2Sem5SubjectList, 2)
                        this.getUpdatedSubjectList(this.state.specialisation3Sem5SubjectList, 3)
                        this.getUpdatedSubjectList(this.state.specialisation4Sem5SubjectList, 4)
                    default:
                        break;
                }
                
                this.setState({
                    isSpecialisationTypeLoaded : true
                })
            }).catch((error) => {
                console.debug(error);
            })
    }

    getUpdatedSubjectList = (subjectList, sequence) =>{
    
        let subject;

        this.state.SpecialisationList.map( specialization => {
            
            //checking if a subject is present for a particular specialization, if not pussing a subject with empty name and sequence
            // for that subjectlist
            if( !this.checkIfSubjectPresentForSpecialization( specialization, subjectList ) ){
                subject = {
                    subject : "",
                    sequence : sequence,
                    specializationType : specialization.id
                }
                
                subjectList.push(subject)
                
            }
        })

        //sorting the subjects based on the specialization type to display it properly 
        subjectList = this.sortSubjectListBasedOnSpecialization(subjectList)

        switch( sequence ){
            case 1:
                this.setState({
                    specialisation1Sem3SubjectList : subjectList,
                    specialisation1Sem4SubjectList : subjectList
                })
                break;
            case 2:
                this.setState({
                    specialisation2Sem3SubjectList : subjectList,
                    specialisation2Sem4SubjectList : subjectList
                })
                break;
            case 3:
                this.setState({
                    specialisation3Sem3SubjectList : subjectList,
                    specialisation3Sem4SubjectList : subjectList
                })
                break;
            case 4:
                this.setState({
                    specialisation4Sem3SubjectList : subjectList,
                    specialisation4Sem4SubjectList : subjectList
                })
                break;
            case 5:
                this.setState({
                    specialisation5Sem3SubjectList : subjectList,
                    specialisation5Sem4SubjectList : subjectList
                })
                break;
            case 6:
                this.setState({
                    specialisation6Sem3SubjectList : subjectList,
                    specialisation6Sem4SubjectList : subjectList
                })
                break;
            case 7:
                this.setState({
                    specialisation7Sem3SubjectList : subjectList,
                    specialisation7Sem4SubjectList : subjectList
                })
                break;
            case 8:
                this.setState({
                    specialisation8Sem3SubjectList : subjectList,
                    specialisation8Sem4SubjectList : subjectList
                })
                break;
            case 9:
                this.setState({
                    specialisation9Sem3SubjectList : subjectList,
                    specialisation9Sem4SubjectList : subjectList
                })
                break;
            case 10:
                this.setState({
                    specialisation10Sem3SubjectList : subjectList,
                    specialisation10Sem4SubjectList : subjectList
                })
                break;
        }
    }

    checkIfSubjectPresentForSpecialization = ( specialization, subjectList) => {

        const found = subjectList.some( subject => subject.specializationType == specialization.id )
        return found

    }

    sortSubjectListBasedOnSpecialization = (subjectList) => {

        const soretedSubjectList = [].concat( subjectList )
        .sort((a, b) => parseInt(a.specializationType) > parseInt(b.specializationType) ? 1 : -1)
        return soretedSubjectList;

    }

    savesaveSpecialisationToDB = (saveToDB) => {
        
        axios.defaults.headers.post['Content-Type'] = 'application/json'; 
        return axios.post(saveStudentSpecialisationSubjects,
            JSON.stringify(saveToDB)
        ).then( response => {
            if(response.data.status == 'Success'){
                this.setState({
                    savedDetails : true,
                    savingDetails: false
                }, () => {
                    if(!this.state.savingDetails){
                       if (this.state.savedDetails) {
                            this.setState({error:false})
                        } else{
                            this.setState({error:true})
                        }
                    }
                })
            }else{
                this.setState({
                    savingDetails: false,
                    savedDetails : false,
                    error:true
                })
            }
            
        }).catch((error) => {
            console.debug(error);
        })
    }

    componentDidMount(){
        
        try{
            if(typeof this.props.isReSelect === 'undefined'){
                if(this.props){
                    this.setState({
                        serviceRequest: this.props.serviceRequest
                    })
                }
            }
        }catch(error){
            console.debug('in sr', error)
        }
       
        this.isSpecialisationDone().then(success =>{
            this.getSpecialisationTypes().then(success =>{
                this.getSpecialisationSubject().then(success =>{
                    // alert('Finish Api call')
                    if(this.props.isReSelect){
                        this.setState({
                            isSpecialisationDone : false,
                            isReSelect : true
                        })
                    }
                })
            })
        })
    }

    render(){
        
        const {step} = this.state;
        
        const { specialisation, appliedSpecialisationList, isSpecialisationLoaded, SpecialisationList, specialisationType, 
                //For Subject
                SpecialisationSubjectList, specialisationSubjects,checkedId,
                specialisation1SubjectList, specialisation2SubjectList, specialisation3SubjectList, specialisation4SubjectList,specialisation5SubjectList, specialisation6SubjectList,
                specialisation1Sem3SubjectList, specialisation2Sem3SubjectList, specialisation3Sem3SubjectList, specialisation4Sem3SubjectList,specialisation5Sem3SubjectList, specialisation6Sem3SubjectList,
                specialisation7Sem3SubjectList,specialisation8Sem3SubjectList,specialisation9Sem3SubjectList,specialisation10Sem3SubjectList,
                specialisation1Sem4SubjectList, specialisation2Sem4SubjectList, specialisation3Sem4SubjectList, specialisation4Sem4SubjectList,specialisation5Sem4SubjectList, specialisation6Sem4SubjectList,
                specialisation7Sem4SubjectList,specialisation8Sem4SubjectList,specialisation9Sem4SubjectList,specialisation10Sem4SubjectList,
                specialisation1Sem5SubjectList, specialisation2Sem5SubjectList, specialisation3Sem5SubjectList, specialisation4Sem5SubjectList,specialisation5Sem5SubjectList, specialisation6Sem5SubjectList,
                specialisation7Sem5SubjectList,specialisation8Sem5SubjectList,specialisation9Sem5SubjectList,specialisation10Sem5SubjectList,
                selectedSubjects , serviceRequest,term3SelectedSubjects,maxTerm, isReSelect, showReSelect,
                subjectWithPrerequisite, coreSubject, specialisationSubjectCount, termThreeAutoSelectSubject, termFourAutoSelectSubject, commonSubjectList } = this.state;
        
        const values = { specialisation, appliedSpecialisationList, isSpecialisationLoaded, SpecialisationList, specialisationType, 
                         //For Subject
                         SpecialisationSubjectList, specialisationSubjects,checkedId,
                         specialisation1SubjectList, specialisation2SubjectList, specialisation3SubjectList, specialisation4SubjectList, specialisation5SubjectList, specialisation6SubjectList ,
                         specialisation1Sem3SubjectList, specialisation2Sem3SubjectList, specialisation3Sem3SubjectList, specialisation4Sem3SubjectList,specialisation5Sem3SubjectList, specialisation6Sem3SubjectList,
                         specialisation7Sem3SubjectList,specialisation8Sem3SubjectList,specialisation9Sem3SubjectList,specialisation10Sem3SubjectList,
                         specialisation1Sem4SubjectList, specialisation2Sem4SubjectList, specialisation3Sem4SubjectList, specialisation4Sem4SubjectList,specialisation5Sem4SubjectList, specialisation6Sem4SubjectList,
                         specialisation7Sem4SubjectList,specialisation8Sem4SubjectList,specialisation9Sem4SubjectList,specialisation10Sem4SubjectList,
                         specialisation1Sem5SubjectList, specialisation2Sem5SubjectList, specialisation3Sem5SubjectList, specialisation4Sem5SubjectList,specialisation5Sem5SubjectList, specialisation6Sem5SubjectList,
                         specialisation7Sem5SubjectList,specialisation8Sem5SubjectList,specialisation9Sem5SubjectList,specialisation10Sem5SubjectList,
                         selectedSubjects , serviceRequest, term3SelectedSubjects, maxTerm, step, isReSelect, showReSelect,
                         subjectWithPrerequisite, coreSubject, specialisationSubjectCount, termThreeAutoSelectSubject, termFourAutoSelectSubject, commonSubjectList };
        
        if (this.state.isSpecialisationDoneLoaded && this.state.SpecialisationList) {
            if (this.state.isSpecialisationDone && !serviceRequest && !isReSelect) {
                return (
                    <SpecialisationHome 
                    isReSelect = {this.state.isReSelect}
                    showReSelect = {this.state.showReSelect}
                    sapId={this.props.sapId}
                    values={values}
                    />
                )
            }else{
                    return (
                        <StepperPage 
                        step = {step}
                        maxTerm = {this.state.maxTerm}
                        serviceRequest = {serviceRequest}
                        getStepContents = {this.getStepContents}
                        />
    
                    )
                }
            
        }else{
            return(
                <Card className="mx-auto text-center p-2">
                    <LoadingSpinner noSpace loadingText={'Fetching Details...'}/>
                </Card>
            )
        }
    }

    preSelectCoreSubject = (subject) => {

        let term = 0
        let nextTerm = 0
        let updatedSubject = subject
        let sequence = 0
        let selectedCoreSubject = false

        //setting term and next term for the student 
        if( this.state.maxTerm == 2 ){
                term = 3;
                nextTerm = 4 
        }else if( this.state.maxTerm == 3 ){
                term = 4;
        }

        let found = this.state.specialisationType.some ( specialization => specialization.id == 9 ) &&
                    this.state.specialisationType.some ( specialization => specialization.id == 13 )
        
        if( !found ){

            this.state.coreSubject.map( (coreSubject) => {

                this.state.specialisationType.map( (specialization) => {

                    if( coreSubject.specializationType == specialization.id && coreSubject.sem == term ){
    
                        sequence = coreSubject.sequence
                        this.state.specialisationType.map( (specialization) => {
                
                            this.state.coreSubject.map( (coreSubject) => {
                
                                //pre-selecting a subject is the subject has the same core subjects for the same specialization type and sem
                                if( subject.id == coreSubject.id && coreSubject.sem == term && 
                                    coreSubject.specializationType == subject.specializationType && 
                                    coreSubject.specializationType == specialization.id ){
                                    
                                    selectedCoreSubject= true
                                    updatedSubject = {
                                        ...subject,
                                        isCoreSubject : true,
                                        isDisabled : true
                                    }
    
                                    //updating the selected subject list if the subject isn't already present in the list
                                    if( !this.checkIfSubjectPresentInSelectedSubject( this.state.selectedSubjects, updatedSubject ) ){
                                        this.state.selectedSubjects.push(updatedSubject)
                                    }
                
                                }
                                //disabling subjects in the same block in which the subject has been selected from 
                                //eg: if the subject is selected from block 2, disabling subjects from sequence 1 and 2
                                else if( subject.id == coreSubject.id && coreSubject.sem == nextTerm && 
                                    coreSubject.specializationType == specialization.id &&
                                    coreSubject.specializationType == subject.specializationType ){
                                        updatedSubject = {
                                            ...subject,
                                            isDisabled : true,
                                            isCoreSubjectNextSem : true
                                        }
                                }else if( subject.id != coreSubject.id && !selectedCoreSubject ){
                                    
                                    if( (sequence == 1 || sequence == 2 ) && ( subject.sequence == 1 || subject.sequence == 2 ) ){
                                        updatedSubject = {
                                            ...subject,
                                            isDisabled : true
                                        }
                                    }else if( (sequence == 3 || sequence == 4 ) && ( subject.sequence == 3 || subject.sequence == 4 ) ){
                                        updatedSubject = {
                                            ...subject,
                                            isDisabled : true
                                        }
                                    }else if( (sequence == 5 || sequence == 6 ) && ( subject.sequence == 5 || subject.sequence == 6 ) ){
                                        updatedSubject = {
                                            ...subject,
                                            isDisabled : true
                                        }
                                    }else if( (sequence == 7 || sequence == 8 ) && ( subject.sequence == 7 || subject.sequence == 8 ) ){
                                        updatedSubject = {
                                            ...subject,
                                            isDisabled : true
                                        }
                                    }else if( (sequence == 9 || sequence == 10 ) && ( subject.sequence == 9 || subject.sequence == 10 ) ){
                                        updatedSubject = {
                                            ...subject,
                                            isDisabled : true
                                        }
                                    }
                                }
                            })
                    
                        })
                    }
                })
            })

        }
        

        return updatedSubject
    }

    checkIfSubjectPresentInSelectedSubject = ( selectedSubjectList, subject ) => {

        const found = selectedSubjectList.some( selectedSubject => subject.id == selectedSubject.id )
        return found

    }

    getStepContents = () => {

        const {step} = this.state;
        
        const { specialisation, appliedSpecialisationList, isSpecialisationLoaded, SpecialisationList, specialisationType, 
                //For Subject
                SpecialisationSubjectList, specialisationSubjects,checkedId,
                specialisation1SubjectList, specialisation2SubjectList, specialisation3SubjectList, specialisation4SubjectList,specialisation5SubjectList, specialisation6SubjectList,
                specialisation1Sem3SubjectList, specialisation2Sem3SubjectList, specialisation3Sem3SubjectList, specialisation4Sem3SubjectList,specialisation5Sem3SubjectList, specialisation6Sem3SubjectList,
                specialisation7Sem3SubjectList,specialisation8Sem3SubjectList,specialisation9Sem3SubjectList,specialisation10Sem3SubjectList,
                specialisation1Sem4SubjectList, specialisation2Sem4SubjectList, specialisation3Sem4SubjectList, specialisation4Sem4SubjectList,specialisation5Sem4SubjectList, specialisation6Sem4SubjectList,
                specialisation7Sem4SubjectList,specialisation8Sem4SubjectList,specialisation9Sem4SubjectList,specialisation10Sem4SubjectList,
                specialisation1Sem5SubjectList, specialisation2Sem5SubjectList, specialisation3Sem5SubjectList, specialisation4Sem5SubjectList,specialisation5Sem5SubjectList, specialisation6Sem5SubjectList,
                specialisation7Sem5SubjectList,specialisation8Sem5SubjectList,specialisation9Sem5SubjectList,specialisation10Sem5SubjectList,
                selectedSubjects, serviceRequest,term3SelectedSubjects, maxTerm, isReSelect, showReSelect,
                subjectWithPrerequisite, coreSubject, specialisationSubjectCount, termThreeAutoSelectSubject, termFourAutoSelectSubject, commonSubjectList } = this.state;
        
        const values = { 
                specialisation, appliedSpecialisationList, isSpecialisationLoaded, SpecialisationList, specialisationType, 
                //For Subject
                SpecialisationSubjectList, specialisationSubjects,checkedId,
                specialisation1SubjectList, specialisation2SubjectList, specialisation3SubjectList, specialisation4SubjectList, specialisation5SubjectList, specialisation6SubjectList ,
                specialisation1Sem3SubjectList, specialisation2Sem3SubjectList, specialisation3Sem3SubjectList, specialisation4Sem3SubjectList,specialisation5Sem3SubjectList, specialisation6Sem3SubjectList,
                specialisation7Sem3SubjectList,specialisation8Sem3SubjectList,specialisation9Sem3SubjectList,specialisation10Sem3SubjectList,
                specialisation1Sem4SubjectList, specialisation2Sem4SubjectList, specialisation3Sem4SubjectList, specialisation4Sem4SubjectList,specialisation5Sem4SubjectList, specialisation6Sem4SubjectList,
                specialisation7Sem4SubjectList,specialisation8Sem4SubjectList,specialisation9Sem4SubjectList,specialisation10Sem4SubjectList,
                specialisation1Sem5SubjectList, specialisation2Sem5SubjectList, specialisation3Sem5SubjectList, specialisation4Sem5SubjectList,specialisation5Sem5SubjectList, specialisation6Sem5SubjectList,
                specialisation7Sem5SubjectList,specialisation8Sem5SubjectList,specialisation9Sem5SubjectList,specialisation10Sem5SubjectList,
                selectedSubjects, serviceRequest, term3SelectedSubjects, maxTerm, step, isReSelect, showReSelect,
                subjectWithPrerequisite, coreSubject, specialisationSubjectCount, termThreeAutoSelectSubject, termFourAutoSelectSubject, commonSubjectList };
        
        //If serviceRequest then show Specialisation and SpecialisationTypes pages for selection
        if(serviceRequest){
            switch(step) {
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
                            specialisationType={specialisationType}
                            />
    
                case 3:
                    return <SpecialisationSubjectsForSem3
                            values={values}
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            addSpecializationForSem3 = {this.addSpecializationForSem3}
                            preSelectCoreSubject = {this.preSelectCoreSubject}
                            autoSelectSubjectForSpecialization = {this.autoSelectSubjectForSpecialization}
                            onBackResetAllSelectedSubjects = {this.onBackResetAllSelectedSubjects}
                        />
                case 4:
                    return <ConfirmationPage 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            values={values}
                            sapid={this.props.sapId}
                            savesaveSpecialisationToDB={this.savesaveSpecialisationToDB}
                            />
                case 5:
                    if (this.state.savedDetails && !this.state.error) {
                        return <Success 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            values={values}
                            isSpecialisationDone={this.isSpecialisationDone}
                            />
                    }else if (!this.state.savedDetails && this.state.error){
                        return <Error 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            values={values}
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
                    
                case 6:
                    return <SpecialisationHome
                            isReSelect = {false}
                            showReSelect = {false}
                            sapId={this.props.sapId}
                            values={values}
                            />
                }
            }else{
                //Show Elective selection page directly to the students if not Specialisation Service request
                switch(step) {
                    case 1:
                        if (this.state.isSpecialisationTypeLoaded) {

                            if(this.state.maxTerm === 2){

                                return <SpecialisationSubjectsForSem3
                                    values={values}
                                    nextStep={this.nextStep}
                                    prevStep={this.prevStep}
                                    addSpecializationForSem3 = {this.addSpecializationForSem3}
                                    preSelectCoreSubject = {this.preSelectCoreSubject}
                                    autoSelectSubjectForSpecialization = {this.autoSelectSubjectForSpecialization}
                                />

                            }else if(this.state.maxTerm === 3){

                                return <SpecialisationSubjectsForSem4
                                    values={values}
                                    nextStep={this.nextStep}
                                    prevStep={this.prevStep}
                                    addSpecializationForSem4 = {this.addSpecializationForSem4}
                                    preSelectCoreSubject = {this.preSelectCoreSubject}
                                    autoSelectSubjectForSpecialization = {this.autoSelectSubjectForSpecialization}
                                />

                            }else if(this.state.maxTerm === 4){

                                return <SpecialisationSubjectsForSem5
                                    values={values}
                                    nextStep={this.nextStep}
                                    prevStep={this.prevStep}
                                    addSpecializationForSem5 = {this.addSpecializationForSem5}
                                    /*
                                    not in use current as no core subject or auto selected subject in sem five
                                    preSelectCoreSubject = {this.preSelectCoreSubject}
                                    autoSelectSubjectForSpecialization = {this.autoSelectSubjectForSpecialization}
                                    */
                                />

                            }else{

                                console.debug('checking if this works')
                                return(
                                    <Card>
                                        <Card.Body>
                                            <h6>Specialization Subjects are not applicable to you. </h6>
                                        </Card.Body>
                                    </Card>
                                )

                            }
                            
                        } else {
                            return(
                                <Card className="mx-auto text-center p-2">
                                    <LoadingSpinner noSpace loadingText={'Fetching Details....'}/>
                                </Card>
                            )
                        }
            
                    case 2:
                        return <ConfirmationPage 
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                values={values}
                                sapid={this.props.sapId}
                                savesaveSpecialisationToDB={this.savesaveSpecialisationToDB}
                                />
                    case 3:
                        if (this.state.savedDetails && !this.state.error) {
                            return <Success 
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                values={values}
                                isSpecialisationDone={this.isSpecialisationDone}
                                />
                        }else if (!this.state.savedDetails && this.state.error){
                            return <Error 
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                values={values}
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
                        
                    case 4:
                        return <SpecialisationHome 
                                sapId={this.props.sapId}
                                savedDetails = {this.state.savedDetails}
                                error = {this.state.error}
                                isReSelect = {false}
                                showReSelect = {false}
                                values={values}
                                />
                    }
                }
            
        
    }
}

const mapStateToProps = state => {
    return {
         sapId: state.sapid
    }
}

export default connect(mapStateToProps)(CourseSpecialisationMain) 