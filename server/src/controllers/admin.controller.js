import { googleApiKey, graphHopperApiKey } from "../config/env.js";

const ROUTES_API =
  "https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix";

// const GRAPH_OPTIMIZATION_API =
//     `https://graphhopper.com/api/1/vrp?key=${graphHopperApiKey}`

const getOptimalRoute = async (req, res) => {
  const query = new URLSearchParams({
    key: graphHopperApiKey,
  }).toString();

  const resp = await fetch(`https://graphhopper.com/api/1/vrp?${query}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vehicles: [
        {
          vehicle_id: "vehicle-1",
          type_id: "cargo-bike",
          start_address: {
            location_id: "berlin",
            lon: 13.406,
            lat: 52.537,
          },
          earliest_start: 1554804329,
          latest_end: 1554808329,
          max_jobs: 3,
        },
        //   {
        //     vehicle_id: 'vehicle-2',
        //     type_id: 'cargo-bike',
        //     start_address: {
        //       location_id: 'berlin',
        //       lon: 13.406,
        //       lat: 52.537
        //     },
        //     earliest_start: 1554804329,
        //     latest_end: 1554808329,
        //     max_jobs: 3,
        //     skills: ['physical strength']
        //   }
      ],
      vehicle_types: [
        {
          type_id: "cargo-bike",
          capacity: [10],
          profile: "bike",
        },
      ],
      services: [
        {
          id: "s-1",
          name: "visit-Joe",
          address: {
            location_id: "13.375854_52.537338",
            lon: 13.375854,
            lat: 52.537338,
          },
          size: [1],
          time_windows: [
            {
              earliest: 1554805329,
              latest: 1554806329,
            },
          ],
        },
        {
          id: "s-2",
          name: "serve-Peter",
          address: {
            location_id: "13.393364_52.525851",
            lon: 13.393364,
            lat: 52.525851,
          },
          size: [1],
        },
        {
          id: "s-3",
          name: "visit-Michael",
          address: {
            location_id: "13.416882_52.523543",
            lon: 13.416882,
            lat: 52.523543,
          },
          size: [1],
        },
        {
          id: "s-4",
          name: "do nothing",
          address: {
            location_id: "13.395767_52.514038",
            lon: 13.395767,
            lat: 52.514038,
          },
          size: [1],
        },
      ],
      shipments: [
        {
          id: "7fe77504-7df8-4497-843c-02d70b6490ce",
          name: "pickup and deliver pizza to Peter",
          priority: 1,
          pickup: {
            address: {
              location_id: "13.387613_52.529961",
              lon: 13.387613,
              lat: 52.529961,
            },
          },
          delivery: {
            address: {
              location_id: "13.380575_52.513614",
              lon: 13.380575,
              lat: 52.513614,
            },
          },
          size: [1],
          required_skills: ["physical strength"],
        },
      ],
      objectives: [
        {
          type: "min",
          value: "vehicles",
        },
        {
          type: "min",
          value: "completion_time",
        },
      ],
      configuration: {
        routing: {
          calc_points: true,
          snap_preventions: ["motorway", "trunk", "tunnel", "bridge", "ferry"],
        },
      },
    }),
  });

  const data = await resp.json();
  console.log(data);
};

const getDistanceMatrix = async (req, res) => {
  const address_batch = req.body.address_batch;
  //   console.log(googleApiKey);
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
      const errorText = await routesApiresponse.text();
      console.error("google api error resp:", errorText);
      throw new Error(`HTTP error! Status: ${routesApiresponse.status}`);
    }

    if (routesApiresponse.status === 429) {
      console.error("Rate limit exceeded");
    }

    const data = await routesApiresponse.json();
    console.log("🚀 ~ newAppointment ~ data:", data);
    return res.json(data);
  } catch (error) {
    console.error("Error fetching distance matrix:", error.message);
    res.status(500).send({ error: error.message });
  }
};

export { getDistanceMatrix, getOptimalRoute };
