import React from 'react'
import { Button } from 'react-bootstrap'

class SubmitSetButton extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    evaluateSet(){
        this.props.evaluateSet()
    }

    render() {
        return (
            <div className="setButtonContainer">
                <div className="successFailText">{this.props.successFailText}
                </div>
                <Button bsStyle="primary" bsSize="large" onClick={()=> this.evaluateSet()}>
                    Submit Set
                </Button>
            </div>
        )
    }    
}

export default SubmitSetButton