import React, { useState } from "react";
import { ICardProps } from "../../interfaces";
import {
  CardBack,
  CardContainer,
  CardDescription,
  CardDetails,
  CardFront,
  CardImage,
  CardInner,
  CardName,
} from "./CardComponent.styles";

const CardComponent: React.FC<ICardProps> = ({
  name,
  description,
  imageUrl,
  type,
  purchaseValue,
  modifiers,
  isTradable,
  canAcceptModifiers,
  rarityTier,
  scalingLevel,
  quantity,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <CardContainer onClick={handleCardClick} isFlipped={isFlipped}>
      <CardInner isFlipped={isFlipped}>
        <CardFront>
          <CardImage src={imageUrl} alt={name} />
          <CardName>{name}</CardName>
          <CardDescription>{description}</CardDescription>
        </CardFront>
        <CardBack>
          <CardDetails>
            <p>
              <strong>Type:</strong> {type}
            </p>
            <p>
              <strong>Purchase Value:</strong> ${purchaseValue}
            </p>
            <p>
              <strong>Modifiers:</strong> {modifiers}
            </p>
            <p>
              <strong>Tradable:</strong> {isTradable ? "Yes" : "No"}
            </p>
            <p>
              <strong>Accepts Modifiers:</strong>{" "}
              {canAcceptModifiers ? "Yes" : "No"}
            </p>
            <p>
              <strong>Rarity Tier:</strong> {rarityTier}
            </p>
            <p>
              <strong>Scaling Level:</strong> {scalingLevel}
            </p>
            <p>
              <strong>Quantity:</strong> {quantity}
            </p>
          </CardDetails>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

export default CardComponent;
