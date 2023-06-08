import React from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input") as HTMLInputElement;

    if (input.value.trim() === "") {
      return;
    }

    navigate(`/detail/${input.value}`, { replace: true });
  };

  return (
    <form className="search-form" onSubmit={submitHandler}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Введите название города"
      />
      <button type="submit" className="search-form__btn">
        Поиск
      </button>
    </form>
  );
}

export default SearchForm;
