export default class HabitPresenter {
  // 초기화 하고 싶은 초기값을 전달
  // (외부로 부터 받아오는 데이터. 외부로 부터 받아오면 재사용성도 높고, 설정해서 쓸 수 있으니까 간편하고 테스트성도 올릴 수 있다.)
  constructor(habits, maxHabits) {
    this.habits = habits;
    this.maxHabits = maxHabits;
  }

  // 외부에서 habit에 접근할 수 있도록 하는 함수
  getHabits() {
    return this.habits;
  }

  increment(habit, update) {
    // 기존 habit을 map을 돌고 저장
    this.habits = this.habits.map((item) => {
      // 만약 item의 id가 업데이트해야 되는 habit의 id와 동일하다면
      if (item.id === habit.id) {
        return { ...habit, count: habit.count + 1 };
      }
      return item; // id가 같지 않다면 기존에 받은 item을 리턴
    });
    update(this.habits); // 증가 된 habit을 update 함수로 콜백
  }

  decrement(habit, update) {
    this.habits = this.habits.map((item) => {
      if (item.id === habit.id) {
        const count = item.count - 1; // 전달된 habit의 count를 감소하는게 아니라, item의 count를 감소해야 한다.
        return { ...habit, count: count < 0 ? 0 : count };
      }
      return item;
    });
    update(this.habits);
  }

  delete(habit, update) {
    this.habits = this.habits.filter((item) => item.id !== habit.id);
    update(this.habits);
  }

  add(name, update) {
    // 최대 habit 갯수 제한 하는 로직
    if (this.habits.length === this.maxHabits) {
      throw new Error(`습관의 갯수는 ${this.maxHabits} 이상이 될 수 없습니다`);
    }
    this.habits = [...this.habits, { id: Date.now(), name, count: 0 }];
    update(this.habits);
  }

  reset(update) {
    this.habits = this.habits.map((habit) => {
      // 이미 0인 값은 굳이 새로운 오브젝트를 만들지 않도록
      if (habit.count !== 0) {
        return { ...habit, count: 0 };
      }
      return habit;
    });
    update(this.habits);
  }
}
