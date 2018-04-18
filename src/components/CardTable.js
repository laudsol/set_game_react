import React from 'react'
import Card from './Card'

class CardTable extends React.Component{

    generateActiveCards(){
        let cardHolder = []

        this.props.displayedCards.forEach(card => {
            cardHolder.push(<Card 
                    cardData={card}
                    selectCardForSet={this.props.selectCardForSet} 
                />)
        })
        return cardHolder
    }

    tableWidth(){
        let width = (this.props.displayedCards.length / 3 * 170) + 50
        return `${width}px`
    }

    render() {
        return (
            <div className="CardTable" style={{width: this.tableWidth()}}>
                {this.generateActiveCards()}
            </div>
        )
    }    
}

export default CardTable