export class MaxNumbersOfCheckInsError extends Error {
  constructor() {
    super("Diary check-ins limit reached");
  }
}
