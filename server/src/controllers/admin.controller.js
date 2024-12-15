import { graphHopperApiKey } from "../config/env.js";

const getOptimalRoute = async (req, res) => {
  const { batch_appts } = req.body;
  console.log(batch_appts);
  const query = new URLSearchParams({
    key: graphHopperApiKey,
  }).toString();

  const services = batch_appts.map((appt) => ({
    id: appt.id,
    address: {
      location_id: appt.id,
      lat: appt.location.lat,
      lon: appt.location.lng,
    },
    time_windows: [
      {
        earliest: appt.timeRange.preferredEarlyTime,
        latest: appt.timeRange.preferredLateTime,
      },
    ],
  }));

  const resp = await fetch(`https://graphhopper.com/api/1/vrp?${query}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vehicles: [
        {
          vehicle_id: "vehicle_1",
          type_id: "car",
          start_address: {
            location_id: "Solar Optimum",
            lat: 34.163738,
            lon: -118.303307,
          },
          end_address: {
            location_id: "Solar Optimum",
            lat: 34.163738,
            lon: -118.303307,
          },
        },
      ],
      vehicle_types: [
        {
          type_id: "car",
          capacity: [5],
        },
      ],
      services,
    }),
  });

  const data = await resp.json();

  if (!resp.ok) {
    console.error(data.solution.routes);
    res.status(resp.status).send(data);
  } else {
    console.log(data);
    res.status(200).send(data.solution.routes);
  }
};

export { getOptimalRoute };
