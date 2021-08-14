export const getLastTickets = async () => {
  const res = await fetch("http://localhost:6005/last-tickets");
  const data = await res.json();

  return data.tickets;
};
