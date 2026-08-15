import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Eyebrow, Headline, HoldOut, Rise, Stage} from '../components';
import {BRAND_GRADIENT, COLORS} from '../theme';

// ---------------------------------------------------------------------------
// SCENE 3 · THE REALITY INSIDE A PORTCO  (the problem, dark)
// VO: "But look inside a mid-market portfolio company today, and you find the
//      same four things. ... Plenty of solutions. Very little strategy."
// ---------------------------------------------------------------------------

const ProblemRow: React.FC<{
  delay: number;
  n: string;
  action: string;
  failure: string;
}> = ({delay, n, action, failure}) => (
  <Rise delay={delay} distance={28} dur={24}>
    <div style={{display: 'flex', alignItems: 'baseline', gap: 34}}>
      <span
        style={{
          fontSize: 30,
          fontWeight: 600,
          color: COLORS.orange,
          letterSpacing: 2,
          width: 60,
        }}
      >
        {n}
      </span>
      <span style={{fontSize: 52, fontWeight: 300, color: COLORS.white}}>
        {action}
      </span>
      <span
        style={{
          fontSize: 52,
          fontWeight: 600,
          color: COLORS.magenta,
        }}
      >
        {failure}
      </span>
    </div>
  </Rise>
);

export const SceneReality: React.FC = () => (
  <Stage tone="dark">
    <HoldOut at={690} dur={20}>
      <Eyebrow tone="dark" delay={4}>
        Inside a mid-market portfolio company
      </Eyebrow>

      <div style={{height: 60}} />

      <div style={{display: 'flex', flexDirection: 'column', gap: 40}}>
        <ProblemRow
          delay={140}
          n="01"
          action="Citizen developers build."
          failure="Nothing scales."
        />
        <ProblemRow
          delay={250}
          n="02"
          action="Vendors sell."
          failure="Nothing fits."
        />
        <ProblemRow
          delay={360}
          n="03"
          action="Leaders want to invest."
          failure="Nothing stands out."
        />
        <ProblemRow
          delay={480}
          n="04"
          action="Tokens burn."
          failure="Nothing returns."
        />
      </div>
    </HoldOut>

    <Landing />
  </Stage>
);

const Landing: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [720, 760], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (frame < 715) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 150,
        right: 150,
        top: '50%',
        transform: `translateY(-50%) translateY(${(1 - p) * 24}px)`,
        opacity: p,
      }}
    >
      <div
        style={{
          fontSize: 106,
          fontWeight: 700,
          letterSpacing: -2.5,
          lineHeight: 1.12,
          color: COLORS.white,
        }}
      >
        Plenty of solutions.
        <br />
        <span style={{color: COLORS.orange}}>Very little strategy.</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// SCENE 4 · YOUR OWN AI PLATFORM  (the recommendation)
// VO: "...Not another one-off solution. Not another vendor's platform. Your own
//      AI platform. Advantage isn't bought — it's built."
// ---------------------------------------------------------------------------

const Negation: React.FC<{delay: number; children: React.ReactNode}> = ({
  delay,
  children,
}) => {
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [delay + 18, delay + 44], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <Rise delay={delay} distance={20}>
      <div style={{position: 'relative', display: 'inline-block'}}>
        <span
          style={{
            fontSize: 62,
            fontWeight: 300,
            color: COLORS.inkMuted,
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
            backgroundColor: COLORS.inkMuted,
          }}
        />
      </div>
    </Rise>
  );
};

export const SceneRecommendation: React.FC = () => {
  const frame = useCurrentFrame();
  const kicker = interpolate(frame, [372, 402], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage tone="light">
      <HoldOut at={352} dur={18}>
        <Eyebrow delay={4}>Our recommendation, every time</Eyebrow>
        <div style={{height: 56}} />
        <div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
          <Negation delay={130}>Not another one-off solution.</Negation>
          <Negation delay={196}>Not another vendor&rsquo;s platform.</Negation>
          <Rise delay={268} distance={26}>
            <div
              style={{
                fontSize: 96,
                fontWeight: 700,
                letterSpacing: -2,
                color: COLORS.orange,
                marginTop: 14,
              }}
            >
              Your own AI platform.
            </div>
          </Rise>
        </div>
      </HoldOut>

      {frame >= 368 ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: kicker,
          }}
        >
          <div
            style={{
              fontSize: 118,
              fontWeight: 700,
              letterSpacing: -3,
              color: COLORS.ink,
              transform: `translateY(${(1 - kicker) * 18}px)`,
            }}
          >
            Advantage is built.
          </div>
        </div>
      ) : null}
    </Stage>
  );
};

// ---------------------------------------------------------------------------
// SCENE 5 · THE STRATEGIC AI ASSET  (thesis — full-bleed orange, biggest hold)
// VO: "Because what a portfolio company needs isn't another tool. It's a
//      strategic AI asset — one that drives profitable growth, and improves
//      exit value."
// ---------------------------------------------------------------------------

export const SceneThesis: React.FC = () => (
  <Stage tone="orange">
    <Rise delay={6} distance={30} dur={34}>
      <div
        style={{
          fontSize: 104,
          fontWeight: 700,
          letterSpacing: -2.6,
          lineHeight: 1.14,
          color: COLORS.white,
          maxWidth: 1500,
        }}
      >
        What a portfolio company needs is a{' '}
        <span style={{borderBottom: `8px solid ${COLORS.gold}`}}>
          strategic AI asset.
        </span>
      </div>
    </Rise>

    <div style={{height: 66}} />

    <Rise delay={168} distance={20}>
      <div style={{display: 'flex', gap: 70, alignItems: 'center'}}>
        <span style={{fontSize: 46, fontWeight: 600, color: COLORS.white}}>
          Drives profitable growth.
        </span>
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: COLORS.gold,
          }}
        />
        <span style={{fontSize: 46, fontWeight: 600, color: COLORS.white}}>
          Improves exit value.
        </span>
      </div>
    </Rise>
  </Stage>
);

// ---------------------------------------------------------------------------
// SCENE 6 · WHAT WE DELIVER  (five design principles)
// ---------------------------------------------------------------------------

const Feature: React.FC<{
  delay: number;
  n: string;
  title: string;
  body: string;
}> = ({delay, n, title, body}) => (
  <Rise delay={delay} distance={24} dur={22}>
    <div style={{display: 'flex', alignItems: 'flex-start', gap: 30}}>
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: COLORS.white,
          backgroundColor: COLORS.orange,
          borderRadius: 8,
          padding: '8px 13px',
          marginTop: 8,
        }}
      >
        {n}
      </div>
      <div>
        <div style={{fontSize: 42, fontWeight: 600, color: COLORS.ink}}>
          {title}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 300,
            color: COLORS.inkSoft,
            marginTop: 4,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  </Rise>
);

export const SceneDeliver: React.FC = () => (
  <Stage tone="light" padding={100}>
    <Headline delay={4} size={56} style={{letterSpacing: -1.2}}>
      We build these strategic assets
      <br />
      for portfolio companies.
    </Headline>

    <div style={{height: 30}} />
    <Rise delay={40} distance={8}>
      <div style={{width: 260, height: 5, background: BRAND_GRADIENT}} />
    </Rise>
    <div style={{height: 44}} />

    <div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
      <Feature
        delay={230}
        n="01"
        title="Prioritized workflows"
        body="that drive profitable growth"
      />
      <Feature
        delay={415}
        n="02"
        title="One platform"
        body="your tools, knowledge and templates — one connection to your core systems"
      />
      <Feature
        delay={610}
        n="03"
        title="Model-agnostic"
        body="stay on top of every AI wave, never locked to one vendor"
      />
      <Feature
        delay={800}
        n="04"
        title="Cost-managed"
        body="token spend never outruns the work it replaces"
      />
      <Feature
        delay={975}
        n="05"
        title="Secure by design"
        body="every new build inherits it"
      />
    </div>
  </Stage>
);
