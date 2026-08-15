import React, {useEffect, useState} from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';

// Poppins is self-hosted from public/fonts rather than loaded via
// @remotion/google-fonts: the render sandbox cannot reach fonts.gstatic.com,
// so a CDN font would silently fall back to a system serif.
//
// This must run inside a component — calling delayRender() at module scope
// breaks the composition-discovery pass that precedes a render.

const WEIGHTS = [300, 400, 500, 600, 700] as const;

export const BrandFont: React.FC = () => {
  const [handle] = useState(() => delayRender('Loading Poppins'));

  useEffect(() => {
    let cancelled = false;
    const done = () => {
      if (!cancelled) continueRender(handle);
    };

    Promise.all(
      WEIGHTS.map(async (weight) => {
        const face = new FontFace(
          'Poppins',
          `url(${staticFile(`fonts/poppins-${weight}.woff2`)}) format('woff2')`,
          {weight: String(weight), style: 'normal'},
        );
        await face.load();
        (document.fonts as unknown as {add: (f: FontFace) => void}).add(face);
      }),
    )
      .then(done)
      .catch(done);

    return () => {
      cancelled = true;
    };
  }, [handle]);

  return null;
};
