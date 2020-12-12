import React, { Component } from 'react'
import './Card.css'

export default class Card extends Component {
    render() {
        const {cardState, color, id} = this.props.card;
        const {onClick: handleCardClick} = this.props;
        let backgroundColor = 'grey'
        if (cardState === 1 || cardState === 2) {
            backgroundColor = color
        }

        return (
            <div className='card' 
                 style={{backgroundColor:`${backgroundColor}`}}
                 onClick={() => handleCardClick(id)}
            >
            </div>
        )
    }
}
