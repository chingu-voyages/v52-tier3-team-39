export const formatName = (name) => {
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");
  if (!lastName) {
    return firstName;
  }
  return `${lastName}, ${firstName}`;
};

export const formatTime = (hour) => {
  return hour <= 12 ? `${hour}a` : `${hour - 12}p`;
};

export const formatDateCreated = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

export const formatPhone = (phone) => {
  const cleaned = ("" + phone).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
};

export const formatAddress = (address) => {
  const [firstPart, ...rest] = address.split(",");
  const secondPart = rest.join(",").trim();
  return `${firstPart}\n${secondPart}`;
};
