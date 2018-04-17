import React from 'react'

class Score extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                Score: {this.props.currentScore}
            </div>
        )
    }    
}

export default Score