import { useMemo, useRef, useState } from 'react'
import { useEmulator } from './emulator-context';
import './index.css';

export const SwkurmiWurmi = () => {
  const canvas = useRef(null);
  const emulator = useEmulator(canvas);
  const [isRunning, setIsRunning] = useState(false);
  const romFile = useMemo(async () => {
    const blob = await (await fetch("./skwurmiwurmi.gb")).blob();
    return new File([blob], "skwurmiwurmi.gb");
  }, [])

  const runGame = async () => {
    const file = await romFile;
    emulator?.uploadRom(file, () => {
      emulator?.loadGame("/data/games/skwurmiwurmi.gb");
      emulator?.saveState(0);
    });
    setIsRunning(true);
  }

  const saveState = async () => {
    emulator?.saveState(1)
  }

  const loadState = async () => {
    emulator?.loadState(1)
  }


  return (
    <div className='emulator-page-container'>
      <h1>Skwurmi Wurmi Gaiden Online</h1>
      <h3>Play this hit game from your childhood today!</h3>
      <canvas className='emulator-screen' ref={canvas} width="240" height="160"/>
      {isRunning ? 
        <div>
            <button onClick={() => saveState()}>Save State</button>
            <button onClick={() => loadState()}>Load State</button>
        </div> : 
        <div>
            <button onClick={() => runGame()}>Start Emulator</button>
        </div>
        }
      <h3>Controls</h3>
      <h4>
        Enter / Return - Select </h4>
      <h4>
        Arrows - Move around
      </h4> 
    </div>
  )
}

