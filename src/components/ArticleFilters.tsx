import { useLocation } from "react-router-dom";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { useQueryState, useModal, useFormState } from "@/store/store";

import useKeyHandler from "@/hooks/useKeyhandler";

export default function ArticleFilters() {
  const currentPath = useLocation().pathname;

  const { updateQueryObject } = useQueryState(currentPath);
  const { setFormState, formState, resetFormState } = useFormState(currentPath);
  const { closeModal } = useModal();

  useKeyHandler(() => {
    closeModal();
  }, "Escape");

  const handleInputChange = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = currentTarget;

    setFormState({ name, value, checked });
  };

  const handleSubmit = () => {
    updateQueryObject(formState);

    resetFormState;
    closeModal();
  };

  function isChecked(location: string) {
    return formState.glocations.includes(location);
  }

  return (
    <div className=" space-y-[40px] text-Black_80">
      <Input
        onChange={handleInputChange}
        id="headline"
        value={formState.headline}
        type="text"
        label={true}
      ></Input>
      <Input
        id="beginDate"
        type="date"
        label={true}
        data-placeholder="날짜를 선택해주세요"
        onChange={handleInputChange}
        required={true}
        value={formState.beginDate}
      />
      {(formState.beginDate || formState.endDate) && (
        <Input
          id="endDate"
          type="date"
          label={true}
          onChange={handleInputChange}
          value={formState.endDate}
        />
      )}
      <Input
        className=" text-[14px] leading-[24px] tracking-[-0.04rem]"
        id="glocations"
        type="checkbox"
        options={[
          { value: "Korea", label: "대한민국", checked: isChecked("Korea") },
          { value: "China", label: "중국", checked: isChecked("China") },
          { value: "Japan", label: "일본", checked: isChecked("Japan") },
          {
            value: "United States",
            label: "미국",
            checked: isChecked("United States"),
          },
          {
            value: "North Korea",
            label: "북한",
            checked: isChecked("North Korea"),
          },
          { value: "Russia", label: "러시아", checked: isChecked("Russia") },
          { value: "France", label: "프랑스", checked: isChecked("France") },
          {
            value: "United Kingdom",
            label: "영국",
            checked: isChecked("United Kingdom"),
          },
        ]}
        label={true}
        onChange={handleInputChange}
      ></Input>
      <Button size="lg" onClick={handleSubmit}>
        필터 적용하기
      </Button>
    </div>
  );
}
