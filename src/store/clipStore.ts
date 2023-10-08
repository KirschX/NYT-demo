import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Article } from "@/types/article";

interface ClipState {
  clippedArticles: Article[];
  toggleClipArticle: (article: Article) => void;
  isClipped: (articleId: string) => boolean;
}

const useClipStore = create<ClipState>()(
  persist(
    (set, get) => ({
      clippedArticles: [],
      toggleClipArticle: (article: Article) => {
        const existingArticle = get().clippedArticles.find(
          (a) => a._id === article._id
        );

        let updatedArticles;
        if (existingArticle) {
          updatedArticles = get().clippedArticles.filter(
            (a) => a._id !== article._id
          );
        } else {
          updatedArticles = [...get().clippedArticles, article];
        }

        set({ clippedArticles: updatedArticles });
      },

      isClipped: (articleId) => {
        return get().clippedArticles.some((a) => a._id === articleId);
      },
    }),
    {
      name: "clippedArticles-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useClipState = () => {
  return useClipStore((state) => ({
    clippedArticles: state.clippedArticles,
    // clipArticle: state.clipArticle,
    // unclipArticle: state.unclipArticle,
    toggleClipArticle: state.toggleClipArticle,
    isClipped: state.isClipped,
  }));
};
