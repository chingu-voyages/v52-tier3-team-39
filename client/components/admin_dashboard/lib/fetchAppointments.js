"use server";

export async function fetchAppointments() {
  const response = await fetch("http://localhost:4000/appointments", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }
  const data = await response.json();
  return data.map((item, index) => ({
    id: item.id || index + 1,
    name: formatName(item.name),
    status: item.status ? item.status : "Requested",
    dateCreated: formatDateCreated(item.dateCreated),
    timeRange: `${formatTime(item.timeRange?.earlyTimeHour)} - ${formatTime(
      item.timeRange?.lateTimeHour
    )}`,
    phone: formatPhone(item.phone),
    email: item.email,
    address: formatAddress(item.address),
  }));
}

const formatName = (name) => {
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");
  if (!lastName) {
    return firstName;
  }
  return `${lastName}, ${firstName}`;
};

const formatTime = (hour) => {
  return hour <= 12 ? `${hour}a` : `${hour - 12}p`;
};

const formatDateCreated = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const formatPhone = (phone) => {
  const cleaned = ("" + phone).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
};

const formatAddress = (address) => {
  const [firstPart, ...rest] = address.split(",");
  const secondPart = rest.join(",").trim();
  return `${firstPart}\n${secondPart}`;
};