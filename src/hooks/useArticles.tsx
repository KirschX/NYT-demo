import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { useQueryState } from "@/store/store";
import { QueryResponse, ArticleResponse } from "@/types/article";
import { useLocation } from "react-router-dom";
import { useClipState } from "@/store/clipStore";

export default function UseArticles() {
  const queryClient = useQueryClient();
  const currentPath = useLocation().pathname;
  const { queryString } = useQueryState(currentPath);

  const { isClipped, clippedArticles } = useClipState();

  const fetchArticles = async ({ pageParam = 1 }) => {
    const response = await fetch(`${queryString}&page=${pageParam}`);
    if (!response.ok) {
      // throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    // return response.json();
    const mergedData = {
      ...responseData,
      response: {
        ...responseData.response,
        docs: responseData.response.docs.map((article) => ({
          ...article,
          isClipped: isClipped(article._id),
        })),
      },
    };

    return mergedData;
  };

  useEffect(() => {
    const updateCachedData = () => {
      const cachedData = queryClient.getQueryData<QueryResponse>([
        "articles",
        queryString,
      ]);

      if (cachedData) {
        const updatedPages = [...cachedData.pages];

        updatedPages.forEach((page) => {
          page.response.docs = page.response.docs.map((article) => ({
            ...article,
            isClipped: clippedArticles.some((clip) => clip._id === article._id),
          }));
        });

        const updatedData = {
          ...cachedData,
          pages: updatedPages,
        };

        queryClient.setQueryData(["articles", queryString], updatedData);
      }
    };

    // Call the update function
    updateCachedData();
  }, [clippedArticles]);

  return useInfiniteQuery<ArticleResponse>(
    ["articles", queryString],
    fetchArticles,
    {
      getNextPageParam: (lastPage, allPages) => {
        const totalPage = Math.ceil(lastPage?.response?.meta?.hits / 10);
        const page = Math.ceil(lastPage?.response?.meta?.offset / 10);
        const nextPage = page + 1;
        if (nextPage >= totalPage) return false;
        return nextPage;
      },
    }
  );
}
