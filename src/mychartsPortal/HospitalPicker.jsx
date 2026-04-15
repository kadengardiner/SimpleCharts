import hospitals from './hospitalData'

export default function HospitalPicker({ isEditing, draftId, setDraftId, savedId }) {
    const savedHospital = hospitals.find(h => h.id === savedId)

    return (
        <div className="profile-feild">
            <label>MyCharts Hospital:</label>
            {isEditing ? (
                <select
                    value={draftId}
                    onChange={e => setDraftId(e.target.value)}
                    className="hospital-select"
                >
                    <option value="">-- Select your hospital --</option>
                    {hospitals.map(h => (
                        <option key={h.id} value={h.id}>{h.name}</option>
                    ))}
                </select>
            ) : (
                <span className="profile-value">
                    {savedHospital
                        ? savedHospital.name
                        : 'Not set — click Edit to select your hospital'}
                </span>
            )}
        </div>
    )
}