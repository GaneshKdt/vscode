import React, { Component, Fragment } from 'react'
import { Container, ListGroup, Card, Row, Col, Table, Form, Button } from 'react-bootstrap';

export class SpecialisationSubjectsForSem3 extends Component {
    
    state = {
        specialisation1Id : null,
        specialisation2Id : null,
        singleSubjectBlock : []
        }

    back = (e) => {
        e.preventDefault();
        this.props.onBackResetAllSelectedSubjects();        
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        let specialisation1Id = this.props.values.specialisationType[0].id
        let selectedSubjects = this.props.values.selectedSubjects
        let specializationType1 = ''

        if (this.props.values.serviceRequest) {
            specializationType1 = this.props.values.specialisationType[0].Specialisation
        }else{
            specializationType1 = this.props.values.specialisationType[0].specialisation.specializationType
        }
        
        e.preventDefault();
        //Check student selected proper elective as per their specialisation
        this.subjectSelectionChecks(selectedSubjects,specialisation1Id,specializationType1)
        
    }

    subjectSelectionChecks = (selectedSubjects,specialisation1Id,specializationType1) => {
        let count = 0
        
        if (selectedSubjects.length == 5) {
            if (this.props.values.specialisationType.length == 1) {
                selectedSubjects.forEach(subject => {
                    if (subject.specializationType == specialisation1Id){
                        count++
                    }
                })
                if (count == 3) {
                    this.props.nextStep();
                }else{
                    // alert('Please Select 2 Subjects of '+ specializationType1 + ' Specialisation from Block 1 to Block 4.')
                    alert('You need to select three electives from your specialisation. Kindly change your selection and proceed.')
                }
            } else {
                this.props.nextStep();
            }
        } else {
            alert('Please Select 5 Subjects to continue.')
        }
    }

    //checking and disabling subjects that have a pre-requisite to them
    disableSubjectsWithPrerequisite = (subject) =>{

        let disabledSubject = subject
        
        this.props.values.subjectWithPrerequisite.map( (prerequisiteSubject) => {
            
            if( subject.id == prerequisiteSubject.child ){
                disabledSubject = {
                    ...subject,
                    isDisabled : true,
                    isPrerequisite : true
                }
            }
        })

        return disabledSubject
    }

    preSelectMandatorySubject = ( subject ) => {
        
        let updatedSubject = subject
        let found = false

        this.props.values.coreSubject.map( ( coresubject ) => {
            found = this.props.values.specialisationType.some ( specialization => specialization.id == coresubject.specializationType )
        })

        if( this.props.values.specialisationType.length == 2 && 
            !this.props.values.specialisationType.some( specialization => specialization.id == 13) ){

            this.props.values.coreSubject.map( ( coresubject ) => {

                this.props.values.specialisationType.map( (specialization) =>{

        //pre-selecting subjects from sequence 1 in case of duel specialization and one of the specialization having a core-subject for next 
        // sem in the first block, thus making the subject for other specialization block one mandatory

                    if( (coresubject.sequence == 1 || coresubject.sequence == 2) && subject.specializationType == specialization.id 
                        && coresubject.specializationType == subject.specializationType && 
                        (subject.sequence == 1 || subject.sequence == 2) && found){

                        updatedSubject = {
                            ...subject,
                            isDisabled : true,
                            isPreselected : true
                        }
    
                        if( !this.props.values.selectedSubjects.some( selectedSubject => subject.id == selectedSubject.id ) 
                            && coresubject.id != updatedSubject.id && subject.subject != ""){

                            this.props.values.selectedSubjects.push(updatedSubject) 

                        }
                    }
                })

            })

            subject = updatedSubject

        }else if ( this.props.values.specialisationType.length == 2 && 
            this.props.values.specialisationType.some( specialization => specialization.id == 13) ){

            let termThreeAutoSelectSubject = this.props.values.termThreeAutoSelectSubject
            let sequenceList = []
   
            this.props.values.termThreeAutoSelectSubject.map( termThreeSubject => {

                if( termThreeSubject.specializationTypeName == 'Dual Specialisation' )
                sequenceList.push( termThreeSubject.sequence )

            })
            
            termThreeAutoSelectSubject.map( termThreeSubject => {

                sequenceList.map( sequence => {

                    if( termThreeSubject.specializationTypeName == 'Dual Specialisation' &&  
                        termThreeSubject.specializationType == subject.specializationType && 
                        termThreeSubject.prgm_sem_subj_id == subject.id ){

                        updatedSubject = {
                            ...subject,
                            isDisabled : true,
                            isPreselected : true
                        }

                        if( !this.props.values.selectedSubjects.some( selectedSubject => subject.id == selectedSubject.id ) 
                                && subject.subject != "" ){

                            this.props.values.selectedSubjects.push(updatedSubject) 

                        }

                    }else if ( (sequence == 1 || sequence == 2) && (subject.sequence == 1 ||  subject.sequence == 2) &&
                    termThreeSubject.specializationType != subject.specializationType ){
                            
                        //disabing the subjects from the same block for which a subject has been pre-selected 
                        updatedSubject = {
                            ...subject,
                            isDisabled : true
                        }

                    }else if ( (sequence == 3 || sequence == 4) && (subject.sequence == 3 ||  subject.sequence == 4) &&
                    termThreeSubject.specializationType != subject.specializationType ){
                            
                        //disabing the subjects from the same block for which a subject has been pre-selected 
                        updatedSubject = {
                            ...subject,
                            isDisabled : true
                        }

                    }else if ( (sequence == 5 || sequence == 6) && (subject.sequence == 5 ||  subject.sequence == 6) &&
                    termThreeSubject.specializationType != subject.specializationType ){
                            
                        //disabing the subjects from the same block for which a subject has been pre-selected 
                        updatedSubject = {
                            ...subject,
                            isDisabled : true
                        }

                    }else if ( (sequence == 7 || sequence == 8) && (subject.sequence == 7 ||  subject.sequence == 8) &&
                    termThreeSubject.specializationType != subject.specializationType ){
                            
                        //disabing the subjects from the same block for which a subject has been pre-selected 
                        updatedSubject = {
                            ...subject,
                            isDisabled : true
                        }

                    }else if ( (sequence == 9 || sequence == 10) && (subject.sequence == 9 ||  subject.sequence == 10) &&
                    termThreeSubject.specializationType != subject.specializationType ){
                            
                        //disabing the subjects from the same block for which a subject has been pre-selected 
                        updatedSubject = {
                            ...subject,
                            isDisabled : true
                        }

                    }

                })
            })
            
            subject = updatedSubject

        }else{

            //pre-selecting a subject if it has more than one pre-requisite dependent on it, thus making is a mandatory subject, so as to 
            //enable the student to select 3 subjects in next sem

            let preSelectSubject = []
            let sequence = 0
            let termThreeAutoSelectSequence = 0
            let isDisabled = false

            const soretedPrerequisiteList = [].concat( this.props.values.subjectWithPrerequisite )
                .sort((a, b) => parseInt(a.parent) > parseInt(b.parent) ? 1 : -1)
                
            for (let i = 0; i < soretedPrerequisiteList.length - 1; i++) {
                if (soretedPrerequisiteList[i + 1].parent == soretedPrerequisiteList[i].parent) {
                    preSelectSubject.push(soretedPrerequisiteList[i]);
                }
            }

            preSelectSubject.map( (preselectsubject) => {

                sequence = preselectsubject.sequence
                
                this.props.values.specialisationType.map( (specialization) =>{

                    //checking if the subject to pre-select is from the specialization, if not we are keeping the isDisabled flag as false 
                    if( preselectsubject.specializationType == specialization.id){
                        isDisabled = true
                    }
                    
                    if( subject.id == preselectsubject.id && subject.specializationType == specialization.id ){
    
                        updatedSubject = {
                            ...subject,
                            isDisabled : true,
                            isPreselected : true
                        }
    
                        if( !this.props.values.selectedSubjects.some( selectedSubject => subject.id == selectedSubject.id ) ){
                            this.props.values.selectedSubjects.push(updatedSubject) 
                        }
                    }else if ( sequence == subject.sequence && isDisabled ){
    
                        //disabing the subjects from the same block for which a subject has been pre-selected 
                        updatedSubject = {
                            ...subject,
                            isDisabled : true
                        }

                    }
                })
            })

            subject = updatedSubject
        }

        return subject

    }

    disableSubjectAfterSingleSubjectBlockSelection = (subject) => {

        let selectedSubjects = this.props.values.selectedSubjects
        let sequence = 0
        let disabledSubject = subject;

        selectedSubjects.map( (selectedsubject) => {
            
            sequence = subject.sequence
            this.props.values.specialisationType.map( (specialization) =>{

                if( selectedsubject.subject == subject.subject && specialization.id == subject.specializationType ){

                    /*
                        checking for the blocks which are selected and then determining whether that particlar block has 
                        only one subject running for the specialization
                        if true adding the subject in the list and maintaning it for the count of subjects selected from such
                        blocks 
                    */
                    switch( Number(sequence) ){
                        case 1:
                        case 2:
                            this.props.values.specialisation1Sem3SubjectList.map( (subjectList1) => {
                                this.props.values.specialisation2Sem3SubjectList.map( (subjectList2) => {
                                    if( subjectList1.specializationType == specialization.id && 
                                        subjectList2.specializationType == specialization.id && 
                                        (subjectList1.subject == '' || subjectList2.subject == '')){

                                            if( !this.state.singleSubjectBlock.some( singleSubject => singleSubject.subject == selectedsubject.subject ) )
                                                this.state.singleSubjectBlock.push(subject)
                                    }
                                })
                            })
                            break;
                        case 3:
                        case 4:
                            this.props.values.specialisation3Sem3SubjectList.map( (subjectList3) => {
                                this.props.values.specialisation4Sem3SubjectList.map( (subjectList4) => {
                                    if( subjectList3.specializationType == specialization.id && 
                                        subjectList4.specializationType == specialization.id && 
                                        (subjectList3.subject == '' || subjectList4.subject == '')){

                                            if( !this.state.singleSubjectBlock.some( singleSubject => singleSubject.subject == selectedsubject.subject ) )
                                                this.state.singleSubjectBlock.push(subject)
                                    }
                                })
                            })
                            break;
                        case 5:
                        case 6:
                            this.props.values.specialisation5Sem3SubjectList.map( (subjectList5) => {
                                this.props.values.specialisation6Sem3SubjectList.map( (subjectList6) => {
                                    if( subjectList5.specializationType == specialization.id && 
                                        subjectList6.specializationType == specialization.id && 
                                        (subjectList5.subject == '' || subjectList6.subject == '')){

                                            if( !this.state.singleSubjectBlock.some( singleSubject => singleSubject.subject == selectedsubject.subject ) )
                                                this.state.singleSubjectBlock.push(subject)
                                    }
                                })
                            })
                            break;
                        case 7:
                        case 8:
                            this.props.values.specialisation7Sem3SubjectList.map( (subjectList7) => {
                                this.props.values.specialisation8Sem3SubjectList.map( (subjectList8) => {
                                    if( subjectList7.specializationType == specialization.id && 
                                        subjectList8.specializationType == specialization.id && 
                                        (subjectList7.subject == '' || subjectList8.subject == '')){

                                            if( !this.state.singleSubjectBlock.some( singleSubject => singleSubject.subject == selectedsubject.subject ) )
                                                this.state.singleSubjectBlock.push(subject)
                                    }
                                })
                            })
                            break;
                        case 9:
                        case 10:
                            this.props.values.specialisation9Sem3SubjectList.map( (subjectList9) => {
                                this.props.values.specialisation10Sem3SubjectList.map( (subjectList10) => {
                                    if( subjectList9.specializationType == specialization.id && 
                                        subjectList10.specializationType == specialization.id && 
                                        (subjectList9.subject == '' || subjectList10.subject == '')){

                                            if( !this.state.singleSubjectBlock.some( singleSubject => singleSubject.subject == selectedsubject.subject ) )
                                                this.state.singleSubjectBlock.push(subject)
                                    }
                                })
                            })
                            break;
                    }

                }
            })
        })

        //removing subject from the list if the subject is deselected
        this.state.singleSubjectBlock.map( (singleSubject) => {
            if( !this.props.values.selectedSubjects.some((selectedSubject) => selectedSubject.id == singleSubject.id ))
                this.state.singleSubjectBlock.pop(singleSubject)
        })

        /* 
            if there are two subjects selected from blocks which have only one subject running, disable the third block
            which has only one specialization running so as to have a proper selection keeping in mind term 4 selection
        */
        this.props.values.specialisationType.map( (specialization) =>{

            if( this.state.singleSubjectBlock.length > 1){

                this.props.values.specialisation1Sem3SubjectList.map( (subjectList1) => {
                    this.props.values.specialisation2Sem3SubjectList.map( (subjectList2) => {

                        if( subjectList1.specializationType == specialization.id && 
                            subjectList2.specializationType == specialization.id && 
                            (subjectList1.subject == '' || subjectList2.subject == '') &&
                            !this.state.singleSubjectBlock.some( singleSubject => singleSubject.subject == subject.subject )&&
                            subject.specializationType == specialization.id ){
                                
                                if( subject.sequence == 1 || subject.sequence == 2 )
                                    disabledSubject = {
                                        ...subject,
                                        isDisabled : true
                                    }
                                
                        }
                    })
                })

                this.props.values.specialisation3Sem3SubjectList.map( (subjectList3) => {
                    this.props.values.specialisation4Sem3SubjectList.map( (subjectList4) => {

                        if( subjectList3.specializationType == specialization.id && 
                            subjectList4.specializationType == specialization.id && 
                            (subjectList3.subject == '' || subjectList4.subject == '') &&
                            !this.state.singleSubjectBlock.some( singleSubject => singleSubject.subject == subject.subject ) &&
                            subject.specializationType == specialization.id ){
                               
                                if( subject.sequence == 3 || subject.sequence == 4 )
                                    disabledSubject = {
                                        ...subject,
                                        isDisabled : true
                                    }

                        }
                    })
                })
                
                this.props.values.specialisation5Sem3SubjectList.map( (subjectList5) => {
                    this.props.values.specialisation6Sem3SubjectList.map( (subjectList6) => {

                        if( subjectList5.specializationType == specialization.id && 
                            subjectList6.specializationType == specialization.id && 
                            (subjectList5.subject == '' || subjectList6.subject == '') &&
                            !this.state.singleSubjectBlock.some( singleSubject => singleSubject.subject == subject.subject ) &&
                            subject.specializationType == specialization.id){
                                
                                if( subject.sequence == 5 || subject.sequence == 6 )
                                    disabledSubject = {
                                        ...subject,
                                        isDisabled : true
                                    }
                        
                        }
                    })
                })
                
                this.props.values.specialisation7Sem3SubjectList.map( (subjectList7) => {
                    this.props.values.specialisation8Sem3SubjectList.map( (subjectList8) => {

                        if( subjectList7.specializationType == specialization.id && 
                            subjectList8.specializationType == specialization.id && 
                            (subjectList7.subject == '' || subjectList8.subject == '') &&
                            !this.state.singleSubjectBlock.some( singleSubject => singleSubject.subject == subject.subject ) &&
                            subject.specializationType == specialization.id ){
                                
                                if( subject.sequence == 7 || subject.sequence == 8 )
                                    disabledSubject = {
                                        ...subject,
                                        isDisabled : true
                                    }

                        }
                    })
                })
                
                this.props.values.specialisation9Sem3SubjectList.map( (subjectList9) => {
                    this.props.values.specialisation10Sem3SubjectList.map( (subjectList10) => {

                        if( subjectList9.specializationType == specialization.id && 
                            subjectList10.specializationType == specialization.id && 
                            (subjectList9.subject == '' || subjectList10.subject == '') &&
                            !this.state.singleSubjectBlock.some( singleSubject => singleSubject.subject == subject.subject ) &&
                            subject.specializationType == specialization.id ){
                                
                                if( subject.sequence == 9 || subject.sequence == 10 )
                                    disabledSubject = {
                                        ...subject,
                                        isDisabled : true
                                    }
                                
                        }
                    })
                })
            }
        })

        return disabledSubject
    }

    createCheckBox = (subject) => {

        // Disabled other specialisation when dual specialisation is selected 
        subject = this.makeDisabled(subject)

        //disabling subjects with pre-requisite
        subject = this.disableSubjectsWithPrerequisite(subject)

        //pre-selecting subjects that are defined as core
        subject = this.props.preSelectCoreSubject( subject )

        //pre-select subjects that will be mandatory
        subject = this.preSelectMandatorySubject( subject )

        //auto select subjects for DM in single specialization 
        subject = this.autoSelectSubjectForSpecialization( subject )

        //disable common subjects for duel specialization
        subject = this.disableCommonSubject( subject )

        //Disabled Block 5 of other specialisation
        this.props.values.specialisationSubjectCount.map( ( subjectCount ) => {

            this.props.values.specialisationType.map( (specilization) => {

                if( specilization.id != 13 && subjectCount.specializationType == specilization.id && subjectCount.subjectCount < 7 &&
                    (subject.sequence === '9' || subject.sequence === '10') ){
                    
                    //disable block 5 subjects for other specialzation in case of specialization have less than 7 subjects
                    subject = this.disabledBlock5forOtherSpecialisation(subject)

                }else if ( specilization.id != 13 && subjectCount.specializationType == specilization.id && subjectCount.subjectCount < 8 && 
                    this.props.values.specialisationType.length < 2){
                    
                    /*disable blocks for specialization having less than 8 subjects and make it mandatory to select one subject 
                      from blocks running two parallel specialization */
                    subject = this.disableSubjectAfterSingleSubjectBlockSelection(subject)
                    
                }

            })

        })

        //if the subject is empty (in case of subjects added to keep the sequence in the correct format) we return an empty column
        if( subject.subject.trim() == ""){
            return(<td></td>)
        }else{
            return(
                <Fragment>
                    <td style={{padding:'0.25rem'}}>
                        <ListGroup.Item style={{textAlign:'center', minHeight:'80px', padding:'0.2rem'}} 
                            action 
                            value={subject}
                            onClick ={() => {
                                //onClick this subject will be added in selected list
                                this.props.addSpecializationForSem3(subject)
                            }}
                            active = {subject.isActive} 
                            disabled = {subject.isDisabled}
                            className = {`${subject.isPrerequisite ? 'prerequisite': subject.isCoreSubject ? 'coreSubject' :
                                            subject.isCoreSubjectNextSem ? 'nextSemCoreSubject' : 
                                            subject.isPreselected ? 'preselected' : ''}`}
                        >        
                            {subject.subject}
                        </ListGroup.Item>
                    </td>
                </Fragment>
            )

        }
    }
    
    /*
    *auto selecting subjects for specialization DM for sem 3, for sem 4 the remaning subjects will get auto selected
    */
    autoSelectSubjectForSpecialization( subject ){

        let updatedSubject = subject
        let termThreeAutoSelectSubject = this.props.values.termThreeAutoSelectSubject
        let specialisationType = this.props.values.specialisationType
        let found = specialisationType.some ( specialization => specialization.id == 9 ) &&
                    specialisationType.some ( specialization => specialization.id == 13 )

        if ( ( specialisationType.length < 2 && ( specialisationType.some ( specialization => specialization.id == 13 ) ) 
            || found ) ){

            /* 
            * disabing subjects from blocks in which auto selected subjects are present
            */
            termThreeAutoSelectSubject.map( autoSelectSubject => {

                switch( Number( autoSelectSubject.sequence) ){
                    case 1:
                    case 2:
                        if( ( subject.sequence == 1 || subject.sequence == 2 ) &&
                        autoSelectSubject.specializationType != subject.specializationType )
                            updatedSubject = {
                                ...subject,
                                isDisabled : true
                            }
                        break;
                    case 3:
                    case 4:
                        if( ( subject.sequence == 3 || subject.sequence == 4 ) &&
                        autoSelectSubject.specializationType != subject.specializationType )
                            updatedSubject = {
                                ...subject,
                                isDisabled : true
                            }
                        break;
                    case 5:
                    case 6:
                        if( ( subject.sequence == 5 || subject.sequence == 6 ) &&
                        autoSelectSubject.specializationType != subject.specializationType )
                            updatedSubject = {
                                ...subject,
                                isDisabled : true
                            }
                        break;
                    case 7:
                    case 8:
                        if( ( subject.sequence == 7 || subject.sequence == 8 ) &&
                        autoSelectSubject.specializationType != subject.specializationType )
                                updatedSubject = {
                                ...subject,
                                isDisabled : true
                            }
                        break;
                    case 9:
                    case 10:
                        if( (subject.sequence == 9 || subject.sequence == 10 ) &&
                        autoSelectSubject.specializationType != subject.specializationType )
                            updatedSubject = {
                                ...subject,
                                isDisabled : true
                            }
                        break;
                }
    
                var isInArray = termThreeAutoSelectSubject.some( termThreeSubject => termThreeSubject.prgm_sem_subj_id == subject.id )

                if( subject.id == autoSelectSubject.prgm_sem_subj_id  && 
                    subject.specializationType == autoSelectSubject.specializationType &&
                    autoSelectSubject.specializationTypeName == 'Single Specialisation' ){
    
                    updatedSubject = {
                        ...subject,
                        isPreselected : true,
                        isDisabled : true
                    }
    
                    if( !this.props.values.selectedSubjects.some( selectedSubject => subject.id == selectedSubject.id ) ){
                        this.props.values.selectedSubjects.push(updatedSubject) 
                    }
                }
                
                if( termThreeAutoSelectSubject.length > 2 && autoSelectSubject.specializationType == subject.specializationType 
                    && autoSelectSubject.specializationTypeName == 'Single Specialisation' && !isInArray ){

                    updatedSubject = {
                        ...subject,
                        isDisabled : true
                    }

                }
                
            })
    
        }
        
        subject = updatedSubject

        return subject

    }

    /*
    * disabling common subjects for single and duel specialization in case of marking and digital marketing
    */
    disableCommonSubject = ( subject ) => {

        let updatedSubject = subject
        let specialisationType = this.props.values.specialisationType
        
        let found = specialisationType.some ( specialization => specialization.id == 9 ) &&
                    specialisationType.some ( specialization => specialization.id == 13 )
        
        if ( specialisationType.length < 2 ){

            if( specialisationType.some ( specialization => specialization.id == 9 ) ){

                this.props.values.commonSubjectList.map( commonSubject => {

                    if( commonSubject.id == subject.id && subject.specializationType == 13 ){
                        
                        updatedSubject = {
                            ...subject,
                            isDisabled : true
                        }
    
                    }
    
                })

            }else if( specialisationType.some ( specialization => specialization.id == 13 ) ){

                this.props.values.commonSubjectList.map( commonSubject => {

                    if( commonSubject.id == subject.id && subject.specializationType == 9 ){
                        
                        updatedSubject = {
                            ...subject,
                            isDisabled : true
                        }
    
                    }
    
                })

            }else {

                this.props.values.commonSubjectList.map( commonSubject => {

                    if( commonSubject.subject == "Strategic Brand Management" && commonSubject.subject == subject.subject 
                        && subject.specializationType == 13 && specialisationType.some( specialization => specialization.id != 13 ) ){
                        
                        updatedSubject = {
                            ...subject,
                            isDisabled : true
                        }
    
                    }
    
                })

            }

        }else if( found ){

            this.props.values.commonSubjectList.map( commonSubject => {

                if( commonSubject.subject !== "Strategic Brand Management" && 
                    commonSubject.id == subject.id && subject.specializationType == 9 ){
                    
                    updatedSubject = {
                        ...subject,
                        isDisabled : true
                    }

                }

            })

        }

        subject = updatedSubject

        return subject

    }

    makeDisabled = (subject) => {
        let newSubject = subject;
        let specialisation1Id = this.state.specialisation1Id
        let specialisation2Id = this.state.specialisation2Id
        if (this.props.values.specialisationType.length > 1) {
            if (subject.specializationType != specialisation1Id &&  subject.specializationType != specialisation2Id) {
                newSubject = {
                    ...subject,
                    isDisabled : true
                }
            }
        }
        return newSubject;
    }

    disabledBlock5forOtherSpecialisation = (subject) => {
        let newSubject = subject;
        let specialisation1Id = this.props.values.specialisationType[0].id
        if (this.props.values.specialisationType.length == 1) {
            if (subject.specializationType != specialisation1Id){
                newSubject = {
                    ...subject,
                    isDisabled : true
                }
            }
        }
        return newSubject;
    }

    componentDidMount(){
        if (this.props.values.specialisationType.length > 1) {
            this.setState({
                specialisation1Id : this.props.values.specialisationType[0].id,
                specialisation2Id : this.props.values.specialisationType[1].id,
            })
        }
    }

    render() {
        const { values } = this.props
        return (
            <>
                <br />
                <Card>
                    <Card.Header><h4>Step-{values.step}: Choose Your Term 3 Electives</h4></Card.Header>
                    <Card.Body>

                    <h5>Guidelines:</h5>
                    {
                        values.specialisationType.length > 1 ? (
                            <ul style={{listStyle:"circle",fontSize:"16px",lineHeight:"150%"}}>

                                <li>Before you proceed, if you wish to change your MBA(WX) Specialisation, you can raise the Specialisation Change SR from the Support Page. Be careful, as change in specialisation twice before the deadline will incur an additional fee</li>
                                <li>Once you submit your electives selection, you may change it again before the deadline from the Re-Select Electives button that will be visible on the Electives Selection Page</li>
                                <li>Similar to the first 2 terms, you need to complete 5 subjects in your term-3 of the MBA(WX) program</li>
                                <li>You need to select three electives (subjects) out of the total five, from one of your two specialisations</li>
                                <li>The remaining two electives are to be selected from the second specialisation, from the available blocks after you have selected the first three electives in the point above</li>
                                <li>A 'Block' basically means a period of two weeks in a sequential manner. There are 5 blocks for the 5 subjects to be completed in term-3</li>
                                <li>
                                    ‘Subject with Pre-requisite’ (red) can be taken in term-4 only, however, to be eligible to select that elective in Term-4, you need to clear the pre-requisite subject in Term-3. Select your Term-3 electives carefully, keeping in mind what you want to select at the time of the Term-4 electives selection window.
                                    <ul>
                                        <li>'Security Analysis and Portfolio Management I' is a pre-requisite for 'Security Analysis and Portfolio Management II' in Applied Finance</li>
                                        <li>'Strategic HRM : Gaining a Competitive Advantage' is a pre-requisite for two subjects, 'Performance Management Strategy' and 'Learning and Development' in Leadership & Strategy</li>
                                        <li>‘Marketing in a Digital World’ is a pre-requisite for ‘Search Engine Optimisation & Search Engine Marketing’ in Digital Marketing</li>
                                        <li>‘Integrated Marketing Communication’ is a pre-requisite for ‘Social Media & Content Marketing’ in Digital Marketing</li>
                                    </ul>
                                </li>
                                <li>‘Core Subject’ (blue) if any in your specialisation track, will be by-default selected as a compulsory subject for you</li>
                                <li>‘Next Semester Core Subject’ (yellow) if any in your specialisation track, cannot be selected in term-3, as it will be by-default selected as compulsory subject in term-4</li>
                                <li>‘Auto Selected Subject’ (green) means that there is a subject in one of your specialisation tracks which can’t be selected, so the elective from your second specialisation has been auto-selected for you</li>
                                <li>For students with single specialisation in ‘Operations & Supply Chain’, it is compulsory to select one elective from two electives of the core specialisation running in Block 5</li>
                                <li>There are 4 common electives in Marketing and Digital Marketing specialisation tracks, namely, (a) Marketing in a Digital World, (b) Integrated Marketing Communication, (c) Consumer behavior, and (d) Strategic Brand Management
                                    <ul>
                                        <li>If you have a dual specialisation in “Marketing” and “Digital Marketing”, there will be 3 pre-selected term-3 electives (a,b&c) that will be considered as a part of Digital Marketing specialisation only, and (d) will be considered as a part of Marketing specialisation track.</li>
                                    </ul>
                                </li>
                                <li>Please note that you cannot select two subjects running parallel in the same block</li>
                                <li>Please note that the electives other than your selected ones will again be available for selection at the time of Term-4 Electives Selection window</li>
                            
                            </ul>
                        )
                        : (
                            <ul style={{listStyle:"circle",fontSize:"16px",lineHeight:"150%"}}>
                                
                                <li>Before you proceed, if you wish to change your MBA(WX) Specialisation, you can raise the Specialisation Change SR from the Support Page. Be careful, as change in specialisation twice before the deadline will incur an additional fee</li>
                                <li>Once you submit your electives selection, you may change it again before the deadline from the Re-Select Electives button that will be visible on the Electives Selection Page</li>
                                <li>Similar to the first 2 terms, you need to complete 5 subjects in your term-3 of the MBA(WX) program</li>
                                <li>You need to select three electives (subjects) out of the total five, from your core specialisation in term-3</li>
                                <li>The remaining two electives can be taken from any other specialisation from the blocks that are available after you have elected the core specialisation electives</li>
                                <li>A 'Block' basically means a period of two weeks in a sequential manner. There are 5 blocks for the 5 subjects to be completed in term-3</li>
                                <li>
                                    ‘Subject with Pre-requisite’ (red) can be taken in term-4 only, however, to be eligible to select that elective in Term-4, you need to clear the pre-requisite subject in Term-3. Select your Term-3 electives carefully, keeping in mind what you want to select at the time of the Term-4 electives selection window.
                                    <ul>
                                        <li>'Security Analysis and Portfolio Management I' is a pre-requisite for 'Security Analysis and Portfolio Management II' in Applied Finance</li>
                                        <li>'Strategic HRM : Gaining a Competitive Advantage' is a pre-requisite for two subjects, 'Performance Management Strategy' and 'Learning and Development' in Leadership & Strategy</li>
                                        <li>‘Marketing in a Digital World’ is a pre-requisite for ‘Search Engine Optimisation & Search Engine Marketing’ in Digital Marketing</li>
                                        <li>‘Integrated Marketing Communication’ is a pre-requisite for ‘Social Media & Content Marketing’ in Digital Marketing</li>
                                    </ul>
                                </li>
                                <li>‘Core Subject’ (blue) if any in your specialisation track, will be by-default selected as a compulsory subject for you</li>
                                <li>‘Next Semester Core Subject’ (yellow) if any in your specialisation track, cannot be selected in term-3, as it will be by-default selected as compulsory subject in term-4</li>
                                <li>For students with single specialisation in ‘Operations & Supply Chain’, it is compulsory to select one elective from two electives of the core specialisation running in Block 5</li>
                                <li>‘Auto Selected Subject’ (green) means that there is an elective in your specialisation track which has been automatically selected for you, so that you will be able to select remaining electives in term-4 and complete your specialisation requirements</li>
                                <li>There are 4 common electives in Marketing and Digital Marketing specialisation tracks, namely, (a) Marketing in a Digital World, (b) Integrated Marketing Communication, (c) Consumer behavior, and (d) Strategic Brand Management
                                    <ul>
                                        <li>If you have a core specialisation in “Digital Marketing”, there will be 3 pre-selected term-3 electives (a,b&c) that will be considered as a part of Digital Marketing specialisation only, along with (d) that can be opted in term-4.</li>
                                    </ul>
                                </li>
                                <li>Please note that you cannot select two subjects running parallel in the same block</li>
                                <li>Please note that the electives other than your selected ones will again be available for selection at the time of Term-4 Electives Selection window</li>
                            
                            </ul>
                        )
                    }
                    
                    <hr />
                    <Form.Group as={Row} className="fs-16">
                        <Form.Label column sm={3}> <b>Specialisation Type: </b> </Form.Label>
                        <Form.Label column sm={8}> {values.specialisation} </Form.Label>
                    </Form.Group>

                    <Form.Group as={Row} className="fs-16">
                        <Form.Label column sm={3}> <b>Specialisation In: </b> </Form.Label>
                        <Form.Label column sm={8}> 
                            {
                                values.serviceRequest ? (
                                    values.specialisationType.map((type) => {
                                        return (<p>{type.Specialisation}</p>)
                                    })
                                ) : ( 
                                    values.specialisationType.map((type) => {
                                        return (<p>{type.specialisation.specializationType}</p>)
                                    })
                                )
                            }
                        </Form.Label>
                    </Form.Group>

                    <div>
                        <hr></hr>
                        <span className="color-indicator coreSubject"> </span> Core Subject &nbsp;
                        <span className="color-indicator nextSemCoreSubject"> </span> Next Semester Core Subject &nbsp;
                        <span className="color-indicator prerequisite"> </span> Subject with Pre-requisite &nbsp;
                        <span className="color-indicator preselected"> </span> Auto Selected &nbsp;
                        <span className="color-indicator color-d"> </span> Available &nbsp;
                        <span className="color-indicator color-b"> </span> Disabled  &nbsp;
                        <br></br><br></br>
                    </div>
                        
                    <Table responsive >
                        <thead>
                            <tr>
                                <th width='8%'>Term III</th>
                                {values.SpecialisationList.map (({id, specializationType}) => {
                                    return(
                                        <Fragment>
                                            <th width='16.66%' style={{textAlign:'center'}}>{specializationType}</th>
                                        </Fragment>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                                <td  rowSpan="2" style={{verticalAlign:'middle'}}>Block 1</td>
                                {values.specialisation1Sem3SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            <tr>
                                {values.specialisation2Sem3SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject)) 
                                })}
                            </tr>
                            
                            <tr>
                                <td rowSpan="2" style={{verticalAlign:'middle'}}>Block 2</td>
                                {values.specialisation3Sem3SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            <tr>
                                {values.specialisation4Sem3SubjectList.map ((subject) => {
                                     return(this.createCheckBox(subject)) 
                                })}
                            </tr>

                            <tr>
                                <td rowSpan="2" style={{verticalAlign:'middle'}}>Block 3</td>
                                {values.specialisation5Sem3SubjectList.map ((subject) => {
                                     return(this.createCheckBox(subject)) 
                                })}
                            </tr>

                            <tr>
                                {values.specialisation6Sem3SubjectList.map ((subject) => {
                                     return(this.createCheckBox(subject)) 
                                })}
                            </tr>
                            
                            
                            <tr>
                                <td rowSpan="2" style={{verticalAlign:'middle'}}>Block 4</td>
                                {values.specialisation7Sem3SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            <tr>
                                {values.specialisation8Sem3SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject)) 
                                })}
                            </tr>


                            <tr>
                                <td rowSpan="2" style={{verticalAlign:'middle'}}>Block 5</td>
                                {values.specialisation9Sem3SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            <tr>
                                {values.specialisation10Sem3SubjectList.map ((subject) => {
                                     return(this.createCheckBox(subject)) 
                                })}
                            </tr>

                        </tbody>
                        </Table>

                    <Button className="float-right" type="" onClick={this.saveAndContinue}>Save And Continue</Button>
                    {values.serviceRequest ? 
                    <Button className="float-right" onClick={this.back}>Back</Button> : ''
}

                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default SpecialisationSubjectsForSem3
