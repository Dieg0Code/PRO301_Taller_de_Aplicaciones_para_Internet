import type { Move } from '../models/Move';

interface ActionMenuProps {
  moves: Move[];
  onMoveSelect: (move: Move) => void;
  disabled: boolean;
}

export const ActionMenu = ({ moves, onMoveSelect, disabled }: ActionMenuProps) => {
  return (
    <div className="action-menu">
      {moves.map(move => (
        <button 
          key={move.id} 
          onClick={() => onMoveSelect(move)}
          disabled={disabled}
          className="move-btn"
        >
          {move.name}
        </button>
      ))}
    </div>
  );
};
