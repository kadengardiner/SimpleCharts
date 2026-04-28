import { useEffect, useState } from 'react'
import { db } from './firebase'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'

export default function AddressBookScreen({ uid }) {
  const [entries, setEntries] = useState([])
  const [newLabel, setNewLabel] = useState('')
  const [newValue, setNewValue] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, 'users', uid, 'addressbook'))
      setEntries(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }
    load()
  }, [uid])

  async function addEntry() {
    if (!newLabel.trim() || !newValue.trim()) return
    const ref = await addDoc(collection(db, 'users', uid, 'addressbook'), {
      label: newLabel.trim(),
      value: newValue.trim(),
    })
    setEntries(prev => [...prev, { id: ref.id, label: newLabel.trim(), value: newValue.trim() }])
    setNewLabel('')
    setNewValue('')
  }

  async function deleteEntry(id) {
    await deleteDoc(doc(db, 'users', uid, 'addressbook', id))
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="profile-screen">
      <h2 className="profile-title">My Address Book</h2>

      {loading ? <p>Loading…</p> : (
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
      )}
    </div>
  )
}
