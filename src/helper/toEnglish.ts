const toEnglish = (location: string) => {
  if (location === "Korea") return "대한민국";
  else if (location === "China") return "중국";
  else if (location === "Japan") return "일본";
  else if (location === "United States") return "미국";
  else if (location === "North korea") return "북한";
  else if (location === "Russia") return "러시아";
  else if (location === "France") return "프랑스";
  else if (location === "United Kingdom") return "영국";
};

export default toEnglish;
