import { useEffect, useState } from 'react';
import { SettingsOverlay } from '@/components/settings-overlay';
import { useApplyAccent } from '@/hooks/use-apply-accent';
import { formatUntil, minutesUntilBedtime } from '@/lib/bedtime';
import { STEPS } from '@/lib/steps';
import { useWindStore } from '@/store/wind-store';
import type { Phase } from '@/types/domain';

const BEDTIME_CHIPS = ['21:30', '22:00', '22:30', '23:00', '23:30'];

export function App() {
  useApplyAccent();
  const bedtime = useWindStore((state) => state.settings.bedtime);
  const setBedtime = useWindStore((state) => state.setBedtime);

  const [phase, setPhase] = useState<Phase>('home');
  const [now, setNow] = useState(() => new Date());
  const [step, setStep] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // A slow clock for the live countdown while waiting.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(id);
  }, []);

  // The screen progressively dims from the second ritual step onward.
  useEffect(() => {
    document.body.classList.toggle('dim', phase === 'ritual' && step >= 1);
    return () => document.body.classList.remove('dim');
  }, [phase, step]);

  const minutes = minutesUntilBedtime(bedtime, now);

  function startRitual() {
    setPhase('ritual');
    setStep(0);
  }

  return (
    <div className="app">
      {phase === 'home' && (
        <button
          className="corner"
          type="button"
          onClick={() => setSettingsOpen(true)}
          aria-label="Settings"
        >
          ⚙
        </button>
      )}
      <div className="stage">
        <div className="word">Wind Down</div>

        {phase === 'home' && (
          <div className="rise">
            <h1 className="h1">When should the day end?</h1>
            <p className="sub">
              Set a wind-down time. When it comes, I&rsquo;ll walk you gently into sleep, one small
              step at a time.
            </p>
            <div className="timeset" role="group" aria-label="Wind-down time">
              {BEDTIME_CHIPS.map((b) => (
                <button
                  key={b}
                  type="button"
                  className={'chip' + (bedtime === b ? ' on' : '')}
                  aria-pressed={bedtime === b}
                  onClick={() => setBedtime(b)}
                >
                  {b}
                </button>
              ))}
            </div>
            <div className="row" style={{ flexDirection: 'column', gap: 12 }}>
              <button className="cta" type="button" onClick={startRitual}>
                Start winding down now
              </button>
              <button className="cta ghost" type="button" onClick={() => setPhase('waiting')}>
                Wait until {bedtime}
              </button>
            </div>
          </div>
        )}

        {phase === 'waiting' && (
          <div className="rise">
            <div className="orb" style={{ animationDuration: '11s' }} aria-hidden="true" />
            <h1 className="h1" style={{ fontSize: 'clamp(26px,7vw,34px)' }} aria-live="polite">
              {minutes <= 0 ? "It's time." : `Wind-down in ${formatUntil(minutes)}`}
            </h1>
            <p className="sub">
              Keep me open. I&rsquo;ll glow brighter when it&rsquo;s time to begin. No rush till
              then.
            </p>
            {minutes <= 2 ? (
              <button className="cta" type="button" onClick={startRitual}>
                Begin
              </button>
            ) : (
              <button className="cta ghost" type="button" onClick={startRitual}>
                Begin early
              </button>
            )}
          </div>
        )}

        {phase === 'ritual' && (
          <div className="rise" key={step}>
            <div className="orb" aria-hidden="true" />
            <div className="stepcount">
              Step {step + 1} of {STEPS.length}
            </div>
            <h1 className="h1">{STEPS[step].title}</h1>
            <p className="sub">{STEPS[step].sub}</p>
            {step < STEPS.length - 1 ? (
              <button className="cta" type="button" onClick={() => setStep(step + 1)}>
                Next
              </button>
            ) : (
              <button
                className="cta ghost"
                type="button"
                onClick={() => {
                  document.body.classList.remove('dim');
                  setPhase('home');
                  setStep(0);
                }}
              >
                Goodnight
              </button>
            )}
          </div>
        )}
      </div>

      {settingsOpen && <SettingsOverlay onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}
