export class ConnectFourAiPlayer {
  constructor() {}

  play(gameState: any) {
    return Math.floor(Math.random() * 15);
  }
}
