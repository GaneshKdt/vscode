import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { API } from '../../shared/config';
import './Specialisation.css'
import StepperPage from './StepperPage'
import { Button } from 'react-bootstrap';
import TermThreeSpecializationSelection from './TermThreeSpecializationSelection'
import TermFourSpecializationSelection from './TermFourSpecializationSelection'
import TermFiveSpecializationSelection from './TermFiveSpecializationSelection'
import SpecializationConfirmation from './SpecializationConfirmation'
import SpecializationGuidelines from './SpecializationGuidelines';
import Specialization from './Specialization'
import SpecialisationTypes from './SpecializationType'
import Success from './Success'
import Error from './Error'
import SpecialisationOverview from './SpecialisationOverview'

const fetchBlockDetails = API.fetchBlockDetails
const getSpecialisationTypes  = API.getSpecialisationTypes
const fetchStudentDetailsForSpecialization = API.fetchStudentDetailsForSpecialization
const saveSpecializationForStudent = API.saveSpecializationForStudent
const fetchSpecializationIfAlreadyOptedin = API.fetchSpecializationIfAlreadyOptedin

class SpecializationSelection extends Component {
    
    constructor(props) {
        super(props)
        let isServiceRequest = this.props.isServiceRequest ? this.props.isServiceRequest : false
        this.state = {
            sapid : this.props.sapId,
            studentsSpecialization : [],
            specializationList : [],
            termThreeSubject : [],
            termFourSubject : [],
            termFiveSubject : [],
            isFetching : true,
            selectedTermThreeSubjects : [],
            selectedTermFourSubjects : [],
            selectedTermFiveSubjects : [],
            errorInSaving : true,
            isReSelect : false,
            studentsOptedinSpecialization : [],
            isSpecializationOptedIn : false,
            isServiceRequest : isServiceRequest,
            step: isServiceRequest ? 6 : 1,
            specialization : null,
            specializationTypeName : null,
            specializationType : null,
        } 
    }

    fetchStudentDetailsForSpecialization = async () =>{

        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(fetchStudentDetailsForSpecialization,
            JSON.stringify({
                "sapid": this.state.sapid
            })   
        ).then(response => {
            let specializations = []
            if(response.data.specialisation1 && response.data.specialisation1.trim() != "")
                specializations.push(response.data.specialisation1)
            if(response.data.specialisation2 && response.data.specialisation2.trim() != "")
                specializations.push(response.data.specialisation2)
            
            this.setState({
                studentsSpecialization : specializations,
                specializationTypeName : response.data.specializationType,
                specializationType : specializations.length > 1 ? 'Dual Specialization' : 'Single Specialization'
            })
        }).catch((error) => {
            console.debug(error);
        })
        
    }

    fetchSpecializationIfAlreadyOptedin = async () => {

        const selectedSubjects = []
        const selectedTermThreeSubjects = []
        const selectedTermFourSubjects = []
        const selectedTermFiveSubjects = []

        axios.defaults.headers.post['Content-Type'] = 'application/json';
        
        await axios.post(fetchSpecializationIfAlreadyOptedin,
            JSON.stringify({
                "userId": this.state.sapid
            })   
        ).then(response => {
            
            if(response.data.length >= 12 ){
                response.data.map(subject => {
                    if(subject.sem == 3)
                        selectedTermThreeSubjects.push(subject)
                    else if(subject.sem == 4)
                        selectedTermFourSubjects.push(subject)
                    else if(subject.sem == 5)
                        selectedTermFiveSubjects.push(subject)
                    
                    selectedSubjects.push(subject)
                })
    
                this.setState({
                    selectedTermThreeSubjects       : selectedTermThreeSubjects,
                    selectedTermFourSubjects        : selectedTermFourSubjects,
                    selectedTermFiveSubjects        : selectedTermFiveSubjects,
                    studentsOptedinSpecialization   : selectedSubjects,
                    isSpecializationOptedIn         : true
                })
            }

        }).catch((error) => {
            console.debug(error);
        })
        
    }

    fetchBlocksForUI  = async () => {

        axios.defaults.headers.post['Content-Type'] = 'application/json';

        try {
            const response = await axios.post(fetchBlockDetails
            );
            const result = Object.values(response.data);
            result.map((item, index) => {
                switch (index) {
                    case 0:
                        this.setState({
                            termThreeSubject: item,
                        });
                        break;
                    case 1:
                        this.setState({
                            termFourSubject: item,
                        });
                        break;
                    case 2:
                        this.setState({
                            termFiveSubject: item,
                        });
                        break;
                }
            });
        } catch (error) {
            console.debug(error);
        }

    }

    fetchSpecializationTypes = async () => {

        axios.defaults.headers.post['Content-Type'] = 'application/json';

        try {
            const response = await axios.post(getSpecialisationTypes
            );
            this.setState({
                specializationList: response.data.specialisationList
            });
        } catch (error) {
            console.debug(error);
        }

    }

    handleBlockStateChange = (subject) => {
        
        if(subject.isSelected){
            this.handleSelection(subject, false)
        } else{ 
            this.handleSelection(subject, true)
        }

    }

    handleSelection = async (subject, status) => {
        /* select/deselect the subject that the user clicks on */
        this.handleInstanceSelection(subject, status).then(success => {
            /* enable/disable the subjects that have pre-requisite  */
            this.handlePrerequisiteState(subject, !status).then(success => {
                /* enable/disable subjects that are common in two specializations */
                this.handleCommonSubjectState(subject, status).then(success =>{
                    /* select/deselect the same subject from other temrs, for selection representation */
                    this.handleStateOfSameInstancesFromOtherSem(subject,status).then(success => {
                        /* disable blocks in case a subjects has been selected from the same block */
                        this.handleBlockDisablingPostInstanceSelectionInOtherTerm().then(success => {
                            /* enable/disable other blocks */
                            this.handleBlockStatePostAction()
                        })
                    })
                })
            })
        })
    }

    handleInstanceSelection =  async (subject, status) => {
        /* select/deselect the option that was selected and update in state */
        switch(subject.sem){
            case 3:
                this.setState({
                    termThreeSubject: this.state.termThreeSubject.map(element => {
                        return element.program_sem_subject_id == subject.program_sem_subject_id && 
                            element.specialization == subject.specialization && element.sem == subject.sem ? 
                            Object.assign({}, element, { ...element, isSelected : status }) : element
                    })
                });
                break;
            case 4:
                this.setState({
                    termFourSubject: this.state.termFourSubject.map(element => {
                        return element.program_sem_subject_id == subject.program_sem_subject_id && 
                        element.specialization == subject.specialization && element.sem == subject.sem ? 
                            Object.assign({}, element, { ...element, isSelected : status }) : element
                    })
                });
                break;
            case 5:
                this.setState({
                    termFiveSubject: this.state.termFiveSubject.map(element => {
                        return element.program_sem_subject_id == subject.program_sem_subject_id && 
                        element.specialization == subject.specialization && element.sem == subject.sem ? 
                            Object.assign({}, element, { ...element, isSelected : status }) : element
                    })
                });
                break;
        }
    }

    handleBlockStateOnInstanceSelection = async (subject, status) => {
    
        /* enable/disable subject if any instance is selected from the block */
        switch(subject.sem){
            case 3:
                this.setState({
                    termThreeSubject: this.state.termThreeSubject.map(element => {
                        return element.sem == subject.sem && element.block == subject.block && 
                            !element.isSelected && !element.isDisabledAsCommonSubject ? 
                        Object.assign({}, element, { ...element, isDisabled : status}) : element
                    })
                });
                break;
            case 4:
                this.setState({
                    termFourSubject: this.state.termFourSubject.map(element => {
                        return element.sem == subject.sem && element.block == subject.block && 
                            !element.isSelected && !element.isDisabledAsCommonSubject ? 
                        Object.assign({}, element, { ...element, isDisabled : status }) : element
                    })
                });
                break;
            case 5:
                this.setState({
                    termFiveSubject: this.state.termFiveSubject.map(element => {
                        return element.sem == subject.sem && element.block == subject.block && 
                            !element.isSelected && !element.isDisabledAsCommonSubject ? 
                        Object.assign({}, element, { ...element, isDisabled : status }) : element
                    })
                });
                break;
        }

    }

    handleCommonSubjectState = async (subject, status) => {

        /* enable/disable common subjects from specialziations */
        this.setState({
            termThreeSubject: this.state.termThreeSubject.map(element => {
                return element.program_sem_subject_id == subject.program_sem_subject_id &&
                element.specialization != subject.specialization ? 
                Object.assign({}, element, { ...element, isDisabled : status, isDisabledAsCommonSubject : status }) : element
            }),
            termFourSubject: this.state.termFourSubject.map(element => {
                return element.program_sem_subject_id == subject.program_sem_subject_id &&
                element.specialization != subject.specialization  ? 
                Object.assign({}, element, { ...element, isDisabled : status, isDisabledAsCommonSubject : status }) : element
            }),
            termFiveSubject: this.state.termFiveSubject.map(element => {
                return element.program_sem_subject_id == subject.program_sem_subject_id &&
                element.specialization != subject.specialization ? 
                Object.assign({}, element, { ...element, isDisabled : status, isDisabledAsCommonSubject : status }) : element
            })
        });

    }

    handleStateOfSameInstancesFromOtherSem = async (subject, status) =>{
    
        /* select and disable the same subject from other blocks for term 4 and term 5 */
        switch(subject.sem){
            case 3:
                this.setState({
                    termFourSubject: this.state.termFourSubject.map(element => {
                        return element.program_sem_subject_id == subject.program_sem_subject_id &&
                            element.specialization == subject.specialization && !subject.isDisabled ? 
                        Object.assign({}, element, { ...element, isDisabled : status, isOtherSemSelectedSub : status }) : element
                    }),
                    termFiveSubject: this.state.termFiveSubject.map(element => {
                        return element.program_sem_subject_id == subject.program_sem_subject_id &&
                            element.specialization == subject.specialization && !subject.isDisabled ? 
                        Object.assign({}, element, { ...element, isDisabled : status, isOtherSemSelectedSub : status }) : element
                    })
                });
                break;
            case 4:
                this.setState({
                    termThreeSubject: this.state.termThreeSubject.map(element => {
                        return element.program_sem_subject_id == subject.program_sem_subject_id &&
                            element.specialization == subject.specialization && !subject.isDisabled ? 
                        Object.assign({}, element, { ...element, isDisabled : status, isOtherSemSelectedSub : status }) : element
                    }),
                    termFiveSubject: this.state.termFiveSubject.map(element => {
                        return element.program_sem_subject_id == subject.program_sem_subject_id &&
                            element.specialization == subject.specialization && !subject.isDisabled ? 
                        Object.assign({}, element, { ...element, isDisabled : status, isOtherSemSelectedSub : status }) : element
                    })
                });
                break;
            case 5:
                this.setState({
                    termThreeSubject: this.state.termThreeSubject.map(element => {
                        return element.program_sem_subject_id == subject.program_sem_subject_id &&
                            element.specialization == subject.specialization && !subject.isDisabled ? 
                        Object.assign({}, element, { ...element, isDisabled : status, isOtherSemSelectedSub : status }) : element
                    }),
                    termFourSubject: this.state.termFourSubject.map(element => {
                        return element.program_sem_subject_id == subject.program_sem_subject_id &&
                            element.specialization == subject.specialization && !subject.isDisabled ? 
                        Object.assign({}, element, { ...element, isDisabled : status, isOtherSemSelectedSub : status }) : element
                    })
                });
                break;
        }
    
    }

    handlePrerequisiteState = async (subject, status) =>{

        /* enable/disable prerequisites */
        this.handleSubjectPostPrerequisiteSelection(subject, status).then(success => {
            this.handleInstancePostPrerequisiteDeselection(subject, status)
        })

    }

    handleSubjectPostPrerequisiteSelection = async (subject, status) =>{

        this.setState({
            termThreeSubject: this.state.termThreeSubject.map(element => (
                    element.prerequisite == subject.program_sem_subject_id && element.isSelected ?
                    Object.assign({}, element, { ...element, hasPrerequisite : status, isSelected : !element.isSelected }) :
                    element.prerequisite == subject.program_sem_subject_id && element.sem > subject.sem ?
                    Object.assign({}, element, { ...element, hasPrerequisite : status, isDisabled : status }) :
                    element)),
            termFourSubject: this.state.termFourSubject.map(element => (
                    element.prerequisite == subject.program_sem_subject_id && element.isSelected ?
                    Object.assign({}, element, { ...element, hasPrerequisite : status, isSelected : !element.isSelected }) :
                    element.prerequisite == subject.program_sem_subject_id && element.sem > subject.sem ?
                    Object.assign({}, element, { ...element, hasPrerequisite : status, isDisabled : status }) :
                    element)),
            termFiveSubject: this.state.termFiveSubject.map(element => (
                    element.prerequisite == subject.program_sem_subject_id && element.isSelected ?
                    Object.assign({}, element, { ...element, hasPrerequisite : status, isSelected : !element.isSelected }) :
                    element.prerequisite == subject.program_sem_subject_id && element.sem > subject.sem ?
                    Object.assign({}, element, { ...element, hasPrerequisite : status, isDisabled : status }) :
                    element)),
        });

    }

    handleInstancePostPrerequisiteDeselection = (subject, status) =>{
        
        this.setState({
            termThreeSubject: this.state.termThreeSubject.map(element => { 
                return element.prerequisite == subject.program_sem_subject_id && !element.isSelected && element.sem > subject.sem ? 
                Object.assign({}, element, { ...element, hasPrerequisite : status, isOtherSemSelectedSub : false }) :
                element.prerequisite == subject.program_sem_subject_id && element.isOtherSemSelectedSub ? 
                Object.assign({}, element, { ...element, hasPrerequisite : true, isOtherSemSelectedSub : false }) :
                element
            }),
            termFourSubject: this.state.termFourSubject.map(element => { 
                return element.prerequisite == subject.program_sem_subject_id && !element.isSelected && element.sem > subject.sem ? 
                Object.assign({}, element, { ...element, hasPrerequisite : status, isOtherSemSelectedSub : false }) :
                element.prerequisite == subject.program_sem_subject_id && element.isOtherSemSelectedSub ? 
                Object.assign({}, element, { ...element, hasPrerequisite : true, isOtherSemSelectedSub : false }) :
                element
            }),
            termFiveSubject: this.state.termFiveSubject.map(element => { 
                return element.prerequisite == subject.program_sem_subject_id && !element.isSelected && element.sem > subject.sem ? 
                Object.assign({}, element, { ...element, hasPrerequisite : status, isOtherSemSelectedSub : false }) :
                element.prerequisite == subject.program_sem_subject_id && element.isOtherSemSelectedSub ? 
                Object.assign({}, element, { ...element, hasPrerequisite : true, isOtherSemSelectedSub : false }) :
                element
            }),
        })
        
    }

    handleBlockStatePostAction = () =>{
        
        this.handleInstanceStateForTermThree().then(success => {
            this.handleInstanceStateForTermFour().then(success => {
                this.handleInstanceStateForTermFive()
            })
        })

    }

    handleInstanceStateForTermThree = async () => {

        let updatedTermThreeSubject = []

        let blockOneSubjects = this.state.termThreeSubject.filter(element => element.block == 0)
        let blockTwoSubjects = this.state.termThreeSubject.filter(element => element.block == 1)

        if(!blockOneSubjects.some(element => element.isSelected))
            blockOneSubjects = blockOneSubjects.map(element => {
                return !element.isDisabledAsCommonSubject ? Object.assign({}, element, { ...element, isDisabled : false }) : element
            })

        if(!blockTwoSubjects.some(element => element.isSelected))
            blockTwoSubjects = blockTwoSubjects.map(element => {
                return !element.isDisabledAsCommonSubject ? Object.assign({}, element, { ...element, isDisabled : false }) : element
            })

        blockOneSubjects.map(element => updatedTermThreeSubject.push(element))
        blockTwoSubjects.map(element => updatedTermThreeSubject.push(element))

        this.setState({
            termThreeSubject : updatedTermThreeSubject,
        })

    }

    handleInstanceStateForTermFour = async () => {

        let updatedTermFourSubject = []

        let blockOneSubjects = this.state.termFourSubject.filter(element => element.block == 0)
        let blockTwoSubjects = this.state.termFourSubject.filter(element => element.block == 1)
        let blockThreeSubjects = this.state.termFourSubject.filter(element => element.block == 2)
        let blockFourSubjects = this.state.termFourSubject.filter(element => element.block == 3)
        let blockFiveSubjects = this.state.termFourSubject.filter(element => element.block == 4)

        if(!blockOneSubjects.some(element => element.isSelected))
            blockOneSubjects = blockOneSubjects.map(element => {
                return !element.isDisabledAsCommonSubject ? Object.assign({}, element, { ...element, isDisabled : false }) : element
            })

        if(!blockTwoSubjects.some(element => element.isSelected))
            blockTwoSubjects = blockTwoSubjects.map(element => {
                return !element.isDisabledAsCommonSubject ? Object.assign({}, element, { ...element, isDisabled : false }) : element
            })

        if(!blockThreeSubjects.some(element => element.isSelected))
            blockThreeSubjects = blockThreeSubjects.map(element => {
                return !element.isDisabledAsCommonSubject ? Object.assign({}, element, { ...element, isDisabled : false }) : element
            })

        if(!blockFourSubjects.some(element => element.isSelected))
            blockFourSubjects = blockFourSubjects.map(element => {
                return !element.isDisabledAsCommonSubject ? Object.assign({}, element, { ...element, isDisabled : false }) : element
            })

        if(!blockFiveSubjects.some(element => element.isSelected))
            blockFiveSubjects = blockFiveSubjects.map(element => {
                return !element.isDisabledAsCommonSubject ? Object.assign({}, element, { ...element, isDisabled : false }) : element
            })

        blockOneSubjects.map(element => updatedTermFourSubject.push(element))
        blockTwoSubjects.map(element => updatedTermFourSubject.push(element))
        blockThreeSubjects.map(element => updatedTermFourSubject.push(element))
        blockFourSubjects.map(element => updatedTermFourSubject.push(element))
        blockFiveSubjects.map(element => updatedTermFourSubject.push(element))

        this.setState({
            termFourSubject : updatedTermFourSubject,
        })

    }

    handleInstanceStateForTermFive = async () => {
        
        let updatedTermFiveSubject = []

        let blockOneSubjects = this.state.termFiveSubject.filter(element => element.block == 0)
        let blockTwoSubjects = this.state.termFiveSubject.filter(element => element.block == 1)
        let blockThreeSubjects = this.state.termFiveSubject.filter(element => element.block == 2)
        let blockFourSubjects = this.state.termFiveSubject.filter(element => element.block == 3)
        let blockFiveSubjects = this.state.termFiveSubject.filter(element => element.block == 4)

        if(!blockOneSubjects.some(element => element.isSelected))
            blockOneSubjects = blockOneSubjects.map(element => {
                return !element.isDisabledAsCommonSubject ? Object.assign({}, element, { ...element, isDisabled : false }) : element
            })

        if(!blockTwoSubjects.some(element => element.isSelected))
            blockTwoSubjects = blockTwoSubjects.map(element => {
                return !element.isDisabledAsCommonSubject ? Object.assign({}, element, { ...element, isDisabled : false }) : element
            })

        if(!blockThreeSubjects.some(element => element.isSelected))
            blockThreeSubjects = blockThreeSubjects.map(element => {
                return !element.isDisabledAsCommonSubject ? Object.assign({}, element, { ...element, isDisabled : false }) : element
            })

        if(!blockFourSubjects.some(element => element.isSelected))
            blockFourSubjects = blockFourSubjects.map(element => {
                return !element.isDisabledAsCommonSubject ? Object.assign({}, element, { ...element, isDisabled : false }) : element
            })

        if(!blockFiveSubjects.some(element => element.isSelected))
            blockFiveSubjects = blockFiveSubjects.map(element => {
                return !element.isDisabledAsCommonSubject ? Object.assign({}, element, { ...element, isDisabled : false }) : element
            })

        blockOneSubjects.map(element => updatedTermFiveSubject.push(element))
        blockTwoSubjects.map(element => updatedTermFiveSubject.push(element))
        blockThreeSubjects.map(element => updatedTermFiveSubject.push(element))
        blockFourSubjects.map(element => updatedTermFiveSubject.push(element))
        blockFiveSubjects.map(element => updatedTermFiveSubject.push(element))

        this.setState({
            termFiveSubject : updatedTermFiveSubject,
        })

    }

    handleBlockDisablingPostInstanceSelectionInOtherTerm = async () => {

        const termThreeSelectedSubject = this.state.termThreeSubject.filter(element => element.isSelected)
        termThreeSelectedSubject.map(selectedSubject => {
            this.setState({
                termThreeSubject: this.state.termThreeSubject.map(element => {
                    return element.block == selectedSubject.block
                        && !element.isSelected ?
                    Object.assign({}, element, { ...element, 
                        isDisabled : termThreeSelectedSubject.some(selected => selected.block == element.block) }) : element
                })
            })
        })

        const termFourSelectedSubject = this.state.termFourSubject.filter(element => element.isSelected)
        termFourSelectedSubject.map(selectedSubject => {
            this.setState({
                termFourSubject: this.state.termFourSubject.map(element => {
                    return element.block == selectedSubject.block 
                        && !element.isSelected ?
                    Object.assign({}, element, { ...element, 
                        isDisabled : termFourSelectedSubject.some(selected => selected.block == element.block) }) : element
                })
            })
        })

        const termFiveSelectedSubject = this.state.termFiveSubject.filter(element => element.isSelected)
        termFiveSelectedSubject.map(selectedSubject => {
            this.setState({
                termFiveSubject: this.state.termFiveSubject.map(element => {
                    return element.block == selectedSubject.block
                        && !element.isSelected ?
                    Object.assign({}, element, { ...element, 
                        isDisabled : termFiveSelectedSubject.some(selected => selected.block == element.block) }) : element
                })
            })
        })

    }

    buildDataAndValidateSpecialization = () =>{

        const selectedTermThreeSubjects = []
        const selectedTermFourSubjects = []
        const selectedTermFiveSubjects = []

        this.state.termThreeSubject.filter(subject => subject.isSelected).map(subject => {
            selectedTermThreeSubjects.push(Object.assign({}, subject, { ...subject, isReSelect : this.state.isReSelect }))
        })
        this.state.termFourSubject.filter(subject => subject.isSelected).map(subject => {
            selectedTermFourSubjects.push(Object.assign({}, subject, { ...subject, isReSelect : this.state.isReSelect }))
        })

        this.state.termFiveSubject.filter(subject => subject.isSelected).map(subject => {
            selectedTermFiveSubjects.push(Object.assign({}, subject, { ...subject, isReSelect : this.state.isReSelect }))
        })

        const isSelectionProper = this.validateBlockWiseSubjectSelection(selectedTermThreeSubjects, selectedTermFourSubjects, selectedTermFiveSubjects)

        if(isSelectionProper){

            const isValidated = this.state.studentsSpecialization.length > 1 ? 
                this.validateDlueSpecializationSelection(selectedTermThreeSubjects, selectedTermFourSubjects, selectedTermFiveSubjects) : 
                this.validateSingleSpecializationSelection(selectedTermThreeSubjects, selectedTermFourSubjects, selectedTermFiveSubjects)

            if(isValidated){
                const isConfirmed = window.confirm('Are you sure you want to submit your selection of electives ?');
                if(isConfirmed){
                    this.setState({
                        selectedTermThreeSubjects : selectedTermThreeSubjects,
                        selectedTermFourSubjects : selectedTermFourSubjects,
                        selectedTermFiveSubjects : selectedTermFiveSubjects
                    })
                    this.nextStep()
                }
            }else {
                this.state.studentsSpecialization.length > 1 ? 
                window.alert('Please select a minimum of 5 subjects from each of your specialization i.e. '+this.state.specializationTypeName) :
                window.alert('Please select a minimum of 6 subjects from your specialization i.e. '+this.state.specializationTypeName)
            }
        } 
    }

    validateBlockWiseSubjectSelection = (termThreeSubject, termFourSubject, termFiveSubject) =>{
        return termThreeSubject.length < 2 ? window.alert('Please select 1 subject from each block for term 3') :
        termFourSubject.length < 5 ? window.alert('Please select 1 subject from each block for term 4') :
        termFiveSubject.length < 5 ? window.alert('Please select 1 subject from each block for term 5') : 
        true
    }

    validateSingleSpecializationSelection = (termThreeSubject, termFourSubject, termFiveSubject) =>{

        const specializationTypeOneList = []

        termThreeSubject.map(subject => {
            if(subject.specialization == this.state.studentsSpecialization[0])
                specializationTypeOneList.push(subject)
        })

        termFourSubject.map(subject => {
            if(subject.specialization == this.state.studentsSpecialization[0])
                specializationTypeOneList.push(subject)
        })

        termFiveSubject.map(subject => {
            if(subject.specialization == this.state.studentsSpecialization[0])
                specializationTypeOneList.push(subject)
        })

        return specializationTypeOneList.length >= 6 ? true : false

    }
 
    validateDlueSpecializationSelection = (termThreeSubject, termFourSubject, termFiveSubject)  =>{

        const specializationTypeOneList = []
        const specializationTypeTwoList = []

        termThreeSubject.map(subject => {
            if(subject.specialization == this.state.studentsSpecialization[0]){
                specializationTypeOneList.push(subject)
            }
            else if(subject.specialization == this.state.studentsSpecialization[1]){
                specializationTypeTwoList.push(subject)
            }
        })

        termFourSubject.map(subject => {
            if(subject.specialization == this.state.studentsSpecialization[0]){
                specializationTypeOneList.push(subject)
            }else if(subject.specialization == this.state.studentsSpecialization[1]){
                specializationTypeTwoList.push(subject)
            }
        })

        termFiveSubject.map(subject => {
            if(subject.specialization == this.state.studentsSpecialization[0]){
                specializationTypeOneList.push(subject)
            }else if(subject.specialization == this.state.studentsSpecialization[1]){
                specializationTypeTwoList.push(subject)
            }
        })

        return specializationTypeOneList.length >= 5 && specializationTypeTwoList.length >= 5 ? true : false

    }
 
    buildAndSaveSpecialization = () => {

        const specializationSelectionList = []

        this.state.selectedTermThreeSubjects.map(subjects => {
            specializationSelectionList.push(Object.assign({}, subjects,
                { ...subjects, userId : this.state.sapid, serviceRequest : this.state.isServiceRequest, 
                    specializationType : this.state.specialization, specialisation1 : this.state.studentsSpecialization[0], 
                    specialisation2 : this.state.studentsSpecialization[1] }))
        })
        this.state.selectedTermFourSubjects.map(subjects => {
            specializationSelectionList.push(Object.assign({}, subjects,
                { ...subjects, userId : this.state.sapid, serviceRequest : this.state.isServiceRequest, 
                    specializationType : this.state.specialization, specialisation1 : this.state.studentsSpecialization[0], 
                    specialisation2 : this.state.studentsSpecialization[1] }))
        })
        this.state.selectedTermFiveSubjects.map(subjects => {
            specializationSelectionList.push(Object.assign({}, subjects,
                { ...subjects, userId : this.state.sapid, serviceRequest : this.state.isServiceRequest, 
                    specializationType : this.state.specialization, specialisation1 : this.state.studentsSpecialization[0], 
                    specialisation2 : this.state.studentsSpecialization[1] }))
        })

        this.saveSpecializationForStudent(specializationSelectionList)
        
    }

    saveSpecializationForStudent = (subjects) =>{

        axios.defaults.headers.post['Content-Type'] = 'application/json';
        try{
            axios.post(saveSpecializationForStudent,
                JSON.stringify(subjects)   
            ).then(response => {
                console.debug('saveSpecializationForStudent', response.data.status)
                if(response.data.status){
                    this.setState({
                        errorInSaving : false,
                        isServiceRequest : false,
                    })
                    console.debug('saveSpecializationForStudent: '+this.state.isServiceRequest)
                    this.nextStep()
                }
            }).catch((error) => {
                this.setState({
                    errorInSaving : true
                })
                this.nextStep()
                console.debug(error);
            })
        }catch (error) {
            console.debug(error);
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

    handleReselectElectives = () =>{
        const isConfirm = window.confirm('Are you sure you want to Re-Select Electives? This will clear your previous selection of subjects');
        if(isConfirm){
            this.fetchBlocksForUI().then(success => {
                this.setState({
                    reSelectSubejct : true,
                    isReSelect : true,
                    step : 1,
                })
            })
        }
    }

    handleSpecializationChangeSR = (selectedSpecialization) => {
        this.setState({
            specialization : selectedSpecialization
        })
        
        this.nextStep()
    }

    handleSpecializationTypeChangeSR = (specialization, specializationType, electiveType) => {
        this.setState({
            specializationType : electiveType,
            specializationTypeName : specializationType,
            studentsSpecialization : specialization,
            step : 1
        })

    }

    handleErrorInSpecializationSelection = (event) =>{
        event.preventDefault();
        if(!this.state.isServiceRequest){
            this.setState({
                step : 1
            })
        }else{
            this.setState({
                step : 1
            })
        }
    }

    handleBackToSR = (event) => {
        event.preventDefault();
        this.setState({
            step : 7
        })
    }

    componentDidMount(){
        this.fetchStudentDetailsForSpecialization().then( success => {
            this.fetchSpecializationTypes().then(success => {
                this.fetchSpecializationIfAlreadyOptedin().then(success => {
                    if(this.state.isSpecializationOptedIn && !this.state.isServiceRequest){
                        this.setState({
                            step : 5,
                            isFetching : false
                        })
                    }else{
                        this.fetchBlocksForUI().then(success =>{
                            this.setState({
                                isFetching : false
                            })
                        })
                    }
                })
            })
        })
    }

    handlePages = () =>{

        const {step} = this.state;
        
        switch(step) {
            case 1: 
                return <SpecializationGuidelines 
                    nextStep={this.nextStep}
                    isServiceRequest={this.state.isServiceRequest}
                    handleBackToSR={this.handleBackToSR}
                    specializationType={this.state.specializationType}
                    specializationTypeName={this.state.specializationTypeName}
                />
            case 2:
                return <> 
                    <TermThreeSpecializationSelection
                        specializationList={this.state.specializationList}
                        termThreeSubject={this.state.termThreeSubject}
                        handleBlockStateChange = {this.handleBlockStateChange}
                    />
                    <br/>
                    <br/>
                    <TermFourSpecializationSelection
                        specializationList={this.state.specializationList}
                        termFourSubject={this.state.termFourSubject}
                        handleBlockStateChange = {this.handleBlockStateChange}
                    />
                    <br/>
                    <br/>
                    <TermFiveSpecializationSelection
                        specializationList={this.state.specializationList}
                        termFiveSubject={this.state.termFiveSubject}
                        handleBlockStateChange = {this.handleBlockStateChange}
                    />
                    
                    <Button className="float-right" type="" onClick={this.buildDataAndValidateSpecialization}>
                        Save And Continue
                    </Button>
                    <Button className="float-right" type="" onClick={this.prevStep}>
                        Back
                    </Button>
                    
                </>
            case 3:
                return <SpecializationConfirmation 
                            sapid = {this.state.sapid}
                            selectedTermThreeSubjects ={this.state.selectedTermThreeSubjects}
                            selectedTermFourSubjects = {this.state.selectedTermFourSubjects}
                            selectedTermFiveSubjects = {this.state.selectedTermFiveSubjects}
                            specializationList = {this.state.specializationList}
                            buildAndSaveSpecialization = {this.buildAndSaveSpecialization}
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                        />
            case 4:
                if(!this.state.errorInSaving)
                    return <Success 
                        selectedTermThreeSubjects ={this.state.selectedTermThreeSubjects}
                        selectedTermFourSubjects = {this.state.selectedTermFourSubjects}
                        selectedTermFiveSubjects = {this.state.selectedTermFiveSubjects}
                        specializationList = {this.state.specializationList}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        />
                else
                    return <Error 
                        selectedTermThreeSubjects ={this.state.selectedTermThreeSubjects}
                        selectedTermFourSubjects = {this.state.selectedTermFourSubjects}
                        selectedTermFiveSubjects = {this.state.selectedTermFiveSubjects}
                        specializationList = {this.state.specializationList}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleErrorInSpecializationSelection = {this.handleErrorInSpecializationSelection}
                        />
            case 5:
                return <SpecialisationOverview
                    selectedTermThreeSubjects ={this.state.selectedTermThreeSubjects}
                    selectedTermFourSubjects = {this.state.selectedTermFourSubjects}
                    selectedTermFiveSubjects = {this.state.selectedTermFiveSubjects}
                    specializationList = {this.state.specializationList}
                    nextStep = {this.nextStep}
                    prevStep = {this.prevStep}
                    handleReselectElectives = {this.handleReselectElectives}
                    />
            case 6:
                return <Specialization 
                    nextStep = {this.nextStep} 
                    handleSpecializationChangeSR = {this.handleSpecializationChangeSR}
                    />
            case 7:
                return <SpecialisationTypes 
                    specialization = {this.state.specialization}
                    specializationList = {this.state.specializationList}
                    handleSpecializationTypeChangeSR = {this.handleSpecializationTypeChangeSR}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    />
        }
    }

    render() {
        return this.state.isFetching ? <></> : 
            <>
                <StepperPage 
                    step = {this.state.step}
                    handlePages = {this.handlePages}
                />
            </>
    }

}
 
const mapStateToProps = state => {
    return {
         sapId: state.sapid
    }
}

export default connect(mapStateToProps) (SpecializationSelection);