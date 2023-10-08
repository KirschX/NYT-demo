import { URL } from "@/constants/url";
import HomeLogo from "@/assets/homeActive.svg?react";
import HomeInactiveLogo from "@/assets/homeInactive.svg?react";
import ScrapLogo from "@/assets/scrapActive.svg?react";
import ScrapInactiveLogo from "@/assets/scrapInactive.svg?react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  const navOptions = [
    {
      text: "홈",
      url: `${URL.HOME}`,
      icon: currentPath === "/" ? <HomeLogo /> : <HomeInactiveLogo />,
    },
    {
      text: "스크랩",
      url: `${URL.SCRAP}`,
      icon: currentPath === "/scrap" ? <ScrapLogo /> : <ScrapInactiveLogo />,
    },
  ];

  function routHandler(item, e) {
    navigate(item.url);
  }

  return (
    <nav className="bg-black max-w-xl rounded-[30px] text-gray-700 border-t absolute bottom-0 w-full px-20 pb-5 py-5 flex justify-between text-xs">
      {navOptions.map((item) => (
        <div key={item.text} className="">
          <div
            onClick={(e) => routHandler(item, e)}
            className="  h-[45px] w-[26px] flex flex-col justify-between items-center text-white text-center leading-3 whitespace-nowrap"
          >
            {item.icon}
            <div className=" text-[10px]">{item.text}</div>
          </div>
        </div>
      ))}
    </nav>
  );
}
