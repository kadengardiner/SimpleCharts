import { useState } from 'react'

const base = import.meta.env.BASE_URL

const defaultEntries = [
  { id: 1, label: 'Primary Care Office', value: '1 Place Name Rd, MA, 01854' },
  { id: 2, label: 'Nearest Hospital',    value: '1 Place Name Rd, MA, 01854' },
  { id: 3, label: 'Blood Work Center',   value: '2 Place Name St, MA, 01854' },
]

export default function AddressBookScreen({ onBack }) {
  const [entries, setEntries] = useState(defaultEntries)
  const [newLabel, setNewLabel] = useState('')
  const [newValue, setNewValue] = useState('')

  function addEntry() {
    if (!newLabel.trim() || !newValue.trim()) return
    setEntries(prev => [...prev, { id: Date.now(), label: newLabel.trim(), value: newValue.trim() }])
    setNewLabel('')
    setNewValue('')
  }

  function deleteEntry(id) {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="profile-screen">
      <img src={`${base}homeicon.png`} alt="Back" className="back-btn" onClick={onBack} style={{ cursor: 'pointer' }} />

      <h2 className="profile-title">My Address Book</h2>

      <div className="book-list">
        {entries.map(entry => (
          <div key={entry.id} className="book-row">
            <span className="book-label">{entry.label}:</span>
            <span className="book-value">{entry.value}</span>
            <button className="book-delete-btn" onClick={() => deleteEntry(entry.id)} title="Delete">🗑</button>
          </div>
        ))}

        <div className="book-add-form">
          <input
            className="book-input"
            placeholder="Label (e.g. Pharmacy)"
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
          />
          <input
            className="book-input"
            placeholder="123 Street, City, State, Zip"
            value={newValue}
            onChange={e => setNewValue(e.target.value)}
          />
          <button className="book-add-btn" onClick={addEntry}>+ Add</button>
        </div>
      </div>
    </div>
  )
}
