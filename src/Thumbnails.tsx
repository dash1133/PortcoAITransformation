import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {BrandFont} from './fonts';
import {BRAND_GRADIENT, COLORS, FONT} from './theme';

// ---------------------------------------------------------------------------
// YOUTUBE THUMBNAILS · 1280x720
//
// These are designed against the size they are actually judged at: roughly
// 210x118 in a phone feed. That is the whole brief. Everything here follows
// from it — three or four words at most, set enormous, on the darkest ground
// in the palette so the type separates at any scale, and no element that
// disappears when the image is six percent of its native size.
//
// They pair with the title "How Portfolio Companies Turn AI Into Exit Value",
// so none of them repeat the outcome. The title makes the promise; the
// thumbnail supplies the proof or the mechanism behind it.
// ---------------------------------------------------------------------------

const W = 1280;
const H = 720;

/** Warm off-centre glow, matching the film's dark scenes. */
const Bloom: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(1100px 720px at 68% 18%, rgba(235,99,54,0.20) 0%, ' +
        'rgba(225,52,97,0.09) 42%, rgba(20,17,16,0) 72%)',
    }}
  />
);

const Frame: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill
    style={{backgroundColor: COLORS.dark, fontFamily: FONT.family}}
  >
    <BrandFont />
    <Bloom />
    {children}
    {/* Bottom gradient rule — the one brand cue that still reads small. */}
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 10,
        background: BRAND_GRADIENT,
      }}
    />
  </AbsoluteFill>
);

/**
 * The lockup is dark-on-light artwork. Inverting it turns the coloured
 * infinity mark into a hollow white outline, which is the most recognisable
 * part of the brand and the part worth protecting — so it sits on a light
 * plate instead and keeps its colour.
 */
const Mark: React.FC<{width?: number}> = ({width = 210}) => (
  <div
    style={{
      backgroundColor: COLORS.offWhite,
      borderRadius: 14,
      padding: '16px 22px',
      display: 'inline-block',
      lineHeight: 0,
    }}
  >
    <Img
      src={staticFile('logo.png')}
      style={{width, height: 'auto', display: 'block'}}
    />
  </div>
);

// --- A · the mechanism ------------------------------------------------------
// "Pilots" is what the money buys today; "assets" is what shows up at exit.
// The strike does the argument without a word of explanation.

export const ThumbPilotsAssets: React.FC = () => (
  <Frame>
    <AbsoluteFill style={{padding: 58, justifyContent: 'center'}}>
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          alignSelf: 'flex-start',
        }}
      >
        <div
          style={{
            fontSize: 152,
            fontWeight: 700,
            letterSpacing: -5,
            lineHeight: 1,
            color: '#6E635C',
          }}
        >
          PILOTS
        </div>
        <div
          style={{
            position: 'absolute',
            left: -18,
            right: -18,
            top: '45%',
            height: 13,
            backgroundColor: COLORS.orange,
            transform: 'rotate(-2deg)',
          }}
        />
      </div>

      <div style={{height: 10}} />

      <div
        style={{
          fontSize: 272,
          fontWeight: 700,
          letterSpacing: -12,
          lineHeight: 0.95,
          color: COLORS.white,
        }}
      >
        ASSETS
      </div>

      <div style={{height: 24}} />

      <div
        style={{
          fontSize: 46,
          fontWeight: 600,
          letterSpacing: 0,
          color: COLORS.gold,
        }}
      >
        AI your portfolio company owns
      </div>
    </AbsoluteFill>

    <div style={{position: 'absolute', right: 52, bottom: 44}}>
      <Mark />
    </div>
  </Frame>
);

// --- B · the proof ----------------------------------------------------------
// One number with a clock on it. The only claim in the film a sceptic can't
// wave away as positioning.

export const ThumbNumber: React.FC = () => (
  <Frame>
    <AbsoluteFill style={{padding: 58, justifyContent: 'center'}}>
      <div
        style={{
          fontSize: 62,
          fontWeight: 600,
          letterSpacing: 5,
          textTransform: 'uppercase',
          color: COLORS.darkMuted,
        }}
      >
        Month 3 of 24
      </div>

      <div style={{height: 4}} />

      <div
        style={{
          fontSize: 300,
          fontWeight: 700,
          letterSpacing: -14,
          lineHeight: 0.95,
          color: COLORS.orange,
        }}
      >
        $1.5M
      </div>

      <div style={{height: 16}} />

      <div
        style={{
          fontSize: 66,
          fontWeight: 600,
          letterSpacing: -1.5,
          lineHeight: 1.12,
          color: COLORS.white,
          maxWidth: 1010,
        }}
      >
        surfaced in one workflow.
        <br />
        Four more behind it.
      </div>
    </AbsoluteFill>

    <div style={{position: 'absolute', right: 52, bottom: 44}}>
      <Mark />
    </div>
  </Frame>
);

// --- C · the credential -----------------------------------------------------
// Enterprise proof, for a buyer who needs to know this has been done at scale
// before it is done to them.

export const ThumbScale: React.FC = () => (
  <Frame>
    <AbsoluteFill style={{padding: 58, justifyContent: 'center'}}>
      <div
        style={{
          fontSize: 286,
          fontWeight: 700,
          letterSpacing: -13,
          lineHeight: 0.95,
          color: COLORS.white,
        }}
      >
        10,000
      </div>

      <div style={{height: 2}} />

      <div
        style={{
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: -2.5,
          color: COLORS.orange,
        }}
      >
        users. Six continents.
      </div>

      <div style={{height: 22}} />

      <div
        style={{
          fontSize: 52,
          fontWeight: 500,
          letterSpacing: 0,
          color: COLORS.gold,
          maxWidth: 1010,
          lineHeight: 1.2,
        }}
      >
        One AI platform. We built it.
      </div>
    </AbsoluteFill>

    <div style={{position: 'absolute', right: 52, bottom: 44}}>
      <Mark />
    </div>
  </Frame>
);

// --- D · the title itself ---------------------------------------------------
// Per Dash: build the thumbnail on the title. The full title is present, but
// it is not set flat -- "EXIT VALUE" is the payoff and the only part that can
// survive the phone feed, so the lead clause is set as a run-in above it and
// the payoff carries the weight. Read large it is the whole sentence; read
// small it is two words, which is exactly the right pair of readings.

const TitleBlock: React.FC<{tone: 'dark' | 'light'; width?: number}> = ({
  tone,
  width,
}) => {
  const dark = tone === 'dark';
  return (
    <div style={{maxWidth: width}}>
      <div
        style={{
          fontSize: 56,
          fontWeight: 600,
          letterSpacing: -1,
          lineHeight: 1.14,
          color: dark ? COLORS.gold : COLORS.inkSoft,
        }}
      >
        How portfolio companies
        <br />
        turn AI into
      </div>

      <div style={{height: 14}} />

      <div
        style={{
          fontSize: width && width < 800 ? 150 : 178,
          fontWeight: 700,
          letterSpacing: -7,
          lineHeight: 0.94,
          color: dark ? COLORS.white : COLORS.ink,
        }}
      >
        EXIT
        <br />
        VALUE
      </div>

      <div style={{height: 22}} />

      <div style={{width: 260, height: 10, background: BRAND_GRADIENT}} />
    </div>
  );
};

export const ThumbTitleDark: React.FC = () => (
  <Frame>
    <AbsoluteFill style={{padding: 58, justifyContent: 'center'}}>
      <TitleBlock tone="dark" />
    </AbsoluteFill>
    <div style={{position: 'absolute', right: 52, bottom: 44}}>
      <Mark />
    </div>
  </Frame>
);

/** Light ground: on YouTube's dark interface this is the higher-contrast card. */
export const ThumbTitleLight: React.FC = () => (
  <AbsoluteFill
    style={{backgroundColor: COLORS.offWhite, fontFamily: FONT.family}}
  >
    <BrandFont />
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(1000px 700px at 78% 12%, rgba(235,99,54,0.16) 0%, ' +
          'rgba(255,164,21,0.08) 45%, rgba(250,248,246,0) 74%)',
      }}
    />
    <AbsoluteFill style={{padding: 58, justifyContent: 'center'}}>
      <TitleBlock tone="light" />
    </AbsoluteFill>
    <div style={{position: 'absolute', right: 52, bottom: 44}}>
      <Img
        src={staticFile('logo.png')}
        style={{width: 210, height: 'auto', display: 'block'}}
      />
    </div>
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 10,
        background: BRAND_GRADIENT,
      }}
    />
  </AbsoluteFill>
);

// --- E · the title, with the founder ----------------------------------------
// A face is the single biggest lever on click-through for founder-led B2B, so
// the type gives up the right third of the frame to make room for one. The
// headshot is cropped to its own alpha bounds upstream, which means its box is
// the subject's box and the layout below can position it exactly.

const PHOTO_H = 665;

const Founder: React.FC<{glow: string}> = ({glow}) => (
  <>
    {/* Pool of brand colour behind the shoulders so the cutout is seated on
        the ground rather than pasted onto it. */}
    <AbsoluteFill
      style={{
        background:
          `radial-gradient(430px 500px at 79% 64%, ${glow} 0%, rgba(20,17,16,0) 74%)`,
      }}
    />
    <div style={{position: 'absolute', right: 8, bottom: 0}}>
      <Img
        src={staticFile('dash.png')}
        style={{height: PHOTO_H, width: 'auto', display: 'block'}}
      />
    </div>
  </>
);

export const ThumbTitlePhoto: React.FC = () => (
  <Frame>
    <Founder glow="rgba(235,99,54,0.30)" />
    <AbsoluteFill style={{padding: 58, justifyContent: 'center'}}>
      <TitleBlock tone="dark" width={700} />
    </AbsoluteFill>
    <div style={{position: 'absolute', left: 58, bottom: 40}}>
      <Mark width={170} />
    </div>
  </Frame>
);

/** Light ground — the higher-contrast card against YouTube's dark interface. */
export const ThumbTitlePhotoLight: React.FC = () => (
  <AbsoluteFill
    style={{backgroundColor: COLORS.offWhite, fontFamily: FONT.family}}
  >
    <BrandFont />
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(900px 700px at 22% 10%, rgba(255,164,21,0.14) 0%, ' +
          'rgba(250,248,246,0) 70%)',
      }}
    />
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(430px 500px at 79% 64%, rgba(235,99,54,0.22) 0%, ' +
          'rgba(250,248,246,0) 74%)',
      }}
    />
    <div style={{position: 'absolute', right: 8, bottom: 0}}>
      <Img
        src={staticFile('dash.png')}
        style={{height: PHOTO_H, width: 'auto', display: 'block'}}
      />
    </div>

    <AbsoluteFill style={{padding: 58, justifyContent: 'center'}}>
      <TitleBlock tone="light" width={700} />
    </AbsoluteFill>

    <div style={{position: 'absolute', left: 58, bottom: 38}}>
      <Img
        src={staticFile('logo.png')}
        style={{width: 190, height: 'auto', display: 'block'}}
      />
    </div>
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 10,
        background: BRAND_GRADIENT,
      }}
    />
  </AbsoluteFill>
);

export const THUMB_SIZE = {width: W, height: H};
