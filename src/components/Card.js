import React from 'react'

class Card extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }  
    
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

    
    render() {
        return (
            <div className="Card">
                <div className="shapeContainer">
                    {this.buildCardShapes()}
                </div>    
            </div>
        )
    }    
}

export default Card