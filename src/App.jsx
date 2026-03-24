import { useState } from 'react'
import './App.css'
import ProfileScreen from './ProfileScreen'
import PhoneBookScreen from './PhoneBookScreen'
import AddressBookScreen from './AddressBookScreen'
import GuidePage from './guidepages/GuidePage'
import guidePageData from './guidepages/guidePageData'

const base = import.meta.env.BASE_URL

const tiles = [
  { label: 'Schedule\nAppointment',      color: '#6a9bc3', id: 'schedule', ctaImg: `${base}scheduleaptButton.png`           },
  { label: 'Test Results',               color: '#5a9e5a', id: 'results',  ctaImg: `${base}testResultsclickme.png`          },
  { label: 'View Medications',           color: '#c8c84a', id: 'meds',     ctaImg: `${base}viewMedicationClickMe.png`       },
  { label: 'View Billing',               color: '#c05050', id: 'billing',  ctaImg: `${base}viewBillingClickMe.png`          },
  { label: 'View Messages',              color: '#d4844a', id: 'messages', ctaImg: `${base}viewMessageClickMe.png`          },
  { label: 'View Upcoming\nAppointment', color: '#c060b0', id: 'upcoming', ctaImg: `${base}viewUpcomingAppointmentClickMe.png` },
]

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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        {currentPage === 'home'
          ? <h1 className="greeting">Hello John Smith!</h1>
          : guidePageData[currentPage]
            ? <div className="header-guide-actions">
                <img className="header-logo-left" src={`${base}logo.png`} alt="Simple Charts Logo" />
                <img className="header-action-btn" src={`${base}hyperlinkbtn.png`} alt="Hyperlink" />
                <img className="header-action-btn" src={`${base}printbtn.jpg`} alt="Print" onClick={() => window.print()} />
                <img className="header-action-btn" src={`${base}backbtn.png`} alt="Back" onClick={() => setCurrentPage('home')} />
              </div>
            : <img className="header-logo-left" src={`${base}logo.png`} alt="Simple Charts Logo" />}
        {currentPage === 'home' && <img className="header-logo" src={`${base}logo.png`} alt="Simple Charts Logo" />}
        <div className="header-right">
          <span className="brand-name">Simple Charts</span>
          <input className="search-box" type="text" placeholder="Question? Type it here!" />
        </div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)}>☰ Menu</button>
      </header>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-dropdown">
          <SidebarButton label="Click to Access Profile" icon={`${base}Profile.svg`} onClick={() => { setCurrentPage('profile'); setMenuOpen(false) }} />
          <SidebarButton label="Click to Access Phone book" icon={`${base}Phone_book.svg`} iconClass="sidebar-icon-address" onClick={() => { setCurrentPage('phonebook'); setMenuOpen(false) }} />
          <SidebarButton label="Click to Access Address book" icon={`${base}Address_book.svg`} iconClass="sidebar-icon-address" onClick={() => { setCurrentPage('addressbook'); setMenuOpen(false) }} />
          {(currentPage === 'profile' || currentPage === 'phonebook' || currentPage === 'addressbook') && (
            <button className="mobile-back-btn" onClick={() => { setCurrentPage('home'); setMenuOpen(false) }}>
              <img src={`${base}backbtn.png`} alt="Back" />
            </button>
          )}
        </div>
      )}

      {/* Main content */}
      <div className={`content ${guidePageData[currentPage] ? 'guide-content-shell' : ''}`}>
        <div className={currentPage === 'home' ? 'tile-grid' : 'page-stage'}>
          {currentPage !== 'home' && !guidePageData[currentPage] && (
            <img src={`${base}backbtn.png`} alt="Back" className="back-btn" onClick={() => setCurrentPage('home')} />
          )}
          {guidePageData[currentPage] && (
            <div className="guide-action-bar">
              <img src={`${base}backbtn.png`} alt="Back" onClick={() => setCurrentPage('home')} />
              <img src={`${base}printbtn.jpg`} alt="Print" onClick={() => window.print()} />
              <img src={`${base}hyperlinkbtn.png`} alt="Hyperlink" />
            </div>
          )}
          {currentPage === 'home'
            ? tiles.map((t) => <Tile key={t.id} label={t.label} color={t.color} ctaImg={t.ctaImg} onClick={() => setCurrentPage(t.id)} />)
            : currentPage === 'profile'
              ? <ProfileScreen onBack={() => setCurrentPage('home')} />
              : currentPage === 'phonebook'
                ? <PhoneBookScreen onBack={() => setCurrentPage('home')} />
                : currentPage === 'addressbook'
                  ? <AddressBookScreen onBack={() => setCurrentPage('home')} />
                  : guidePageData[currentPage]
                    ? <GuidePage
                        page={guidePageData[currentPage]}
                        onBack={() => setCurrentPage('home')}
                        onOpenProfile={() => setCurrentPage('profile')}
                        onOpenPhonebook={() => setCurrentPage('phonebook')}
                        onOpenAddressbook={() => setCurrentPage('addressbook')}
                      />
                    : null}
        </div>

        <aside className="sidebar">
          <SidebarButton label="Click to Access Profile" icon={`${base}Profile.svg`} onClick={() => setCurrentPage('profile')} />
          <SidebarButton label="Click to Access Phone book" icon={`${base}Phone_book.svg`} iconClass="sidebar-icon-address" onClick={() => setCurrentPage('phonebook')} />
          <SidebarButton label="Click to Access Address book" icon={`${base}Address_book.svg`} iconClass="sidebar-icon-address" onClick={() => setCurrentPage('addressbook')} />
        </aside>
      </div>
    </div>
  )
}

export default App
