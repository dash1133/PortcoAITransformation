import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Eyebrow, Headline, HoldOut, Logo, Rise, Stage} from '../components';
import {BRAND_GRADIENT, COLORS} from '../theme';

// ---------------------------------------------------------------------------
// SCENE 9 · WHAT YOU'RE LEFT WITH  (build → operate → transfer, + gates)
// ---------------------------------------------------------------------------

const Step: React.FC<{delay: number; n: number; label: string}> = ({
  delay,
  n,
  label,
}) => (
  <Rise delay={delay} distance={24} dur={22}>
    <div style={{display: 'flex', flexDirection: 'column', gap: 18, flex: 1}}>
      <div
        style={{
          width: 62,
          height: 62,
          borderRadius: '50%',
          background: BRAND_GRADIENT,
          color: COLORS.white,
          fontSize: 30,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {n}
      </div>
      <div style={{fontSize: 52, fontWeight: 600, color: COLORS.ink}}>
        {label}
      </div>
    </div>
  </Rise>
);

export const SceneOwnership: React.FC = () => (
  <Stage tone="light" padding={140}>
    <HoldOut at={700} dur={20}>
      <Eyebrow delay={4}>How it ends</Eyebrow>
      <div style={{height: 56}} />

      <div style={{display: 'flex', gap: 40}}>
        <Step delay={80} n={1} label="We build it." />
        <Step delay={145} n={2} label="We operate it." />
        <Step delay={215} n={3} label="We transfer it to you." />
      </div>

      <div style={{height: 76}} />

      <Rise delay={440} distance={20}>
        <div
          style={{
            borderLeft: `6px solid ${COLORS.orange}`,
            paddingLeft: 30,
          }}
        >
          <div style={{fontSize: 44, fontWeight: 600, color: COLORS.ink}}>
            Commitment earned in four-week increments.
          </div>
          <div style={{fontSize: 44, fontWeight: 300, color: COLORS.inkSoft}}>
            Never assumed. At every gate, you decide.
          </div>
        </div>
      </Rise>
    </HoldOut>

    <OwnershipLanding />
  </Stage>
);

const OwnershipLanding: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [730, 768], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (frame < 726) return null;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 150,
        opacity: p,
      }}
    >
      <div
        style={{
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: -2.4,
          lineHeight: 1.16,
          color: COLORS.ink,
          textAlign: 'center',
          transform: `translateY(${(1 - p) * 20}px)`,
        }}
      >
        The asset{' '}
        <span style={{color: COLORS.orange}}>outlives the engagement.</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// SCENE 10 · THE VALUE RECAP  (rapid, rhythmic)
// ---------------------------------------------------------------------------

const RecapLine: React.FC<{delay: number; children: React.ReactNode}> = ({
  delay,
  children,
}) => (
  <Rise delay={delay} distance={18} dur={16}>
    <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: COLORS.orange,
        }}
      />
      <span style={{fontSize: 62, fontWeight: 600, color: COLORS.ink}}>
        {children}
      </span>
    </div>
  </Rise>
);

export const SceneRecap: React.FC = () => (
  <Stage tone="light" padding={150}>
    <div style={{display: 'flex', flexDirection: 'column', gap: 34}}>
      <RecapLine delay={10}>Accelerate your AI program.</RecapLine>
      <RecapLine delay={78}>Build on the right architecture.</RecapLine>
      <RecapLine delay={150}>Move in weeks, not months.</RecapLine>
      <RecapLine delay={218}>Never locked to a single vendor.</RecapLine>
    </div>
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
          gap: 40,
        }}
      >
        <Rise delay={2} distance={20} dur={30}>
          <Logo width={860} />
        </Rise>

        <div style={{width: 620, height: 5, backgroundColor: '#EADFD4'}}>
          <div
            style={{width: `${rule}%`, height: '100%', background: BRAND_GRADIENT}}
          />
        </div>

        <Rise delay={70} distance={16}>
          <div
            style={{
              fontSize: 40,
              fontWeight: 300,
              color: COLORS.inkSoft,
              textAlign: 'center',
            }}
          >
            Accelerate AI-driven Value Creation
          </div>
        </Rise>

        <Rise delay={110} distance={16}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              color: COLORS.ink,
              textAlign: 'center',
            }}
          >
            Business partners first.
          </div>
        </Rise>

        <Rise delay={150} distance={14}>
          <div
            style={{
              fontSize: 34,
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

export {Headline};
