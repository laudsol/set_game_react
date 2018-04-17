import React from 'react'

class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    // componentDidMount(){
    //     this.setState({cardData: this.props.cardData})
    // }

    classNameBuilder(cardData){
        let shapeColorName = ''
        let colorName = cardData.color.split('')
        
        shapeColorName += cardData.fill
        for(let i = 0; i < colorName.length; i++){
            if(i === 0){
                shapeColorName += colorName[i].toUpperCase()
            } else {
                shapeColorName += colorName[i]
            }
        }
        return `${cardData.shape} ${shapeColorName}`
    }

    buildCardShapes(){
        let shapesArray = []
        let cardData = this.props.cardData

        while(shapesArray.length < cardData.number){
            let formattedClassName = this.classNameBuilder(cardData)
            let div = <div className={formattedClassName}></div>
            shapesArray.push(div)
        }
        return shapesArray
    }

    selectCardForSet(){
        let cardData = this.props.cardData  
        if(!!cardData.isSelected){
            cardData.isSelected = false
        } else {
            cardData.isSelected = true
        }

        this.props.selectCardForSet(cardData)
    }

    isSelected(){
            return !!this.props.cardData.isSelected? "Card isSelected" : 'Card'
    }

    render() {
        return (
            <div className={this.isSelected()} onClick={()=> this.selectCardForSet()}>
                <div className="shapeContainer">
                    {this.buildCardShapes()}
                </div>    
            </div>
        )
    }    
}

export default Card