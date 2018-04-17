import React from 'react'
import { Button } from 'react-bootstrap'

class AddCardsButton extends React.Component{
    addCards(amount){
        this.props.addCards(amount)
    }

    render() {
        return (
                <Button bsStyle="primary" bsSize="large" onClick={()=> this.addCards(3)}>
                    Add More Cards
                </Button>
        )
    }    
}

export default AddCardsButton