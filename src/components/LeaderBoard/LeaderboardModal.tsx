import React, { useCallback, useEffect } from "react";
import { FaCrown } from "react-icons/fa";

import {
  Crown,
  ModalContent,
  ModalOverlay,
  PlayerRow,
} from "./LeaderboardModal.styles";

import { IPlayer } from "../../interfaces";

interface LeaderboardModalProps {
  players: IPlayer[];
  isOpen: boolean;
  onClose: () => void;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  players,
  isOpen,
  onClose,
}) => {
  const sortedPlayers = players
    .map((player) => ({ ...player, money: parseFloat(player.money) }))
    .sort((a, b) => b.money - a.money);

  const handleTabPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (isOpen) {
          onClose();
        } else {
          e.preventDefault();
        }
      }
    },
    [isOpen, onClose]
  );

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("#modal-content")) return;
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleTabPress);
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("keydown", handleTabPress);
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleTabPress);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, handleTabPress]);

  return (
    <>
      {players.length > 0 && (
        <ModalOverlay isOpen={isOpen}>
          <ModalContent id="modal-content">
            <h2>Leaderboard</h2>
            {sortedPlayers.map((player, i) => (
              <PlayerRow key={player.id}>
                <span>
                  {player.name}
                  {i == 0 && (
                    <Crown>
                      <FaCrown />
                    </Crown>
                  )}
                </span>
                <span>${player.money.toFixed(2)}</span>
              </PlayerRow>
            ))}
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default LeaderboardModal;
