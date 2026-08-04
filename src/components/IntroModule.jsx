import { useState } from "react";
import { INTRO_SECTIONS, INTRO_NEXT, GRADE_SCALE } from "../data/modules";

const renderParagraph = (p, i) =>
  typeof p === "string" ? (
    <p key={i} className="mu-focus">
      {p}
    </p>
  ) : (
    <p key={i} className="mu-focus">
      <strong className="mu-accent">{p.strong}</strong>
      {p.text}
    </p>
  );

export default function IntroModule({ state, update, onContinue }) {
  const [step, setStep] = useState(0);
  const total = INTRO_SECTIONS.length;
  const isFinal = step === total;
  const section = isFinal ? null : INTRO_SECTIONS[step];

  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const goNext = () => setStep((s) => Math.min(total, s + 1));

  const finish = () => {
    update({ read: true });
    onContinue();
  };

  return (
    <>
      <img src="/crest.png" alt="Maryland United FC" className="mu-crest" />

      <div className="mu-intro-dashes">
        {INTRO_SECTIONS.map((_, i) => (
          <span
            key={i}
            className={`mu-intro-dash ${i <= step || isFinal ? "is-filled" : ""}`}
          />
        ))}
      </div>
      {!isFinal && (
        <p className="mu-intro-count">
          {step + 1} OF {total}
        </p>
      )}

      {!isFinal ? (
        <div className="mu-intro-section">
          <p className="mu-section-label">{section.heading}</p>
          {section.lead && <p className="mu-focus">{section.lead}</p>}
          {section.list && (
            <div className="mu-intro-list">
              {section.list.map((item) => (
                <div key={item} className="mu-intro-list-item">
                  {item}
                </div>
              ))}
            </div>
          )}
          {section.scale && (
            <div className="mu-scale-inline">
              {GRADE_SCALE.map((g) => (
                <span key={g.value}>
                  <strong className="mu-accent">{g.value}</strong> {g.label}
                </span>
              ))}
            </div>
          )}
          {section.body.map(renderParagraph)}
        </div>
      ) : (
        <div className="mu-intro-section">
          <p className="mu-section-label">{INTRO_NEXT.heading}</p>
          {INTRO_NEXT.body.map(renderParagraph)}
          <p className="mu-intro-cta">{INTRO_NEXT.cta}</p>
        </div>
      )}

      <div className="mu-intro-nav">
        {step > 0 && (
          <button className="mu-btn mu-btn-outline" onClick={goBack}>
            BACK
          </button>
        )}
        {!isFinal ? (
          <button className="mu-btn mu-btn-solid" onClick={goNext}>
            CONTINUE
          </button>
        ) : (
          <button className="mu-btn mu-btn-solid" onClick={finish}>
            MARK AS READ &amp; CONTINUE
          </button>
        )}
      </div>
    </>
  );
}
