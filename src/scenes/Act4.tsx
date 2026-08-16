import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Eyebrow, Logo, Rise, Stage} from '../components';
import {BRAND_GRADIENT, COLORS} from '../theme';

// ---------------------------------------------------------------------------
// SCENE 9 · FLEXIBLE OPERATING MODELS
// The AI Pod is one of three ways to engage — and whichever is chosen, the
// commitment is earned in four-week increments rather than assumed up front.
// ---------------------------------------------------------------------------

const ModelCard: React.FC<{
  delay: number;
  n: string;
  title: string;
  body: string;
}> = ({delay, n, title, body}) => (
  <Rise delay={delay} distance={26} dur={24} style={{flex: 1, display: 'flex'}}>
    <div
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        border: `2px solid ${COLORS.orange}`,
        borderRadius: 14,
        padding: '30px 30px 34px',
      }}
    >
      <div
        style={{
          fontSize: 21,
          fontWeight: 700,
          color: COLORS.white,
          backgroundColor: COLORS.orange,
          borderRadius: 7,
          padding: '6px 11px',
          display: 'inline-block',
          marginBottom: 18,
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontSize: 38,
          fontWeight: 700,
          color: COLORS.ink,
          lineHeight: 1.15,
          letterSpacing: -0.6,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 25,
          fontWeight: 300,
          color: COLORS.inkSoft,
          marginTop: 12,
          lineHeight: 1.4,
        }}
      >
        {body}
      </div>
    </div>
  </Rise>
);

export const SceneOperatingModels: React.FC = () => (
  <Stage tone="light" padding={130}>
    <Eyebrow delay={4}>How we engage</Eyebrow>
    <div style={{height: 30}} />
    <Rise delay={26} distance={16}>
      <div
        style={{
          fontSize: 58,
          fontWeight: 700,
          letterSpacing: -1.2,
          color: COLORS.ink,
        }}
      >
        Flexible operating models
      </div>
    </Rise>

    <div style={{height: 56}} />

    <div style={{display: 'flex', gap: 30, alignItems: 'stretch'}}>
      <ModelCard
        delay={120}
        n="01"
        title="AI Pod"
        body="a dedicated cross-functional team, embedded in yours"
      />
      <ModelCard
        delay={220}
        n="02"
        title="Staff augmentation"
        body="targeted specialists into the team you already have"
      />
      <ModelCard
        delay={320}
        n="03"
        title="Build-operate-transfer"
        body="we build it, run it, then hand it over to you"
      />
    </div>

    <div style={{height: 56}} />

    <Rise delay={450} distance={20}>
      <div style={{borderLeft: `6px solid ${COLORS.orange}`, paddingLeft: 30}}>
        <div style={{fontSize: 42, fontWeight: 600, color: COLORS.ink}}>
          Commitment earned in four-week increments
        </div>
        <div style={{fontSize: 42, fontWeight: 300, color: COLORS.inkSoft}}>
          Never assumed. At every gate, you decide.
        </div>
      </div>
    </Rise>
  </Stage>
);

// ---------------------------------------------------------------------------
// SCENE 10 · RECAP
// ---------------------------------------------------------------------------

const RecapLine: React.FC<{delay: number; children: React.ReactNode}> = ({
  delay,
  children,
}) => (
  <Rise delay={delay} distance={18} dur={18}>
    <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          backgroundColor: COLORS.orange,
          flex: 'none',
        }}
      />
      <span style={{fontSize: 46, fontWeight: 500, color: COLORS.ink}}>
        {children}
      </span>
    </div>
  </Rise>
);

export const SceneRecap: React.FC = () => (
  <Stage tone="light" padding={130}>
    <Eyebrow delay={4}>Recap</Eyebrow>
    <div style={{height: 30}} />

    <Rise delay={24} distance={18}>
      <div
        style={{
          fontSize: 36,
          fontWeight: 400,
          color: COLORS.inkSoft,
          marginBottom: 10,
        }}
      >
        Don&rsquo;t scatter efforts and funds
      </div>
      <div
        style={{
          fontSize: 68,
          fontWeight: 700,
          letterSpacing: -1.6,
          lineHeight: 1.1,
          color: COLORS.ink,
        }}
      >
        Build a strategic AI asset
      </div>
    </Rise>

    <div style={{height: 52}} />

    <div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
      <RecapLine delay={120}>Focus your AI program</RecapLine>
      <RecapLine delay={180}>Build on the right architecture</RecapLine>
      <RecapLine delay={240}>Don&rsquo;t lock to a single LLM model</RecapLine>
      <RecapLine delay={300}>
        Partner with a reliable vendor with AI credibility
      </RecapLine>
    </div>

    <div style={{height: 50}} />

    <Rise delay={390} distance={20}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: 18,
          background: BRAND_GRADIENT,
          borderRadius: 12,
          padding: '18px 32px',
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          Impact
        </span>
        <span style={{fontSize: 40, fontWeight: 700, color: COLORS.white}}>
          Profitable growth and higher exit value
        </span>
      </div>
    </Rise>
  </Stage>
);

// ---------------------------------------------------------------------------
// SCENE 11 · SIGN-OFF
// ---------------------------------------------------------------------------

export const SceneSignoff: React.FC = () => {
  const frame = useCurrentFrame();
  const rule = interpolate(frame, [40, 90], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage tone="light">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 44,
        }}
      >
        <Rise delay={2} distance={20} dur={30}>
          <Logo width={880} />
        </Rise>

        <div style={{width: 620, height: 5, backgroundColor: '#EADFD4'}}>
          <div
            style={{width: `${rule}%`, height: '100%', background: BRAND_GRADIENT}}
          />
        </div>

        <Rise delay={70} distance={16}>
          <div
            style={{
              fontSize: 44,
              fontWeight: 300,
              color: COLORS.inkSoft,
              textAlign: 'center',
            }}
          >
            Accelerate AI-driven Value Creation
          </div>
        </Rise>

        <Rise delay={120} distance={14}>
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: COLORS.orange,
              letterSpacing: 1,
            }}
          >
            infinitepossibilities.ai
          </div>
        </Rise>
      </div>
    </Stage>
  );
};
