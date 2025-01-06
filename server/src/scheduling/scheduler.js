import Appointment from "../models/appointments.model.js";
import { graphHopperApiKey } from "../config/env.js";

/**
 * Returns a new copy of the array, appending scheduling info to each appointment.
 */

const appendSchedule = async (appointments) => {
  const optimalRoute = await getOptimalRoute(appointments);
  const orderedIds = optimalRoute.filter((id) =>
    appointments.some((appt) => appt.id === id)
  );
  console.log("orderedIDs", orderedIds);

  return appointments.map((appointment, index) => {
    const order = orderedIds.indexOf(appointment.id) + 1;

    if (order > 0) {
      const { preferredTimeRange } = appointment;
      const { preferredEarlyTime, preferredLateTime } = preferredTimeRange;

      const baseDate = new Date();
      const earlyTime = new Date(baseDate);
      earlyTime.setHours(preferredEarlyTime, 0, 0, 0);

      const lateTime = new Date(baseDate);
      lateTime.setHours(preferredLateTime, 0, 0, 0);

      const interval = 120 * 60 * 1000;

      const scheduledTime = new Date(
        earlyTime.getTime() + (order - 1) * interval
      );

      // if (scheduledTime > preferredLateTime) {
      //   console.warn(
      //     `Appointment ${appointment.id} exceeds preferred late time but will be logged.`
      //   );
      // }

      return {
        ...appointment,
        schedule: {
          order,
          scheduledDate: scheduledTime.toISOString(),
        },
      };
    }
    console.log("original appointment:", appointment);
    return appointment;
  });
};

const getOptimalRoute = async (appointments) => {
  const query = new URLSearchParams({
    key: graphHopperApiKey,
  }).toString();

  const services = appointments.map((appt) => ({
    id: appt.id,
    address: {
      location_id: appt.id,
      lat: appt.location.lat,
      lon: appt.location.lng,
    },
    time_windows: [
      {
        earliest: appt.preferredTimeRange.preferredEarlyTime * 3600,
        latest: appt.preferredTimeRange.preferredLateTime * 3600,
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
    throw new Error("Couldn't connect to graph hopper");
  } else {
    console.log("data", data);
    return data.solution.routes[0].activities.map((activity) => activity.id);
  }
};

export async function updateStatus(req, res) {
  const { id } = req.params;
  const { newStatus } = req.body;

  try {
    const data = await Appointment.findByIdAndUpdate(
      { _id: id },
      { status: newStatus },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: "Could not get data" });
    }

    console.log("data.status", data.status);
    return res.status(200).json(data.status);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error: saving new status" });
  }
}

export { appendSchedule };
