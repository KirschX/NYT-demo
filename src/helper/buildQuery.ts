interface QueryObject {
  beginDate?: string;
  endDate?: string;
  headline?: string;
  glocations?: string[];
}

export default function buildQuery(queryObject: QueryObject) {
  const queryParts = [];
  const { beginDate, endDate, headline, glocations } = queryObject;
  const APIKEY = import.meta.env.VITE_NYT_API_KEY;

  if (headline) {
    queryParts.push(`q=${encodeURIComponent(headline)}`);
  }
  if (beginDate) {
    queryParts.push(`begin_date=${beginDate}`);
  }
  if (endDate) {
    queryParts.push(`end_date=${endDate}`);
  }
  if (glocations || headline || beginDate || endDate) {
    const gloctaionsString = glocations.reduce((acc, curr) => {
      return `${acc}("${curr}")`;
    }, "");
    const filter = gloctaionsString ? `fq=glocations:${gloctaionsString}` : "";
    queryParts.push(filter);
  }

  return `https://api.nytimes.com/svc/search/v2/articlesearch.json?${queryParts.join(
    "&"
  )}&api-key=${APIKEY}`;
}
