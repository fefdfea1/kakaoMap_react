import DynamicMap from "./Map/DynamicMap";
import KakaoMap from "./Map/KakaoMapScriptLoader";
import SearchLocation from "./Map/SearchLocation";
import { useState } from "react";
import { PlaceType } from "./Map/mapTypes";
import MapMarkControler from "./Map/MapMarkControler";

export default function App() {
  const [places, setPlaces] = useState<PlaceType[]>();
  const [selectedId, setSelectedId] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState("");
  return (
    <KakaoMap>
      <DynamicMap>
        {places && <MapMarkControler places={places} />}
        <SearchLocation
          onUpdatePlaces={(places) => {
            setPlaces(places);
          }}
          onSelect={(placeId) => {
            setSelectedId(placeId);
          }}
        />
      </DynamicMap>
    </KakaoMap>
  );
}
