import { Button, Card, CardHeader } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { amber, green } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PageContent from "../../components/PageContent/PageContent";
import AxiosHandler from "../../shared/AxiosHandler/AxiosHandler";
import { API } from "../../shared/config";
import "./ProgramDereg.css";


const SR_SEM_DEREG = "Term De-Registration"




const variantIcon = {
     success: CheckCircleIcon,
     warning: WarningIcon,
     error: ErrorIcon,
     info: InfoIcon
};

const useStyles = makeStyles(theme => ({
     formControl: {
          margin: theme.spacing(1),
          width: "100%" // Fix IE 11 issue.
          // marginTop: theme.spacing(1),
          // marginTop: 25
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
          minWidth: 250
          //   marginTop: theme.spacing(5),
     },
     proceed: {
          margin: theme.spacing(3, 0, 2),
          width: 250,
          marginTop: theme.spacing(10)
     },
     srLabel: {
          marginRight: theme.spacing(20)
     },
     success: {
          backgroundColor: green[600]
     },
     error: {
          backgroundColor: theme.palette.error.dark,
          marginTop: "12%"
     },
     info: {
          backgroundColor: theme.palette.primary.main
     },
     warning: {
          backgroundColor: amber[700]
     },
     icon: {
          fontSize: 20
     },
     iconVariant: {
          opacity: 0.9,
          marginRight: theme.spacing(1)
     },
     message: {
          display: "flex",
          alignItems: "center"
     },
     margin: {
          margin: theme.spacing(1)
     },
}));

MySnackbarContentWrapper.propTypes = {
     className: PropTypes.string,
     message: PropTypes.string,
     onClose: PropTypes.func,
     variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired
};

function MySnackbarContentWrapper(props) {
     const classes = useStyles();
     const { className, message, onClose, variant, ...other } = props;
     const Icon = variantIcon[variant];

     return (
          <SnackbarContent
               className={clsx(classes[variant], className)}
               aria-describedby="client-snackbar"
               message={
                    <span id="client-snackbar" className={classes.message}>
                         <Icon className={clsx(classes.icon, classes.iconVariant)} />
                         {message}
                    </span>
               }
               action={[
                    <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                         <CloseIcon className={classes.icon} />
                    </IconButton>
               ]}
               {...other}
          />
     );
}

function ProgramDereg(props) {
     const classes = useStyles();

     const [loadSpinner, setLoadSpinner] = React.useState(false);
     const [dialogOpen, setDialogOpen] = React.useState(false);

     const [studentRegDetails, setStudentRegDetails] = React.useState([]);
     const [responseData, setResponseData] = React.useState([]);

     const [error, setError] = React.useState(null)
     const [open, setOpen] = React.useState(false)
     const [forward, setForward] = React.useState(false)
     const [pdError, setPdError] = React.useState(null)
     const [reasonForDereg, setReasonForDereg] = React.useState(null)
     const [errors,setErrors] = React.useState(
          {}
     )

     // const []

     const handleDialogClose = () => {
          setDialogOpen(false);
     };

     const handleDialogDisagree = () => {
          setDialogOpen(false);
     };

     const handleDialogAgree = () => {
          setDialogOpen(false);
          saveProgramDereg();
     };

     const handleClose = (event, reason) => {
          setOpen(false);
     };

     const backToSR = event => {
          props.history.push("serviceRequest");
     };

     const confirmProgramDeregDialog = function() {
          console.log("confirmProgramDeregDialog Here")
          console.log(error)
          console.table(studentRegDetails)


          if ((error === null || error === "") && studentRegDetails.length > 0) {
               console.log("confirmProgramDeregDialog");

               setDialogOpen(true);
               console.log(dialogOpen)
          } else{
               alert(error)
          }
     };

     const saveProgramDereg = function() {
          if ((error === null || error === "") && studentRegDetails.length > 0) {
               setLoadSpinner(true);
               var registrationDetails = studentRegDetails[0];
               AxiosHandler.AxiosPostHandler({
                    url: API.saveProgramDeRegistration,
                    data: {
                         sapId: props.sapid,
                         serviceRequestType: "Program De-Registration",
                         program: registrationDetails.program,
                         month: registrationDetails.month,
                         year: registrationDetails.year,
                         sem: registrationDetails.sem,
                         additionalInfo1 : registrationDetails.reasonForDereg,

                    },
                    successCallBack: response => {
                         setLoadSpinner(false);
                         setPdError(null);
                         setResponseData(response.data);
                         setForward(true);
                    },
                    failureCallBack: error => {
                         setPdError("Error in saving service request");
                         setLoadSpinner(false);
                    }
               });
          }
     };

     const serviceRequestFee = function() {
          console.log(props.sapid);
          setLoadSpinner(true);
          AxiosHandler.AxiosPostHandler({
               url: API.serviceRequestFee,
               data: {
                    sapId: props.sapid,
                    serviceRequestType: "Program De-Registration",
                    productType: "MBAX"
               },
               successCallBack: response => {


                    console.log(response);
                    setLoadSpinner(false);
                    setOpen(true);
      
                    if (studentRegDetails === undefined && error === null) {
                         setError("Error in getting registration details.");
                    }
                    checkDeregSemEligibility();
               },
               failureCallBack: error => {

                    setError(error);
                    setLoadSpinner(false);
               }
          });
     };

     const checkDeregSemEligibility = function (){
          AxiosHandler.AxiosPostHandler({
              url: API.checkDeRegSemEligibility,
              data: {
                  sapId: props.sapid,
                  serviceRequestType: SR_SEM_DEREG,
                  productType: "MBAX"
              },
              successCallBack: (success) => {
                 if (!success.data.error) {
                      console.log("--->Can Raise Final Certificate SR")
                      //console.log(success)
  
                     let response = success
                     
                      console.log(JSON.stringify(response));
                      console.log(response.data.studentRegistrationList)
                      setStudentRegDetails(response.data.studentRegistrationList);
                      setError(response.data.error)
                      setLoadSpinner(false)
                      if (studentRegDetails === undefined && error === null) {
                         setError("Error in getting registration details.");
                       }
                    }else{
                      setError(success.data.error)     
                    }
              },
              failureCallBack: (failure) => {
                  ////console.log(failure)
                  setError("Please try again after some time!")
              },
          })
  
  
      }
      

      const   handleTextChange = (evt) => {

                  console.log("inside text change-------------",evt.target.name,'--',evt.target.value)
                  let field = {"name" : "reasonForDereg", "value" : evt.target.value, "type" : "mandatoryText"};
                  setReasonForDereg(evt.target.value)


                    if(!field.value){
                         setErrors([
                             ...errors,
                         {
                         "reasonForDereg" : "Field is mandatory"
                        }])
                     }
                     else{

                         setErrors([]) ;
                     }
         }
     const getDialogContent = function() {
       if(studentRegDetails){
          var registrationDetails = studentRegDetails[0];

          if (registrationDetails) {
               let program = registrationDetails.program;
               let sem = registrationDetails.sem;
               let month = registrationDetails.month;
               let year = registrationDetails.year;

               return (
                    <>
                         Program: {program}
                         <br />
                         Term: {sem}
                         <br />
                         Month / Year: {month}/{year}
                    </>
               );

          }
        }
     };
     useEffect(() => {
          serviceRequestFee();
     }, []);

     useEffect(() => {
          if (forward == true) {
               props.history.push({
                    pathname: "srCreated",
                    state: {
                         id: responseData.id,
                         reqType: responseData.serviceRequestType,
                         description: responseData.description,
                         sapId: responseData.sapId
                    }
               });
          }
     });

     return (
          <>
               {error && (
                    <Snackbar
                         anchorOrigin={{
                              vertical: "top",
                              horizontal: "center"
                         }}
                         open={open}
                         // autoHideDuration={6000}
                         onClose={handleClose}
                    >
                         <MySnackbarContentWrapper
                              onClose={handleClose}
                              variant="error"
                              message={error}
                         />
                    </Snackbar>
               )}
               {pdError && (
                    <Snackbar
                         anchorOrigin={{
                              vertical: "top",
                              horizontal: "center"
                         }}
                         open={open}
                         // autoHideDuration={6000}
                         onClose={handleClose}
                    >
                         <MySnackbarContentWrapper
                              onClose={handleClose}
                              variant="error"
                              message={pdError}
                         />
                    </Snackbar>
               )}
               <Dialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
               >
                    <DialogTitle id="alert-dialog-title">
                         {"Are you sure you want to de-register from Current Term?"}
                    </DialogTitle>
                    <DialogContent>
                         <DialogContentText id="alert-dialog-description">
                              Details : <br />
                              {getDialogContent()}
                         </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={handleDialogDisagree} color="primary">
                              Disagree
                         </Button>
                         <Button onClick={handleDialogAgree} color="primary" autoFocus>
                              Agree
                         </Button>
                    </DialogActions>
               </Dialog>
               <PageContent
                    id="servicerequest"
                    title="Service Request"
                    loaded={true}
                    error={false}
                    loadingMessage="Loading..."
                    errorMessage={"false"}
               >
                    <Card className={classes.card}>
                         <CardHeader title="Dear Student, You have chosen below Service Request." />
                         <Row>
                              <Col sm={5}>
                                   <FormControl className={classes.formControl}>
                                        <p className={classes.srLabel}>Service Request Type :</p>
                                   </FormControl>
                              </Col>

                              <Col sm={12} md={"auto"}>
                                   <FormControl variant="outlined" className={classes.selectSR}>
                                        <p className={classes.srLabel}>Program De-registration</p>
                                   </FormControl>
                              </Col>
                              {loadSpinner && <CircularProgress />}
                         </Row>
                         <Row>
                              <Col sm={5}>
                                   <FormControl className={classes.formControl}>
                                        <p className={classes.srLabel}>Charges :</p>
                                   </FormControl>
                              </Col>

                              <Col sm={12} md={"auto"}>
                                   <FormControl variant="outlined" className={classes.selectSR}>
                                        <p className={classes.srLabel}>Free</p>
                                   </FormControl>
                              </Col>
                         </Row>
                         <Row>
                                    <Form.Label column sm="4">
                                        Reason: 
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="textarea" name="reasonForDereg"  value={reasonForDereg} onChange={handleTextChange}/>
                                        {errors["reasonForDereg"] !== null ?
                                            <Form.Text className="text-muted"><span className="mandatory">{errors["reasonForDereg"]}</span></Form.Text>
                                        :null}
                                    </Col>
                                    </Row> 
                         <Row style={{ textAlign: "center", marginRight: "20%", marginLeft: "20%" }}>
                              <Col>
                                   <Button
                                        onClick={confirmProgramDeregDialog}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.proceed}
                                   >
                                        Save
                                   </Button>
                              </Col>
                              <Col>
                                   <Button
                                        onClick={backToSR}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className={classes.proceed}
                                   >
                                        Back to New Service Request
                                   </Button>
                              </Col>
                         </Row>
                    </Card>
               </PageContent>
          </>
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

export default connect(mapStateToProps)(withRouter(ProgramDereg));
