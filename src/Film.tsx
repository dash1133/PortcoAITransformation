import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {BrandFont} from './fonts';
import {SCENE_FRAMES, SceneId} from './timing';
import {SceneDuration} from './components';
import {COLORS} from './theme';
import {SceneBrand, SceneProof} from './scenes/Act1';
import {SceneDeliver, SceneNeeds, SceneReality} from './scenes/Act2';
import {SceneArchitecture, SceneCaseStudy, ScenePod} from './scenes/Act3';
import {
  SceneOperatingModels,
  SceneRecap,
  SceneSignoff,
} from './scenes/Act4';

const REGISTRY: Record<SceneId, React.FC> = {
  proof: SceneProof,
  brand: SceneBrand,
  reality: SceneReality,
  needs: SceneNeeds,
  deliver: SceneDeliver,
  architecture: SceneArchitecture,
  caseStudy: SceneCaseStudy,
  pod: ScenePod,
  operatingModels: SceneOperatingModels,
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
            <SceneDuration.Provider value={scene.durationInFrames}>
              <Comp />
            </SceneDuration.Provider>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
