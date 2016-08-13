import {Component, OnInit, OnDestroy} from '@angular/core';
import {ConnectFourAiPlayerWebWorker} from "./ai-player/connect-four-ai-player-web-worker";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  WORKER_FACTORY: any;
  robotPlayers: ConnectFourAiPlayerWebWorker[] = [];

  ngOnInit() {
    this.WORKER_FACTORY = require('worker!./ai-player/connect-four-ai-player-web-worker');
    this.robotPlayers[1] = new ConnectFourAiPlayerWebWorker(1, this.WORKER_FACTORY(), this.performMove);


    setTimeout(() => {
      this.robotPlayers[1].takeTurn();
    }, 2000);

  }

  ngOnDestroy() {
    this.robotPlayers.forEach(item => item.terminate());
  }

  performMove(player: ConnectFourAiPlayerWebWorker, col: number) {
    console.log('performMove: Player ' + player.myNumber + ' wants to play at ', col);
  }

}
