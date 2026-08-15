import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {BRAND_GRADIENT, COLORS, FONT} from './theme';

// ---------------------------------------------------------------------------
// Motion primitives
// ---------------------------------------------------------------------------

/** Eased 0→1 over `dur` frames starting at `delay`. */
export const useReveal = (delay = 0, dur = 22) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    config: {damping: 200, mass: 0.7},
    durationInFrames: dur,
  });
};

/** Fade + rise. The house transition for every text block. */
export const Rise: React.FC<{
  delay?: number;
  distance?: number;
  dur?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({delay = 0, distance = 26, dur = 24, style, children}) => {
  const p = useReveal(delay, dur);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * distance}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Fades a block out near the end of its scene so cuts never feel abrupt. */
export const HoldOut: React.FC<{
  at: number;
  dur?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({at, dur = 14, children, style}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + dur], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <div style={{opacity: o, ...style}}>{children}</div>;
};

// ---------------------------------------------------------------------------
// Backgrounds
// ---------------------------------------------------------------------------

/** Soft drifting brand-colour bloom — keeps light frames from feeling static. */
const Bloom: React.FC<{dark?: boolean}> = ({dark}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 190) * 42;
  const drift2 = Math.cos(frame / 240) * 36;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          width: 1500,
          height: 1500,
          left: -420 + drift,
          top: -560 + drift2,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.orange}${
            dark ? '26' : '1F'
          } 0%, transparent 62%)`,
          filter: 'blur(30px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 1250,
          height: 1250,
          right: -380 - drift,
          bottom: -520 - drift2,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.amber}${
            dark ? '20' : '1C'
          } 0%, transparent 62%)`,
          filter: 'blur(30px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          right: 260 + drift2,
          top: -300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.magenta}${
            dark ? '18' : '12'
          } 0%, transparent 60%)`,
          filter: 'blur(40px)',
        }}
      />
    </AbsoluteFill>
  );
};

export const Stage: React.FC<{
  tone?: 'light' | 'dark' | 'orange';
  children: React.ReactNode;
  padding?: number;
}> = ({tone = 'light', children, padding = 150}) => {
  const bg =
    tone === 'dark'
      ? COLORS.dark
      : tone === 'orange'
        ? COLORS.orange
        : COLORS.offWhite;

  return (
    <AbsoluteFill style={{backgroundColor: bg, fontFamily: FONT.family}}>
      {tone !== 'orange' ? <Bloom dark={tone === 'dark'} /> : null}
      <AbsoluteFill
        style={{
          padding,
          justifyContent: 'center',
        }}
      >
        {children}
      </AbsoluteFill>
      <GradientRule tone={tone} />
    </AbsoluteFill>
  );
};

/** The infinity-mark gradient as a hairline along the bottom of every frame. */
const GradientRule: React.FC<{tone: 'light' | 'dark' | 'orange'}> = ({tone}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [0, 60], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (tone === 'orange') return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: 6,
        width: `${w}%`,
        background: BRAND_GRADIENT,
      }}
    />
  );
};

// ---------------------------------------------------------------------------
// Brand elements
// ---------------------------------------------------------------------------

export const Logo: React.FC<{width?: number; style?: React.CSSProperties}> = ({
  width = 560,
  style,
}) => (
  <Img
    src={staticFile('logo.png')}
    style={{width, height: 'auto', display: 'block', ...style}}
  />
);

/** Small uppercase label with a leading gradient tick. */
export const Eyebrow: React.FC<{
  children: React.ReactNode;
  tone?: 'light' | 'dark';
  delay?: number;
}> = ({children, tone = 'light', delay = 0}) => (
  <Rise delay={delay} distance={14}>
    <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
      <div style={{width: 54, height: 5, background: BRAND_GRADIENT}} />
      <span
        style={{
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: 5,
          textTransform: 'uppercase',
          color: tone === 'dark' ? COLORS.darkMuted : COLORS.inkMuted,
        }}
      >
        {children}
      </span>
    </div>
  </Rise>
);

export const Headline: React.FC<{
  children: React.ReactNode;
  size?: number;
  tone?: 'light' | 'dark' | 'orange';
  weight?: number;
  delay?: number;
  style?: React.CSSProperties;
}> = ({children, size = 92, tone = 'light', weight = 700, delay = 0, style}) => (
  <Rise delay={delay}>
    <div
      style={{
        fontSize: size,
        fontWeight: weight,
        lineHeight: 1.1,
        letterSpacing: -1.6,
        color:
          tone === 'dark'
            ? COLORS.white
            : tone === 'orange'
              ? COLORS.white
              : COLORS.ink,
        ...style,
      }}
    >
      {children}
    </div>
  </Rise>
);

/** Counts a number up, then holds. */
export const Counter: React.FC<{
  to: number;
  delay?: number;
  dur?: number;
  suffix?: string;
  format?: boolean;
}> = ({to, delay = 0, dur = 40, suffix = '', format = true}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const eased = 1 - Math.pow(1 - p, 3);
  const v = Math.round(to * eased);
  return (
    <>
      {format ? v.toLocaleString('en-US') : v}
      {suffix}
    </>
  );
};

/** A framed box used by the architecture diagram. */
export const Panel: React.FC<{
  children: React.ReactNode;
  accent?: string;
  muted?: boolean;
  style?: React.CSSProperties;
}> = ({children, accent = COLORS.orange, muted = false, style}) => (
  <div
    style={{
      border: `2px solid ${muted ? '#D9D0C7' : accent}`,
      backgroundColor: muted ? '#F2EDE8' : COLORS.white,
      borderRadius: 14,
      padding: '22px 30px',
      ...style,
    }}
  >
    {children}
  </div>
);
