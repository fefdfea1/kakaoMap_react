import { useMap } from "../hooks/useMap";
import MapMarker from "./MapMarker";
import { PlaceType } from "./mapTypes";
import { useEffect } from "react";

interface MapMarerControllerProps {
  places: PlaceType[];
  selectedPlaceId?: string;
}

export default function MapMarkControler(props: MapMarerControllerProps) {
  useEffect(() => {
    if (props.places.length < 1) {
      return;
    }

    const bounds = new window.kakao.maps.LatLngBounds();
    props.places.forEach((place) => {
      bounds.extend(place.position);
    });

    map.setBounds(bounds);
  }, [props.places]);
  const map = useMap();

  return (
    <>
      {props.places.map((place, idx) => {
        return (
          <MapMarker
            key={place.id}
            index={idx}
            title={place.title}
            place={place}
            showInfo={props.selectedPlaceId === place.id}
            position={place.position}
          />
        );
      })}
    </>
  );
}
