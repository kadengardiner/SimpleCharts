import useMyChartsUrl from './useMyChartsUrl'

export default function MyChartsLink({ pageId, imgSrc, label }) {
    const { selectedHospital } = useMyChartsUrl()

    if (!selectedHospital) {
        return (
            <img
                className="header-action-btn"
                src={imgSrc}
                alt={label}
                title="Select your hospital in Profile to enable this link"
                style={{ opacity: 0.35, cursor: 'not-allowed' }}
            />
        )
    }

    const path = selectedHospital.paths[pageId] || ''
    const fullUrl = selectedHospital.baseUrl + path

    return (
        <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open "${label}" in MyCharts`}
        >
            <img
                className="header-action-btn"
                src={imgSrc}
                alt={`Open ${label} in MyCharts`}
            />
        </a>
    )
}