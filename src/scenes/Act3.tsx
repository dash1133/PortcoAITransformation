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
// SCENE 7 · CASE STUDY — THE ARCHITECTURE INSTANTIATED
//
// Deliberately mirrors the previous scene: five workflows on top, one Core
// beneath. Same shape, now filled with one company's actual systems and
// know-how — and honest about being three months into twenty-four.
// ---------------------------------------------------------------------------

const PROCS = [
  {n: '01', t: 'Warranty recovery', d: 'validate · submit · reconcile'},
  {n: '02', t: 'Procurement & AP', d: 'match · gated posting'},
  {n: '03', t: 'Quote-to-cash', d: 'quote · chase · invoice'},
  {n: '04', t: 'Bay operations', d: 'work orders · dispatch'},
  {n: '05', t: 'Parts & inventory', d: 'on-hand · transfers'},
];

const CORE_LAYERS = [
  ['Connectors', 'dealer-management ERP · CRM · HCM · OEM warranty portals'],
  ['Knowledge', 'OEM warranty policy manuals · coverage and rate tables · SOPs'],
  ['Templates', 'claim forms · appeal letters · write-off memos · quotes'],
];

const ProcCard: React.FC<{
  delay: number;
  live: boolean;
  n: string;
  t: string;
  d: string;
  left: number;
}> = ({delay, live, n, t, d, left}) => {
  const frame = useCurrentFrame();
  const lit = live
    ? interpolate(frame, [0, 14], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;
  return (
    <div style={{position: 'absolute', left, top: 236, width: 300}}>
      <Rise delay={delay} distance={18} dur={20}>
        <div
          style={{
            border: `${live ? 3 : 2}px solid ${
              lit > 0.5 ? COLORS.orange : '#D5CCC3'
            }`,
            backgroundColor: lit > 0.5 ? COLORS.cream : '#F1ECE7',
            borderRadius: 12,
            padding: '16px 20px 18px',
            height: 150,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 2,
              color: lit > 0.5 ? COLORS.orange : COLORS.inkMuted,
            }}
          >
            {lit > 0.5 ? `${n} · LIVE` : n}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: lit > 0.5 ? COLORS.ink : COLORS.inkSoft,
              marginTop: 6,
              lineHeight: 1.15,
            }}
          >
            {t}
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 300,
              color: COLORS.inkMuted,
              marginTop: 6,
              lineHeight: 1.3,
            }}
          >
            {d}
          </div>
        </div>
      </Rise>
    </div>
  );
};

export const SceneCaseStudy: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = useBeat();

  const liveAt = beat(0.586);
  const barFill = interpolate(frame, [beat(0.529), beat(0.575)], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage tone="light" padding={0}>
      <div style={{position: 'absolute', left: 130, top: 56}}>
        <Eyebrow delay={beat(0.02)}>Case study</Eyebrow>
        <div style={{height: 22}} />
        <Rise delay={beat(0.05)} distance={16}>
          <div
            style={{
              fontSize: 46,
              fontWeight: 700,
              letterSpacing: -1,
              color: COLORS.ink,
            }}
          >
            A heavy-equipment service business
          </div>
        </Rise>
      </div>

      {PROCS.map((p, i) => (
        <ProcCard
          key={p.n}
          delay={beat(0.091 + i * 0.034)}
          live={i === 0}
          left={130 + i * 320}
          {...p}
        />
      ))}

      {/* the live badge only lights once the VO says warranty is live */}
      {frame >= liveAt ? (
        <ProcCard
          delay={0}
          live
          left={130}
          n={PROCS[0].n}
          t={PROCS[0].t}
          d={PROCS[0].d}
        />
      ) : null}

      <Connector delay={beat(0.27)} id="cs-link" d="M 960 400 L 960 440" />

      <div style={{position: 'absolute', left: 130, top: 448, width: 1660}}>
        <Rise delay={beat(0.286)} distance={20} dur={24}>
          <div
            style={{
              border: `3px solid ${COLORS.orange}`,
              backgroundColor: COLORS.white,
              borderRadius: 12,
              padding: '22px 34px 26px',
              boxShadow: '0 10px 40px rgba(235,99,54,0.14)',
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 2.4,
                color: COLORS.orange,
                textAlign: 'center',
              }}
            >
              ENTERPRISE AI CORE · BUILT ONCE, REUSED BY ALL FIVE
            </div>
            <div style={{height: 18}} />
            {CORE_LAYERS.map(([t, d], i) => (
              <Rise key={t} delay={beat(0.329 + i * 0.071)} distance={12} dur={18}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 26,
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 25,
                      fontWeight: 700,
                      color: COLORS.ink,
                      width: 200,
                      flex: 'none',
                    }}
                  >
                    {t}
                  </span>
                  <span
                    style={{fontSize: 23, fontWeight: 300, color: COLORS.inkSoft}}
                  >
                    {d}
                  </span>
                </div>
              </Rise>
            ))}
          </div>
        </Rise>
      </div>

      {/* month 3 of 24 */}
      <div style={{position: 'absolute', left: 130, top: 852, width: 880}}>
        <Rise delay={beat(0.529)} distance={16}>
          <div
            style={{
              height: 18,
              borderRadius: 9,
              backgroundColor: '#E8DFD6',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(barFill / 100) * (3 / 24) * 100}%`,
                height: '100%',
                backgroundColor: COLORS.orange,
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 12,
            }}
          >
            <span style={{fontSize: 26, fontWeight: 700, color: COLORS.orange}}>
              Month 3
            </span>
            <span style={{fontSize: 26, fontWeight: 300, color: COLORS.inkMuted}}>
              Month 24
            </span>
          </div>
        </Rise>
      </div>

      <div style={{position: 'absolute', left: 1120, top: 838, width: 670}}>
        <Rise delay={beat(0.62)} distance={20}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 22}}>
            <span
              style={{
                fontSize: 58,
                fontWeight: 700,
                letterSpacing: -2,
                color: COLORS.orange,
              }}
            >
              $1.5M+
            </span>
            <span style={{fontSize: 24, fontWeight: 300, color: COLORS.inkSoft}}>
              of stuck warranty claims
              <br />
              surfaced and being worked
            </span>
          </div>
        </Rise>
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
            Strategic AI platform: what are we building?
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
