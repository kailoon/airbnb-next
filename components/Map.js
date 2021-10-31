import { useState, useEffect } from "react"
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import getCenter from "geolib/es/getCenter"

function Map({ searchResults, highligtedLocation }) {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }))

  const center = getCenter(coordinates)

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  })

  const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`
  const SIZE = 20

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedLocation(null)
      }
    }
    window.addEventListener("keydown", listener)

    return () => {
      window.removeEventListener("keydown", listener)
    }
  }, [])

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/kailoon/ckvenagcc3pob15nsj25l85o8"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {searchResults.map((result) => (
        <Marker longitude={result.long} latitude={result.lat} key={result.long}>
          <svg
            height={SIZE}
            viewBox="0 0 24 24"
            role="img"
            className={`w-8 h-8 cursor-pointer fill-current ${
              highligtedLocation.long === result.long
                ? "animate-bounce text-yellow-400"
                : "text-red-500"
            }`}
            aria-label="push-pin"
            onClick={() => setSelectedLocation(result)}
          >
            <path d={ICON} />
          </svg>
        </Marker>
      ))}

      {selectedLocation && (
        <Popup
          closeOnClick={false}
          onClose={() => setSelectedLocation(null)}
          tipSize={5}
          closeButton={false}
          offsetLeft={16}
          offsetTop={2}
          latitude={selectedLocation.lat}
          longitude={selectedLocation.long}
        >
          <div className="text-sm px-1 z-50">
            <h2 className="font-semibold">{selectedLocation.title}</h2>
            <p className="text-gray-600">{selectedLocation.price}</p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  )
}

export default Map
Map
