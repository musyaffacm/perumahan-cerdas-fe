export default function LoadingSpinner({
  className = "",
  bgColor = "gray",
  spinnerColor = "blue",
}) {
  let bgColorClass, spinnerColorClass = "";

  switch (bgColor) {
    case "transparent":
      bgColorClass = "bg-transparent";
      break;
    case "gray":
      bgColorClass = "bg-white/50";
      break;

    default:
      bgColorClass = "bg-white/50";
      break;
  }

  switch (spinnerColor) {
    case "blue":
      spinnerColorClass = "border-blue-600";
      break;
    case "white":
      spinnerColorClass = "border-white-600";
      break;

    default:
      spinnerColorClass = "border-blue-600";
      break;
  }
  return (
    <div
      className={`${
        className + " " + bgColorClass
      } w-full h-full flex justify-center items-center`}
    >
      <div
        className={`${spinnerColorClass} border-t-transparent border-solid animate-spin  rounded-full border-8 h-52 w-52`}
      ></div>
    </div>
  );
}
