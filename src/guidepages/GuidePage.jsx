import { useState } from 'react';
const base = import.meta.env.BASE_URL

export default function GuidePage({ page, onBack }) {
  const [checkedSteps, setCheckedSteps] = useState(Array(page.steps.length).fill(false));
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showStepHelp, setShowStepHelp] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentStepNumber = currentStepIndex + 1;
  const currentStepText = page.steps[currentStepIndex];

  function speak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }

  function toggleStep(index) {
    setCheckedSteps(current => current.map((value, i) => (i === index ? !value : value)));
  }

  function goToPreviousStep() {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentStepIndex((current) => Math.max(0, current - 1));
    setShowStepHelp(false);
  }

  const isLastStep = currentStepIndex === page.steps.length - 1;

  function goToNextStep() {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setShowStepHelp(false);

    setCurrentStepIndex((current) => {
      setCheckedSteps((steps) => steps.map((value, i) => (i === current ? true : value)));

      if (current >= page.steps.length - 1) {
        setShowCompletion(true);
        return current;
      }

      return current + 1;
    });
  }

  function jumpToStep(index) {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentStepIndex(index);
    setShowStepHelp(false);
  }

  return (
    <div className="guide-page" style={{ '--guide-accent': page.accent }}>
      <div className="guide-main">

        {/* Page title */}
        <h1 className="guide-title">{page.title}</h1>

        {/* Progress row */}
        <div className="guide-progress-row">
          <button
            className={`guide-tts-button ${isSpeaking ? 'is-speaking' : ''}`}
            onClick={() => isSpeaking ? stopSpeaking() : speak(currentStepText)}
            aria-label={isSpeaking ? 'Stop reading' : 'Read step aloud'}
            title={isSpeaking ? 'Stop reading' : 'Read step aloud'}
          >
            <img src={`${base}tts.png`} alt="Read aloud" className="guide-tts-icon" />
          </button>
          <span className="guide-progress-text">Step {currentStepNumber} of {page.steps.length}</span>
          <div className="guide-progress-track" aria-hidden="true">
            <span className="guide-progress-label">Start</span>
            <div className="guide-progress-dots">
              {page.steps.map((_, index) => (
                <div key={index} className="guide-progress-dot-wrapper">
                  {index > 0 && (
                    <div className={`guide-progress-line ${checkedSteps[index - 1] ? 'done' : ''}`} />
                  )}
                  <button
                    type="button"
                    className={`guide-progress-dot ${index === currentStepIndex ? 'active' : ''} ${checkedSteps[index] ? 'done' : ''}`}
                    onClick={() => jumpToStep(index)}
                    aria-label={`Go to step ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <span className="guide-progress-label">End</span>
          </div>
        </div>

        {/* Step instruction card */}
        <div className="guide-step-card">
          <div className="guide-step-card-number">{currentStepNumber}</div>
          <p className="guide-step-card-text">{currentStepText}</p>

          <div className="guide-step-nav">
            <button
              type="button"
              className="guide-nav-button"
              onClick={goToPreviousStep}
              disabled={currentStepIndex === 0}
            >
              ← Prev
            </button>
            <div className="guide-nav-next-group">
              <button
                type="button"
                className={`guide-nav-button guide-nav-button-primary ${checkedSteps[currentStepIndex] ? 'is-checked' : ''}`}
                onClick={goToNextStep}
              >
                {isLastStep ? '🎉 You Did It!' : 'Next →'}
              </button>
              <button
                type="button"
                className={`guide-step-check ${checkedSteps[currentStepIndex] ? 'is-checked' : ''}`}
                onClick={() => toggleStep(currentStepIndex)}
                aria-pressed={checkedSteps[currentStepIndex]}
                aria-label={`Mark step ${currentStepNumber} complete`}
              />
            </div>
          </div>

          <div className="guide-step-card-footer">
            <button
              type="button"
              className="guide-help-toggle"
              onClick={() => setShowStepHelp(v => !v)}
            >
              {showStepHelp ? '▲ Hide Help' : '? Need Help'}
            </button>
          </div>
        </div>

        {/* Inline help panel */}
        {showStepHelp && (
          <div className="guide-inline-help">
            <p className="guide-inline-help-text">{page.details[currentStepNumber]}</p>
          </div>
        )}

        {/* Bottom bar — print button */}
        <div className="guide-bottom-bar">
          <button type="button" className="guide-print-button" onClick={() => window.print()}>
            <img src={`${base}printbtn.jpg`} alt="" className="guide-print-icon" />
            <span>Print Page</span>
          </button>
        </div>

        {/* Completion overlay */}
        {showCompletion && (
          <div className="guide-completion-overlay">
            <div className="guide-completion-card">
              <div className="guide-completion-emoji">🎉</div>
              <h2 className="guide-completion-title">You Did It!</h2>
              <p className="guide-completion-text">Great job completing all the steps. Would you like to go back to the home screen?</p>
              <div className="guide-completion-actions">
                <button
                  type="button"
                  className="guide-completion-btn guide-completion-btn-home"
                  onClick={onBack}
                >
                  ← Back to Home
                </button>
                <button
                  type="button"
                  className="guide-completion-btn guide-completion-btn-stay"
                  onClick={() => setShowCompletion(false)}
                >
                  Stay Here
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden print card */}
        <div className="guide-detail-card-print">
          {Object.entries(page.details).map(([step, detail], index) => (
            <div className="guide-detail-print-container" key={'print-step' + index}>
              <div className="guide-detail-title" key={'print-title' + index}>Step {step}:</div>
              <div className="guide-detail-text" key={'print-text' + index}>{detail}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
