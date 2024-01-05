export const formatDate = (date) => {
    if (!date) return "Invalid Date";

    date = new Date(date);
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();

    const suffix =
        day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const formattedDate = `${day}${suffix} ${month}, ${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} @ ${formattedTime}`;
};
