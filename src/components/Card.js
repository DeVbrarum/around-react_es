import React from "react";
import trashIcon from '../images/Icons/trash.png';
import heartIcon from '../images/Icons/wheart.png';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }


    return (
        <div key={props.card._id} className="photos__template">
            <div className="photos__content">
                <button className="photos__trash-button">
                    <img
                        src={trashIcon}
                        alt="trash icon"
                        className="photos__trash-icon"
                    />
                </button>
                <button className="photos__imgPopup-button" onClick={handleClick}>
                    <img src={props.card.link} alt={props.card.name} className="photos__img" />
                </button>
                <div className="photos__info">
                    <h2 className="photos__title">{props.card.name}</h2>
                    <div className="photos__like-countainer">
                        <button className="photos__like-button">
                            <img
                                src={heartIcon}
                                alt="icon like heart"
                                className="icon_like-heart"
                            />
                        </button>
                        <div className="photos__like-count">{props.card.likes.length}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;