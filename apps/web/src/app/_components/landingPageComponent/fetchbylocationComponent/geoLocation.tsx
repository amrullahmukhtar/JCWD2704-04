import React, { useEffect } from "react";

type GeolocationProps = {
  setUserLocation: React.Dispatch<React.SetStateAction<{ latitude: number; longitude: number; } | null>>;
};

const Geolocation: React.FC<GeolocationProps> = ({ setUserLocation }) => {
  useEffect(() => {
    const getUserLocation = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting user location:", error);
            setUserLocation(null);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setUserLocation(null);
      }
    };

    getUserLocation();
  }, [setUserLocation]);

  return null; // Geolocation component doesn't render anything directly
};

export default Geolocation;
