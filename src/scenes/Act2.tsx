import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Eyebrow, Headline, Rise, Stage, useBeat} from '../components';
import {BRAND_GRADIENT, COLORS} from '../theme';

// ---------------------------------------------------------------------------
// SCENE 3 · THE REALITY INSIDE A PORTCO  (the problem, dark)
// VO: "Inside most mid-market portfolio companies you find the same four
//      things. Citizen developers building — unable to scale. ..."
// ---------------------------------------------------------------------------

const ProblemRow: React.FC<{
  delay: number;
  n: string;
  action: string;
  limit: string;
}> = ({delay, n, action, limit}) => (
  <Rise delay={delay} distance={28} dur={24}>
    <div style={{display: 'flex', alignItems: 'baseline', gap: 30}}>
      <span
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: COLORS.orange,
          letterSpacing: 2,
          width: 56,
        }}
      >
        {n}
      </span>
      <span
        style={{
          fontSize: 48,
          fontWeight: 300,
          color: COLORS.white,
          width: 580,
          flex: 'none',
        }}
      >
        {action}
      </span>
      <span style={{fontSize: 48, fontWeight: 600, color: COLORS.magenta}}>
        {limit}
      </span>
    </div>
  </Rise>
);

export const SceneReality: React.FC = () => {
  const beat = useBeat();
  return (
  <Stage tone="dark">
    <Eyebrow tone="dark" delay={beat(0.02)}>
      Inside most mid-market portfolio companies
    </Eyebrow>

    <div style={{height: 76}} />

    <div style={{display: 'flex', flexDirection: 'column', gap: 44}}>
      <ProblemRow
        delay={beat(0.294)}
        n="01"
        action="Citizen developers build."
        limit="Unable to scale."
      />
      <ProblemRow
        delay={beat(0.454)}
        n="02"
        action="Vendors sell."
        limit="Unable to fit the ecosystem."
      />
      <ProblemRow
        delay={beat(0.591)}
        n="03"
        action="Leaders want to invest."
        limit="Unable to determine what and when."
      />
      <ProblemRow
        delay={beat(0.774)}
        n="04"
        action="Tokens burn."
        limit="Unable to verify ROI."
      />
    </div>
  </Stage>
  );
};

// ---------------------------------------------------------------------------
// SCENE 4 · WHAT A PORTFOLIO COMPANY NEEDS  (thesis — full-bleed orange)
//
// Merges the old recommendation scene into the thesis: the two struck-through
// negations now run straight into the affirmative, so the argument lands in a
// single frame instead of two.
// ---------------------------------------------------------------------------

const Struck: React.FC<{delay: number; children: React.ReactNode}> = ({
  delay,
  children,
}) => {
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [delay + 16, delay + 42], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <Rise delay={delay} distance={18}>
      <div style={{position: 'relative', display: 'inline-block'}}>
        <span
          style={{
            fontSize: 54,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.62)',
          }}
        >
          {children}
        </span>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '54%',
            height: 3,
            width: `${strike}%`,
            backgroundColor: COLORS.gold,
          }}
        />
      </div>
    </Rise>
  );
};

export const SceneNeeds: React.FC = () => {
  const beat = useBeat();
  return (
  <Stage tone="orange" padding={140}>
    <Rise delay={beat(0.02)} distance={20} dur={28}>
      <div
        style={{
          fontSize: 58,
          fontWeight: 400,
          letterSpacing: -1,
          color: 'rgba(255,255,255,0.8)',
        }}
      >
        What a portfolio company needs
      </div>
    </Rise>

    <div style={{height: 44}} />

    <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
      <Struck delay={beat(0.224)}>Not another one-off solution</Struck>
      <Struck delay={beat(0.339)}>Not another vendor&rsquo;s platform</Struck>
    </div>

    <div style={{height: 46}} />

    <Rise delay={beat(0.453)} distance={28} dur={30}>
      <div
        style={{
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: -2.4,
          lineHeight: 1.08,
          color: COLORS.white,
        }}
      >
        A purpose-built AI platform
      </div>
    </Rise>

    <div style={{height: 22}} />

    <Rise delay={beat(0.567)} distance={18}>
      <div style={{fontSize: 46, fontWeight: 600, color: COLORS.gold}}>
        A strategic asset they own
      </div>
    </Rise>

    <div style={{height: 46}} />

    <Rise delay={beat(0.71)} distance={18}>
      <div style={{display: 'flex', gap: 44, alignItems: 'center'}}>
        <span style={{fontSize: 38, fontWeight: 500, color: COLORS.white}}>
          Drives profitable growth
        </span>
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: COLORS.gold,
          }}
        />
        <span style={{fontSize: 38, fontWeight: 500, color: COLORS.white}}>
          Improves exit value
        </span>
      </div>
    </Rise>
  </Stage>
  );
};

// ---------------------------------------------------------------------------
// SCENE 5 · WHAT WE DELIVER  (five design principles, two columns)
// ---------------------------------------------------------------------------

const Feature: React.FC<{
  delay: number;
  n: string;
  title: string;
  body: string;
}> = ({delay, n, title, body}) => (
  <Rise delay={delay} distance={24} dur={22}>
    <div style={{display: 'flex', alignItems: 'flex-start', gap: 24}}>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.white,
          backgroundColor: COLORS.orange,
          borderRadius: 8,
          padding: '7px 11px',
          marginTop: 8,
        }}
      >
        {n}
      </div>
      <div>
        <div style={{fontSize: 40, fontWeight: 600, color: COLORS.ink}}>
          {title}
        </div>
        <div
          style={{
            fontSize: 27,
            fontWeight: 300,
            color: COLORS.inkSoft,
            marginTop: 2,
            lineHeight: 1.35,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  </Rise>
);

export const SceneDeliver: React.FC = () => {
  const beat = useBeat();
  return (
  <Stage tone="light" padding={110}>
    <Headline delay={beat(0.01)} size={58} style={{letterSpacing: -1.2}}>
      We build these strategic AI assets for portfolio companies
    </Headline>

    <div style={{height: 26}} />
    <Rise delay={beat(0.05)} distance={8}>
      <div style={{width: 260, height: 5, background: BRAND_GRADIENT}} />
    </Rise>
    <div style={{height: 56}} />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: 70,
        rowGap: 44,
        alignItems: 'start',
      }}
    >
      <Feature
        delay={beat(0.113)}
        n="01"
        title="Prioritized workflows"
        body="that drive profitable growth"
      />
      <Feature
        delay={beat(0.27)}
        n="02"
        title="One platform"
        body="your tools, knowledge and templates — one connection to your core systems"
      />
      <Feature
        delay={beat(0.556)}
        n="03"
        title="Model-agnostic"
        body="stay on top of every AI wave, never locked to one vendor"
      />
      <Feature
        delay={beat(0.692)}
        n="04"
        title="Cost-managed"
        body="token spend never outruns the work it replaces"
      />
      <Feature
        delay={beat(0.843)}
        n="05"
        title="Secure by design"
        body="every new build inherits it"
      />
    </div>
  </Stage>
  );
};
