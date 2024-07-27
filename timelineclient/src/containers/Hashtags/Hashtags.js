import React, { Component } from 'react'
import './Hashtags.css'
import { LinkContainer } from 'react-router-bootstrap'
export class Hashtags extends Component {
    searchPost=()=>{

    }

    render() { 
       
        const tags =this.props.tags;
        if(tags.subject)tags.subject=tags.subject.trim()
        return (
            (tags.hashtags !=null) &&
            (tags.hashtags.length>2) &&
            <div className="tagsDiv">
                {tags.hashtags.split(',').map(tag => {
                    if(tags.subject!==tag.trim()){
                        return <LinkContainer className="tags"  to = {{
                            pathname : "/timeline/home",
                            searchParams: { 
                            keyword: tag.trim() 
                            } 
                        }}
                        ><span className="pl-1">
                            #{tag.replace(/ +/g, "").trim()} 
                            </span></LinkContainer>
                    }
                    
                })}

            </div>

        )
    }
}

export default Hashtags
