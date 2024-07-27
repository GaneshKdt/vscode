import BootstrapTable from 'react-bootstrap-table-next';
import React, { Component } from 'react';
import axios from 'axios';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Moment from 'react-moment';
import { func } from 'prop-types';

    const columns = [{
            dataField: 'fromEmailId',
            text: 'From',
            sort: true,
            style : {width : '25%'}
        }, 
        {
            dataField: 'subject',
            text: 'Subject',
            sort: true,
            classes : "announcementsCol",
            style : {width : '50%'}
        },
        {
            dataField: 'createdDate',
            text: 'Communication date/time',
            sort: true,
            style : {width : '25%'},
            formatter : dateFormatter,
            
        }
    ];
    const rowClasses = (row, rowIndex) => {
        if(rowIndex % 2 != 0)
            return 'rowOdd';
        else
            return 'rowEven'
    };
    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
            { from } to { to } of { size }
        </span>
      );
      
          
function dateFormatter (dateCol) {
    return <Moment format="MMM D, hh:mm a \(\I\S\T\)" withTitle>
                {dateCol}
            </Moment>
}
class MyCommunicationTable extends Component{ 
    state ={
        responseData : this.props.responseData,
        dataToDisplay : null,
        noticeBody : null,
        rowStyle : null,
        
    }
    rowEvents =  {
        onClick: (e, row, rowIndex) => {
            // console.log("inside click---------"+JSON.stringify(row))
            this.setState({
                noticeBody : row
            })
        },
        onMouseEnter: (e, row, rowIndex) =>{
            // this.setState({
            //     rowStyle : {backgroundColor : 'lightgrey'}
            // })
            e.rowStyle = {backgroundColor : 'lightgrey'}
            
        },
        onMouseLeave: (e, row, rowIndex) =>{
            // this.setState({
            //     rowStyle : {backgroundColor : 'white'}
            // })
            
        }
        
    }
    
    options = {
        paginationSize: 4,
        pageStartIndex: 1,
        // alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText: '<<',
        prePageText: '<',
        nextPageText: '>',
        lastPageText: '>>',
        nextPageTitle: 'First page',
        // prePageTitle: 'Pre page',
        // firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        sizePerPageList: [{
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }, {
          text: 'All', value: this.state.responseData.length
        }] // A numeric array is also available. the purpose of above example is custom the text
      };
      
    render(){
        return(
            <>
                        {this.state.responseData !== null && this.props.layout === "Vertical"? 
                            <>
                                {/* <Card className=""> */}
                                    <Row>
                                        <Col>
                                            {/* <Card> */}
                                                <BootstrapTable keyField='id' data={ this.state.responseData } columns={ columns } rowClasses ={rowClasses} rowEvents={this.rowEvents} pagination={paginationFactory(this.options)} striped bootstrap4 />
                                            {/* </Card> */}
                                        </Col>
                                        <Col >
                                            <Card className="paddingForInnerEmailCard">
                                                {this.state.noticeBody ? 
                                                    <>  
                                                        <h6>From:<div dangerouslySetInnerHTML = {{__html: this.state.noticeBody.fromEmailId}}></div></h6>
                                                        <Card>
                                                            <Card.Body>
                                                                <Card.Title><div dangerouslySetInnerHTML = {{__html: this.state.noticeBody.subject}}></div></Card.Title>
                                                                <hr/>
                                                                <Card.Text>
                                                                    <div dangerouslySetInnerHTML = {{__html: this.state.noticeBody.body}}></div>
                                                                </Card.Text>
                                                                <hr/>
                                                            </Card.Body>
                                                        </Card>
                                                    </>
                                                : <h6>Please select a notice to view</h6>
                                                }
                                                
                                            </Card>
                                        </Col>
                                    </Row>
                                {/* </Card> */}
                            </> 
                        : null }

                        {this.state.responseData !== null && this.props.layout === "Horizontal"? 
                        <>
                            {/* <Card > */}
                                <Row>
                                    <Col>
                                        {/* <Card> */}
                                            <BootstrapTable keyField='id' data={ this.state.responseData } columns={ columns } rowClasses ={rowClasses} rowEvents={this.rowEvents} pagination={paginationFactory(this.options)} striped bootstrap4/>
                                        {/* </Card> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card className="paddingForInnerEmailCard">
                                            {this.state.noticeBody ? 
                                                <>  
                                                    <h6>From:<div dangerouslySetInnerHTML = {{__html: this.state.noticeBody.fromEmailId}}></div></h6>
                                                    <Card>
                                                        <Card.Body>
                                                            <Card.Title><div dangerouslySetInnerHTML = {{__html: this.state.noticeBody.subject}}></div></Card.Title>
                                                            <hr/>
                                                            <Card.Text>
                                                                <div dangerouslySetInnerHTML = {{__html: this.state.noticeBody.body}}></div>
                                                            </Card.Text>
                                                            <hr/>
                                                        </Card.Body>
                                                    </Card>
                                                </>
                                            : <h6>Please select a notice to view</h6>
                                            }
                                            
                                        </Card>
                                    </Col>
                                </Row>
                            {/* </Card> */}
                    
                        </> : null }
                

                
            </>
        )
    
    }

}
export default MyCommunicationTable