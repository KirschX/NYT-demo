import ArticlesList from "@/components/ArticlesList";
import Loading from "@/components/Loading";
import useClippedArticles from "@/hooks/useClippedArticles";
import useIntersection from "@/hooks/useIntersections";

export default function Scrap() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useClippedArticles();

  const ref = useIntersection((entry, observer) => {
    observer.unobserve(entry.target);

    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  if (!data) return <Loading />;

  const articles = data.pages.flatMap((page) => page);

  return (
    <div className=" h-full space-y-2 overflow-y-scroll">
      <ArticlesList data={articles} />
      {data && <div className=" h-1" ref={ref}></div>}
    </div>
  );
}
