import React from 'react'
import CardTable from './CardTable'
import SetButton from './SetButton'
import cardData from '../assets/cardData'
import Score from './Score'

class SetGame extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cardArr: '',
            displayedCards: [],
            allPlayedCardIndexes: [],
            successFailText: '',
            score: 0
        };
    }

    componentWillMount(){
        this.setState({cardArr: cardData.cardArr})
    }


    componentDidMount(){
        this.setInitialCards()
    }

    setInitialCards(){
        let previousState = this.state
        
        for(let i = 0; i < 12; i++){
            let cardArr = previousState.cardArr
            let randomIndex = this.generateNewCardIndex(cardArr)
            let newCard = cardArr[randomIndex]
            previousState.cardArr = this.removeOldCard(cardArr, randomIndex)
            previousState.displayedCards.push(newCard)    
        }

        this.setState(previousState)
    }

    generateNewCardIndex(cardArr){
        return Math.round(Math.random()*(cardArr.length-1))
    }

    removeOldCard(cardArr, index){
        return cardArr.slice(0,index).concat(cardArr.slice(index+1,cardArr.length))
    }

    createCardCode(card){
        let code = Object.keys(card).map(attribute => {
            if(typeof(card[attribute]) === 'string'){
                return card[attribute].slice(0,1)
            } else {
                return card[attribute]
            }
        }).join('')
        return code
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
        return this.state.displayedCards
            .map((card,i) => {return {cardInfo: card, index: i}})
            .filter(card => !!card.cardInfo.isSelected)
    }

    evaluateSet = () => {
        let selectedCards = this.getSelectedCards()
        let previousState = this.state

        if(selectedCards.length !== 3){
            previousState.successFailText = 'Woops! A set must contain exactly 3 cards. Please try again!'
            this.setState(previousState)
            return 
        }

        let card1 = selectedCards[0].cardInfo
        let card2 = selectedCards[1].cardInfo
        let card3 = selectedCards[2].cardInfo

        let numberCheck = this.checkNumbers(card1, card2, card3)
        let colorCheck = this.checkColors(card1, card2, card3)
        let shapeCheck = this.checkShapes(card1, card2, card3)
        let fillCheck = this.checkFill(card1, card2, card3) 

        if(numberCheck && colorCheck && shapeCheck && fillCheck){
            previousState.successFailText = 'Congratulations! You have selected a valid set!'
            previousState.score += 1
            selectedCards.forEach(card => {
                let cardArr = previousState.cardArr
                let randomIndex = this.generateNewCardIndex(cardArr)
                let newCard = cardArr[randomIndex]
                previousState.cardArr = this.removeOldCard(cardArr, randomIndex)
                previousState.displayedCards[card.index] = newCard
            })
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
        console.log(this.state.displayedCards)
        return (
            <div>
                <Score
                    currentScore={this.state.score}
                />
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