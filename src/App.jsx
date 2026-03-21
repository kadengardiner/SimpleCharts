import './App.css'

const tiles = [
  { label: 'Schedule\nAppointment',      color: '#6a9bc3', id: 'schedule' },
  { label: 'Test Results',               color: '#5a9e5a', id: 'results'  },
  { label: 'View Medications',           color: '#c8c84a', id: 'meds'     },
  { label: 'View Billing',               color: '#c05050', id: 'billing'  },
  { label: 'View Messages',              color: '#d4844a', id: 'messages' },
  { label: 'View Upcoming\nAppointment', color: '#c060b0', id: 'upcoming' },
]

function Tile({ label, color, onClick }) {
  return (
    <button className="tile" style={{ backgroundColor: color }} onClick={onClick}>
      <span className="tile-label">{label}</span>
      <span className="tile-arrow">↓</span>
      <img className="tile-cta-img" src="/scheduleaptButton.png" alt="Schedule Appointment" />
    </button>
  )
}

function SidebarButton({ label, onClick }) {
  return (
    <button className="sidebar-btn" onClick={onClick}>
      <span className="sidebar-label">{label}</span>
    </button>
  )
}

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="greeting">Hello John Smith!</h1>
        <div className="header-right">
          <span className="brand-name">Simple Charts</span>
          <input className="search-box" type="text" placeholder="Question? Type it here!" />
        </div>
      </header>

      {/* Main content */}
      <div className="content">
        <div className="tile-grid">
          {tiles.map((t) => (
            <Tile key={t.id} label={t.label} color={t.color} onClick={() => {}} />
          ))}
        </div>

        <aside className="sidebar">
          <SidebarButton label="Click to Access Profile"      onClick={() => {}} />
          <SidebarButton label="Click to Access Phone book"   onClick={() => {}} />
          <SidebarButton label="Click to Access Address book" onClick={() => {}} />
        </aside>
      </div>
    </div>
  )
}

export default App
