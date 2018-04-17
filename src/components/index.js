import React from 'react'
import CardTable from './CardTable'
import SetButton from './SetButton'
import cardData from '../assets/cardData'

class SetGame extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cardArr: '',
            displayedCards: [],
            allPlayedCardIndexes: [],
            selectedCards: []
        };
    }

    componentWillMount(){
        this.setState({cardArr: cardData.cardArr})
    }


    componentDidMount(){
        this.setInitialCards()
    }

    setInitialCards(){
        let cardIndexes = []
        let selectedCards = []

        while(selectedCards.length < 12){
            let cardIndex = Math.round(Math.random()*(this.state.cardArr.length-1))
            if(!cardIndexes.includes(cardIndex)){
                cardIndexes.push(cardIndex)
                selectedCards.push(this.state.cardArr[cardIndex])
            }
        }

        let previousState = this.state
        previousState.displayedCards = selectedCards
        previousState.allPlayedCardIndexes = cardIndexes
        this.setState({previousState})
    }

    selectCardForSet = (card) => {
        let cardCode = Object.keys(card).map(attribute => {
            if(typeof(card[attribute]) === 'string'){
                return card[attribute].slice(0,1)
            } else {
                return card[attribute]
            }
        }).join('')

        card.cardCode = cardCode

        let previousState = this.state
        let cardAlreadySelected = false
        
        previousState.selectedCards.forEach((card, i) => {
            if(card.cardCode === cardCode){
                cardAlreadySelected = true
                previousState.selectedCards.splice(i, 1)
            }
        })

        if(!cardAlreadySelected){
            previousState.selectedCards.push(card)
        }

        this.setState(previousState)
    }

    evaluateSet = () => {
        let selectedCards = this.state.selectedCards
        let card1 = selectedCards[0]
        let card2 = selectedCards[1]
        let card3 = selectedCards[2]

        let numberCheck = this.checkNumbers(card1, card2, card3)
        let colorCheck = this.checkColors(card1, card2, card3)
        let shapeCheck = this.checkShapes(card1, card2, card3)
        let fillCheck = this.checkFill(card1, card2, card3) 

        if(numberCheck && colorCheck && shapeCheck && fillCheck){
            console.log('its a set!!!')
            return true
        } else {
            console.log('its NOT a set :(')
            return false
        }
    }

    checkNumbers(card1, card2, card3) {
        let sumNumbers = card1.number + card2.number + card3.number
        
        if(sumNumbers % 3 === 0){
            return true
        } 
        
        return false
    }
    
    checkColors(card1, card2, card3) {
        let matchingColors = card1.color === card2.color
        
        if(matchingColors){
            if(card2.color === card3.color){
                return true
            }
        } else {
            if (card3.color !== card1.color && card3.color !== card2.color){
                return true
            }
        }
    
        return false    
    }
    
    checkShapes(card1, card2, card3) {
        let matchingShapes = card1.shape === card2.shape
        
        if(matchingShapes){
            if(card2.shape === card3.shape){
                return true
            }
        } else {
            if (card3.shape !== card1.shape && card3.shape !== card2.shape){
                return true
            }
        }
    
        return false    
    }
    
    checkFill(card1, card2, card3){
        let matchingFill = card1.fill === card2.fill
        
        if(matchingFill){
            if(card2.fill === card3.hfill){
                return true
            }
        } else {
            if (card3.fill !== card1.fill && card3.fill !== card2.fill){
                return true
            }
        }
    
        return false    
    }
    

    render() {
        return (
            <div>
                <SetButton
                    evaluateSet={this.evaluateSet}
                />
                <CardTable
                    activeCards={this.state.displayedCards}
                    selectCardForSet={this.selectCardForSet}
                />
            </div>
        )
    }    
}

export default SetGame