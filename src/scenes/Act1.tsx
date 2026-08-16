import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {
  Counter,
  Eyebrow,
  Headline,
  Logo,
  Rise,
  Stage,
  useBeat,
} from '../components';
import {BRAND_GRADIENT, COLORS} from '../theme';

// ---------------------------------------------------------------------------
// SCENE 1 · THE PROOF  (cold open, dark)
// VO: "One of the world's leading consulting firms runs its AI on a platform we
//      built. Ten thousand users. Six continents. In production every day."
// ---------------------------------------------------------------------------

const Stat: React.FC<{
  delay: number;
  value: React.ReactNode;
  label: string;
}> = ({delay, value, label}) => (
  <Rise delay={delay} distance={28} dur={24} style={{flex: 1}}>
    <div>
      <div
        style={{
          fontSize: 104,
          fontWeight: 700,
          letterSpacing: -3,
          lineHeight: 1.05,
          color: COLORS.orange,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 400,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: COLORS.darkMuted,
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </div>
  </Rise>
);

export const SceneProof: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = useBeat();
  const sweep = interpolate(frame, [beat(0.42), beat(0.72)], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage tone="dark">
      <Eyebrow tone="dark" delay={beat(0.02)}>
        Proven at enterprise scale
      </Eyebrow>

      <div style={{height: 46}} />

      {/* the claim is on screen while it is being said — the frame used to sit
          empty for six seconds under this line */}
      <Rise delay={beat(0.05)} distance={26} dur={30}>
        <div
          style={{
            fontSize: 66,
            fontWeight: 700,
            letterSpacing: -1.8,
            lineHeight: 1.16,
            color: COLORS.white,
            maxWidth: 1480,
          }}
        >
          One of the world&rsquo;s leading consulting firms
          <br />
          runs its AI on a platform we built
        </div>
      </Rise>

      <div style={{height: 74}} />

      <div style={{display: 'flex', gap: 60}}>
        <Stat
          delay={beat(0.42)}
          value={<Counter to={10000} delay={beat(0.42)} dur={40} suffix="+" />}
          label="platform users"
        />
        <Stat delay={beat(0.54)} value="Six" label="continents" />
        <Stat delay={beat(0.65)} value="One" label="AI platform" />
      </div>

      <div style={{height: 56}} />

      <div style={{width: 620, height: 3, backgroundColor: '#2E2724'}}>
        <div
          style={{width: `${sweep}%`, height: '100%', background: BRAND_GRADIENT}}
        />
      </div>

      <div style={{height: 30}} />

      <Rise delay={beat(0.78)} distance={18}>
        <div style={{fontSize: 38, fontWeight: 300, color: COLORS.white}}>
          Built by Infinite Possibilities
        </div>
      </Rise>
    </Stage>
  );
};

// ---------------------------------------------------------------------------
// SCENE 2 · WHO WE ARE  (logo reveal, light)
// VO: "We're Infinite Possibilities. We build custom AI platforms for portfolio
//      companies — from AI ambition to AI in production."
// ---------------------------------------------------------------------------

export const SceneBrand: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = useBeat();
  const logoScale = interpolate(frame, [0, beat(0.15)], [0.94, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage tone="light">
      <div style={{display: 'flex', flexDirection: 'column', gap: 56}}>
        <Rise delay={beat(0.02)} distance={20} dur={34}>
          <Logo width={780} style={{transform: `scale(${logoScale})`}} />
        </Rise>

        <Headline delay={beat(0.22)} size={82}>
          Custom AI platforms for
          <br />
          portfolio companies
        </Headline>
      </div>
    </Stage>
  );
};
