import useArticles from "@/hooks/useArticles";

import useIntersection from "@/hooks/useIntersections";
import ArticlesList from "@/components/ArticlesList";
import Loading from "@/components/Loading";

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetching, error, isError } =
    useArticles();

  const articles = data ? data.pages.flatMap((page) => page.response.docs) : [];

  const ref = useIntersection((entry, observer) => {
    observer.unobserve(entry.target);

    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  if (!data) return <Loading />;

  return (
    <>
      <div className=" h-full space-y-2 overflow-y-scroll">
        <ArticlesList data={articles} />
        {data && <div className=" h-1" ref={ref}></div>}
      </div>
    </>
  );
}
