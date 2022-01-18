<template>
  <div class="content">
    <h1 class="move no_select" :class="{ opacity: end }">
      Сейчас ходит: {{ player }}
    </h1>
    <div class="table">
      <div class="cell br-t br-l" @click="cell(0)">
        <transition name="cell">
          <span class="char no_select" v-if="game[0] !== 0">{{ game[0] }}</span>
        </transition>
      </div>
      <div class="cell br-t" @click="cell(1)">
        <transition name="cell">
          <span class="char no_select" v-if="game[1] !== 0">{{ game[1] }}</span>
        </transition>
      </div>
      <div class="cell br-t br-r" @click="cell(2)">
        <transition name="cell">
          <span class="char no_select" v-if="game[2] !== 0">{{ game[2] }}</span>
        </transition>
      </div>
      <div class="cell br-l" @click="cell(3)">
        <transition name="cell">
          <span class="char no_select" v-if="game[3] !== 0">{{ game[3] }}</span>
        </transition>
      </div>
      <div class="cell" @click="cell(4)">
        <transition name="cell">
          <span class="char no_select" v-if="game[4] !== 0">{{ game[4] }}</span>
        </transition>
      </div>
      <div class="cell br-r" @click="cell(5)">
        <transition name="cell">
          <span class="char no_select" v-if="game[5] !== 0">{{ game[5] }}</span>
        </transition>
      </div>
      <div class="cell br-l br-b" @click="cell(6)">
        <transition name="cell">
          <span class="char no_select" v-if="game[6] !== 0">{{ game[6] }}</span>
        </transition>
      </div>
      <div class="cell br-b" @click="cell(7)">
        <transition name="cell">
          <span class="char no_select" v-if="game[7] !== 0">{{ game[7] }}</span>
        </transition>
      </div>
      <div class="cell br-r br-b" @click="cell(8)">
        <transition name="cell">
          <span class="char no_select" v-if="game[8] !== 0">{{ game[8] }}</span>
        </transition>
      </div>
    </div>
    <transition name="cell">
      <div class="status" v-if="end" @click="restart">
        <div class="container">
          <div class="win no_select" v-if="status === 'win'">
            Победил: {{ player }}
          </div>
          <div class="draw no_select" v-else-if="status === 'draw'">Ничья</div>
          <div class="info">Нажмите чтобы продолжить</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { postRequest } from "@/plugins/requests";

export default {
  data() {
    return {
      game: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      player: "x",
      status: "",
      end: false,
      move_length: 0,
      win: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
  },
  methods: {
    cell(cell) {
      if (this.game[cell] === 0) {
        this.move_length++;
        this.game[cell] = this.player;
        this.status = this.checkStatus(this.player);
        if (this.status) {
          var data = {
            move: this.move_length,
            win: this.status === "draw" ? "draw" : this.player,
          };
          postRequest("/add-game", data);
          this.end = true;
          return;
        }
        this.player = this.player == "x" ? "o" : "x";
      }
    },
    checkStatus(player) {
      for (var i = 0; i < this.win.length; i++) {
        if (
          this.game[this.win[i][0]] == player &&
          this.game[this.win[i][1]] == player &&
          this.game[this.win[i][2]] == player
        )
          return "win";
      }
      if (this.checkDraw()) return "draw";
      return "";
    },
    checkDraw() {
      for (var i = 0; i < this.game.length; i++) {
        if (this.game[i] === 0) return false;
      }
      return true;
    },
    restart() {
      this.game = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.move_length = 0;
      this.status = 0;
      this.end = false;
    },
  },
};
</script>

<style scoped>
.content {
  max-width: 300px;
  margin: 250px auto;
}

.table {
  display: inline-grid;
  grid-template-columns: auto auto auto;
}

.cell {
  border: 4px solid #0f8b7f;
  height: 100px;
  width: 100px;
  cursor: pointer;
}

.char {
  margin-left: 30px;
  font-size: 60px;
  color: #09413b;
  line-height: 80px;
}

.br-t {
  border-top: none;
}

.br-r {
  border-right: none;
}

.br-l {
  border-left: none;
}

.br-b {
  border-bottom: none;
}

.cell-enter-active,
.cell-leave-active {
  transition: opacity 0.5s ease;
}

.cell-enter-from,
.cell-leave-to {
  opacity: 0;
}

.name_win {
  text-align: center;
  margin-top: 20px;
  color: #09413b;
}

.move {
  text-align: center;
  margin-bottom: 20px;
  color: #09413b;
  text-transform: uppercase;
}

.status {
  display: flex;
  width: 300px;
  height: 300px;
  position: relative;
  bottom: 300px;
  background: #14bdac;
  text-align: center;
  cursor: pointer;
  border: 2px solid #0f8b7f;
}

.container {
  width: 100%;
  margin-top: 90px;
}

.win {
  font-size: 30px;
  text-transform: uppercase;
  color: #09413b;
}

.draw {
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 700;
  color: #09413b;
}

.info {
  margin-top: 5px;
  color: #09413b;
}

.opacity {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.no_select {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
</style>
