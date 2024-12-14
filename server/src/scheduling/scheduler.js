import { googleApiKey } from "../config/env.js";

const ROUTES_API =
  "https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix";

/**
 * Comparator function for 2 appointments. See the definition of array.sort()
 */
const appointmentComparator = (a, b) => a.dateCreated - b.dateCreated;

/**
 * Returns a new copy of the array, appending scheduling info to each appointment.
 * Doesn't change the order of the array.
 */
const appendSchedule = (appointments) => {
  const comparator = (a, b) =>
    appointmentComparator(a.appointment, b.appointment);
  const sortedArray = appointments
    .map((appointment, index) => ({ appointment, index }))
    .sort(comparator);

  const orderMap = new Map();
  sortedArray.forEach((item, index) => {
    const visitOrder = index + 1;
    orderMap.set(item.index, visitOrder);
  });

  return appointments.map((appointment, index) => ({
    ...appointment,
    schedule: {
      order: orderMap.get(index),
    },
  }));
};

const getDistanceMatrix = async (address_batch) => {
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
                latitude: address.lat,
                longitude: address.lng,
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
export { appendSchedule, getDistanceMatrix };
