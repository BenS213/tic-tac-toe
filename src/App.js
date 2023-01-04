import "./App.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function App() {
  const initialGrid = ["", "", "", "", "", "", "", "", ""];
  const [grid, setGrid] = useState(initialGrid);
  const [XTurn, setXTurn] = useState(true);
  const [XMoves, setXMoves] = useState([]);
  const [OMoves, setOMoves] = useState([]);
  const [winner, setWinner] = useState("");
  const [plays, setPlays] = useState(0);

  function handleClick(i) {
    setPlays(plays => plays + 1)
    if (grid[i] === "X" || grid[i] === "O") {
      return console.log("already taken");
    }
    grid[i] = XTurn ? <FontAwesomeIcon icon={solid('x')} /> : <FontAwesomeIcon icon={solid('o')} />;
    setXTurn(XTurn ? false : true);
    XTurn ? setXMoves([...XMoves, i + 1]) : setOMoves([...OMoves, i + 1]);
    setGrid([...grid]);
    if (plays > 7) setWinner('Tie')
  }

  useEffect(() => {
      const winningCombos = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 5, 9],
        [3, 5, 7],
      ];
      
        for (const combination of winningCombos) {
          const [a, b, c] = combination;
          if (XMoves.includes(a) && XMoves.includes(b) && XMoves.includes(c)) {
            return setWinner("X");
          }
          if (OMoves.includes(a) && OMoves.includes(b) && OMoves.includes(c)) {
            return setWinner("O");
          }
        }
    }, [XMoves, OMoves]

  )

  function reset() {
    setGrid(initialGrid);
    setXMoves([]);
    setOMoves([]);
    setWinner('');
    setXTurn(true);
    setPlays(0);
  }

  return (
    <>
      <header>
        <h1>TIC-TAC-TOE</h1>
      </header>
      <div className="scoreBoard">
        {!winner ? `Turn: ${XTurn ? "X" : "O"}` : `winner: ${winner}`}
      </div>
      <div className={!winner ? "board" : "board gameOver"}>
        {grid.map((square, i) => (
          <div key={i} onClick={() => handleClick(i)} className="square">
            {square}
          </div>
        ))}
      </div>
      <div className="buttons">
        {winner ? <button className='resetButton' onClick={reset}>Reset</button> : ''}
      </div>
    </>
  );
}

export default App;
