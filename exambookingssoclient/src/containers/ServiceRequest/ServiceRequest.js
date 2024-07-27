import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PageContent from "../../components/PageContent/PageContent";
import { Card, Button, FormLabel } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import AxiosHandler from "../../shared/AxiosHandler/AxiosHandler";
import { API } from '../../shared/config'
     
const CHECK_FINAL_CERTIFICATE_ELIGIBILITY =  API.checkFinalCertificateEligibility
const SR_ISSUANCE_OF_FINAL_CERTIFICATE = "Issuance of Final Certificate"
const useStyles = makeStyles(theme => ({
     formControl: {
          margin: theme.spacing(1),
          width: "100%", // Fix IE 11 issue.
          // marginTop: theme.spacing(1),
          marginTop: 25
     },
     card: {
          margin: theme.spacing(10),
          padding: theme.spacing(10),
          marginTop: theme.spacing(8),
          display: "flex",
          flexDirection: "column"
          // alignItems: 'center',
     },
     selectSR: {
          margin: theme.spacing(1),
          minWidth: 250,
          marginTop: theme.spacing(5)
     },
     proceed: {
          margin: theme.spacing(3, 0, 2),
          width: 250,
          marginTop: theme.spacing(10)
     },
     srLabel: {
          marginRight: theme.spacing(20)
     }
}));

function ServiceRequest(props) {
     const classes = useStyles();
     const [srType, setSrType] = React.useState("");

     const [srList, setSrList] = React.useState(["Program De-Registration", "Gradesheet", "Issuance of Final Certificate", "Issuance of Transcript","Issuance of Bonafide"]);

     const inputLabel = React.useRef(null);
     const [labelWidth, setLabelWidth] = React.useState(0);



     React.useEffect(() => {
          setLabelWidth(inputLabel.current.offsetWidth);
     }, []);

     const handleChange = event => {
          setSrType(event.target.value);
     };

     const proceedSR = function() {
          if (srType == "Program De-Registration") {
               props.history.push({
                    pathname: "programDereg"
               });
          }
          if (srType == "Gradesheet") {
               props.history.push({
                    pathname: "gradesheet"
               });
          }

          if (srType == "Issuance of Final Certificate"){

               props.history.push({
                    pathname: "issuanceFinalCert"
               })
          }

          if (srType == "Issuance of Transcript"){

               props.history.push({
                    pathname: "issuanceTranscript"
               })
          }
          if (srType == "Issuance of Bonafide"){

               props.history.push({
                    pathname: "issuanceOfBonafide"
               })
          }


          console.log(" Issuance of Final Certificate called")
          console.log(CHECK_FINAL_CERTIFICATE_ELIGIBILITY)
          // {
          //      AxiosHandler.AxiosPostHandler({
          //           url: CHECK_FINAL_CERTIFICATE_ELIGIBILITY,
          //           data:{
          //               sapId: props.sapid,
          //               serviceRequestType: SR_ISSUANCE_OF_FINAL_CERTIFICATE,
          //               productType: "MBAX"
          //           },
          //           successCallBack:(success) =>{
          //               //console.log(success)
          //               if (!success.data.error) {


               
          //               }else{
          //                   alert(success.data.error)
          //               }
          //           },
          //           failureCallBack:(failure) =>{
          //               //console.log(failure)
          //               alert("You have not cleared all Subjects!")     
           
          //           },
          //       })
          
          // }
          





     };
     return (
          <PageContent
               id="servicerequest"
               title="Service Request"
               loaded={true}
               error={false}
               loadingMessage="Loading..."
               errorMessage={"false"}
          >
               <Card className={classes.card}>
                    <Row>
                         <Col sm={5}>
                              <FormControl className={classes.formControl}>
                                   <FormLabel className={classes.srLabel}>
                                        Select Service Request
                                   </FormLabel>
                              </FormControl>
                         </Col>

                         <Col sm={12} md={"auto"}>
                              <FormControl variant="outlined" className={classes.selectSR}>
                                   <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                                        Service Request Type
                                   </InputLabel>
                                   <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={srType}
                                        onChange={handleChange}
                                        labelWidth={labelWidth}
                                   >
                                        {srList.map((item, index) => (
                                             <MenuItem key={index} value={item}>
                                                  {item}
                                             </MenuItem>
                                        ))}
                                   </Select>
                              </FormControl>
                         </Col>
                    </Row>
                    <Row>
                         <Col sm={5}></Col>
                         <Col sm={12} md={"auto"}>
                              <Button
                                   onClick={proceedSR}
                                   type="submit"
                                   fullWidth
                                   variant="contained"
                                   color="primary"
                                   className={classes.proceed}
                              >
                                   Proceed
                              </Button>
                         </Col>
                    </Row>
               </Card>
          </PageContent>
     );
}

const mapStateToProps = state => {
     return {
          title: state.currentPageTitle,
          imageUrl: state.imageUrl,
          name: `${state.firstName} ${state.lastName}`,
          sapid: state.sapid
     };
};

export default connect(mapStateToProps)(withRouter(ServiceRequest));
