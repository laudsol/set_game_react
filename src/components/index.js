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
            successFailText: ''
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

    createCardCode(card){
        let code = Object.keys(card).map(attribute => {
            if(typeof(card[attribute]) === 'string'){
                return card[attribute].slice(0,1)
            } else {
                return card[attribute]
            }
        }).join('')
    }

    selectCardForSet = (selectedCard) => {
        let previousState = this.state
        let selectedCardCode = this.createCardCode(selectedCard)

        previousState.displayedCards.map(card => {
            if(selectedCardCode === this.createCardCode(card)){
                return selectedCard
            } else {
                return card
            }
        })

        this.setState(previousState)
    }

    getSelectedCards(){
        return this.state.displayedCards.filter(card => !!card.isSelected)
    }

    evaluateSet = () => {
        let selectedCards = this.getSelectedCards()
        let previousState = this.state

        if(selectedCards.length !== 3){
            previousState.successFailText = 'Woops! A set must contain exactly 3 cards. Please try again!'
            this.setState(previousState)
            return 
        }

        let card1 = selectedCards[0]
        let card2 = selectedCards[1]
        let card3 = selectedCards[2]

        let numberCheck = this.checkNumbers(card1, card2, card3)
        let colorCheck = this.checkColors(card1, card2, card3)
        let shapeCheck = this.checkShapes(card1, card2, card3)
        let fillCheck = this.checkFill(card1, card2, card3) 

        if(numberCheck && colorCheck && shapeCheck && fillCheck){
            previousState.successFailText = 'Congratulations! You have selected a valid set!'
        } else {
            previousState.successFailText = 'Unfortunately this is not a valid set. Please try again!'
        }
        this.setState(previousState)
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
            if(card2.fill === card3.fill){
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
                    successFailText={this.state.successFailText}
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