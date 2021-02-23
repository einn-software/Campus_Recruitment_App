export class QuizConfig {
  allowBack: boolean;
  autoMove: boolean;  // if boolean; it will move to next question automatically when answered.
  duration: number;  // indicates the time in which quiz needs to be completed. 0 means unlimited.


  constructor(data: any) {
      data = data || {};
      this.allowBack = data.allowBack;
      this.autoMove = data.autoMove;
      this.duration = data.duration;
  }
}
