import StarLogo from "@/assets/Star.svg?react";
import StarFilledLogo from "@/assets/StarFilled.svg?react";
import { useClipState } from "@/store/clipStore";
import { Article } from "@/types/article";
import { Button } from "@/components/ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import NoScrapIcon from "@/assets/NoScrap.svg?react";
import formatDateToKorean from "@/helper/formatDateToKorean";
import { URL } from "@/constants/url";

export default function ArticlesList({ data }) {
  const currentPath = useLocation().pathname;
  const { toggleClipArticle, clippedArticles } = useClipState();
  const navigate = useNavigate();

  const handleToggleClip = (article: Article) => {
    toggleClipArticle(article);
  };

  return (
    <>
      {!data.length && currentPath === URL.SCRAP && (
        <div className=" absolute top-[330px] left-[40px]">
          <div className=" flex flex-col justify-between space-y-[20px]">
            <div className=" flex justify-center items-center">
              <div className=" space-y-[8px]">
                <div className=" flex justify-center">
                  <NoScrapIcon />
                </div>
                <div>저장된 스크랩이 없습니다</div>
              </div>
            </div>
            <div className=" flex justify-center items-center">
              <div className=" w-[295px] h-[60px]">
                <Button size="lg" onClick={() => navigate(URL.HOME)}>
                  스크랩 하러 가기
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {data.length > 0 &&
        data.map((article) => (
          <div key={article._id} className="bg-white rounded-[8px]">
            <div className=" w-[335px] h-[104px] py-[10px] px-[20px] flex flex-col space-y-[8px]">
              <div className=" flex justify-between w-[295px] overflow-hidden font-semibold text-[18px]">
                <div className=" w-[260px] h-[56px]">
                  {article.headline.main}
                </div>
                <div
                  onClick={() =>
                    handleToggleClip({ ...article, isClipped: true })
                  }
                  className="h-[24px] w-[24px] flex justify-center items-center"
                >
                  {article.isClipped ? <StarFilledLogo /> : <StarLogo />}
                </div>
              </div>
              <div className=" tracking-[-0.65px] max-h-[20px]  overflow-hidden flex justify-between w-[295px] leading-[20px] text-Black_80 text-[13px]">
                <div className=" text-black max-w-[206px] space-x-[8px] flex">
                  <div>{article.source}</div>
                  <div>
                    {article.byline.original?.length > 11
                      ? `${article.byline.original.slice(0, 11)}..`
                      : ""}
                  </div>
                </div>
                <div className=" whitespace-nowrap">
                  {formatDateToKorean(article.pub_date)}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
