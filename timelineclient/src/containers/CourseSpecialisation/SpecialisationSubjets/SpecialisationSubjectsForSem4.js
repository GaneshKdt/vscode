import React, { Component, Fragment } from 'react'
import { Container, ListGroup, Card, Row, Col, Table, Form, Button } from 'react-bootstrap';

// let specialisation1Count = 0;
// let specialisation2Count = 0;
export class SpecialisationSubjectsForSem4 extends Component {
   
    state = {
        specialisation1Id : null,
        specialisation2Id : null,
        makeDisabledTerm3Subjects : [],
        selectedBlock5SpecializationType : null,
        selectedBlock5Sequence : null,
        specialisation1Count : 0,
        specialisation2Count : 0
    }

    back = (e) => {
        e.preventDefault();
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
        this.subjectSelectionChecks(selectedSubjects,specialisation1Id,specializationType1)

    }

    subjectSelectionChecks = (selectedSubjects,specialisation1Id,specializationType1) => {
        
        let specialisationSubjectCount = 0
        let uniqueSequence = 0
        if (selectedSubjects.length == 5) {
            var seq = ['1','2','3','4','5','6','7','8','9','10']
            if (this.props.values.specialisationType.length == 1) {
                selectedSubjects.forEach(subject => {
                    if (subject.specializationType == specialisation1Id){
                        specialisationSubjectCount++                        
                    }
                    //Check if sequence is right
                    if(seq.includes(subject.sequence)){
                        uniqueSequence++
                        //removing selected sequence, so same sequence will not repeat
                        seq.splice(seq.indexOf(subject.sequence), 1)
                    }
                })
                //alert('specialisationSubjectCount - '+specialisationSubjectCount+' : uniqueSequence - '+uniqueSequence)
                // to go the next step must select 3 subject of selected specialisation and 2 from other specialisation for single specialisation
                // also sequence must have unique to go forward
                if (specialisationSubjectCount == 3 && uniqueSequence == 5) {
                    this.props.nextStep();
                }else{
                    // alert('Please Select 2 Subjects of '+ specializationType1 + ' Specialisation from Block 1 to Block 4. ')
                    alert('You need to select three electives from your specialisation. Kindly change your selection and proceed.')
                }

            } else {
                this.props.nextStep();
            }
        } else {
            alert('Please Select 5 Subjects to continue.')
        }
    }

    createCheckBox = (subject) => {

        // Disabled other specialisation when dual specialisation is selected 
        subject = this.makeDisabled(subject)

        //disable subject if pre-requisite subject was not selected in the last sem
        subject = this.disableSubjectWithPrerequisiteNotComplete(subject)

        //pre-selecting subjects that are defined as core
        subject = this.props.preSelectCoreSubject( subject )

        /*disable subject selection after two subjects are selected from specialization in which 3 subjects where 
         *where selected in last sem to maintain the 3+2 and 2+3 selection
         */
        subject = this.disableSubjectAfterTwoSelection( subject )
        
        //disable common subjects for duel specialization
        subject = this.disableCommonSubject( subject )

        if( subject.subject.trim() == ""){
            return(<td></td>)
        }else{
            return(
                <Fragment>
                    <td style={{padding:'0.25rem'}}>
                        <ListGroup.Item style={{textAlign:'center', minHeight:'80px', padding:'0.2rem' }} 
                            action 
                            value={subject}
                            onClick ={() => {
                                this.props.addSpecializationForSem4(subject)
                            }}
                            active = {subject.isActive} 
                            disabled = {subject.isDisabled}
                            className = {`${subject.isTerm3Subject ? 'term3Subjects': subject.isAutoSelected ? 'isAutoSelected' : 
                            subject.isPrerequisite ? 'prerequisite' : subject.isCoreSubject ? 'coreSubject' : ''}`}
                        >        
                            {subject.subject}
                        </ListGroup.Item>
                    </td>
                </Fragment>
            )
        }
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

        let subjectAfterDisabledTerm3 = this.makeDisabledTerm3Subjects(newSubject)
        return subjectAfterDisabledTerm3;
    }

    disableSubjectWithPrerequisiteNotComplete = ( subject ) =>{

        let disabledSubject = subject
        
        this.props.values.subjectWithPrerequisite.map( (prerequisiteSubject) => {

            let found = this.props.values.term3SelectedSubjects.some( selectedSubject => selectedSubject.id == prerequisiteSubject.parent )
            if( !found && prerequisiteSubject.child == subject.id ){
                disabledSubject = {
                    ...subject,
                    isDisabled : true,
                    isPrerequisite : true
                }
            }

        })

        return disabledSubject

    }

    makeDisabledTerm3Subjects = (subject) => {

        let term3SelectedSubjects = this.props.values.term3SelectedSubjects;
        let newSubject = subject

        term3SelectedSubjects.forEach(selectedSubject => {
            if(subject.subject === selectedSubject.subject && selectedSubject.specializationType == subject.specializationType ){
                newSubject = {
                    ...subject,
                    isDisabled : true,
                    isTerm3Subject : true
                }
            }
        });

        return newSubject
    }

    disableSubjectAfterTwoSelection = (subject) => {

        if( this.props.values.specialisationType.length > 1 ){

            let term3SelectedSubjects = this.props.values.term3SelectedSubjects;
            let selectedSubjects = this.props.values.selectedSubjects
            let updatedSubject = subject
    
            let specializationOneId = this.props.values.specialisationType[0].id
            let specializationTwoId =this.props.values.specialisationType[1].id
    
            let countOfSubjectForFirstSpecialization = term3SelectedSubjects.filter( termThreeSubject => 
                termThreeSubject.specializationType == specializationOneId ).length
    
            let countOfSubjectForSecondSpecialization = term3SelectedSubjects.filter( termThreeSubject => 
                termThreeSubject.specializationType == specializationTwoId ).length
                
            let selectedSubjectCountForSpecializationOne = selectedSubjects.filter( selectedSubject => 
                selectedSubject.specializationType == specializationOneId ).length
                
            let selectedSubjectCountForSpecializationTwo = selectedSubjects.filter( selectedSubject => 
                selectedSubject.specializationType == specializationTwoId ).length
            
            if( countOfSubjectForFirstSpecialization > countOfSubjectForSecondSpecialization ){
    
                if( subject.specializationType == specializationOneId && selectedSubjectCountForSpecializationOne > 1 && 
                    !selectedSubjects.some( selectedSubject => selectedSubject.id == subject.id ) )
    
                    updatedSubject = {
                        ...subject,
                        isDisabled : true
                    }
    
            }else if( countOfSubjectForFirstSpecialization < countOfSubjectForSecondSpecialization ){
               
                if( subject.specializationType == specializationTwoId  && selectedSubjectCountForSpecializationTwo > 1 && 
                    !selectedSubjects.some( selectedSubject => selectedSubject.id == subject.id ) )
    
                    updatedSubject = {
                        ...subject,
                        isDisabled : true
                    }
                    
            }
    
            subject = updatedSubject
        }
        
        return subject
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

    disabledBlock5ofAlreadySelectedSpecialisation = (subject) => {
        let newSubject = subject;
        if (newSubject.isTerm3Subject && !this.state.selectedBlock5SpecializationType) {
            this.setState({
                selectedBlock5SpecializationType : newSubject.specializationType,
                selectedBlock5Sequence : newSubject.sequence
            })
        }
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

                if( commonSubject.subject == "Strategic Brand Management" ){

                    if( commonSubject.id == subject.id && subject.specializationType == 13 ){
                        
                        updatedSubject = {
                            ...subject,
                            isDisabled : true
                        }
    
                    }

                }else{

                    if( commonSubject.id == subject.id && subject.specializationType == 9 ){
                        
                        updatedSubject = {
                            ...subject,
                            isDisabled : true
                        }
    
                    }

                }

            })

        }

        subject = updatedSubject

        return subject

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
                    <Card.Header><h4>Step-{values.step}: Choose Your Term 4 Electives</h4></Card.Header>
                    <Card.Body>

                    <h5>Guidelines:</h5>
                    {
                        values.specialisationType.length > 1 ? (
                            <ul style={{listStyle:"circle",fontSize:"16px",lineHeight:"150%"}}>
                                <li>Similar to the first 3 terms, you need to complete 5 subjects in your term-4 of the MBA(WX) program</li>
                                <li>A 'Block' basically means a period of two weeks in a sequential manner. There are 5 blocks for the 5 subjects to be completed in term-4</li>
                                
                                <li>You need to complete a total of 5 electives from each of your two MBA(WX) specialisation tracks, across term-3 and term-4</li>
                                <li>You have completed 3 electives from your first specialisation track in term-3, you need to select the remaining 2 electives from that specialisation in term-4</li>
                                <li>Similarly, you have completed 2 electives from your second specialisation track in term-3, you need to select the remaining 3 electives from that specialisation in term-4</li>
                                <li>The 5 electives that you have cleared in term-3 have been marked as green and cannot be selected again</li>
                                <li>‘Subject with Pre-requisite’ (red) can be taken in term-4 only, however, to be eligible to select that elective in Term-4, you should have cleared the pre-requisite subject in Term-3. Below is the list of such electives that have a pre-requisite subject:
                                    <ul>
                                        <li>'Security Analysis and Portfolio Management I' is a pre-requisite for 'Security Analysis and Portfolio Management II' in Applied Finance</li>
                                        <li>'Strategic HRM : Gaining a Competitive Advantage' is a pre-requisite for two subjects, 'Performance Management Strategy' and 'Learning and Development' in Leadership & Strategy</li>
                                    </ul>
                                </li>
                                <li>‘Core Subject’ (blue) if any in your specialisation track, will be by-default selected as a compulsory subject for you</li>
                                <li>‘Auto Selected Subject’ (green) means that there is an elective in your specialisation track which has been automatically selected for you, so that you will be able to complete your specialisation requirements.</li>
                                <li>There are 4 common electives in Marketing and Digital Marketing specialisation tracks, namely, (a) Marketing in a Digital World, (b) Integrated Marketing Communication, (c) Consumer behavior, and (d) Strategic Brand Management
                                    <ul>
                                        <li>If you have a dual specialisation in “Marketing” and “Digital Marketing”, 3 pre-selected term-3 electives (a,b&c) that you’ve completed in term-3, will be considered as a part of Digital Marketing specialisation only, and (d) will be considered as a part of Marketing specialisation track</li>
                                    </ul>
                                </li>
                                <li>Please note that you cannot select two subjects running parallel in the same block</li>
                                <li>Once you submit your electives selection, you may change it again before the deadline from the Re-Select Electives button that will be visible on the Electives Selection Page.</li>
                                {/* <li>Be careful with your selection of electives, since any changes post submission will not be considered</li> */}
                            </ul>
                        )
                        : 
                            <ul style={{listStyle:"circle",fontSize:"16px",lineHeight:"150%"}}>
                                <li>Similar to the first 3 terms, you need to complete 5 subjects in your term-4 of the MBA(WX) program</li>
                                <li>A 'Block' basically means a period of two weeks in a sequential manner. There are 5 blocks for the 5 subjects to be completed in term-4</li>
                                
                                <li>You need to complete a total of 6 electives from your core MBA(WX) specialisation, 3 of which you have cleared in term-3 and now you need to select the remaining 3 in term-4</li>
                                <li>The remaining 2 electives can be selected from the subjects running in other specialisation tracks in the available blocks</li>
                                <li>The 5 electives that you have cleared in term-3 have been marked as green and cannot be selected again</li>
                                <li>‘Subject with Pre-requisite’ (red) can be taken in term-4 only, however, to be eligible to select that elective in Term-4, you should have cleared the pre-requisite subject in Term-3. Below is the list of such electives that have a pre-requisite subject:
                                    <ul>
                                        <li>'Security Analysis and Portfolio Management I' is a pre-requisite for 'Security Analysis and Portfolio Management II' in Applied Finance</li>
                                        <li>'Strategic HRM : Gaining a Competitive Advantage' is a pre-requisite for two subjects, 'Performance Management Strategy' and 'Learning and Development' in Leadership & Strategy</li>
                                    </ul>
                                </li>
                                <li>‘Core Subject’ (blue) if any in your specialisation track, will be by-default selected as a compulsory subject for you</li>
                                <li>‘Auto Selected Subject’ (green) means that there is an elective in your specialisation track which has been automatically selected for you, so that you will be able to complete your specialisation requirements</li>
                                <li>There are 4 common electives in Marketing and Digital Marketing specialisation tracks, namely, (a) Marketing in a Digital World, (b) Integrated Marketing Communication, (c) Consumer behavior, and (d) Strategic Brand Management
                                    <ul>
                                        <li>If you have a core specialisation in “Digital Marketing”, 3 pre-selected term-3 electives (a,b&c) that you’ve completed in term-3, will be considered as a part of Digital Marketing specialisation only, along with (d) that can be opted in term-4.</li>
                                    </ul>
                                </li>
                                <li>Please note that you cannot select two subjects running parallel in the same block</li>
                                <li>Once you submit your electives selection, you may change it again before the deadline from the Re-Select Electives button that will be visible on the Electives Selection Page.</li>
                                {/* <li>Be careful with your selection of electives, since any changes post submission will not be considered</li> */}
                            </ul>
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
                        <span className="color-indicator color-a"> </span> Term 3 Subjects &nbsp;
                        <span className="color-indicator color-b"> </span> Disabled Subjects &nbsp;
                        <span className="color-indicator coreSubject"> </span> Core Subject &nbsp;
                        <span className="color-indicator color-d"> </span> Available Subjects &nbsp;
                        <br></br><br></br>
                    </div>
                        

                    <Table responsive >
                        <thead>
                            <tr>
                                <th width='12%'>Term IV</th>
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
                                {values.specialisation1Sem4SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            <tr>
                                {values.specialisation2Sem4SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            
                            <tr>
                                <td rowSpan="2" style={{verticalAlign:'middle'}}>Block 2</td>
                                {values.specialisation3Sem4SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            <tr>
                                {values.specialisation4Sem4SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>


                            <tr>
                            <td rowSpan="2" style={{verticalAlign:'middle'}}>Block 3</td>
                                {values.specialisation5Sem4SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            <tr>
                                {values.specialisation6Sem4SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            
                            <tr>
                            <td rowSpan="2" style={{verticalAlign:'middle'}}>Block 4</td>
                                {values.specialisation7Sem4SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            <tr>
                                {values.specialisation8Sem4SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            <tr>
                            <td rowSpan="2" style={{verticalAlign:'middle'}}>Block 5</td>
                                {values.specialisation9Sem4SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            <tr>
                                {values.specialisation10Sem4SubjectList.map ((subject) => {
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

export default SpecialisationSubjectsForSem4
