import mGBA, { type mGBAEmulator } from '@thenick775/mgba-wasm';
import { useEffect, useState, type RefObject } from 'react';

export const useEmulator = (canvas: RefObject<HTMLCanvasElement | null>) => {
  const [emulator, setEmulator] = useState<mGBAEmulator | null>(null);

  useEffect(() => {
    const initialize = async () => {
      console.log({canvas})
      if (canvas.current) {
        const Module = await mGBA({ canvas: canvas.current });

        const mGBAVersion =
          Module.version.projectName + ' ' + Module.version.projectVersion;
        console.log(mGBAVersion);

        await Module.FSInit();

        setEmulator(Module);
      }
    };

    initialize();
  }, [canvas.current]);

  return emulator;
};
