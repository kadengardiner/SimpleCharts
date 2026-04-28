import { useEffect, useState } from 'react';
import HospitalPicker from './mychartsPortal/HospitalPicker';
import useMyChartsUrl from './mychartsPortal/useMyChartsUrl';
import { db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function ProfileScreen({ uid, onLogout }) {
  const { saveHospital } = useMyChartsUrl()

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState({
    email: '',
    username: '',
    hospitalId: localStorage.getItem('mychartsHospitalId') || '',
  });
  const [draft, setDraft] = useState({ ...saved });
  const [draftHospitalId, setDraftHospitalId] = useState(saved.hospitalId)

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, 'users', uid, 'profile', 'data'))
      if (snap.exists()) {
        const data = snap.data()
        const loaded = {
          email: data.email || '',
          username: data.username || '',
          hospitalId: localStorage.getItem('mychartsHospitalId') || '',
        }
        setSaved(loaded)
        setDraft(loaded)
        setDraftHospitalId(loaded.hospitalId)
      }
      setLoading(false)
    }
    load()
  }, [uid])

  async function handleSave() {
    await updateDoc(doc(db, 'users', uid, 'profile', 'data'), {
      username: draft.username,
      email: draft.email,
    })
    saveHospital(draftHospitalId)
    setSaved({ ...draft, hospitalId: draftHospitalId });
    setIsEditing(false);
  }

  if (loading) return <div className="profile-screen"><p>Loading…</p></div>

  return (
    <div className="profile-screen">
      <h1 className="profile-title">SimpleCharts Profile Settings</h1>

      <div className="profile-feild">
        <label>Username:</label>
        {isEditing
          ? <input type="text" value={draft.username} onChange={e => setDraft({ ...draft, username: e.target.value })} />
          : <span className="profile-value">{saved.username}</span>}
      </div>

      <div className="profile-feild">
        <label>Account Email:</label>
        {isEditing
          ? <input type="email" value={draft.email} onChange={e => setDraft({ ...draft, email: e.target.value })} />
          : <span className="profile-value">{saved.email}</span>}
      </div>

      <HospitalPicker
        isEditing={isEditing}
        draftId={draftHospitalId}
        setDraftId={setDraftHospitalId}
        savedId={saved.hospitalId}
      />

      <div className="profile-buttons">
        {isEditing ? (
          <>
            <button className="profile-save-btn" onClick={handleSave}>Save</button>
            <button className="profile-cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button className="profile-edit-btn" onClick={() => { setDraft({ ...saved }); setIsEditing(true); }}>Edit</button>
        )}
      </div>

      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </div>
  );
}
