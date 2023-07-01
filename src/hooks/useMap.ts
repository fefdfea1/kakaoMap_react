import { createContext, useContext } from "react";

export const kakoMapContext = createContext<kakao.maps.Map | null>(null);

export const useMap = () => {
  const kakaoMap = useContext(kakoMapContext);

  if (!kakaoMap) {
    throw new Error("kakaoMap not found");
  }

  return kakaoMap;
};
