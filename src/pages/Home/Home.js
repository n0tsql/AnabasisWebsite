import React, { useEffect, useState } from 'react';
import { NavBar } from '../../components/NavBar/NavBar';
import { SEO } from '../../components/SEO/SEO';
// Written by scripts/generate-tooltips.js from public/assets/tooltips/, so
// committing a new image there is all it takes to add it to the marquee.
import tooltips from './tooltips.json';

const IMAGES = `${process.env.PUBLIC_URL}/assets/images`;
const TOOLTIPS = `${process.env.PUBLIC_URL}/assets/tooltips`;
const DISCORD_URL = 'https://discord.gg/CUv2JR9KCm';

// The DOOM files are hosted separately from this repo, on the original host. This
// URL has to change when anabasisrpg.com moves to GitHub Pages (see the README's
// "Moving anabasisrpg.com to GitHub Pages" checklist).
const DOOM_URL = 'https://anabasisrpg.com/assets/doom/doom.html';

const DESCRIPTION =
  "War with Hell. Anabasis is a fast-paced action-exploration MCRPG with a focus on movement, combat, and loot. You are the Gods' last hero, and must fight your way knee-deep in the dead to save Hellas.";

const LOOT_LINE = Array(96).fill('LOOT •').join(' ');

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

const FOOTER_ROW = {
  textAlign: 'left',
  paddingLeft: '10rem',
  fontSize: '20px',
  marginTop: '2%',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  height: '50px',
};

const FlipCard = ({ front, title, children }) => (
  <div className="flip-card">
    <div className="flip-card-inner">
      <div className={front}>
        <div style={{ width: '300px', height: '500px' }} alt="Avatar"></div>
      </div>
      <div className="flip-card-back">
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </div>
  </div>
);

export const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // Kept after closing so the image is still there while the modal fades out.
  const [modalSrc, setModalSrc] = useState();
  const [doomOpen, setDoomOpen] = useState(false);

  useEffect(() => {
    let inputSequence = [];

    const onKeyDown = (e) => {
      inputSequence.push(e.code);

      if (inputSequence.length > KONAMI_CODE.length) {
        inputSequence.shift();
      }

      if (JSON.stringify(inputSequence) === JSON.stringify(KONAMI_CODE)) {
        setDoomOpen(true);
        inputSequence = [];
      }

      // ESC closes Doom
      if (e.code === 'Escape') {
        setDoomOpen(false);
      }

      // ESC closes the tooltip modal
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <SEO description={DESCRIPTION} />

      <div className="hero">
        <div className="hero-content">
          <NavBar />

          {/* Anabasis Hero */}
          <img
            src={`${IMAGES}/logo_white.svg`}
            alt="Anabasis Logo"
            className="hero-logo"
            width="240"
            height="56"
          />
          <p className="hero-tagline">WAR WITH HELL</p>
        </div>
      </div>
      <div className="divider-section">
        <div className="section-divider"></div>
      </div>
      <section className="section1">
        <div className="header_section1">
          <h1>HELL DEVOURS THE INDOLENT.</h1>
        </div>

        <div className="text_section1 text-image">
          <p
            style={{
              textAlign: 'left',
              paddingLeft: '5rem',
              width: '50%',
              marginTop: '5%',
            }}
          >
            Movement and speed are crucial in your divine struggle against the
            Blight. Run, jump, think, swing! A blur of motion will be all your
            enemy saw. Be restless, lest you be consumed by Hell as one of them.
            With your trusty Chainglaive at your side, you must be capable of
            manuevering chaotic arenas and killing anything, and mean anything,
            on sight. Your aggression is how you survive waves of the dead.
          </p>

          <img
            src={`${IMAGES}/chainglaive_strike.webp`}
            alt="Chainglaive"
            width="700"
            height="350"
          />
          {/* TBD: Make a better WEBP that fits the theme more. I recorded it in the Lithopolis dungeon. */}
        </div>
      </section>
      <div className="divider-section">
        <div className="section-divider"></div>
      </div>
      <section className="section5">
        <div className="header_section1">
          <img
            src={`${IMAGES}/InfernoMania.svg`}
            alt="Chainglaive"
            width="auto"
            height="auto"
          />
        </div>

        <div className="text_section1">
          <p
            style={{
              textAlign: 'center',
              width: 'auto',
              marginTop: '5%',
              paddingRight: '20%',
              paddingLeft: '20%',
            }}
          >
            We are currently working on INFERNOMANIA, the premier action-based
            roguelike endless mode set in the city of Pandæmonium. Struggle to
            survive as you fight waves of endless Blight. Use your Chainglaive
            and new mobility tech to navigate the chaotic arenas, defeat top-tier
            wrasslin'-inspired bosses in Hell's hierarchy as you fight to live
            another wave.
          </p>
          <p
            style={{
              textAlign: 'center',
              width: 'auto',
              marginTop: '1%',
              paddingRight: '25%',
              paddingLeft: '25%',
            }}
          >
            Join our official Discord to stay updated on InfernoMania progress,
            events, and release!
          </p>
        </div>
        <button
          className="discord-button"
          style={{ marginTop: '3rem' }}
          onClick={() => {
            window.location.href = DISCORD_URL;
          }}
        >
          <img
            src={`${IMAGES}/discord-icon.svg`}
            alt="Discord"
            width="20"
            height="20"
            style={{ marginRight: '20px', float: 'left' }}
          />
          Join the Phalanx
        </button>
      </section>

      <section className="section2">
        <h1>IT'S YOU AGAINST THEM.</h1>

        <div className="content-wrapper">
          <p>
            Divine scion of Ares and last champion of the Gods, you are their
            final hero. As you stand betwixt ages of man, you are alone 'gainst
            the tides of Hell. Prepare yourself accordingly, for you are a one
            man army. Equipment, loot, and armour you find across Hellas is your
            only defense — and offense — against the damned. No one is here to
            save you, for you must save yourself.
          </p>
        </div>
      </section>

      <section className="loot-section">
        <div className="loot-banner">
          <div className="loot-track2">
            <span>{LOOT_LINE}</span>
          </div>
        </div>
        <div className="tooltip-container">
          <div className="tooltip-track">
            {/* Listed twice: the track scrolls by -50% for a seamless loop. */}
            {[...tooltips, ...tooltips].map((name, index) => (
              <img
                key={index}
                src={`${TOOLTIPS}/${name}`}
                className="tooltip-item"
                onClick={() => {
                  setModalSrc(`${TOOLTIPS}/${name}`);
                  setModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
        <div className="loot-banner">
          <div className="loot-track">
            <span>{LOOT_LINE}</span>
          </div>
        </div>
      </section>

      <section className="section3">
        <section className="section3-third">
          <div style={{ paddingLeft: '0%', paddingRight: '50%' }}>
            <h2>PUSH THEM BACK.</h2>
            <p>
              No war is without its frontlines. With every battle, the lines
              shift and stakes grow higher. This war is no longer about
              extermination, but about holding the line. Participate in
              large-scale PvE battles to defend Hellas, repel the Blight back,
              and take them directly to their homeworld: Hell.
            </p>
          </div>

          <div style={{ paddingLeft: '25%', paddingRight: '25%' }}>
            <h2>SANCTIFY THE EARTH.</h2>
            <p>
              Purify the realm against the encroaching Blight, sanctify the holy
              grounds of Hellas and keep the Blight at bay. With Purification
              potions, you can cleanse the land and uproot the corruption.
              Purification is also a versatile tool in combat — a potion is
              enough to kill many Blighted.
            </p>
          </div>

          <div style={{ paddingLeft: '50%', paddingRight: '0%' }}>
            <h2>THE GODS CAN'T HELP.</h2>
            <p>
              Heaven stands besieged by the Titan King's Tyrants, as demonic
              Legions ascend and breathe the ether, you are left to fight for not
              just your survival, but the salvation of all mankind. You lead your
              mortal Katabasis alone, the final stand against Kronos' dominion
              over damnation.
            </p>
          </div>
        </section>
      </section>

      <section className="section4-third">
        <FlipCard front="flip-card-front1" title="Hell">
          The realm of torture and punishment for sinners, layered one through
          ten in rank of severity.
        </FlipCard>
        <FlipCard front="flip-card-front2" title="Aprothymus">
          Last hero of the Gods and champion of mankind. Raiser of an army two
          million strong to conquer Hell.
        </FlipCard>
        <FlipCard front="flip-card-front3" title="Kronos">
          Titan King and devourer of his own children, he leads the Hell
          insurrection against the Gods with his Tyrants.
        </FlipCard>
      </section>
      <section className="section4-third">
        <FlipCard front="flip-card-front4" title="Hellas">
          Home of the Hellenes, the cradle of civilisation under threat by the
          Blight. They are your people, and you are destined to protect them.
        </FlipCard>
        <FlipCard front="flip-card-front5" title="Polum">
          Hellenic citystate and founder of the Hellenic League, the defensive
          alliance against the spreading Blight.
        </FlipCard>
        <FlipCard front="flip-card-front6" title="The Chainglaive">
          Your trusty spear-on-a-chain weapon. Use it to traverse the treacherous
          terrain of corrupted Hellas, or to grapple your enemies.
        </FlipCard>
      </section>
      <section className="legal">
        <ul>
          <li>
            Anabasis is not affiliated, nor endorsed by Mojang AB or Microsoft.
            Anabasis RPG is an independently made project with no affiliation
            with Mojang AB or Microsoft. "InfernoMania" has no official,
            commercial affiliation with World Wrestling Entertainment or any of
            its subsidiaries or parent companies. InfernoMania is not endorsed,
            affiliated with, or supported by the WWE.
          </li>
        </ul>

        <div style={FOOTER_ROW}>
          <span className="gold-text">CONTACT US:</span>
          <span>anabasisrpg@gmail.com</span>
          <span>/////////////////////</span>
          <span>/////////////////////</span>
          <span>/////////////////////</span>
        </div>
        <div style={FOOTER_ROW}>
          <span className="gold-text">↑ ↑ ↓ ↓ ← → ← → B A</span>
        </div>
      </section>

      <div id="tooltip-modal" className={modalOpen ? 'active' : undefined}>
        <div
          className="modal-background"
          onClick={() => setModalOpen(false)}
        ></div>
        <img id="large-tooltip" src={modalSrc} />
      </div>

      {doomOpen && (
        <div
          id="doom-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="doom-wrapper"
            style={{ position: 'relative', width: '960px', height: '600px' }}
          >
            <button
              id="close-doom"
              onClick={() => setDoomOpen(false)}
              style={{
                position: 'absolute',
                top: '-45px',
                right: 0,
                color: 'white',
                background: 'red',
                border: 'none',
                padding: '8px 12px',
                cursor: 'pointer',
                zIndex: 10000,
              }}
            >
              Close DOOM
            </button>

            <iframe
              src={DOOM_URL}
              style={{ width: '960px', height: '600px', border: 'none' }}
              allow="fullscreen; autoplay; gamepad; pointer-lock"
            ></iframe>
            <span
              style={{
                alignItems: 'center',
                color: '#A81330',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              ENTER to play. CTRL to shoot. ARROW KEYS to move. SPACE to open
              doors. SHIFT to run. ALT to strafe.
            </span>
          </div>
        </div>
      )}
    </>
  );
};
