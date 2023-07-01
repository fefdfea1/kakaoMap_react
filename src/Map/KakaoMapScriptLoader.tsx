import { ReactNode, useEffect, useState } from "react";

const KAKAO_MAP_SCRIPT_ID = "kakao-map-script";
const KAKAO_MAP_APP_KEY = process.env.KAKAO_MAP_KEY;

interface KakaoMapscriptLoaderProps {
  children: ReactNode;
}

export default function KakaoMap(props: KakaoMapscriptLoaderProps) {
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
  useEffect(() => {
    const mapScript = document.getElementById(KAKAO_MAP_SCRIPT_ID);
    if (mapScript && !window.kakao) {
      return;
    }
    const script = document.createElement("script");
    script.id = KAKAO_MAP_SCRIPT_ID;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`;
    console.log(script.src);
    script.onload = () => {
      window.kakao.maps.load(() => {
        //성공
        setMapScriptLoaded(true);
      });
    };
    script.onerror = () => {
      //실패
      setMapScriptLoaded(false);
    };

    document.getElementById("root")?.appendChild(script);
  }, []);
  return (
    <>
      {mapScriptLoaded ? props.children : <div>지도를 가져오는 중입니다.</div>}
    </>
  );
}
