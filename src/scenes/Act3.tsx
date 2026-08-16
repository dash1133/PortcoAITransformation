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
// Layout note: the two things that sit OUTSIDE the boundary are placed so that
// each connects to the Enterprise AI Core with a single straight segment —
// systems below it, personal-productivity AI beside it. An earlier version put
// personal AI directly above the boundary, which forced its connector to wrap
// around the outside and collide with both the boundary edge and its label.
//
// Beat map, following the VO exactly:
//   0.0s  title
//   4.0s  Custom Workflows appears
//   9.0s  Enterprise AI Core appears with its component chips
//  20.0s  the boundary draws itself — "what we build · what you own"
//  25.0s  the two outside boxes fade in
//  33.0s  bidirectional connectors land
//  44.0s  kicker card
// ---------------------------------------------------------------------------

const ARCH = {
  // the owned boundary
  bx: 150,
  by: 250,
  bw: 1080,
  bh: 500,
  // boxes inside it
  ix: 200,
  iw: 980,
  workflowsY: 300,
  coreY: 500,
  // centre line of the inside column — everything below hangs off it
  cx: 690,
  coreMidY: 605,
};

const OutsideBox: React.FC<{
  delay: number;
  left: number;
  top: number;
  width: number;
  title: string;
  sub: string;
}> = ({delay, left, top, width, title, sub}) => (
  <div style={{position: 'absolute', left, top, width}}>
    <Rise delay={delay} distance={16} dur={20}>
      <div
        style={{
          border: '2px dashed #C4B9AE',
          backgroundColor: '#EFE9E3',
          borderRadius: 12,
          padding: '18px 26px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 25,
            fontWeight: 600,
            color: COLORS.inkSoft,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            lineHeight: 1.25,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 300,
            color: COLORS.inkMuted,
            marginTop: 6,
            lineHeight: 1.3,
          }}
        >
          {sub}
        </div>
      </div>
    </Rise>
  </div>
);

/** Double-headed connector between two boxes. */
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
      fontSize: 23,
      fontWeight: 400,
      color: COLORS.ink,
      backgroundColor: COLORS.cream,
    }}
  >
    {children}
  </span>
);

const CHIPS = [
  'MCP connectors',
  'Skills',
  'Knowledge bases',
  'Business & office templates',
  'Components',
];

export const SceneArchitecture: React.FC = () => {
  const frame = useCurrentFrame();

  const perimeter = 2 * (ARCH.bw + ARCH.bh);
  const draw = interpolate(frame, [600, 700], [perimeter, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const label = interpolate(frame, [692, 722], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage tone="light" padding={0}>
      <HoldOut at={1320} dur={22}>
        <div style={{position: 'absolute', left: 150, top: 66}}>
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

        {/* THE BOUNDARY — draws itself */}
        <svg
          style={{position: 'absolute', left: 0, top: 0}}
          width={1920}
          height={1080}
        >
          <rect
            x={ARCH.bx}
            y={ARCH.by}
            width={ARCH.bw}
            height={ARCH.bh}
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
            left: ARCH.bx + 32,
            top: ARCH.by - 19,
            opacity: label,
            backgroundColor: COLORS.offWhite,
            padding: '0 14px',
            fontSize: 23,
            fontWeight: 700,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: COLORS.orange,
          }}
        >
          What we build · What you own
        </div>

        {/* INSIDE · custom workflows */}
        <div
          style={{
            position: 'absolute',
            left: ARCH.ix,
            top: ARCH.workflowsY,
            width: ARCH.iw,
          }}
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

        {/* INSIDE · enterprise AI core */}
        <div
          style={{
            position: 'absolute',
            left: ARCH.ix,
            top: ARCH.coreY,
            width: ARCH.iw,
          }}
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
                  marginTop: 18,
                }}
              >
                {CHIPS.map((c, i) => (
                  <Rise key={c} delay={330 + i * 26} distance={10} dur={18}>
                    <CoreChip>{c}</CoreChip>
                  </Rise>
                ))}
              </div>
            </div>
          </Rise>
        </div>

        {/* OUTSIDE · personal productivity AI, beside the Core */}
        <OutsideBox
          delay={760}
          left={1400}
          top={512}
          width={400}
          title="Personal Productivity AI Platforms"
          sub="Claude · Copilot · ChatGPT Enterprise"
        />

        {/* OUTSIDE · enterprise systems, below the Core */}
        <OutsideBox
          delay={820}
          left={250}
          top={856}
          width={880}
          title="Enterprise Systems & Data"
          sub="ERP · CRM · HCM · document stores — governed, RBAC-scoped, audited"
        />

        {/* connectors — each a single straight segment */}
        <BiPath delay={1000} id="wf" d="M 690 452 L 690 494" />
        <BiPath delay={1000} id="ppai" d="M 1186 605 L 1394 605" />
        <BiPath delay={1040} id="sys" d="M 690 850 L 690 722" />
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
