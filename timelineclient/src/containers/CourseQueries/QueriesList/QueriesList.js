import React, { Component } from 'react'
import { Accordion } from 'react-bootstrap'

import Query from './Query'

export class QueriesList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            queries
        } = this.props

        return(
            <div className="mx-2">
                <Accordion defaultActiveKey="0">
                    {
                        queries.map((query, index) => {
                            if(query.query){
                                return (
                                    <Query 
                                        query   = {query} 
                                        key     = { `QueryAnswer${index+1}` }
                                        type    = {this.props.type}
                                        index   = {index+1}
                                    />
                                )
                            }
                        })
                    }
                </Accordion>
            </div>
        )
    }
}

export default QueriesList