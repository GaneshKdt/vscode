// import React, { Component } from 'react'

// class StatusCard extends Component {
//     render() {
//         return (
//             <div>
//                 <div className="media">
//                     <img className="mr-3" src="{post.profilePicFilePath}" style="height:50px; width:50px;" alt="image" />
//                     <div className="media-body">
//                         <a href="#"><b>{post.firstName + " " + post.lastName}</b></a>
//                         <br />
//                         <small className="text-muted"><b>Faculty</b></small>
//                         <br />
//                         <small className="text-muted">{prettyDate(post.createdDate)}</small>
//                         <span className="action_menu_btn" style="float: right; color: #d9d9d9;"><i className="fas fa-ellipsis-h"></i></span>
//                     </div>
//                     <div className="action_menu">
//                         <ul>
//                             <li data-toggle="modal" data-target="#myModal" className="modal_show" data-post_id="{post.post_id}" data-type="{post.type}"
//                                 data-title="{post.subject}" data-content="{post.content}" data-fname="{post.fileName}"
//                                 data-heading="Edit Post"><i className="fas fa-share-square "></i> Edit</li>
//                             <li><a className="text-light no-underline" href="deletePost/'+post.post_id+'"><i className="fas fa-trash"></i> Delete</a></li>
//                             <li><i className="fas fa-ban"></i> Report...</li>
//                             <li><i className="fas fa-users"></i> Unfollow</li>
//                             <li><i className="far fa-eye-slash"></i> Hide Post</li>
//                             <li><i className="fas fa-share-square"></i> Share</li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="card-body">
//                     <div className="d-flex">
//                         <form id="preview_form" className="form-vertical" method="post" action=".">
//                             {post.content}
//                             <input type="hidden" name="url" className="id_url" value="{post.url}" />
//                             <div className="selector-wrapper"></div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         )
//     }

// }
// export default StatusCard