const base = import.meta.env.BASE_URL;

export default function AddressBookScreen({ onBack }) {
  return (
    <div className="profile-screen">
      <img src={`${base}homeicon.png`} alt="Back" className="back-btn" onClick={onBack} style={{ cursor: 'pointer' }} />
    </div>
  );
}
