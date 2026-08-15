import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Counter, Eyebrow, Headline, HoldOut, Rise, Stage} from '../components';
import {BRAND_GRADIENT, COLORS} from '../theme';

// ---------------------------------------------------------------------------
// SCENE 7 · THE AI POD
// VO: "We build it by deploying an AI Pod — a dedicated, cross-functional team
//      embedded inside your business. Product, AI and backend engineering, UX,
//      QA, DevOps — with our founder accountable for every outcome."
// ---------------------------------------------------------------------------

const RoleChip: React.FC<{delay: number; label: string; sub: string}> = ({
  delay,
  label,
  sub,
}) => (
  <Rise delay={delay} distance={22} dur={20}>
    <div
      style={{
        border: `2px solid ${COLORS.orange}`,
        backgroundColor: COLORS.white,
        borderRadius: 14,
        padding: '22px 26px',
        minWidth: 250,
      }}
    >
      <div style={{fontSize: 32, fontWeight: 600, color: COLORS.ink}}>
        {label}
      </div>
      <div style={{fontSize: 23, fontWeight: 300, color: COLORS.inkMuted}}>
        {sub}
      </div>
    </div>
  </Rise>
);

export const ScenePod: React.FC = () => (
  <Stage tone="light" padding={140}>
    <Eyebrow delay={4}>How we deliver</Eyebrow>
    <div style={{height: 40}} />
    <Headline delay={30} size={72}>
      A dedicated AI Pod,
      <br />
      embedded in your business.
    </Headline>

    <div style={{height: 66}} />

    <Rise delay={130} distance={18}>
      <div
        style={{
          display: 'inline-block',
          background: BRAND_GRADIENT,
          borderRadius: 14,
          padding: '20px 34px',
        }}
      >
        <div style={{fontSize: 32, fontWeight: 700, color: COLORS.white}}>
          Founder &amp; CEO — accountable for every outcome
        </div>
      </div>
    </Rise>

    <div style={{height: 40}} />

    <div style={{display: 'flex', gap: 22, flexWrap: 'wrap'}}>
      <RoleChip delay={210} label="Product" sub="Technical PM" />
      <RoleChip delay={240} label="AI + Backend" sub="pipelines & services" />
      <RoleChip delay={270} label="UX + Frontend" sub="design & build" />
      <RoleChip delay={300} label="QA" sub="test & automation" />
      <RoleChip delay={330} label="DevOps" sub="infra & CI/CD" />
    </div>
  </Stage>
);

// ---------------------------------------------------------------------------
// SCENE 7b · PROOF AT YOUR SIZE  (mid-market case study)
// VO: "And it works at your scale. For one mid-market portfolio company, we
//      unified three disconnected systems into a single interface. Answers that
//      used to take hours now take seconds — and they doubled their new client
//      wins."
// ---------------------------------------------------------------------------

const BigStat: React.FC<{
  delay: number;
  value: React.ReactNode;
  label: string;
}> = ({delay, value, label}) => (
  <Rise delay={delay} distance={28} dur={24}>
    <div style={{flex: 1}}>
      <div
        style={{
          fontSize: 120,
          fontWeight: 700,
          letterSpacing: -4,
          lineHeight: 1,
          color: COLORS.orange,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 29,
          fontWeight: 400,
          color: COLORS.inkSoft,
          marginTop: 16,
          lineHeight: 1.3,
        }}
      >
        {label}
      </div>
    </div>
  </Rise>
);

export const SceneCaseStudy: React.FC = () => (
  <Stage tone="light" padding={150}>
    <Eyebrow delay={4}>Proven at mid-market scale</Eyebrow>
    <div style={{height: 44}} />
    <Headline delay={26} size={62}>
      One portfolio company.
      <br />
      Three systems, unified.
    </Headline>

    <div style={{height: 74}} />

    <div style={{display: 'flex', gap: 80}}>
      <BigStat
        delay={190}
        value={<Counter to={3} delay={190} dur={26} format={false} />}
        label="disconnected systems unified into a single interface"
      />
      <BigStat
        delay={280}
        value="Hours → seconds"
        label="time to answer an operational question"
      />
      <BigStat delay={370} value="2×" label="new client wins" />
    </div>
  </Stage>
);

// ---------------------------------------------------------------------------
// SCENE 8 · WHAT WE ACTUALLY BUILD  (the architecture — hero scene)
//
// Beat map, following the VO exactly:
//   0.0s  title
//   4.0s  Custom Workflows appears
//   9.0s  Enterprise AI Core appears with its component chips
//  20.0s  the boundary draws itself — "what we build · what you own"
//  25.0s  the two outside boxes fade in (systems, personal productivity AI)
//  33.0s  bidirectional arrows connect them to the Core
//  44.0s  kicker card
// ---------------------------------------------------------------------------

const BOX = {
  left: 300,
  width: 1320,
  boundaryLeft: 210,
  boundaryWidth: 1500,
};

const OutsideBox: React.FC<{
  delay: number;
  top: number;
  title: string;
  sub: string;
}> = ({delay, top, title, sub}) => (
  <div style={{position: 'absolute', left: BOX.left, top, width: BOX.width}}>
    <Rise delay={delay} distance={16} dur={20}>
      <div
        style={{
          border: '2px dashed #C9BFB5',
          backgroundColor: '#F0EAE4',
          borderRadius: 12,
          padding: '18px 28px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 27,
            fontWeight: 600,
            color: COLORS.inkSoft,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          {title}
        </div>
        <div style={{fontSize: 24, fontWeight: 300, color: COLORS.inkMuted}}>
          {sub}
        </div>
      </div>
    </Rise>
  </div>
);

/**
 * Double-headed connector. Takes an SVG path so a run can leave the boundary,
 * travel down the outside edge, and re-enter at the Core — which is what the
 * personal-productivity-AI connection does.
 */
const BiPath: React.FC<{delay: number; id: string; d: string}> = ({
  delay,
  id,
  d,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const head = <path d="M0,0 L9,4.5 L0,9 z" fill={COLORS.orange} />;
  return (
    <svg
      style={{position: 'absolute', left: 0, top: 0, opacity: p}}
      width={1920}
      height={1080}
    >
      <defs>
        <marker
          id={`ms-${id}`}
          markerWidth="9"
          markerHeight="9"
          refX="4.5"
          refY="4.5"
          orient="auto-start-reverse"
        >
          {head}
        </marker>
        <marker
          id={`me-${id}`}
          markerWidth="9"
          markerHeight="9"
          refX="4.5"
          refY="4.5"
          orient="auto"
        >
          {head}
        </marker>
      </defs>
      <path
        d={d}
        fill="none"
        stroke={COLORS.orange}
        strokeWidth={3}
        strokeLinejoin="round"
        markerStart={`url(#ms-${id})`}
        markerEnd={`url(#me-${id})`}
      />
    </svg>
  );
};

const CoreChip: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span
    style={{
      border: `1.5px solid ${COLORS.orange}`,
      borderRadius: 999,
      padding: '9px 20px',
      fontSize: 24,
      fontWeight: 400,
      color: COLORS.ink,
      backgroundColor: COLORS.cream,
    }}
  >
    {children}
  </span>
);

export const SceneArchitecture: React.FC = () => {
  const frame = useCurrentFrame();

  // Boundary rectangle draws itself.
  const bTop = 268;
  const bHeight = 442;
  const perimeter = 2 * (BOX.boundaryWidth + bHeight);
  const draw = interpolate(frame, [600, 700], [perimeter, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const boundaryLabel = interpolate(frame, [690, 720], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage tone="light" padding={0}>
      <HoldOut at={1320} dur={22}>
        <div style={{position: 'absolute', left: 150, top: 62}}>
          <Rise delay={2} distance={14}>
            <div
              style={{
                fontSize: 50,
                fontWeight: 700,
                letterSpacing: -1,
                color: COLORS.ink,
              }}
            >
              What we build — and where the line sits.
            </div>
          </Rise>
        </div>

        {/* OUTSIDE · personal productivity AI */}
        <OutsideBox
          delay={760}
          top={150}
          title="Personal Productivity AI Platforms"
          sub="Claude · Copilot · ChatGPT Enterprise"
        />

        {/* THE BOUNDARY */}
        <svg
          style={{position: 'absolute', left: 0, top: 0}}
          width={1920}
          height={1080}
        >
          <rect
            x={BOX.boundaryLeft}
            y={bTop}
            width={BOX.boundaryWidth}
            height={bHeight}
            rx={18}
            fill="none"
            stroke={COLORS.orange}
            strokeWidth={4}
            strokeDasharray={perimeter}
            strokeDashoffset={draw}
          />
        </svg>

        <div
          style={{
            position: 'absolute',
            left: BOX.boundaryLeft + 34,
            top: bTop - 20,
            opacity: boundaryLabel,
            backgroundColor: COLORS.offWhite,
            padding: '0 16px',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: COLORS.orange,
          }}
        >
          What we build · What you own
        </div>

        {/* INSIDE · custom workflows */}
        <div
          style={{position: 'absolute', left: BOX.left, top: 320, width: BOX.width}}
        >
          <Rise delay={120} distance={20} dur={24}>
            <div
              style={{
                border: `2px solid ${COLORS.orange}`,
                backgroundColor: COLORS.white,
                borderRadius: 12,
                padding: '20px 30px',
                textAlign: 'center',
              }}
            >
              <div style={{fontSize: 38, fontWeight: 700, color: COLORS.ink}}>
                Custom Workflows
              </div>
              <div style={{fontSize: 25, fontWeight: 300, color: COLORS.inkSoft}}>
                the priority workflows that drive profit
              </div>
            </div>
          </Rise>
        </div>

        <BiPath delay={1000} id="wf" d="M 960 447 L 960 506" />

        {/* INSIDE · enterprise AI core */}
        <div
          style={{position: 'absolute', left: BOX.left, top: 512, width: BOX.width}}
        >
          <Rise delay={270} distance={20} dur={26}>
            <div
              style={{
                border: `3px solid ${COLORS.orange}`,
                backgroundColor: COLORS.white,
                borderRadius: 12,
                padding: '22px 30px 26px',
                textAlign: 'center',
                boxShadow: '0 10px 40px rgba(235,99,54,0.16)',
              }}
            >
              <div style={{fontSize: 42, fontWeight: 700, color: COLORS.orange}}>
                Enterprise AI Core
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  marginTop: 16,
                }}
              >
                <Rise delay={330} distance={10} dur={18}>
                  <CoreChip>MCP connectors</CoreChip>
                </Rise>
                <Rise delay={356} distance={10} dur={18}>
                  <CoreChip>Skills</CoreChip>
                </Rise>
                <Rise delay={382} distance={10} dur={18}>
                  <CoreChip>Knowledge bases</CoreChip>
                </Rise>
                <Rise delay={408} distance={10} dur={18}>
                  <CoreChip>Business &amp; office templates</CoreChip>
                </Rise>
                <Rise delay={434} distance={10} dur={18}>
                  <CoreChip>Components</CoreChip>
                </Rise>
              </div>
            </div>
          </Rise>
        </div>

        {/* OUTSIDE · enterprise systems */}
        <OutsideBox
          delay={820}
          top={840}
          title="Enterprise Systems & Data"
          sub="ERP · CRM · HCM · document stores — governed, RBAC-scoped, audited"
        />

        {/* personal AI leaves the frame edge and re-enters at the Core */}
        <BiPath
          delay={1000}
          id="ppai"
          d="M 1620 262 L 1800 262 L 1800 592 L 1624 592"
        />
        <BiPath delay={1040} id="sys" d="M 960 838 L 960 676" />
      </HoldOut>

      <ArchKicker />
    </Stage>
  );
};

const ArchKicker: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [1348, 1382], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (frame < 1344) return null;
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
          fontSize: 78,
          fontWeight: 700,
          letterSpacing: -1.8,
          lineHeight: 1.2,
          color: COLORS.ink,
          textAlign: 'center',
          transform: `translateY(${(1 - p) * 18}px)`,
        }}
      >
        The tools are how you talk to it.
        <br />
        <span style={{color: COLORS.orange}}>The Core is what you own.</span>
      </div>
    </div>
  );
};
