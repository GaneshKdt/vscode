import React from 'react';

class Footer extends React.Component{
    render(){
        return(
            <div>
            <div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
             <div className="modal-dialog modal-lg">
               <div className="modal-content">
                 <div className="modal-header">
                   <h5 className="modal-title h4" id="myLargeModalLabel">Schedule Audio Call</h5>
                   <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">×</span>
                   </button>
                 </div>
                 <div className="modal-body" >
                     <div className="container">
                       <div className="row">
                           <div className='col-sm-6'>
                               <div className="form-group">
                                   <label for="volunteer" className="col-form-label">Faculty :</label>
                                   <select className="form-control" id="volunteer">
                                       <option>Deepak Guptha</option>
                                       <option>Puja Basun</option>
                                       <option>Brindha Sampath</option>
                                       <option>Kalli Charan</option>
                                       <option>Purva Sha</option>
                                   </select>
                               </div>
                           </div>
                          </div>
                          <div className="row">
                           <div className='col-sm-6'>
                               <div className="form-group">
                                    <label for="datepicker" className="col-form-label">Date:</label>
                                   <input type='text' id="datepicker" className="form-control" />
                               </div>
                           </div>
                           <div className='col-sm-6'>
                               <div className="form-group">
                                    <label for="timepicker3" className="col-form-label">Time:</label>
                                    <input id="timepicker3" type="text" className="form-control"/>
                               </div>
                           </div>
                       </div>
                       <div className="row">
                           <div className='col-sm-2 ml-auto'>
                               <button type="button" data-dismiss="modal" aria-label="Close" className="btn btn-success rounded">Submit</button>
                           </div>
                       </div>
                   </div>	
                 </div>
               </div>
             </div>
           </div>
               <div className="menu pmd-floating-action" role="navigation"> 
                   <a href="javascript:void(0);" className="pmd-floating-action-btn btn btn-sm pmd-btn-fab pmd-btn-raised pmd-ripple-effect btn-default" data-title="Post"> 
                       <span className="pmd-floating-hidden">Post</span>
                       <i className="material-icons">edit</i> 
                   </a> 
                   <a href="javascript:void(0);" className="pmd-floating-action-btn btn btn-sm pmd-btn-fab pmd-btn-raised pmd-ripple-effect btn-default" data-title="Chat"> 
                       <span className="pmd-floating-hidden">Chat</span> 
                       <i className="material-icons">chat</i> 
                   </a> 
                   <a href="javascript:void(0);" data-toggle="modal" data-target=".bd-example-modal-lg" className="pmd-floating-action-btn btn btn-sm pmd-btn-fab pmd-btn-raised pmd-ripple-effect btn-default" data-title="Audio Call"> 
                       <span className="pmd-floating-hidden">Audio Call</span> 
                       <i className="material-icons">call</i> 
                   </a> 
                   <a href="javascript:void(0);" data-toggle="modal" data-target=".bd-example-modal-lg" className="pmd-floating-action-btn btn btn-sm pmd-btn-fab pmd-btn-raised pmd-ripple-effect btn-default" data-title="Video Call"> 
                       <span className="pmd-floating-hidden">Video Call</span> 
                       <i className="material-icons">video_call</i> 
                   </a> 
                   <a href="javascript:void(0);" className="pmd-floating-action-btn btn pmd-btn-fab pmd-btn-raised pmd-ripple-effect btn-primary" data-title="Add"> 
                       <span className="pmd-floating-hidden">Primary</span>
                       <i className="material-icons pmd-sm">add</i> 
                   </a> 
               </div> 
               </div>          
        )
    }
}

export default Footer;
