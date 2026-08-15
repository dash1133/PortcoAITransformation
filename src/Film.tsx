import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {BrandFont} from './fonts';
import {SCENE_FRAMES, SceneId} from './timing';
import {COLORS} from './theme';
import {SceneBrand, SceneProof} from './scenes/Act1';
import {
  SceneDeliver,
  SceneReality,
  SceneRecommendation,
  SceneThesis,
} from './scenes/Act2';
import {SceneArchitecture, SceneCaseStudy, ScenePod} from './scenes/Act3';
import {SceneOwnership, SceneRecap, SceneSignoff} from './scenes/Act4';

const REGISTRY: Record<SceneId, React.FC> = {
  proof: SceneProof,
  brand: SceneBrand,
  reality: SceneReality,
  recommendation: SceneRecommendation,
  thesis: SceneThesis,
  deliver: SceneDeliver,
  pod: ScenePod,
  caseStudy: SceneCaseStudy,
  architecture: SceneArchitecture,
  ownership: SceneOwnership,
  recap: SceneRecap,
  signoff: SceneSignoff,
};

export const Film: React.FC<{withAudio?: boolean}> = ({withAudio = false}) => {
  let cursor = 0;

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.offWhite}}>
      <BrandFont />
      {withAudio ? <Audio src={staticFile('voiceover.mp3')} /> : null}

      {SCENE_FRAMES.map((scene) => {
        const Comp = REGISTRY[scene.id];
        const from = cursor;
        cursor += scene.durationInFrames;
        return (
          <Sequence
            key={scene.id}
            from={from}
            durationInFrames={scene.durationInFrames}
            name={scene.id}
          >
            <Comp />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
