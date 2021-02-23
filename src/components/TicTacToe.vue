<template>
  <div id="app">
    <div class="border">
      <div class="header">TIC TAC TOE</div>
      <div>
        <div class="div-property div1">
          X<span class="marks">{{ xScore }}</span>
        </div>
        <div class="div-property div2">
          O<span class="marks">{{ oScore }}</span>
        </div>
      </div>
      <br /><br />
      <div class="display-card">{{ displayCard }}</div>
      <div class="box">
        <br />
        <table class="table-property" :key="componentKey">
          <tr class="row-border-bottom">
            <td
              id="00"
              :class="`column-border-right ${
                value[0] == 'X' ? 'darkslategrey' : 'white'
              }`"
              @click="play(0, 0, 0)"
            >
              {{ value[0] }}
            </td>
            <td
              id="01"
              :class="`column-border-right ${
                value[1] == 'X' ? 'darkslategrey' : 'white'
              }`"
              @click="play(0, 1, 1)"
            >
              {{ value[1] }}
            </td>
            <td
              id="02"
              :class="`${value[2] == 'X' ? 'darkslategrey' : 'white'}`"
              @click="play(0, 2, 2)"
            >
              {{ value[2] }}
            </td>
          </tr>
          <tr class="row-border-bottom">
            <td
              id="10"
              :class="`column-border-right ${
                value[3] == 'X' ? 'darkslategrey' : 'white'
              }`"
              @click="play(1, 0, 3)"
            >
              {{ value[3] }}
            </td>
            <td
              id="11"
              :class="`column-border-right ${
                value[4] == 'X' ? 'darkslategrey' : 'white'
              }`"
              @click="play(1, 1, 4)"
            >
              {{ value[4] }}
            </td>
            <td
              id="12"
              :class="`${value[5] == 'X' ? 'darkslategrey' : 'white'}`"
              @click="play(1, 2, 5)"
            >
              {{ value[5] }}
            </td>
          </tr>
          <tr>
            <td
              id="20"
              :class="`column-border-right ${
                value[6] == 'X' ? 'darkslategrey' : 'white'
              }`"
              @click="play(2, 0, 6)"
            >
              {{ value[6] }}
            </td>
            <td
              id="21"
              :class="`column-border-right ${
                value[7] == 'X' ? 'darkslategrey' : 'white'
              }`"
              @click="play(2, 1, 7)"
            >
              {{ value[7] }}
            </td>
            <td
              id="22"
              :class="`${value[8] == 'X' ? 'darkslategrey' : 'white'}`"
              @click="play(2, 2, 8)"
            >
              {{ value[8] }}
            </td>
          </tr>
        </table>
      </div>
      <div @click="restart()" class="restart">RESTART GAME</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Utils } from "../Utils";

@Component({})
export default class TicTacToe extends Utils {
  selectedOption: String = "Easy";
  value: String[] = ["", "", "", "", "", "", "", "", ""];
  state: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  gameOver: boolean = false;
  componentKey: string = "";

  async mounted() {
    this.restart();
  }

  refreshKey() {
    return `key-${new Date().getUTCMilliseconds()}`;
  }

  async restart() {
    this.componentKey = this.refreshKey();
    this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.value = ["", "", "", "", "", "", "", "", ""];
    this.gameOver = false;
    this.displayCard = "Start game";
    Utils.clearState();
  }

  async play(x: number, y: number, pos: number) {
    if (!this.gameOver) {
      if (Utils.gameOver(this.state)) {
        this.gameOver = true;
        return;
      }
    } else return;

    this.displayCard = "O turn";
    if (this.state[x * 3 + y] == 0) {
      await this.value.splice(pos, 1, "X");
      await this.state.splice(x * 3 + y, 1, -1);
      await setTimeout(() => {
        this.start(this.state, this.value);
        this.displayCard = "X turn";
      }, 350);
    }
  }
}
</script>

<style>
  @import '../assets/css/common.css';
</style>
