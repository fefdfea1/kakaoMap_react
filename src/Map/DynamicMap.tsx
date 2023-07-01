import { useEffect, useRef, useState, ReactNode } from "react";
import { kakoMapContext } from "../hooks/useMap";
import styled from "@emotion/styled";

interface DynamicMapProps {
  children: ReactNode;
}

export default function DynamicMap(props: DynamicMapProps) {
  const [map, setMap] = useState<kakao.maps.Map>();
  const kakaoMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!kakaoMapRef.current) {
      return;
    }

    const targetPoint = new kakao.maps.LatLng(33.450701, 126.570667);
    const option = {
      center: targetPoint,
      level: 3,
    };

    setMap(new window.kakao.maps.Map(kakaoMapRef.current, option));
  }, []);
  return (
    <>
      <Container>
        <Map ref={kakaoMapRef} />
      </Container>
      {map ? (
        <kakoMapContext.Provider value={map}>
          {props.children}
        </kakoMapContext.Provider>
      ) : (
        <div>지도 정보를 가져오는데 실패</div>
      )}
    </>
  );
}

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Map = styled.div`
  position: static;
  width: 100%;
  height: 100%;
`;
