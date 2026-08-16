import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Eyebrow, Headline, Rise, Stage, useBeat} from '../components';
import {BRAND_GRADIENT, COLORS} from '../theme';

// ---------------------------------------------------------------------------
// Shared: double-headed / single connector drawn as an SVG path
// ---------------------------------------------------------------------------

const Connector: React.FC<{
  delay: number;
  id: string;
  d: string;
  heads?: 'none' | 'end' | 'both';
}> = ({delay, id, d, heads = 'both'}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const head = <path d="M0,0 L14,7 L0,14 z" fill={COLORS.orange} />;
  return (
    <svg
      style={{position: 'absolute', left: 0, top: 0, opacity: p}}
      width={1920}
      height={1080}
    >
      <defs>
        <marker
          id={`ms-${id}`}
          markerUnits="userSpaceOnUse"
          markerWidth="14"
          markerHeight="14"
          refX="7"
          refY="7"
          orient="auto-start-reverse"
        >
          {head}
        </marker>
        <marker
          id={`me-${id}`}
          markerUnits="userSpaceOnUse"
          markerWidth="14"
          markerHeight="14"
          refX="7"
          refY="7"
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
        markerStart={heads === 'both' ? `url(#ms-${id})` : undefined}
        markerEnd={heads === 'none' ? undefined : `url(#me-${id})`}
      />
    </svg>
  );
};

/** Plain rule used for org-chart reporting lines. */
const OrgLine: React.FC<{delay: number; d: string}> = ({delay, d}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <svg
      style={{position: 'absolute', left: 0, top: 0, opacity: p}}
      width={1920}
      height={1080}
    >
      <path d={d} fill="none" stroke="#D8CCC1" strokeWidth={2.5} />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// SCENE 6 · THE AI POD
//
// Roles sit under an engineering manager, who reports into the portfolio
// company's own AI transformation team — the pod is an extension of their org,
// not a vendor sitting alongside it. Ultimate accountability is the last beat.
// ---------------------------------------------------------------------------

const RoleChip: React.FC<{delay: number; label: string; sub: string}> = ({
  delay,
  label,
  sub,
}) => (
  <Rise delay={delay} distance={18} dur={20}>
    <div
      style={{
        border: `2px solid ${COLORS.orange}`,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: '16px 20px',
        width: 268,
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 28, fontWeight: 600, color: COLORS.ink}}>
        {label}
      </div>
      <div style={{fontSize: 21, fontWeight: 300, color: COLORS.inkMuted}}>
        {sub}
      </div>
    </div>
  </Rise>
);

const ROLES = [
  {label: 'Product', sub: 'technical PM'},
  {label: 'AI + Backend', sub: 'pipelines & services'},
  {label: 'UX + Frontend', sub: 'design & build'},
  {label: 'QA', sub: 'test & automation'},
  {label: 'DevOps', sub: 'infra & CI/CD'},
];

export const ScenePod: React.FC = () => {
  const beat = useBeat();
  return (
  <Stage tone="light" padding={0}>
    <div style={{position: 'absolute', left: 130, top: 62}}>
      <Eyebrow delay={beat(0.01)}>How we deliver</Eyebrow>
      <div style={{height: 26}} />
      <Rise delay={beat(0.06)} distance={16}>
        <div
          style={{
            fontSize: 54,
            fontWeight: 700,
            letterSpacing: -1.2,
            color: COLORS.ink,
          }}
        >
          A dedicated AI Pod, embedded in your team
        </div>
      </Rise>
    </div>

    {/* reporting lines are drawn first so the cards paint over them */}
    <OrgLine delay={beat(0.35)} d="M 960 326 L 960 388" />
    <OrgLine
      delay={beat(0.475)}
      d="M 960 462 L 960 502 M 372 502 L 1548 502 M 372 502 L 372 536 M 666 502 L 666 536 M 960 502 L 960 536 M 1254 502 L 1254 536 M 1548 502 L 1548 536"
    />

    {/* client org at the top of the reporting line */}
    <div style={{position: 'absolute', left: 660, top: 262, width: 600}}>
      <Rise delay={beat(0.219)} distance={16} dur={22}>
        <div
          style={{
            border: '2px dashed #C4B9AE',
            backgroundColor: '#EFE9E3',
            borderRadius: 12,
            padding: '16px 26px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: COLORS.inkSoft,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
            }}
          >
            PortCo AI Transformation Team
          </div>
        </div>
      </Rise>
    </div>

    {/* engineering manager */}
    <div style={{position: 'absolute', left: 700, top: 388, width: 520}}>
      <Rise delay={beat(0.371)} distance={16} dur={22}>
        <div
          style={{
            background: BRAND_GRADIENT,
            borderRadius: 12,
            padding: '18px 26px',
            textAlign: 'center',
          }}
        >
          <div style={{fontSize: 32, fontWeight: 700, color: COLORS.white}}>
            Engineering Manager
          </div>
        </div>
      </Rise>
    </div>

    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 534,
        display: 'flex',
        justifyContent: 'center',
        gap: 26,
      }}
    >
      {ROLES.map((r, i) => (
        <RoleChip key={r.label} delay={beat(0.49 + i * 0.028)} {...r} />
      ))}
    </div>

    {/* the last point */}
    <div style={{position: 'absolute', left: 130, right: 130, top: 760}}>
      <Rise delay={beat(0.663)} distance={18}>
        <div
          style={{
            borderTop: `3px solid ${COLORS.orange}`,
            paddingTop: 26,
            display: 'flex',
            alignItems: 'baseline',
            gap: 20,
          }}
        >
          <span style={{fontSize: 40, fontWeight: 700, color: COLORS.ink}}>
            Founder &amp; CEO
          </span>
          <span style={{fontSize: 36, fontWeight: 300, color: COLORS.inkSoft}}>
            &mdash; ultimate accountability for every outcome
          </span>
        </div>
      </Rise>
    </div>
  </Stage>
  );
};

// ---------------------------------------------------------------------------
// SCENE 7 · CASE STUDY
// Three disconnected sources answered by one agent, plus the outcomes.
// ---------------------------------------------------------------------------

const SourceBox: React.FC<{delay: number; left: number; label: string}> = ({
  delay,
  left,
  label,
}) => (
  <div style={{position: 'absolute', left, top: 300, width: 340}}>
    <Rise delay={delay} distance={16} dur={20}>
      <div
        style={{
          border: '2px dashed #C4B9AE',
          backgroundColor: '#EFE9E3',
          borderRadius: 12,
          padding: '18px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{fontSize: 27, fontWeight: 600, color: COLORS.inkSoft}}>
          {label}
        </div>
      </div>
    </Rise>
  </div>
);

const Outcome: React.FC<{delay: number; value: string; label: string}> = ({
  delay,
  value,
  label,
}) => (
  <Rise delay={delay} distance={22} dur={22} style={{flex: 1}}>
    <div style={{textAlign: 'center'}}>
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          letterSpacing: -1.6,
          color: COLORS.orange,
          lineHeight: 1.05,
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 400,
          color: COLORS.inkSoft,
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </div>
  </Rise>
);

export const SceneCaseStudy: React.FC = () => {
  const beat = useBeat();
  return (
  <Stage tone="light" padding={0}>
    <div style={{position: 'absolute', left: 130, top: 62}}>
      <Eyebrow delay={beat(0.01)}>Case study</Eyebrow>
      <div style={{height: 24}} />
      <Rise delay={beat(0.05)} distance={16}>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: -1.2,
            color: COLORS.ink,
          }}
        >
          Three disconnected systems, one Planner agent
        </div>
      </Rise>
    </div>

    <SourceBox delay={beat(0.158)} left={190} label="QuickBase" />
    <SourceBox delay={beat(0.23)} left={790} label="Event Documents" />
    <SourceBox delay={beat(0.303)} left={1390} label="Policy Library" />

    {/* sources funnel into the agent */}
    <Connector
      delay={beat(0.4)}
      id="cs-bus"
      heads="none"
      d="M 360 382 L 360 434 M 960 382 L 960 434 M 1560 382 L 1560 434 M 360 434 L 1560 434"
    />
    <Connector delay={beat(0.418)} id="cs-in" heads="end" d="M 960 434 L 960 461" />

    <div style={{position: 'absolute', left: 660, top: 476, width: 600}}>
      <Rise delay={beat(0.418)} distance={20} dur={24}>
        <div
          style={{
            border: `3px solid ${COLORS.orange}`,
            backgroundColor: COLORS.white,
            borderRadius: 12,
            padding: '20px 26px',
            textAlign: 'center',
            boxShadow: '0 10px 40px rgba(235,99,54,0.16)',
          }}
        >
          <div style={{fontSize: 40, fontWeight: 700, color: COLORS.orange}}>
            Planner Agent
          </div>
        </div>
      </Rise>
    </div>

    <Connector delay={beat(0.57)} id="cs-out" d="M 960 596 L 960 633" />

    <div style={{position: 'absolute', left: 610, top: 648, width: 700}}>
      <Rise delay={beat(0.582)} distance={16} dur={20}>
        <div
          style={{
            backgroundColor: COLORS.cream,
            border: `2px solid ${COLORS.orange}`,
            borderRadius: 12,
            padding: '16px 24px',
            textAlign: 'center',
          }}
        >
          <div style={{fontSize: 30, fontWeight: 600, color: COLORS.ink}}>
            Staff ask in plain language
          </div>
        </div>
      </Rise>
    </div>

    <div
      style={{
        position: 'absolute',
        left: 150,
        right: 150,
        top: 790,
        display: 'flex',
        gap: 40,
      }}
    >
      <Outcome delay={beat(0.703)} value="3 → 1" label="systems unified into one interface" />
      <Outcome delay={beat(0.776)} value="Hours → seconds" label="time to answer" />
      <Outcome delay={beat(0.848)} value="2×" label="new client wins" />
    </div>
  </Stage>
  );
};

// ---------------------------------------------------------------------------
// SCENE 8 · THE ARCHITECTURE OF A STRATEGIC AI ASSET
//
// The two things outside the boundary are positioned so each reaches the Core
// with one straight segment: systems below, personal-productivity AI beside.
// ---------------------------------------------------------------------------

const ARCH = {
  bx: 150,
  by: 250,
  bw: 1080,
  bh: 520,
  ix: 200,
  iw: 980,
  workflowsY: 300,
  coreY: 500,
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

const CoreChip: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span
    style={{
      display: 'inline-block',
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
  const beat = useBeat();

  const perimeter = 2 * (ARCH.bw + ARCH.bh);
  const draw = interpolate(frame, [beat(0.356), beat(0.421)], [perimeter, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const label = interpolate(frame, [beat(0.41), beat(0.436)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage tone="light" padding={0}>
      <div style={{position: 'absolute', left: 150, top: 66}}>
        <Rise delay={beat(0.005)} distance={14}>
          <div
            style={{
              fontSize: 50,
              fontWeight: 700,
              letterSpacing: -1,
              color: COLORS.ink,
            }}
          >
            The architecture of a strategic AI asset
          </div>
        </Rise>
      </div>

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

      <div
        style={{
          position: 'absolute',
          left: ARCH.ix,
          top: ARCH.workflowsY,
          width: ARCH.iw,
        }}
      >
        <Rise delay={beat(0.114)} distance={20} dur={24}>
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

      <div
        style={{
          position: 'absolute',
          left: ARCH.ix,
          top: ARCH.coreY,
          width: ARCH.iw,
        }}
      >
        <Rise delay={beat(0.198)} distance={20} dur={26}>
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
                <Rise key={c} delay={beat(0.237 + i * 0.018)} distance={10} dur={18}>
                  <CoreChip>{c}</CoreChip>
                </Rise>
              ))}
            </div>
          </div>
        </Rise>
      </div>

      <OutsideBox
        delay={beat(0.46)}
        left={1400}
        top={512}
        width={400}
        title="Personal Productivity AI Platforms"
        sub="Claude · Copilot · ChatGPT Enterprise"
      />

      <OutsideBox
        delay={beat(0.54)}
        left={250}
        top={856}
        width={880}
        title="Enterprise Systems & Data"
        sub="ERP · CRM · HCM · document stores — governed, RBAC-scoped, audited"
      />

      <Connector delay={beat(0.655)} id="wf" d="M 690 453 L 690 485" />
      <Connector delay={beat(0.655)} id="ppai" d="M 1195 605 L 1385 605" />
      <Connector delay={beat(0.675)} id="sys" d="M 690 841 L 690 742" />
    </Stage>
  );
};

export {Headline};
