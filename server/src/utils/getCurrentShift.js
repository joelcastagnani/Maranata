export const getCurrentShift = () => {
  const hour = new Date().getHours();

  if (hour >= 10 && hour < 18) {
    return "mediodia";
  } else if ((hour >= 18 && hour <= 23) || (hour >= 0 && hour < 2)) {
    return "noche";
  } else {
    return null;
  }
};
