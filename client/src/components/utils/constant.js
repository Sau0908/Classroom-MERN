export const stats = [
  {
    title: "Total Students",
    value: "1",
    percentage: "+15%",
    color: "bg-purple-100",
    percentageColor: "text-green-500",
  },
  {
    title: "Total Teachers",
    value: "1",
    percentage: "-3%",
    color: "bg-yellow-200",
    percentageColor: "text-red-500",
  },
  {
    title: "Staffs",
    value: "55",
    percentage: "-3%",
    color: "bg-purple-100",
    percentageColor: "text-red-500",
  },
  {
    title: "Awards",
    value: "95",
    percentage: "+5%",
    color: "bg-yellow-200",
    percentageColor: "text-green-500",
  },
];

export const formatTime = (time) => {
  const hours = time.hour();
  const minutes = time.minute();
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${period}`;
};
