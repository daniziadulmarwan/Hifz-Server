export const getDayFromDate = (value: any) => {
  let date = new Date(value).getDay();
  switch (date) {
    case 0:
      return "Ahad";
      break;
    case 1:
      return "Senin";
      break;
    case 2:
      return "Selasa";
      break;
    case 3:
      return "Rabu";
      break;
    case 4:
      return "Kamis";
      break;
    case 5:
      return "Jum'at";
      break;
    case 6:
      return "Sabtu";
      break;
  }
};
