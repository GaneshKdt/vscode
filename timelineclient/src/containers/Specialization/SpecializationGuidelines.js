import React, { Component } from 'react'
import { Button, Card, Form, Row } from 'react-bootstrap';

class SpecializationGuidelines extends Component {

    render (){
        return <>
            <br/>
            <br/>
            <Card>
                <Card.Body>
                    <h5>Guidelines:</h5>
                    {
                        this.props.specializationType == 'Single Specialization' ? 
                        <div>
                            <ul style={{fontSize:"16px",lineHeight:"150%"}}>
                                <li>Before you proceed, if you wish to change your MBA(WX) Specialisation, you can raise the Specialisation 
                                    Change SR from the Support Page. Be careful, as change in specialisation twice before the deadline will 
                                    incur an additional fee.</li>
                                <li>Once you submit your electives selection, you may change it again before the deadline from the 
                                    Re-Select Electives button that will be visible on the Electives Selection Page.</li>
                                <li>Similar to the first 2 terms, you need to complete 4 subjects in your term-3, only two out of which will 
                                    be electives as per your selection below. The remaining two are compulsory subjects. Term-4 and term-5 
                                    have 5 electives each</li>
                                <li>A 'Block' basically means a period of two weeks in a sequential manner. Please note that you cannot 
                                    select two subjects running parallel in the same block.</li>
                                <li>You need to select a minimum of 6 electives (subjects) out of the total 12 blocks, from your core 
                                    specialisation track combining term-3 (2 blocks), term-4 (5 blocks) and term-5 (5 blocks).</li>
                                <li>The remaining electives can be taken from any other specialisation from the blocks that are available 
                                    after you have elected the core specialisation electives.</li>
                                <li>‘Subject with Pre-requisite’ (red) can be taken after selecting the pre-requisite elective in the previous 
                                    term only, and cannot be selected in the same term as that of pre-requisite.
                                    <ul style={{listStyle:'circle'}}>
                                        <li>'Security Analysis and Portfolio Management I' is a pre-requisite for 'Security Analysis and 
                                            Portfolio Management II' in Applied Finance.</li>
                                        <li>'Strategic HRM : Gaining a Competitive Advantage' is a pre-requisite for two subjects, 'Performance
                                             Management Strategy' and 'Learning and Development' in Leadership & Strategy.</li>
                                        <li>‘Marketing in a Digital World’ is a pre-requisite for ‘Search Engine Optimisation & Search Engine 
                                            Marketing’ in Digital Marketing and for ‘Marketing and Web Social Media Analytics’ in both Marketing 
                                            and Digital Marketing.</li>
                                        <li>‘Integrated Marketing Communication’ is a pre-requisite for ‘Social Media & Content Marketing’ in 
                                            Digital Marketing.</li>
                                        <li>'Supply Chain Management' is a pre-requisite for 'Supply Chain And Logistics Analytics' in 
                                            Operations and Supply Chain.</li>
                                    </ul>
                                </li>
                                <li>There are 5 common electives in Marketing and Digital Marketing specialisation tracks, namely, (a) Marketing 
                                    in a Digital World, (b) Integrated Marketing Communication, (c) Consumer behavior, (d) Strategic Brand 
                                    Management and (e) Marketing and Web Social Media Analytics.
                                    <ul style={{listStyle:'circle'}}>
                                        <li>If you have a core specialisation in “Marketing” or “Digital Marketing”, it is suggested for you to 
                                            select these common electives from your core specialisation track only.</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        :
                        <div>
                            <ul style={{fontSize:"16px",lineHeight:"150%"}}>
                                <li>Before you proceed, if you wish to change your MBA(WX) Specialisation, you can raise the Specialisation 
                                    Change SR from the Support Page. Be careful, as change in specialisation twice before the deadline will 
                                    incur an additional fee.</li>
                                <li>Once you submit your electives selection, you may change it again before the deadline from the 
                                    Re-Select Electives button that will be visible on the Electives Selection Page.</li>
                                <li>Similar to the first 2 terms, you need to complete 4 subjects in your term-3, only two out of which will 
                                    be electives as per your selection below. The remaining two are compulsory subjects. Term-4 and term-5 
                                    have 5 electives each.</li>
                                <li>A 'Block' basically means a period of two weeks in a sequential manner. Please note that you cannot 
                                    select two subjects running parallel in the same block.</li>
                                <li>You need to select a minimum of 5 electives (subjects) from each of your core specialisation tracks, 
                                    out of the total 12 blocks combining term-3 (2 blocks), term-4 (5 blocks) and term-5 (5 blocks).</li>
                                <li>The remaining electives can be taken from any other specialisation from the blocks that are available 
                                    after you have elected the core specialisation electives.</li>
                                <li>‘Subject with Pre-requisite’ (red) can be taken after selecting the pre-requisite elective in the previous 
                                    term only, and cannot be selected in the same term as that of pre-requisite.
                                    <ul style={{listStyle:'circle'}}>
                                        <li>'Security Analysis and Portfolio Management I' is a pre-requisite for 'Security Analysis and 
                                            Portfolio Management II' in Applied Finance.</li>
                                        <li>'Strategic HRM : Gaining a Competitive Advantage' is a pre-requisite for two subjects, 'Performance
                                             Management Strategy' and 'Learning and Development' in Leadership & Strategy.</li>
                                        <li>‘Marketing in a Digital World’ is a pre-requisite for ‘Search Engine Optimisation & Search Engine 
                                            Marketing’ in Digital Marketing and for ‘Marketing and Web Social Media Analytics’ in both Marketing 
                                            and Digital Marketing.</li>
                                        <li>‘Integrated Marketing Communication’ is a pre-requisite for ‘Social Media & Content Marketing’ in 
                                            Digital Marketing.</li>
                                        <li>'Supply Chain Management' is a pre-requisite for 'Supply Chain And Logistics Analytics' in 
                                            Operations and Supply Chain.</li>
                                    </ul>
                                </li>
                                <li>There are 5 common electives in Marketing and Digital Marketing specialisation tracks, namely, (a) Marketing 
                                    in a Digital World, (b) Integrated Marketing Communication, (c) Consumer behavior, (d) Strategic Brand 
                                    Management and (e) Marketing and Web Social Media Analytics.
                                    <ul style={{listStyle:'circle'}}>
                                        <li>If you have one of the core specialisation in “Marketing” or “Digital Marketing”, it is suggested 
                                            for you to select these common electives from your core specialisation track only.</li>
                                        <li>If you have a dual specialisation in “Marketing” and “Digital Marketing”, it is suggested for you
                                             to select these common electives according to the minimum requirement of 5 electives from each 
                                             specialisation.</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    }
                    
                    <br/>
                    <hr/>
                    <Form.Group as={Row} className="fs-16">
                        <Form.Label column sm={3}> <b>Specialisation Type: </b> </Form.Label>
                        <Form.Label column sm={8}> {this.props.specializationType} </Form.Label>
                    </Form.Group>

                    <Form.Group as={Row} className="fs-16">
                        <Form.Label column sm={3}> <b>Specialisation In: </b> </Form.Label>
                        <Form.Label column sm={8}> { this.props.specializationTypeName } </Form.Label>
                    </Form.Group>
                    {
                        this.props.isServiceRequest ? 
                            <>
                                <Button className="float-right" variant="primary" id="proceed" onClick={this.props.nextStep}>Proceed</Button>
                                <Button className="float-right" variant="primary" id="back" onClick={e => {this.props.handleBackToSR(e)}}>Back</Button> 
                            </>
                        : 
                        <Button className="float-right" variant="primary" onClick={this.props.nextStep}>Proceed</Button>
                    }
                    
                </Card.Body>
            </Card>
        </>
    }

}

export default SpecializationGuidelines;