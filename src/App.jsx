import { useState } from 'react'
import './App.css'
import ProfileScreen from './ProfileScreen'
import PhoneBookScreen from './PhoneBookScreen'
import AddressBookScreen from './AddressBookScreen'

const base = import.meta.env.BASE_URL

const tiles = [
  { label: 'Schedule\nAppointment',      color: 'var(--ScheduleAppt)', id: 'schedule', ctaImg: `${base}scheduleaptButton.png`           },
  { label: 'Test Results',               color: 'var(--TestResults)',  id: 'results',  ctaImg: `${base}testResultsclickme.png`          },
  { label: 'View Medications',           color: 'var(--ViewMeds)',     id: 'meds',     ctaImg: `${base}viewMedicationClickMe.png`       },
  { label: 'View Billing',               color: 'var(--ViewBills)',    id: 'billing',  ctaImg: `${base}viewBillingClickMe.png`          },
  { label: 'View Messages',              color: 'var(--ViewMessages)', id: 'messages', ctaImg: `${base}viewMessageClickMe.png`          },
  { label: 'View Upcoming\nAppointment', color: 'var(--ViewAppts)',    id: 'upcoming', ctaImg: `${base}viewUpcomingAppointmentClickMe.png` },
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
        <h1 className="greeting">Hello John Smith!</h1>
        <img className="header-logo" src={`${base}logo.png`} alt="Simple Charts Logo" />
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
          {/* <SidebarButton label="Click to Access Profile" icon={`${base}profileicon.png`} onClick={() => { setCurrentPage('profile'); setMenuOpen(false) }} /> */}
          {/* <SidebarButton label="Click to Access Phone book" icon={`${base}phonebookIcon.png`} iconClass="sidebar-icon-address" onClick={() => { setCurrentPage('phonebook'); setMenuOpen(false) }} /> */}
          {/* <SidebarButton label="Click to Access Address book" icon={`${base}adressbookIcon.png`} iconClass="sidebar-icon-address" onClick={() => { setCurrentPage('addressbook'); setMenuOpen(false) }} /> */}
        </div>
      )}

      {/* Main content */}
      <div className="content">
        <div className="tile-grid">
          {currentPage === 'home'
            ? tiles.map((t) => <Tile key={t.id} label={t.label} color={t.color} ctaImg={t.ctaImg} onClick={() => {}} />)
            : currentPage === 'profile'
              ? <ProfileScreen onBack={() => setCurrentPage('home')} />
              : currentPage === 'phonebook'
                ? <PhoneBookScreen onBack={() => setCurrentPage('home')} />
                : currentPage === 'addressbook'
                  ? <AddressBookScreen onBack={() => setCurrentPage('home')} />
                  : null}
        </div>

        <aside className="sidebar">
          <SidebarButton label="Click to Access Profile" icon={`${base}Profile.svg`} onClick={() => setCurrentPage('profile')} />
          <SidebarButton label="Click to Access Phone book" icon={`${base}Phone_book.svg`} iconClass="sidebar-icon-address" onClick={() => setCurrentPage('phonebook')} />
          <SidebarButton label="Click to Access Address book" icon={`${base}Address_book.svg`} iconClass="sidebar-icon-address" onClick={() => setCurrentPage('addressbook')} />
          {/* <SidebarButton label="Click to Access Profile" icon={`${base}profileicon.png`} onClick={() => setCurrentPage('profile')} /> */}
          {/* <SidebarButton label="Click to Access Phone book" icon={`${base}phonebookIcon.png`} iconClass="sidebar-icon-address" onClick={() => setCurrentPage('phonebook')} /> */}
          {/* <SidebarButton label="Click to Access Address book" icon={`${base}adressbookIcon.png`} iconClass="sidebar-icon-address" onClick={() => setCurrentPage('addressbook')} /> */}
        </aside>
      </div>
    </div>
  )
}

export default App
