import { useState } from 'react';
import HospitalPicker from './mychartsPortal/HospitalPicker';
import useMyChartsUrl from './mychartsPortal/useMyChartsUrl';

export default function ProfileScreen() {
  const { saveHospital } = useMyChartsUrl()

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState({
    email: 'johnsmith@gmail.com',
    password: 'mypassword123',
    name: 'John Smith',
    hospitalId: localStorage.getItem('mychartsHospitalId') || '',
  });
  const [draft, setDraft] = useState({ ...saved });
  const [draftHospitalId, setDraftHospitalId] = useState(saved.hospitalId)

  function handleEdit() {
    setDraft({ ...saved });
    setDraftHospitalId(saved.hospitalId)
    setIsEditing(true);
  }

  function handleSave() {
    saveHospital(draftHospitalId)
    setSaved({ ...draft, hospitalId: draftHospitalId });
    setIsEditing(false);
  }

  return (
    <div className="profile-screen">
      <h1 className="profile-title">SimpleCharts Profile Settings</h1>

      <div className="profile-feild">
        <label>Account Email:</label>
        {isEditing
          ? <input type="email" value={draft.email} onChange={e => setDraft({ ...draft, email: e.target.value })} />
          : <span className="profile-value">{saved.email}</span>}
      </div>

      <div className="profile-feild">
        <label>Account Password:</label>
        {isEditing
          ? <input type={showPassword ? 'text' : 'password'} value={draft.password} onChange={e => setDraft({ ...draft, password: e.target.value })} />
          : <span className="profile-value">{showPassword ? saved.password : '•'.repeat(saved.password.length)}</span>}
        <button className="show-password-btn" onClick={() => setShowPassword(s => !s)}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className="profile-feild">
        <label>Account Holder Name:</label>
        {isEditing
          ? <input type="text" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} />
          : <span className="profile-value">{saved.name}</span>}
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
          <button className="profile-edit-btn" onClick={handleEdit}>Edit</button>
        )}
      </div>

      <button className="logout-btn">Logout</button>
    </div>
  );
}