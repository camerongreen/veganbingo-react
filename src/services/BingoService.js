export default class BingoService {
  // Should we check the score?
  checkScoreState = false;

  setScoreCheck(check) {
    this.checkScoreState = check;
  }

  checkScore() {
    if (this.checkScoreState) {
      console.log('checking');
    } else {
      console.log('nuttin');
    }
  }


}
