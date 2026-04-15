import { useMemo, useState } from 'react';
const base = import.meta.env.BASE_URL

export default function GuidePage({ page }) {
  const [checkedSteps, setCheckedSteps] = useState(Array(page.steps.length).fill(false));
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showOtherHelp, setShowOtherHelp] = useState(false);

  const currentStepNumber = currentStepIndex + 1;
  const currentStepText = page.steps[currentStepIndex];

  const activeContent = useMemo(() => {
    if (showOtherHelp) {
      return { title: 'Other Help', text: page.details.other };
    }

    return {
      title: `Step ${currentStepNumber}`,
      text: page.details[currentStepNumber],
    };
  }, [showOtherHelp, currentStepNumber, page.details]);

  function toggleStep(index) {
    setCheckedSteps(current => current.map((value, i) => (i === index ? !value : value)));
  }

  function goToPreviousStep() {
    setCurrentStepIndex((current) => Math.max(0, current - 1));
    setShowOtherHelp(false);
  }

  function goToNextStep() {
    setCurrentStepIndex((current) => Math.min(page.steps.length - 1, current + 1));
    setShowOtherHelp(false);
  }

  function jumpToStep(index) {
    setCurrentStepIndex(index);
    setShowOtherHelp(false);
  }

  return (
    <div className="guide-page" style={{ '--guide-accent': page.accent }}>
      <div className="guide-main">
        <div className="guide-page-top">
          <h1 className="guide-title">{page.title}</h1>
          <button type="button" className="guide-print-button" onClick={() => window.print()}>
            <img src={`${base}printbtn.jpg`} alt="" className="guide-print-icon" />
            <span>Print Page</span>
          </button>
        </div>

        <div className="guide-columns guide-columns-single-step">
          <section className="guide-steps-panel guide-steps-panel-single">
            {showOtherHelp ? (
              <>
                <div className="guide-progress-row">
                  <div className="guide-progress-text">All Steps</div>
                  <div className="guide-progress-dots" aria-hidden="true">
                    {page.steps.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`guide-progress-dot ${index === currentStepIndex ? 'active' : ''} ${checkedSteps[index] ? 'done' : ''}`}
                        onClick={() => jumpToStep(index)}
                        aria-label={`Go to step ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="guide-step-list-card">
                  {page.steps.map((step, index) => (
                    <div className="guide-step-row" key={index}>
                      <div className="guide-step-number">{index + 1}</div>
                      <button
                        type="button"
                        className={`guide-step-check ${checkedSteps[index] ? 'is-checked' : ''}`}
                        onClick={() => toggleStep(index)}
                        aria-pressed={checkedSteps[index]}
                        aria-label={`Mark step ${index + 1} complete`}
                      />
                      <button
                        type="button"
                        className={`guide-step-row-button ${index === currentStepIndex ? 'active' : ''}`}
                        onClick={() => jumpToStep(index)}
                      >
                        {step}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="guide-progress-row">
                  <div className="guide-progress-text">Step {currentStepNumber} of {page.steps.length}</div>
                  <div className="guide-progress-dots" aria-hidden="true">
                    {page.steps.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`guide-progress-dot ${index === currentStepIndex ? 'active' : ''} ${checkedSteps[index] ? 'done' : ''}`}
                        onClick={() => jumpToStep(index)}
                        aria-label={`Go to step ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="guide-step-focus-card">
                  <div className="guide-step-focus-header">
                    <div className="guide-step-number guide-step-number-focus">{currentStepNumber}</div>
                    <button
                      type="button"
                      className={`guide-step-check ${checkedSteps[currentStepIndex] ? 'is-checked' : ''}`}
                      onClick={() => toggleStep(currentStepIndex)}
                      aria-pressed={checkedSteps[currentStepIndex]}
                      aria-label={`Mark step ${currentStepNumber} complete`}
                    />
                  </div>
                  <div className="guide-step-text guide-step-focus-text">{currentStepText}</div>
                </div>

                <div className="guide-step-nav">
                  <button
                    type="button"
                    className="guide-nav-button"
                    onClick={goToPreviousStep}
                    disabled={currentStepIndex === 0}
                  >
                    Previous Step
                  </button>
                  <button
                    type="button"
                    className="guide-nav-button guide-nav-button-primary"
                    onClick={goToNextStep}
                    disabled={currentStepIndex === page.steps.length - 1}
                  >
                    Next Step
                  </button>
                </div>
              </>
            )}
          </section>

          <section className="guide-center-panel">
            <div className="guide-grid-card guide-help-card">
              <p className="guide-grid-intro">Need a little more help? Use the buttons below for extra guidance.</p>
              <div className="guide-step-grid guide-step-grid-compact">
                {page.steps.map((_, index) => (
                  <button
                    key={index}
                    className={`guide-step-button ${!showOtherHelp && currentStepIndex === index ? 'active' : ''}`}
                    onClick={() => jumpToStep(index)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className={`guide-step-button guide-step-button-other ${showOtherHelp ? 'active' : ''}`}
                  onClick={() => setShowOtherHelp(true)}
                >
                  Overview
                </button>
              </div>
            </div>

            <div className="guide-detail-card">
              <div className="guide-detail-header">
                <div className="guide-detail-title">{activeContent.title}</div>
              </div>
              <div className="guide-detail-text">{activeContent.text}</div>
            </div>

            <div className="guide-detail-card-print" key={"guide-detail-card-print"}>
              {Object.entries(page.details).map(([step, detail], index) => (
                <div className="guide-detail-print-container" key={"print-step" + index}>
                  <div className="guide-detail-title" key={"print-title" + index}>Step {step}:</div>
                  <div className="guide-detail-text" key={"print-text" + index}>{detail}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
