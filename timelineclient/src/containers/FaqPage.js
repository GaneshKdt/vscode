import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import {analyticsManager} from '../shared/Analytics'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Accordion } from "react-bootstrap";
import ConfigUrls from "../shared/config";

const urls = new ConfigUrls().urls;
const MBAWX_MASTERKEYS = ["111","151","160"];
const PDDM_MASTERKEYS = ["142","143","144","145","146","147","148","149","154","155"];
class FaqPage extends Component

{
    state={
        rows: [], // faq list which will display
        categoryid:"", // select category id
        subcatid:"", //  select subcategory id
        listofcategory:[],// list of categories
        listofsubcategory:[], // list of subcategories
        listofallfaq:[], // total list of faqs
        tempqueans:[], //


    }

    componentDidMount = () => {
        this.loadCategorylist();// category list load
        this.loadAllQueAnsList(); // loading all question and answers
        
    }
    
    loadCategorylist=()=>
    {
        let apiToCall = `${urls.apiUrl_web_studentPortal}/getFaqCategoryList`;
        axios.get(apiToCall).then(response=>{
         
            this.setState({
                listofcategory:response.data,
            })

        }).catch(function(error){
            console.log(error);
        })
    }

    loadAllQueAnsList = () => {
        let apiToCall;
        
        //if(this.props.program ==='MBA - WX'){
        if((MBAWX_MASTERKEYS.includes(this.props.consumerProgramStructureId))){
            apiToCall = `${urls.apiUrl_studentPortals}allfaqlist?faqid=2`;
        }
        else if(PDDM_MASTERKEYS.includes(this.props.consumerProgramStructureId)){
            apiToCall = `${urls.apiUrl_studentPortals}allfaqlist?faqid=7`;
        }
        else{
            apiToCall = `${urls.apiUrl_studentPortals}allfaqlist?faqid=3`;
        }
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(apiToCall).then(response =>{
            //console.log("hellooooo "+JSON.stringify(response.data))
            this.setState({
              listofallfaq : response.data,
              rows:response.data,
            })
    }).catch(function(error){
        console.log(error);
    })

    
}

categoryChange =(evt)=>{
//console.log("hello  "+evt.target.value);
const catid=evt.target.value;

if(catid=="")
{
this.setState({
    rows:this.state.listofallfaq,
    categoryid:catid,
    subcatid:"",
    listofsubcategory:[],
})
}
else
{
this.setState({
    categoryid:catid,
    subcatid:"",
    listofsubcategory:[],
})

let apiToCall = `${urls.apiUrl_web_studentPortal}getSubFaqCategoryList?categoryid=${catid}`;
axios.get(apiToCall).then(response=>{
         
    this.setState({
        listofsubcategory:response.data,
    })

    this.filterbasefaq(catid,this.state.subcatid);

}).catch(function(error){
    console.log(error);
})
}
}

filterbasefaq=(catid,subcatid)=>{
    let apiToCall;
   // if(this.props.program ==='MBA - WX'){
    if((MBAWX_MASTERKEYS.includes(this.props.consumerProgramStructureId))){
        apiToCall = `${urls.apiUrl_studentPortals}/filterfaqlist?groupid=2&catid=${catid}&subcatid=${subcatid}`;
    }
    else{
        apiToCall = `${urls.apiUrl_studentPortals}/filterfaqlist?groupid=3&catid=${catid}&subcatid=${subcatid}`;
    }

    axios.defaults.headers.post['Content-Type'] = false;
    axios.post(apiToCall).then(response =>{

        this.setState({
            rows:response.data,
        })

    }).catch(function(error)
    {
        console.log(error);
    })


}

    render(){
        const items = [];
        const catlist =[];
        const subcatlist=[];

        {this.state.listofcategory.forEach((obj,index)=>catlist.push(
            
            <option value={obj.id}>{obj.categoryname}</option>
        ))}

        {this.state.listofsubcategory.forEach((obj,index)=>subcatlist.push(
            
            <option value={obj.id}>{obj.subCategoryName}</option>
        ))}

        //console.log("rowsss "+JSON.stringify(this.state.rows));
        {this.state.rows.forEach((obj,index)=>items.push(
            
            <Queslist que={obj.question} ans={obj.answer} id={index} />
        ))}
        return (
            <Container>
            <Card>
            <Card.Body>
         
            <Card.Header className="cardHeader">
            Frequently Ask Questions 
            </Card.Header>
            <select className="custom-select mt-3" id="categoryid" onChange={this.categoryChange}>
    <option selected value="">Question Related to...</option>
    {catlist}
  </select>
  <select className="custom-select mt-4" id="subcategoryid" onChange={(e)=>{this.setState({subcatid:e.target.value}); this.filterbasefaq(this.state.categoryid,e.target.value); }} >
    <option selected value="">Choose SubCategory Of Question..</option>
{subcatlist}
  </select>
  <Accordion className="mt-4">
                {items}
                
</Accordion>
            </Card.Body>
            </Card>
            </Container>

        )
    }
}
const Queslist=({que,ans,id }) =>(
    
    <Card>
    <Accordion.Toggle as={Card.Header} eventKey={id+1}>
       Q.{id+1} {que}
    </Accordion.Toggle>

    <Accordion.Collapse eventKey={id+1}>
        <Card.Body>
          <Card.Text dangerouslySetInnerHTML = {{__html: ans}} style = {{textAlign: 'left'}} />
         </Card.Body>
    </Accordion.Collapse>
</Card>
    /*<div className="panel panel-default">
    <h1>{console.log(que)}</h1>
        <div className="panel-heading accordion-toggle question-toggle collapsed" data-toggle="collapse" data-parent="#faqAccordion" data-target={`#que${id}`}>
             <h4 className="panel-title ">
                <button  className="btn  btn-light nav-link ">Q: {`${que}`}</button>
          </h4>

        </div>
        <div id={`que${id}`} className="panel-collapse collapse" style={{height: "0px"}}>
            <div className="panel-body border border-info">
            <div className="card">
                <div className="card-body">
  <h5><span className="label label-primary">Answer</span></h5>

                <p className="">{`${ans}`}
                    </p>
                </div>
            </div>
               
            </div>
        </div>
    </div>*/
);

const mapStateToProps = state => {
    return {
        consumerProgramStructureId: state.consumerProgramStructureId,
        //program: state.program
    }
}

 export default connect(mapStateToProps)(analyticsManager(FaqPage))

//  export default 