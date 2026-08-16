import React from 'react';
import {Composition, Still} from 'remotion';
import {Film} from './Film';
import {
  THUMB_SIZE,
  ThumbNumber,
  ThumbPilotsAssets,
  ThumbScale,
  ThumbTitleDark,
  ThumbTitleLight,
  ThumbTitlePhoto,
  ThumbTitlePhotoLight,
} from './Thumbnails';
import {TOTAL_FRAMES} from './timing';
import {FPS, HEIGHT, WIDTH} from './theme';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Film"
      component={Film}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{withAudio: false}}
    />
    <Composition
      id="FilmWithAudio"
      component={Film}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{withAudio: true}}
    />

    <Still id="ThumbA" component={ThumbPilotsAssets} {...THUMB_SIZE} />
    <Still id="ThumbB" component={ThumbNumber} {...THUMB_SIZE} />
    <Still id="ThumbC" component={ThumbScale} {...THUMB_SIZE} />
    <Still id="ThumbTitleDark" component={ThumbTitleDark} {...THUMB_SIZE} />
    <Still id="ThumbTitleLight" component={ThumbTitleLight} {...THUMB_SIZE} />
    <Still id="ThumbTitlePhoto" component={ThumbTitlePhoto} {...THUMB_SIZE} />
    <Still
      id="ThumbTitlePhotoLight"
      component={ThumbTitlePhotoLight}
      {...THUMB_SIZE}
    />
  </>
);
