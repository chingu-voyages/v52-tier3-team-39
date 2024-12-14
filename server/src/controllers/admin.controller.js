import { googleApiKey } from "../config/env.js";

const ROUTES_API =
  "https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix";

const getDistanceMatrix = async (req, res) => {
  const address_batch = req.body.address_batch;
  console.log(googleApiKey);
  console.log("address_batch", address_batch);
  try {
    const routesApiresponse = await fetch(ROUTES_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": googleApiKey,
        "X-Goog-FieldMask":
          "originIndex,destinationIndex,duration,distanceMeters,status,condition",
      },
      body: JSON.stringify({
        origins: [
          {
            waypoint: {
              location: {
                latLng: {
                  // Solar Optimum
                  latitude: 34.163738,
                  longitude: -118.303307,
                },
              },
            },
          },
        ],
        destinations: address_batch.map((address) => ({
          waypoint: {
            location: {
              latLng: {
                latitude: address.location.lat,
                longitude: address.location.lng,
              },
            },
          },
        })),
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
      }),
    });

    if (!routesApiresponse.ok) {
      throw new Error(`HTTP error! Status: ${routesApiresponse.status}`);
    }

    if (routesApiresponse.status === 429) {
      console.error("Rate limit exceeded");
    }

    const data = await routesApiresponse.json();
    console.log("🚀 ~ newAppointment ~ data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching distance matrix:", error);
    throw error;
  }
};

export { getDistanceMatrix };
