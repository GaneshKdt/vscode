import React, { Component } from 'react';
 
import 'material-design-icons/iconfont/material-icons.css';
import './SnackBarAlert.css';

class SnackBarAlert extends Component {
    state = {
        open: true,
        background: "blue",
        showSnackBar : "showSnackBar"
      };
    
      componentDidMount(){
        console.log('In SnackBarAlert componentDidMount()...');
        
        switch(this.props.type) {
            case "success":
              this.setState({
                  background : "bg-success"
              })
              break;
            case "error":
              this.setState({
                  background : "bg-danger"
              })
              break;
            default:
            this.setState({
                background : "bg-secondary"
            })
          }

        setTimeout(
            function() {
                console.log('In SnackBarAlert setTimeout()...');
                this.setState({
                    open: false,
                    showSnackBar : ""
                })
                this.props.hideSnackBar()
            }
            .bind(this),
            5000
        );
     }
    
    
  render() { 
    const { open } = this.state;
      return <div className ="">
       
       <div className={"snackbar snackbarShadow "+this.state.showSnackBar+" "+this.state.background}  >
       
      {
        (() => {
        switch(this.props.type) {
            case "success":
              return <span> <i className="material-icons">check_circle</i> </span>  
              break;
            case "error":
            return <span> <i className="material-icons">error</i> </span>
              break;
            default:
            return <span> <i className="material-icons">warning</i> </span>
          }
        })()
        }
       {this.props.message}
       <a
            onClick={() => { this.setState({ showSnackBar : "" }) }}
            style={ {float:'right', marginLeft: '10px', marginRight: '5px', cursor : 'pointer'} }
        >
        <i className="material-icons  ">close</i>
        </a>
       </div>

        
      </div>;
    
  }
}

export default SnackBarAlert;