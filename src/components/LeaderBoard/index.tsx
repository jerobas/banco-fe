import React, { useCallback, useEffect } from "react";
import { FaCrown } from "react-icons/fa";
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
      {players.length > 0 && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div
            id="modal-content"
            className="bg-[#1f1f1f] text-white w-full max-w-md p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Placar</h2>
            <div className="space-y-2">
              {sortedPlayers.map((player, i) => (
                <div
                  key={player.id}
                  className="flex justify-between items-center p-2 bg-[#2a2a2a] rounded-md"
                >
                  <span className="flex items-center gap-2">
                    {player.name}
                    {i === 0 && (
                      <FaCrown className="text-yellow-400 animate-pulse" />
                    )}
                  </span>
                  <span className="font-semibold">
                    ${player.money.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaderboardModal;
