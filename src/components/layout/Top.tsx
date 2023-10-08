import SearchIcon from "@/assets/search.svg?react";
import CalendarIcon from "@/assets/calendar.svg?react";

import { useModal, useQueryState } from "@/store/store";

import ArticleFilters from "@/components/ArticleFilters";

import toEnglish from "@/helper/toEnglish";
import { useLocation } from "react-router-dom";
import { useClipState } from "@/store/clipStore";
import { URL } from "@/constants/url";

export default function Top() {
  const currentPath = useLocation().pathname;
  const { openModal } = useModal();
  const { queryObject } = useQueryState(currentPath);
  const { clippedArticles } = useClipState();

  const tabOptions = [
    {
      name: "1",
      text: queryObject.headline
        ? queryObject.headline.length > 8
          ? queryObject.headline.slice(0, 8) + ".."
          : queryObject.headline
        : "전체 헤드라인",
      icon: (
        <SearchIcon
          className={` ${
            queryObject.headline ? `text-Blue_Main` : `text-Black_80`
          }`}
        />
      ),
      checked: queryObject.headline,
    },
    {
      name: "2",
      text: queryObject.beginDate
        ? `${`${queryObject.beginDate} ~ ${queryObject.endDate}`.split(
            "~"
          )?.[0]}..`
        : "전체 날짜",
      icon: (
        <CalendarIcon
          className={` ${
            queryObject.beginDate ? `text-Blue_Main` : `text-Black_80`
          }`}
        />
      ),
      checked: queryObject.beginDate,
    },
    {
      name: "3",
      text:
        queryObject.glocations && queryObject.glocations.length > 0
          ? `${toEnglish(queryObject.glocations[0])} 외 ${
              queryObject.glocations.length
            }개`
          : "전체 국가",
      checked: queryObject.glocations?.length > 0,
    },
  ];

  const handleOpenModal = () => {
    openModal(
      <>
        <ArticleFilters />
      </>
    );
  };

  const isClippedStorageEmpty =
    currentPath == URL.SCRAP &&
    !JSON.parse(localStorage.getItem("clippedArticles-storage"))?.state
      .clippedArticles.length;

  return (
    <div
      className={
        ` bg-white w-full max-w-xl justify-center text-lg font-medium absolute text-gray-800 top-0 items-center ` +
        (isClippedStorageEmpty ? "" : "border-b border-[#C4C4C4]")
      }
    >
      <div className=" h-[44px] flex justify-center">upperTop</div>
      {!isClippedStorageEmpty && (
        <div
          className="  h-[60px] flex-shrink-0 pl-[20px] py-[13px]"
          onClick={handleOpenModal}
        >
          <div className=" h-[34px] text-[14px] gap-[7px] inline-flex text-sm tracking-[-0.56px] leading-[24px] text-right">
            {tabOptions.map((item) => (
              <div
                key={item.name}
                className={` gap-[4px] cursor-pointer text-Black_80 border-Black_80 flex border rounded-[30px] px-[12px] pt-[6px] pb-[4px] items-center ${
                  item.checked ? " border-Blue_Main text-Blue_Main" : ""
                }`}
              >
                <span>{item.icon && item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
