import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { useFormState, useQueryState } from "@/store/store";
import { LocalQueryResponse } from "@/types/article";
import { useLocation } from "react-router-dom";
import { useClipState } from "@/store/clipStore";
import matchesArticleCriteria from "@/helper/filters";

export default function UseArticles() {
  const queryClient = useQueryClient();
  const currentPath = useLocation().pathname;
  const { queryString } = useQueryState(currentPath);
  const { formState } = useFormState(currentPath);
  const { clippedArticles } = useClipState();

  const fetchArticlesFromLocalStorage = ({ pageParam = 1 }) => {
    const articles = clippedArticles;
    const itemsPerPage = 10;

    const start = (pageParam - 1) * itemsPerPage;
    const end = pageParam * itemsPerPage;

    // 필터링
    // const filteredArticles = allArticles.filter(article => article.title.includes(queryString));
    // console.log(articles);
    const filteredArticles = articles.filter((article) =>
      matchesArticleCriteria(article, formState)
    );

    const paginatedArticles = filteredArticles.slice(start, end);

    return paginatedArticles;
  };

  useEffect(() => {
    const cachedData = queryClient.getQueryData<LocalQueryResponse>([
      "local-articles",
      queryString,
    ]);

    if (cachedData) {
      const updatedPages = [...cachedData.pages];
      const temp = updatedPages.map((page) => {
        page = page.filter((article) => {
          return clippedArticles.some((clip) => clip._id === article._id);
        });

        return page;
      });

      const updatedData = {
        ...cachedData,
        pages: temp,
      };

      queryClient.setQueryData(["local-articles", queryString], updatedData);
    }
  }, [clippedArticles, formState]);

  return useInfiniteQuery(
    ["local-articles", queryString],
    ({ pageParam }) => fetchArticlesFromLocalStorage({ pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const totalPage = Math.ceil(
          JSON.parse(localStorage.getItem("clippedArticles-storage")).state
            .clippedArticles.length / 10
        );
        const currentPage = allPages.length;
        const nextPage = currentPage + 1;
        // console.log("allPage, nextpage, currentPage, totalPage");
        // console.log(allPages, nextPage, currentPage, totalPage);
        if (nextPage > totalPage) return false;
        return nextPage;
      },
    }
  );
}
