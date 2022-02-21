import HabitPresenter from "../habit_presenter";

describe("HabitPresenter", () => {
  const habits = [
    { id: 1, name: "Reading", count: 1 },
    { id: 2, name: "Running", count: 0 },
  ];
  // 테스트를 위해선 초기화 하는 값과 presenter가 필요
  let presenter;
  let update;

  beforeEach(() => {
    presenter = new HabitPresenter(habits, 3); // 이 생성된 클래스에 배열 값을 줘야 하는데, 여기에 직접 배열을 만들면 테스트 할 때 배열에 접근을 해야하게 된다.
    // 그래서 외부에 배열을 정의해 준 것
    update = jest.fn();
  });

  it("inits with habits", () => {
    expect(presenter.getHabits()).toEqual(habits);
  });

  it("increment habit count", () => {
    presenter.increment(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(2); // 0번 인덱스는 카운트가 증가되어서 2가 되어야 한다
    checkUpdateIsCalled();
  });

  it("decrement habit count", () => {
    presenter.decrement(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(0); // 0번 인덱스는 카운트가 감소되어서 0이 되어야 한다
    checkUpdateIsCalled();
  });

  it("dose not set the count value below 0 when decrements", () => {
    presenter.decrement(habits[0], update);
    presenter.decrement(habits[0], update); // 감소를 2번 했지만 update는 위 15행애서 mock 함수로 만들어 쓰므로 37라인 실행해도 0, 38라인 실행해도 0이 된다

    expect(presenter.getHabits()[0].count).toBe(0);
  });

  it("deletes habit from the list", () => {
    presenter.delete(habits[0], update);

    expect(presenter.getHabits().length).toBe(1); // 기존 0번 인덱스가 삭제가 되었으니 길이가 1이어야 한다
    expect(presenter.getHabits()[0].name).toBe("Running"); // 삭제 후 0번 인덱스의 name은 "Running"이다
    checkUpdateIsCalled();
  });

  it("adds habit to the list", () => {
    presenter.add("Eating", update);

    expect(presenter.getHabits()[2].name).toBe("Eating"); // 추가가 되었으니 2번 인덱스의 이름은 Eating이어야 한다
    expect(presenter.getHabits()[2].count).toBe(0); // 추가가 되었으니 2번 인덱스의 카운트는 0이어야 한다
    checkUpdateIsCalled();
  });

  it("throws an error when the max habits limit is exceeded", () => {
    presenter.add("Eating", update); // 하나 추가하고(habits가 3개가 됨)
    expect(() => {
      // 콜백으로 하나 더 던지면 어떤 반응이 throw 되는지
      presenter.add("Eating", update);
    }).toThrow(`습관의 갯수는 3 이상이 될 수 없습니다`);
  });

  describe("reset", () => {
    it("set all habit counts to 0", () => {
      presenter.reset(update);

      expect(presenter.getHabits()[0].count).toBe(0); // 리셋이 되었으니 0번 인덱스의 카운트도 0이 되어야 한다
      expect(presenter.getHabits()[1].count).toBe(0);
      checkUpdateIsCalled();
    });

    // it("does not create new object when count is 0", () => {
    //   const habits = presenter.getHabits();
    //   presenter.reset(update);
    //   const updatedHabits = presenter.getHabits(); // 새로운 오브젝트 생성

    //   expect(updatedHabits[1].toBe(habits[1]));
    //   // toEqual은 오브젝트 안에 있는 데이터 값을 비교. toBe는 오브젝트의 참조값을 검사.
    // });
  });

  // 반복적으로 나오는 코드를 함수로 만듦
  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1); // 한번 호출이 되어야 함
    expect(update).toHaveBeenCalledWith(presenter.getHabits()); // habit을 증가할 때 정확한 배열을 전달했는지
  }
});
