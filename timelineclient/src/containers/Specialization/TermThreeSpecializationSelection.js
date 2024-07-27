import React, { Component, Fragment } from 'react'
import { API } from '../../shared/config';
import axios from 'axios'  
import { ListGroup, Table, Card } from 'react-bootstrap';

const fetchBlockSequenceDetails = API.fetchBlockSequenceDetails
const termThree = 3

class TermThreeSpecializationSelection extends Component {

    constructor(props) {
        super(props)
        this.state = {  
            sapid : this.props.sapId,
            blockSequenceDetails : [],
            minSequence : 0,
            sequenceInstanceOne : 5,
            sequenceInstanceTwo : 10,
            sequenceInstanceThree : 15,
        } 
    }

    fetchBlockSequenceDetailsForUI(){
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(fetchBlockSequenceDetails,
            JSON.stringify({
                    "sem": termThree
            })   
        ).then(response => {
            this.setState({
                blockSequenceDetails : response.data,
            })
        }).catch(function(error){
            console.debug(error);
        })
    }

    handleBlockUIGeneration(){

        const totalBlockCount = this.state.blockSequenceDetails.length
        const uiDOM = []
        
        let rowSpan

        Array.from(Array(totalBlockCount), (e, blockIndex) => {

            this.state.blockSequenceDetails.map(details => {
                if(details.block == blockIndex && details.maxSequenceInBlock <= 4){
                    rowSpan = 1
                    uiDOM.push(this.generateRowSpanWithOneInstance(rowSpan, blockIndex))
                }else if(details.block == blockIndex && details.maxSequenceInBlock <= 9){
                    rowSpan = 2
                    uiDOM.push(this.generateRowSpanWithTwoInstances(rowSpan, blockIndex))
                }else if(details.block == blockIndex && details.maxSequenceInBlock > 9){
                    rowSpan = 3
                    uiDOM.push(this.generateRowSpanWithThreeInstancs(rowSpan, blockIndex))
                }
            })
    
        })

        return uiDOM
    }

    generateRowSpanWithOneInstance = (rowSpan, blockIndex) =>{
        return(
            <>
                <tr>
                    <td rowSpan={rowSpan} style={{verticalAlign:'middle'}}>Block {blockIndex+1}</td>
                    {
                        this.blockHandler(blockIndex, rowSpan, this.state.minSequence, this.state.sequenceInstanceOne)
                    }
                </tr>
            </>
        )
    }

    generateRowSpanWithTwoInstances = (rowSpan, blockIndex) =>{
        return(
            <>
                <tr>
                    <td rowSpan={rowSpan} style={{verticalAlign:'middle'}}>Block {blockIndex+1}</td>
                    {
                        this.blockHandler(blockIndex, rowSpan, this.state.minSequence, this.state.sequenceInstanceOne)
                    }
                </tr>
                <tr>
                    {
                        this.blockHandler(blockIndex, rowSpan, this.state.sequenceInstanceOne, this.state.sequenceInstanceTwo)
                    }
                </tr>
            </>
        )
    }

    generateRowSpanWithThreeInstancs = (rowSpan, blockIndex) =>{
        return(
            <>
                <tr>
                    <td rowSpan={rowSpan} style={{verticalAlign:'middle'}}>Block {blockIndex+1}</td>
                    {
                        this.blockHandler(blockIndex, rowSpan, this.state.minSequence, this.state.sequenceInstanceOne)
                    }
                </tr>
                <tr>
                    {
                        this.blockHandler(blockIndex, rowSpan, this.state.sequenceInstanceOne, this.state.sequenceInstanceTwo)
                    }
                </tr>
                <tr>
                    {
                        this.blockHandler(blockIndex, rowSpan, this.state.sequenceInstanceTwo, this.state.sequenceInstanceThree)
                    }
                </tr>
            </>
        )
    }

    blockHandler = (blockIndex, totalBlockInstance, minSequenceInRow, maxSequenceInRow) => {

        const totalBlockInstanceSequenceCount = 5
        const sequenceDOM = []

        let sequenceIndex = 0
        let sequenceInstacePopulated = false

        Array.from(Array(totalBlockInstance), (e, j) => {
            Array.from(Array(totalBlockInstanceSequenceCount), (e, k) => {
                sequenceInstacePopulated = false
                this.props.termThreeSubject.map(subject => {     
                    if(blockIndex == subject.block && sequenceIndex == subject.sequence && 
                        subject.sequence >= minSequenceInRow && subject.sequence < maxSequenceInRow){
                        sequenceDOM.push(
                            <td key={blockIndex-sequenceIndex} style={{padding:'0.25rem'}}>
                                <ListGroup.Item style={{textAlign:'center', minHeight:'80px', padding:'0.2rem'}} 
                                    action value={subject}
                                    disabled = {subject.hasPrerequisite || subject.isDisabled || subject.isOtherSemSelectedSub}
                                    className = {subject.isOtherSemSelectedSub ? 'preselected' : subject.hasPrerequisite ? 'prerequisite' : 
                                        subject.isSelected ? 'coreSubject' : ''}
                                    active = {subject.isSelected} 
                                    onClick ={() => {
                                        this.props.handleBlockStateChange(subject)
                                    }}>
                                    {subject.subject}
                                </ListGroup.Item>
                            </td>
                        )
                        sequenceInstacePopulated = true
                    }
                })
                sequenceIndex++
                if(!sequenceInstacePopulated && sequenceIndex > minSequenceInRow && sequenceIndex < maxSequenceInRow){
                    sequenceDOM.push(<td></td>)
                    sequenceInstacePopulated = false
                }
            })
        })

        return sequenceDOM
    }

    componentDidMount(){
        this.fetchBlockSequenceDetailsForUI()
    }

    render() {
        return <>
            <br/>
            <Card>
                <Card.Body style={{textAlign:"center"}}>
                    <br/>
                    <span className="color-indicator coreSubject"></span>&nbsp; <span style={{verticalAlign:"top", paddingRight:"1.2em"}}>
                        Selected Subject From Same Term &nbsp;</span>
                    <span className="color-indicator prerequisite"></span>&nbsp; <span style={{verticalAlign:"top", paddingRight:"1.2em"}}>
                        Subject with Pre-requisite &nbsp;</span>
                    <span className="color-indicator preselected"></span>&nbsp; <span style={{verticalAlign:"top", paddingRight:"1.2em"}}>
                        Subject Selected From Other Terms &nbsp;</span>
                    <span className="color-indicator color-d"></span>&nbsp; <span style={{verticalAlign:"top", paddingRight:"1.2em"}}>
                        Available&nbsp; </span>
                    <span className="color-indicator color-b"></span>&nbsp; <span style={{verticalAlign:"top", paddingRight:"1.2em"}}>
                        Disabled&nbsp;</span>
                    <br/>
                </Card.Body>
            </Card>
            <Table responsive >
                <thead>
                    <tr>
                        <th width='8%' style={{fontSize:'1.2em', verticalAlign: 'middle'}}>Term III</th>
                            {
                            this.props.specializationList.map(specialization => {
                                return(
                                    <Fragment>
                                        <th width='16.66%' style={{textAlign:'center', verticalAlign: 'middle'}}>
                                            {specialization.specializationType}
                                        </th>
                                    </Fragment>
                                )
                            })
                            }
                    </tr>
                </thead>
                <tbody>
                    {this.handleBlockUIGeneration()}
                </tbody>
            </Table>
        </> 
    }

}

export default TermThreeSpecializationSelection;