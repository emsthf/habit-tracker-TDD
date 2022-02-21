import React from "react"; // 리액트 테스트에서는 꼭 React를 import 해줘야 한다!!
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HabitAddForm from "../habitAddForm";

describe("HabitAddForm", () => {
  let onAdd;
  beforeEach(() => {
    onAdd = jest.fn(); // jest의 mock 함수로 onAdd를 생성
  });

  it("calls onAdd when button is clicked", () => {
    render(<HabitAddForm onAdd={onAdd} />); // 컴포넌트를 랜더링. onAdd라는 prop에는 위에서 만든 mock 함수를 전달
    const input = screen.getByPlaceholderText("Habit");
    const button = screen.getByText("Add");
    // input에다가 원하는 습관의 이름을 타이핑 한 다음에
    // add라는 버튼을 클릭하면
    // onAdd가 input에 입력된 이름과 함께 호출되어야 함!

    // fireEvent는 버튼에 포커스가 되지 않지만 userEvent는 유저가 진짜 버튼을 누르는 것 같은 효과를 준다(상위 호환)
    userEvent.type(input, "New Habit"); // input 이벤트를 발생시킬건데, "New Habit"이란 글자를 입력할 것
    userEvent.click(button); // button을 클릭하는 이벤트를 발생시킴

    expect(onAdd).toHaveBeenCalledWith("New Habit");
  });
});
