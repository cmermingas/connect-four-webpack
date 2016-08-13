import {ConnectFourAiPlayer} from "./connect-four-ai-player";
import {EventEmitter} from "@angular/core";

export type PerformMove = (ConnectFourAiPlayerWebWorker, number) => void;

export class ConnectFourAiPlayerWebWorker {
  constructor(public myNumber: number, public worker: Worker, public performMove: PerformMove) {
    worker.onmessage = (event: MessageEvent) => this.turnTaken(event);
  }

  takeTurn() {
    this.worker.postMessage('TAKE_TURN');
  }

  turnTaken(event: MessageEvent) {
    this.performMove(this, event.data);
  }

  terminate() {
    // Stop the AI if allowed to think while it's the other player's turn
    this.worker.terminate();
  }
}

const _player = new ConnectFourAiPlayer();

onmessage = (event: MessageEvent): any => {
  let result = _player.play(null);
  postMessage(result, undefined);
};
