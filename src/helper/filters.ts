const matchesArticleCriteria = (article, formState) => {
  const articleDate = new Date(article.pub_date);

  if (
    formState.headline &&
    !article.headline.main.toLowerCase().includes(formState.headline)
  ) {
    return false;
  }

  if (
    formState.beginDate &&
    articleDate.getTime() < new Date(formState.beginDate).getTime()
  ) {
    return false;
  }

  if (
    formState.endDate &&
    articleDate.getTime() >
      new Date(`${formState.endDate}T23:59:59+0000`).getTime()
  ) {
    return false;
  }

  if (formState.glocations && formState.glocations.length > 0) {
    const articleGlocations = article.keywords
      .filter((keyword) => keyword.name === "glocations")
      .map((keyword) => keyword.value);

    const hasMatchingGlocation = articleGlocations.some((glocation) =>
      formState.glocations.includes(glocation)
    );
    if (!hasMatchingGlocation) {
      return false;
    }
  }
  return true;
};

export default matchesArticleCriteria;
