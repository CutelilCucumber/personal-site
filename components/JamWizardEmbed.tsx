'use client';

import { useState } from 'react';

// The itch.io jam build, embedded with the official embed-upload player. It only
// loads after a click, so visitors who never press Start don't download the
// WebAssembly build.
// TODO: once the current build has a public demo, self-host it and point this at it.
const EMBED_SRC = 'https://itch.io/embed-upload/19833458?color=0e0718';
const ITCH_PAGE = 'https://brisonder.itch.io/jam-wizard';

export default function JamWizardEmbed() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="embed">
      <div className="embed-screen">
        {playing ? (
          <iframe
            src={EMBED_SRC}
            title="Jam Wizard (game-jam build)"
            allow="autoplay; fullscreen; gamepad; cross-origin-isolated"
            allowFullScreen
          />
        ) : (
          <button type="button" className="embed-poster" onClick={() => setPlaying(true)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/projects/jam-wizard-cover.webp" alt="" width={1260} height={1000} />
            <span className="embed-start">
              <span className="blink">▶</span> Press start
            </span>
          </button>
        )}
      </div>
      <p className="embed-caption">
        The original <strong>Jam Wizard</strong> game-jam build. Keyboard and mouse, desktop only. Q/E/R/F queue
        components, left click casts.{' '}
        <a href={ITCH_PAGE} target="_blank" rel="noreferrer">
          Open on itch.io
        </a>
        .
      </p>
    </div>
  );
}
