import React, {useEffect, useRef} from 'react';

interface AudioProps {
  srcObject: MediaStream | undefined;
}

export const Audio: React.FC<AudioProps> = ({srcObject}) => {
  const refAudio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!refAudio.current || !srcObject) return;
    refAudio.current.srcObject = srcObject;
  }, [srcObject]);
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={refAudio} autoPlay />
    </>
  );
};

export default Audio;
