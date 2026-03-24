import { useMemo, useState } from 'react';

const base = import.meta.env.BASE_URL;


export default function GuidePage({ page, onBack, onOpenProfile, onOpenPhonebook, onOpenAddressbook }) {
  const [checkedSteps, setCheckedSteps] = useState(Array(page.steps.length).fill(false));
  const [activeStep, setActiveStep] = useState(1);

  const activeContent = useMemo(() => {
    if (activeStep === 'other') {
      return { title: 'Other Help', text: page.details.other };
    }
    return {
      title: `Step ${activeStep}`,
      text: page.details[activeStep],
    };
  }, [activeStep, page.details]);

  function toggleStep(index) {
    setCheckedSteps(current => current.map((value, i) => (i === index ? !value : value)));
  }

  return (
    <div className="guide-page" style={{ '--guide-accent': page.accent }}>
      <div className="guide-main">
        <h1 className="guide-title">{page.title}</h1>
        <div className="guide-columns">
          <section className="guide-steps-panel">
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
                <div className="guide-step-text">{step}</div>
              </div>
            ))}
          </section>

          <section className="guide-center-panel">
            <div className="guide-grid-card">
              <p className="guide-grid-intro">Lost on any steps? Click which step you are stuck on for more information.</p>
              <div className="guide-step-grid">
                {page.steps.map((_, index) => (
                  <button
                    key={index}
                    className={`guide-step-button ${activeStep === index + 1 ? 'active' : ''}`}
                    onClick={() => setActiveStep(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className={`guide-step-button guide-step-button-other ${activeStep === 'other' ? 'active' : ''}`}
                  onClick={() => setActiveStep('other')}
                >
                  Other
                </button>
              </div>
            </div>

            <div className="guide-detail-card">
              <div className="guide-detail-title">{activeContent.title}</div>
              <div className="guide-detail-text">{activeContent.text}</div>
            </div>

            <div className="guide-bottom-row desktop-guide-bottom-row">
              <button className="guide-home-link" onClick={onBack}>CLICK TO GO BACK HOME →</button>
              <button className="guide-home-card" onClick={onBack} aria-label="Go home">
                <div className="guide-home-label">Click ME!</div>
                <img src={`${base}homeicon.png`} alt="" className="guide-home-icon-image" />
              </button>
            </div>
          </section>
        </div>
      </div>

      <div className="guide-mobile-bottom-nav">
        <button className="guide-mobile-nav-btn" onClick={onBack} aria-label="Go home">
          <img src={`${base}homeicon.png`} alt="" className="guide-mobile-nav-icon guide-mobile-home-icon" />
        </button>
        <button className="guide-mobile-nav-btn" onClick={onOpenProfile} aria-label="Open profile">
          <img src={`${base}profileicon.png`} alt="" className="guide-mobile-nav-icon" />
        </button>
        <button className="guide-mobile-nav-btn" onClick={onOpenPhonebook} aria-label="Open phone book">
          <img src={`${base}phonebookIcon.png`} alt="" className="guide-mobile-nav-icon" />
        </button>
        <button className="guide-mobile-nav-btn" onClick={onOpenAddressbook} aria-label="Open address book">
          <img src={`${base}adressbookIcon.png`} alt="" className="guide-mobile-nav-icon" />
        </button>
      </div>
    </div>
  );
}
