import React, { Component } from 'react'
import Card from './Card'
import './CardList.css'

const BOX_NUMBER = 16;
const CardState = {
    HIDING: 0,
    SHOWING: 1,
    MATCHING: 2
  }

  
export default class CardList extends Component {
    constructor(props) {
        super(props)
        
        const colorList =  randomColors(BOX_NUMBER, this.props.allColors);
        let initCards = Array(BOX_NUMBER).fill().map((val, index) => {
            return {id: index, cardState: CardState.HIDING, color: 'grey'}
        })
        let shuffeldCards = this.shuffleCards(initCards, colorList);

        this.state = {
            cards: shuffeldCards, 
            clickCounter: 0
        }

        this.handleCardClick = this.handleCardClick.bind(this)
    }

    shuffleCards(cards, allColors) {
        let colorArray = Array(cards.length).fill().map((val,index) => {
            return allColors[index % (cards.length / 2 )]
        })
        const shuffledCards = cards.map((card, index) => {
            const randomColorIndex = Math.floor(Math.random() * colorArray.length)
            card.color = colorArray[randomColorIndex]
            colorArray.splice(randomColorIndex,1)
            card.cardState = 0
            return card
        })
        return shuffledCards
    }

    setCards(state) {
        const setCards = this.state.cards.map(card => {
            if (card.cardState === CardState.SHOWING) {
                card.cardState = state
                return card
            } else {
                return card
            }
        })
        this.setState({cards: setCards})
    }

    handleCardClick(id) {
        const updateCardList = this.state.cards.map(card => {
            if (card.id === id) {
                card.cardState = 1;
                return card
            } else {
                return card
            }
        })

        let counter = this.state.clickCounter + 1;

        this.setState({cards: updateCardList, clickCounter: counter},
            (() => {
                if (counter === 2) {
                    const showingCards = this.state.cards.filter(card => {
                        return card.cardState === 1
                    })
                    if (showingCards[0].color === showingCards[1].color) {
                        this.setCards(CardState.MATCHING)
                    } else {
                        setTimeout(() => {
                            this.setCards(CardState.HIDING)
                        },500)
                    }
                    this.setState({clickCounter:0})
                }
            })
        )
    }

    handleNewGame() {
        const {cards} = this.state;
        const colorList =  randomColors(BOX_NUMBER, this.props.allColors);
        const shuffeldCards = this.shuffleCards(cards, colorList);
        this.setState({cards: shuffeldCards, clickCounter: 0})
    }
    
    render() {
        const {cards} = this.state;

        if (this.props.newGame === true) {
            this.handleNewGame();
            this.props.updateNewGame();
        }
        
        return (
            <div className='cardList'>
                {cards.map(card => {
                    return (<Card key= {card.id} card={card} onClick={this.handleCardClick}/>)
                })}
            </div>
        )
    }
}

function randomColors(boxNumbers, allColors) {
    const randomColorsArray = [];
    for(let i=0; i < boxNumbers / 2; i++) {
        randomColorsArray[i] = allColors[Math.floor(Math.random() * allColors.length)]
    }
    return randomColorsArray;
}

CardList.defaultProps = {
    allColors: ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond",
              "Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate",
              "Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod",
              "DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange",
              "DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey",
              "DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue",
              "FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod",
              "Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki",
              "Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan",
              "LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon",
              "LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow",
              "Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid",
              "MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise",
              "MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy",
              "OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen",
              "PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue",
              "Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen",
              "SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen",
              "SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke",
              "Yellow","YellowGreen"]
}
