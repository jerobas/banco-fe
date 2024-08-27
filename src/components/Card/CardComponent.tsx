import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../api/index";

import { IApiResponse, ICardData } from "../../interfaces";
import {
  CardBack,
  CardContainer,
  CardDescription,
  CardDetails,
  CardFront,
  CardImage,
  CardInner,
  CardName,
  ModalContent,
  ModalOverlay,
} from "./CardComponent.styles";

const CardComponent: React.FC<{
  position: number | null;
  onClose: () => void;
}> = ({ position, onClose }) => {
  const { id } = useParams();
  const [isFlipped, setIsFlipped] = useState(false);
  const [card, setCard] = useState<ICardData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleData = async () => {
      try {
        const response = await ApiService.get<IApiResponse>(
          `/cards/room/${id}/cards/${position}`
        );
        if (response?.data?.card) {
          console.log(response.data.card)
          setCard(response.data.card);
          setIsVisible(true);
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
        setIsVisible(false);
      }
    };
    if (position && !isNaN(position)) handleData();
  }, [id, position]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleCloseClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ModalOverlay onClick={handleCloseClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CardContainer
          onClick={handleCardClick}
          isFlipped={isFlipped}
          id="card-component"
        >
          {card && (
            <CardInner isFlipped={isFlipped}>
              <CardFront>
                <CardImage src={card.illustration_url} alt={card.name} />
                <CardName>{card.name}</CardName>
                <CardDescription>{card.description}</CardDescription>
              </CardFront>
              <CardBack>
                <CardDetails>
                  <p>
                    <strong>Type:</strong> {card.type}
                  </p>
                  <p>
                    <strong>Purchase Value:</strong> ${card.purchase_value}
                  </p>
                  <p>
                    <strong>Modifiers:</strong> {card.modifiers}
                  </p>
                  <p>
                    <strong>Tradable:</strong> {card.is_tradable ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Accepts Modifiers:</strong>{" "}
                    {card.can_accept_modifiers ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Rarity Tier:</strong> {card.rarity_tier}
                  </p>
                  <p>
                    <strong>Scaling Level:</strong> {card.scaling_level}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {card.quantity}
                  </p>
                </CardDetails>
              </CardBack>
            </CardInner>
          )}
        </CardContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CardComponent;
