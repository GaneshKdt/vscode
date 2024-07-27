import BootstrapTable from 'react-bootstrap-table-next';
import React, { Component } from 'react';
import axios from 'axios';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModalForNotification from "../ModalForNotification/ModalForNotification"
import AnnouncementModal from '../../Home/Templates/AnnouncementCard/AnnouncementModal'
import Moment from 'react-moment';

    const columns = [{
            dataField: 'subject',
            text: 'Subject',
            sort: true,
            classes : "announcementsCol",
            headerStyle : {width : '55%'}
        }, 
        {
            dataField: 'startDate',
            text: 'Start Date',
            sort: true,
            formatter : dateFormatter,
            // headerStyle : {background: 'lightslategray',color: 'white'}
        },
        {
            dataField: 'endDate',
            text: 'End Date',
            sort: true,
            formatter : dateFormatter,
            // headerStyle : {background: 'lightslategray',color: 'white'}
            
        },
        {
            dataField: 'category',
            text: 'Category',
            sort: true,
            // headerStyle : {background: 'lightslategray',color: 'white'}
            
        }
    ];
    const rowClasses = (row, rowIndex) => {
        if(rowIndex % 2 !== 0)
            return 'rowOdd announcement-link';
        else
            return 'rowEven announcement-link';
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
class MyAnnouncementTable extends Component{
    state = {
        announcementData : this.props.data,
        rowStyle : null,
        setShow : false,
        bodyData : null
    }
    renderLayout() {
        if(this.state.show !== null && this.state.bodyData !== null){
            console.log(this.state.bodyData)
            return(
                <AnnouncementModal handleShow ={this.handleShow} setShow={this.state.setShow} announcement={this.state.bodyData} />
            )
        }
    }
    rowEvents =  {
        onClick: (e, row, rowIndex) => {
            row.fileName = row.subject
            row.content=row.description
            this.setState({ 
                setShow: true,
                bodyData : row
            });
        } 
    }
    handleShow =()=>{
        this.setState({ setShow :!this.state.setShow})
    }
    
    options = {
        paginationSize: 2,
        pageStartIndex: 0,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        sizePerPageList: [{
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }, {
          text: 'All', value: this.state.announcementData.length
        }] // A numeric array is also available. the purpose of above example is custom the text
      };
    componentDidMount(){
        this.setState({
            announcementData : this.props.data,
            tableLength : this.props.data.length,
        }, () =>{console.log("inside announcement NEW---------------" + JSON.stringify(this.props))} )
    }
    render(){

        return(
            <>      
            
                        {this.state.announcementData !== null? 
                            <>
                                <Card className="">
                                    <Row>
                                        <Col>
                                            <Card>
                                                <BootstrapTable keyField='id' data={ this.state.announcementData } columns={ columns }  rowClasses={rowClasses}  rowEvents={this.rowEvents}  pagination={paginationFactory(this.options)} bootstrap4 striped/>
                                            </Card>
                                        </Col>
                                        {this.renderLayout()}
                                    </Row>
                                </Card>
                            </> 
                        : null }

                        
                

                
            </>
        )
    
    }

}
export default MyAnnouncementTable