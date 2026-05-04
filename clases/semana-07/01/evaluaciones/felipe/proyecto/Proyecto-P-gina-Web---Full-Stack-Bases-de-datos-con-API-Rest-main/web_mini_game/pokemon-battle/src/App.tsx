import { useState, useEffect } from 'react';
import './App.css';
import { createCharmander, createSquirtle } from './models/Pokemon';
import type { Pokemon } from './models/Pokemon';
import type { Move } from './models/Move';
import { BattleEngine } from './services/BattleEngine';
import { HealthBar } from './components/HealthBar';
import { ActionMenu } from './components/ActionMenu';

const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

function App() {
  const [hasSession, setHasSession] = useState(false);
  const [player, setPlayer] = useState<Pokemon | null>(null);
  const [enemy, setEnemy] = useState<Pokemon | null>(null);
  const [dialog, setDialog] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  
  // Auth and Leaderboard states
  const [userId, setUserId] = useState<number | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isClosingLeaderboard, setIsClosingLeaderboard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<{user_name: string, victories: number}[]>([]);

  // Animation states
  const [playerAnim, setPlayerAnim] = useState('');
  const [enemyAnim, setEnemyAnim] = useState('');

  // Initial check for session (simulating the integration)
  useEffect(() => {
    // Check localStorage for session key used by the main app.js ('pokemon_session')
    const checkSession = () => {
      const auth = localStorage.getItem('pokemon_session');
      if (auth) {
        setHasSession(true);
        try {
          const user = JSON.parse(auth);
          setUserId(user.id || null);
        } catch(e) {}
      } else {
        setHasSession(false);
        setUserId(null);
      }
    };
    
    checkSession();
    window.addEventListener('storage', checkSession);
    return () => window.removeEventListener('storage', checkSession);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        const data = await res.json();
        setLeaderboardData(data);
      }
    } catch (e) {
      console.error('Error fetching leaderboard', e);
    }
  };

  const toggleLeaderboard = () => {
    if (!showLeaderboard) {
      fetchLeaderboard();
      setShowLeaderboard(true);
      setIsClosingLeaderboard(false);
    } else {
      setIsClosingLeaderboard(true);
      setTimeout(() => {
        setShowLeaderboard(false);
        setIsClosingLeaderboard(false);
      }, 300); // Coincide con la duración de la animación CSS
    }
  };

  const startGame = () => {
    setPlayer(createCharmander());
    setEnemy(createSquirtle());
    setGameOver(false);
    setVictory(false);
    setDialog('¡Un SQUIRTLE salvaje apareció!');
    setIsBusy(false);
  };

  useEffect(() => {
    if (hasSession && !player) {
      startGame();
    }
  }, [hasSession]);

  const handleMoveSelect = async (move: Move) => {
    if (isBusy || !player || !enemy || gameOver) return;
    setIsBusy(true);

    // Player Turn
    setDialog(`${player.name} usó ${move.name}!`);
    setPlayerAnim('anim-attack-player');
    await wait(300);
    setPlayerAnim('');
    
    const damage = BattleEngine.calculateDamage(player, enemy, move);
    setEnemyAnim('anim-damage');
    const updatedEnemy = BattleEngine.applyDamage(enemy, damage);
    setEnemy(updatedEnemy);
    
    await wait(500);
    setEnemyAnim('');

    if (BattleEngine.isDefeated(updatedEnemy)) {
      setDialog('¡SQUIRTLE fue derrotado!');
      setGameOver(true);
      setVictory(true);
      
      // Llamada simulada a la API
      if (userId) {
        fetch('/api/game/stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, is_victory: true })
        }).catch(e => console.log('API Error (Expected if backend offline)', e));
      }

      return;
    }

    // Enemy Turn
    await wait(1000);
    const enemyMove = updatedEnemy.moves[Math.floor(Math.random() * updatedEnemy.moves.length)];
    setDialog(`${updatedEnemy.name} usó ${enemyMove.name}!`);
    setEnemyAnim('anim-attack-enemy');
    await wait(300);
    setEnemyAnim('');

    const enemyDamage = BattleEngine.calculateDamage(updatedEnemy, player, enemyMove);
    setPlayerAnim('anim-damage');
    const updatedPlayer = BattleEngine.applyDamage(player, enemyDamage);
    setPlayer(updatedPlayer);

    await wait(500);
    setPlayerAnim('');

    if (BattleEngine.isDefeated(updatedPlayer)) {
      setDialog('¡CUBIX fue derrotado...');
      setGameOver(true);
      setVictory(false);
      return;
    }

    setDialog(`¿Qué hará ${updatedPlayer.name}?`);
    setIsBusy(false);
  };

  if (!hasSession) {
    return (
      <div className="game-container">
        <div className="overlay">
          <h2>Inicia sesión para jugar</h2>
          <p style={{fontSize: '0.7rem', lineHeight: '1.5', marginBottom: '20px'}}>
            Debes iniciar sesión en la página principal para registrar tu progreso y participar en los combates.
          </p>
        </div>
      </div>
    );
  }

  if (!player || !enemy) return <div className="game-container">Cargando...</div>;

  return (
    <div className="game-container">
      {/* Botón Menu Hamburgesa Leaderboard */}
      <button className="leaderboard-btn" onClick={toggleLeaderboard} aria-label="Ranking">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>

      {/* Modal Leaderboard */}
      {showLeaderboard && (
        <div className={`leaderboard-modal ${isClosingLeaderboard ? 'closing' : ''}`}>
          <div className="leaderboard-content">
            <button className="close-leaderboard" onClick={toggleLeaderboard}>✕</button>
            <h2>TOP 10 ENTRENADORES</h2>
            {leaderboardData.length > 0 ? (
              <ol className="leaderboard-list">
                {leaderboardData.map((user, i) => (
                  <li key={i}>
                    <span className="rank-name">{user.user_name}</span>
                    <span className="rank-wins">{user.victories} {user.victories === 1 ? 'Victoria' : 'Victorias'}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p style={{textAlign: 'center', opacity: 0.8}}>Cargando rango...</p>
            )}
          </div>
        </div>
      )}

      {/* Overlays */}
      {gameOver && (
        <div className="overlay">
          <h2>{victory ? '¡Ganaste!' : 'Fin del Juego'}</h2>
          <button className="btn-primary" onClick={startGame}>Reiniciar</button>
        </div>
      )}

      {/* Battle Scene */}
      <div className="battle-scene">
        <div className={`sprite-container player-mon ${playerAnim}`}>
          <img src={player.backSprite} alt={player.name} />
        </div>
        <div className={`sprite-container enemy-mon ${enemyAnim}`}>
          <img src={enemy.frontSprite} alt={enemy.name} />
        </div>
      </div>

      {/* UI Area */}
      <div className="ui-area">
        <div className="info-panel">
          {/* Enemy Info */}
          <div className="info-row">
            <div className="name-row">
              <span>{enemy.name}</span>
              <span>Lv{enemy.level}</span>
            </div>
            <HealthBar currentHp={enemy.currentHp} maxHp={enemy.maxHp} />
          </div>

          {/* Player Info */}
          <div className="info-row">
            <div className="name-row">
              <span>{player.name}</span>
              <span>Lv{player.level}</span>
            </div>
            <HealthBar currentHp={player.currentHp} maxHp={player.maxHp} />
            <div style={{textAlign: 'right', fontSize: '0.6rem', marginTop: '4px'}}>
              {player.currentHp} / {player.maxHp}
            </div>
          </div>

          {/* Dialog */}
          <div className="dialog-box">
            {dialog}
          </div>
        </div>

        <div className="control-panel">
          <ActionMenu 
            moves={player.moves} 
            onMoveSelect={handleMoveSelect} 
            disabled={isBusy || gameOver}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
