import React, { Component } from "react";
import { connect } from 'react-redux';
import { analyticsManager } from "../../shared/Analytics";
import Card from 'react-bootstrap/Card';
import { Accordion,Table,Tabs,Tab } from "react-bootstrap";
import ConfigUrls from "../../shared/config";
import Axios from "axios";
import Spinner from 'react-bootstrap/Spinner'
const urls = new ConfigUrls().api;
class Rank extends Component {
    state = {
        allStudentRankData: {},
        specificStudentRankData:{},
        specificStudentCycleWiseRankData:{},
        studentData: this.props.data,
        spiner:'block',
        notRecordFoundText:''
      }
    
      componentDidMount() {
        this.loadSubjectWiseRanklist();
        if (this.props.location.state && this.props.location.state.studentData) {
          this.setState({
            studentData: this.props.location.state.studentData
          });
        }
      }

      loadSubjectWiseRanklist = () => {
        let apiToCall = urls.subjectWiseRankData;
        let body = {
          consumerProgramStructureId: this.state.studentData.consumerProgramStructureId,
          sapid: this.state.studentData.sapid
        };
    
        Axios.post(apiToCall, body)
          .then(response => {
            this.setState({
                allStudentRankData: response.data.AllRankBasedMap,
                specificStudentRankData: response.data.specificStudentsMarks,
                spiner:'none',
                notRecordFoundText:'No Record Found'
            });
          })

          .catch((error)=>{
            console.log("error:"+error);
            this.setState({
              spiner:'none',
              notRecordFoundText:'Error While Loading Subject Wise Rank'
          });
          });
      }

      
  render() {
    return (
      <>
<Tabs defaultActiveKey="subject" id="uncontrolled-tab-example">
  <Tab eventKey="subject" title="Subject Wise Rank">
   
      <div className={`d-${this.state.spiner} pt-4 text-muted`}>
      <center> <Spinner animation="border" size="sm"/>&nbsp;&nbsp;Loading ...</center>
      </div>
 
  {this.state.specificStudentRankData.length>0?
  <Accordion defaultActiveKey="" className="p-2">
           {this.state.specificStudentRankData.map((mark) => (
           <Card className="m-1">
           <Card.Header className="m-0 p-0" style={{height:'40px'}}>
             <Accordion.Toggle
               className="w-100 h-100 border-0 m-0 p-0 text-left pl-2"
               variant="link"
               eventKey={mark.timeboundId}
             >
              Sem : {mark.sem} | Subject : {mark.subject}
             </Accordion.Toggle>
           </Card.Header>
           <Accordion.Collapse eventKey={mark.timeboundId}>
             <Card.Body>
              {
                mark!=null&&mark.rankIds.length>0?
                <Table className="container w-50">
                <thead>
                  <tr>
                    <td >Rank</td>
                    <td style={{paddingLeft:"5vw"}}>Name</td>
                    <td>Marks</td>
                  </tr>
                </thead>
        <tbody>
          {mark.rankIds.sort().map((id)=>
              <tr  key={id}>
                <td className="pt-4">{
                this.state.allStudentRankData[parseInt(id)].rank.substr(0, this.state.allStudentRankData[parseInt(id)].rank.indexOf("/"))}</td>
              <td className="text-left">
                <div className="d-flex">
                  <img src={this.state.allStudentRankData[parseInt(id)].imageUrl} className="rounded-circle" width="50" height="50" />
                  <p className="pl-2 pt-3">{this.state.allStudentRankData[parseInt(id)].name}
                    &nbsp;</p>
                </div>
  
              
            
              </td>
              <td className="pt-4">{this.state.allStudentRankData[parseInt(id)].total}/{this.state.allStudentRankData[parseInt(id)].outOfMarks}</td>
            </tr>
          )}
          <tr>
              {mark.total>0?
                <td className="text-center text-success" colSpan={3}>
              <h6>Your score : {mark.total}/{mark.outOfMarks}</h6>
                  <h6>Your Rank : {mark.rank}</h6>
              </td>:
              <td className="text-center text-danger" colSpan={3}>
              <h6>Your score : Not Applicable</h6>
                  <h6>Your Rank : Not Applicable</h6>
              </td>
            }
          </tr>
         
        </tbody>
      </Table>
      // </div>
                :<center>
                <div>
                <td className="text-center text-danger" colSpan={3}>
              <h6>Your score : Not Applicable</h6>
                  <h6>Your Rank : Not Applicable</h6>
              </td></div></center>
              }
   
             </Card.Body>
           </Accordion.Collapse>
         </Card>
))}  
      </Accordion>:
  <div className="container-fluid w-100 text-center" style={{height:'15vw',paddingTop:'5vw'}}><h6 >{this.state.notRecordFoundText}</h6></div>
    }
  </Tab>

</Tabs>
<div className="mt-2 ml-2">
<h6>How Your Rank is Calculated:</h6>
<ul>
<li>There is one leaderboard for every subject in the term of your program.</li>
<li>This leaderboard will display the names and scores of the top 5 ranked students.</li>
<li>The leaderboard will also display where you stand (your rank) among your fellow students in that same subject of the term.</li>
<li>You will see your rank only if you have cleared the subject on the very first attempt as per your term registration month and year.</li>
<li>The scores are calculated based on the IA and TEE marks obtained in the subject, out of 100.</li>
<li>A group of students having the same subject, term registration month/year, program and program structure is considered as a batch for rank calculation.</li>
</ul>
	</div>
        </>
      );
  }
}

const mapStateToProps = state => {
  return {
    consumerProgramStructureId: state.consumerProgramStructureId
  };
};

export default connect(mapStateToProps)(analyticsManager(Rank));
