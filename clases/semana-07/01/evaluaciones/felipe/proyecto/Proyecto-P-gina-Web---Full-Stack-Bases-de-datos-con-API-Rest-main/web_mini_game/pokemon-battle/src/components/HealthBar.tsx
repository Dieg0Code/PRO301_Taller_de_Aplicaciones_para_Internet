

interface HealthBarProps {
  currentHp: number;
  maxHp: number;
}

export const HealthBar = ({ currentHp, maxHp }: HealthBarProps) => {
  const percentage = Math.max(0, (currentHp / maxHp) * 100);
  
  const getColor = () => {
    if (percentage > 50) return '#2ecc71';
    if (percentage > 20) return '#f1c40f';
    return '#e74c3c';
  };

  return (
    <div style={{ width: '100%', height: '10px', background: '#333', borderRadius: '4px', border: '1px solid #555', overflow: 'hidden' }}>
      <div 
        style={{ 
          height: '100%', 
          width: `${percentage}%`, 
          backgroundColor: getColor(),
          transition: 'width 0.4s ease-out, background-color 0.3s'
        }} 
      />
    </div>
  );
};
