import { useMemo, useState } from 'react'
import './App.css'
import ProfileScreen from './ProfileScreen'
import PhoneBookScreen from './PhoneBookScreen'
import AddressBookScreen from './AddressBookScreen'
import GuidePage from './guidepages/GuidePage'
import guidePageData from './guidepages/guidePageData'

const base = import.meta.env.BASE_URL

const tiles = [
  { label: 'Schedule Appointment',      color: '#6a9bc3', id: 'schedule', ctaImg: `${base}scheduleaptButton.png`           },
  { label: 'Test Results',               color: '#5a9e5a', id: 'results',  ctaImg: `${base}testResultsclickme.png`          },
  { label: 'View Medications',           color: '#c8c84a', id: 'meds',     ctaImg: `${base}viewMedicationClickMe.png`       },
  { label: 'View Billing',               color: '#c05050', id: 'billing',  ctaImg: `${base}viewBillingClickMe.png`          },
  { label: 'View Messages',              color: '#d4844a', id: 'messages', ctaImg: `${base}viewMessageClickMe.png`          },
  { label: 'View Upcoming Appointment', color: '#c060b0', id: 'upcoming', ctaImg: `${base}viewUpcomingAppointmentClickMe.png` },
]

const staticPages = {
  profile: {
    title: 'Profile',
    description: 'Access and edit your saved profile information.',
    keywords: ['profile', 'account', 'name', 'password', 'email', 'phone number', 'address', 'personal information', 'edit profile']
  },
  phonebook: {
    title: 'Phone Book',
    description: 'Open saved phone numbers for doctors, pharmacies, and other contacts.',
    keywords: ['phone', 'phonebook', 'phone book', 'number', 'contact', 'call', 'doctor number', 'pharmacy number']
  },
  addressbook: {
    title: 'Address Book',
    description: 'Open saved office addresses and location information.',
    keywords: ['address', 'addressbook', 'address book', 'location', 'office address', 'directions', 'place']
  }
}

function Tile({ label, color, ctaImg, onClick }) {
  return (
    <button className="tile" style={{ backgroundColor: color }} onClick={onClick}>
      <span className="tile-label">{label}</span>
      <span className="tile-arrow">↓</span>
      <img className="tile-cta-img" src={ctaImg} alt={label} />
    </button>
  )
}

function SidebarButton({ label, icon, iconClass, onClick }) {
  return (
    <button className="sidebar-btn" onClick={onClick}>
      {icon && <img className={iconClass || 'sidebar-icon'} src={icon} alt="" />}
      <span className="sidebar-label">{label}</span>
    </button>
  )
}

function SearchResults({ query, results, onOpenResult }) {
  return (
    <div className="search-results-page">
      <div className="search-results-card">
        <h1 className="search-results-title">Search Results</h1>
        <p className="search-results-subtitle">
          Showing matches for <strong>“{query}”</strong>
        </p>

        {results.length === 0 ? (
          <div className="search-empty-state">
            <p>No matching pages were found.</p>
            <p>Try another word like <strong>appointment</strong>, <strong>refill</strong>, <strong>bill</strong>, or <strong>message</strong>.</p>
          </div>
        ) : (
          <div className="search-results-list">
            {results.map((result) => (
              <button
                key={result.id}
                className="search-result-item"
                onClick={() => onOpenResult(result.id)}
              >
                <div className="search-result-copy">
                  <div className="search-result-title">{result.title}</div>
                  <div className="search-result-description">{result.description}</div>
                  <div className="search-result-reason">Matched terms: {result.matchedTerms.join(', ')}</div>
                </div>
                <div className="search-result-arrow">→</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [pageHistory, setPageHistory] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const searchIndex = useMemo(() => {
    const guideEntries = Object.entries(guidePageData).map(([id, page]) => ({
      id,
      title: page.title,
      description: page.searchDescription || page.title,
      keywords: page.searchKeywords || [],
      text: `${page.title} ${page.searchDescription || ''} ${(page.searchKeywords || []).join(' ')}`.toLowerCase(),
    }))

    const staticEntries = Object.entries(staticPages).map(([id, page]) => ({
      id,
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      text: `${page.title} ${page.description} ${(page.keywords || []).join(' ')}`.toLowerCase(),
    }))

    return [...guideEntries, ...staticEntries]
  }, [])

  function navigateTo(page) {
    setSearchInput('')
    setCurrentPage((prev) => {
      if (prev !== page) {
        setPageHistory((history) => [...history, prev])
      }
      return page
    })
    setMenuOpen(false)
  }

  function goBack() {
    setSearchInput('')
    setPageHistory((history) => {
      if (history.length === 0) {
        setCurrentPage('home')
        return history
      }
      const previousPage = history[history.length - 1]
      setCurrentPage(previousPage)
      return history.slice(0, -1)
    })
    setMenuOpen(false)
  }

  function handleSearchSubmit(event) {
    event.preventDefault()
    const normalizedQuery = searchInput.trim().toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
    if (!normalizedQuery) return

    const queryTerms = normalizedQuery.split(/\s+/).filter(Boolean)

    const rankedResults = searchIndex
      .map((entry) => {
        let score = 0
        const matchedTerms = new Set()
        const titleLower = entry.title.toLowerCase()
        const descriptionLower = entry.description.toLowerCase()
        const keywordList = (entry.keywords || []).map((keyword) => keyword.toLowerCase())

        for (const term of queryTerms) {
          const titleMatched = titleLower.includes(term)
          const descriptionMatched = descriptionLower.includes(term)
          const keywordMatched = keywordList.some((keyword) => keyword.includes(term) || term.includes(keyword))
          const textMatched = entry.text.includes(term)

          if (keywordMatched) {
            score += 7
            matchedTerms.add(term)
          }
          if (titleMatched) {
            score += 5
            matchedTerms.add(term)
          }
          if (descriptionMatched) {
            score += 3
            matchedTerms.add(term)
          }
          if (textMatched) {
            score += 1
            matchedTerms.add(term)
          }
        }

        return {
          ...entry,
          score,
          matchedTerms: Array.from(matchedTerms),
        }
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))

    setSearchQuery(searchInput.trim())
    setSearchResults(rankedResults)
    navigateTo('search-results')
  }

  const isGuidePage = !!guidePageData[currentPage]
  const showGuideHeader = isGuidePage || currentPage === 'search-results'

  return (
    <div className="app">
      <header className="header">
        {currentPage === 'home'
          ? <h1 className="greeting">Hello John Smith!</h1>
          : showGuideHeader
            ? <div className="header-guide-actions">
                <img className="header-logo-left" src={`${base}logo.png`} alt="Simple Charts Logo" onClick={() => navigateTo('home')}/>
                <img className="header-action-btn" src={`${base + guidePageData[currentPage].symbol}.svg`} alt="Hyperlink" title={`${tiles[guidePageData[currentPage].symbol-1].label} in MyChart`}/>
                {currentPage !== 'search-results'}
                <img className="header-action-btn" src={`${base}backbtn.png`} alt="Back" onClick={goBack} title='Go to Previous Page'/>
              </div>
            : <img className="header-action-btn" src={`${base}backbtn.png`} alt="Back" onClick={goBack} title='Go to Previous Page'/>}
        {currentPage === 'home' && <img className="header-logo" src={`${base}logo.png`} alt="Simple Charts Logo" onClick={() => navigateTo('home')}/>}
        <div className="header-right">
          <img className="help-button" src={`${base}help.svg`} onClick={() => window.alert("NOBODY CAN HELP YOU NOW\n(not yet implemented)")}/>
          <form onSubmit={handleSearchSubmit}>
            <input
              className="search-box"
              type="text"
              placeholder="Question? Type it here!"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </form>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)}>☰ Menu</button>
      </header>

      {menuOpen && (
        <div className="mobile-dropdown">
          <SidebarButton label="Click to Access Profile" icon={`${base}Profile.svg`} onClick={() => navigateTo('profile')} />
          <SidebarButton label="Click to Access Phone book" icon={`${base}Phone_book.svg`} iconClass="sidebar-icon-address" onClick={() => navigateTo('phonebook')} />
          <SidebarButton label="Click to Access Address book" icon={`${base}Address_book.svg`} iconClass="sidebar-icon-address" onClick={() => navigateTo('addressbook')} />
        </div>
      )}

      <div className={`content ${isGuidePage ? 'guide-content-shell' : ''}`}>
        <div className={currentPage === 'home' ? 'tile-grid' : 'page-stage'}>
          {isGuidePage && (
            <div className="guide-action-bar">
              <img src={`${base}backbtn.png`} alt="Back" onClick={goBack} />
              <img src={`${base + guidePageData[currentPage].symbol}`} alt="Hyperlink" />
            </div>
          )}
          {currentPage === 'home'
            ? tiles.map((t) => <Tile key={t.id} label={t.label} color={t.color} ctaImg={t.ctaImg} onClick={() => navigateTo(t.id)} />)
            : currentPage === 'profile'
              ? <ProfileScreen onBack={goBack} />
              : currentPage === 'phonebook'
                ? <PhoneBookScreen onBack={goBack} />
                : currentPage === 'addressbook'
                  ? <AddressBookScreen onBack={goBack} />
                  : currentPage === 'search-results'
                    ? <SearchResults query={searchQuery} results={searchResults} onOpenResult={navigateTo} />
                    : isGuidePage
                      ? <GuidePage
                          page={guidePageData[currentPage]}
                          onBack={goBack}
                          onOpenProfile={() => navigateTo('profile')}
                          onOpenPhonebook={() => navigateTo('phonebook')}
                          onOpenAddressbook={() => navigateTo('addressbook')}
                        />
                      : null}
        </div>

        <aside className="sidebar">
          <SidebarButton label="Click to Access Profile" icon={`${base}Profile.svg`} onClick={() => navigateTo('profile')} />
          <SidebarButton label="Click to Access Phone book" icon={`${base}Phone_book.svg`} iconClass="sidebar-icon-address" onClick={() => navigateTo('phonebook')} />
          <SidebarButton label="Click to Access Address book" icon={`${base}Address_book.svg`} iconClass="sidebar-icon-address" onClick={() => navigateTo('addressbook')} />
        </aside>
      </div>
    </div>
  )
}

export default App
