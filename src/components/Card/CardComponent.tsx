import React, { useState } from "react";
import styled from "styled-components";

interface CardProps {
  name: string;
  description: string;
  imageUrl: string;
  type: string;
  purchaseValue: number;
  modifiers: string;
  isTradable: boolean;
  canAcceptModifiers: boolean;
  rarityTier: number;
  scalingLevel: number;
  quantity: number;
}

const CardContainer = styled.div<{ isFlipped: boolean }>`
  width: 300px;
  height: 400px;
  perspective: 1000px;
  cursor: pointer;
`;

const CardInner = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) => (isFlipped ? "rotateY(180deg)" : "rotateY(0)")};
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #fff;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #f8f8f8;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transform: rotateY(180deg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const CardName = styled.h2`
  margin: 10px 0;
`;

const CardDescription = styled.p`
  margin: 10px 0;
`;

const CardDetails = styled.div`
  text-align: left;
  width: 100%;
`;

const CardComponent: React.FC<CardProps> = ({
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
            <p><strong>Type:</strong> {type}</p>
            <p><strong>Purchase Value:</strong> ${purchaseValue}</p>
            <p><strong>Modifiers:</strong> {modifiers}</p>
            <p><strong>Tradable:</strong> {isTradable ? "Yes" : "No"}</p>
            <p><strong>Accepts Modifiers:</strong> {canAcceptModifiers ? "Yes" : "No"}</p>
            <p><strong>Rarity Tier:</strong> {rarityTier}</p>
            <p><strong>Scaling Level:</strong> {scalingLevel}</p>
            <p><strong>Quantity:</strong> {quantity}</p>
          </CardDetails>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

export default CardComponent;
