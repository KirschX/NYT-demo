import { create } from "zustand";

import buildQuery from "@/helper/buildQuery";

interface QueryObject {
  beginDate?: string;
  endDate?: string;
  headline?: string;
  glocations?: string[];
}

interface QueryState {
  queryString: string;
  queryObject: QueryObject;
  updateQueryObject: (updates: Partial<QueryObject>) => void;
}

// interface FormObject {
//   headline: string;
//   beginDate: string;
//   endDate: string;
//   glocations: string[];
// }

interface FormState {
  formState: QueryObject;
  setFormState: (updates: {
    name: string;
    value: string;
    checked: boolean;
  }) => void;
  // submitFormState: () => void;
  resetFormState: () => void;
}

interface ModalState {
  isModalOpen: boolean;
  modalContent: JSX.Element | null;
  openModal: (content: JSX.Element) => void;
  closeModal: () => void;
}

const queryStateStores = new Map<string, ReturnType<typeof create>>();

const getQueryStateStore = (id: string) => {
  if (!queryStateStores.has(id)) {
    const newStore = create<QueryState>((set) => ({
      queryString: buildQuery({
        beginDate: undefined,
        endDate: undefined,
        headline: undefined,
        glocations: undefined,
      }),
      queryObject: {
        beginDate: undefined,
        endDate: undefined,
        headline: undefined,
        glocations: undefined,
      },
      updateQueryObject: (updates) => {
        set((state) => {
          const newQueryObject = { ...state.queryObject, ...updates };
          const newQueryString = buildQuery(newQueryObject);
          return {
            queryObject: newQueryObject,
            queryString: newQueryString,
          };
        });
      },
    }));
    queryStateStores.set(id, newStore);
  }

  return queryStateStores.get(id)!;
};

const formStateStores = new Map<string, ReturnType<typeof create>>();

const getFormStateStore = (id: string) => {
  if (!formStateStores.has(id)) {
    const newStore = create<FormState>((set, get) => ({
      formState: { headline: "", beginDate: "", endDate: "", glocations: [] },

      setFormState: (updates) => {
        set((state) => {
          const prevFormState = state.formState;
          let newFormState;
          const { name, value, checked } = updates;
          if (name === "glocations") {
            if (checked) {
              newFormState = {
                ...prevFormState,
                [name]: [...prevFormState[name], value],
              };
            } else {
              newFormState = {
                ...prevFormState,
                [name]: prevFormState[name].filter((item) => item !== value),
              };
            }
          } else {
            newFormState = {
              ...prevFormState,
              [name]: value,
            };
          }
          console.log(updates, newFormState);
          return {
            formState: newFormState,
          };
        });
      },

      resetFormState: () => {
        set({
          formState: {
            headline: "",
            beginDate: "",
            endDate: "",
            glocations: [],
          },
        });
      },
      // submitFormState: () => {
      //   const { headline, beginDate, endDate, glocations } = get().formState;
      //   const updateQueryObject = getQueryStateStore(id).getState().formState.updateQueryObject;
      //   updateQueryObject({
      //     headline,
      //     beginDate,
      //     endDate,
      //     glocations,
      //   });
      // },
    }));
    formStateStores.set(id, newStore);
  }

  return formStateStores.get(id)!;
};

const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  modalContent: null,
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => {
    set({ isModalOpen: false, modalContent: null });
  },
}));

export const useModal = () => useModalStore((state) => state);

export const useQueryState = (id: string) => {
  const store = getQueryStateStore(id);

  return store((state: QueryState) => ({
    updateQueryObject: state.updateQueryObject,
    queryObject: state.queryObject,
    queryString: state.queryString,
  }));
};

export const useFormState = (id: string) => {
  const store = getFormStateStore(id);

  return store((state: FormState) => ({
    setFormState: state.setFormState,
    resetFormState: state.resetFormState,
    formState: state.formState,
  }));
};
