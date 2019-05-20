<template>
  <layout title="发牌" :show-back="false">
    <tab slot="header">
      <tab-item selected @on-item-click="tabClick(0)" >发牌区</tab-item>
      <!--<tab-item @on-item-click="tabClick(1)" >玩家区</tab-item>-->
      <tab-item @on-item-click="tabClick(2)" >工具区</tab-item>
    </tab>
    <div>
      <div v-if="tabIdx === 0">
        <group>
          <x-number title="玩家数量" :min="1" :max="10" v-model="userNum"></x-number>
          <x-input title="当前玩家" text-align="right" v-model="curUser"></x-input>
        </group>
        <group>
          <card>
            <div slot="content">
              <flexbox>
                <flexbox-item><div class="card-padding" @click="send"><img alt="" :src="poolImg"></div></flexbox-item>
                <flexbox-item><div class="card-padding"><img alt="" :src="curImg"></div></flexbox-item>
              </flexbox>
            </div>
          </card>
          <x-button style="border-radius: 99px;" type="primary" @click.native="reset">洗牌</x-button>
        </group>
      </div>
      <div v-if="tabIdx === 2">
        <group title="猜数">
          <cell title="当前数" :inline-desc="guessNum" primary="content">
            <range :min="1" :max="99" v-model="guessNum"></range>
          </cell>
          <x-button style="border-radius: 99px;" type="primary" @click.native="randNum">随机</x-button>
        </group>
        <group title="扔骰子">
          <x-number title="数量" :min="1" :max="10" v-model="tzNum"></x-number>
          <x-button style="border-radius: 99px;" type="primary" @click.native="randTz">扔一下</x-button>
          <card>
            <div slot="content">
              <flexbox>
                <flexbox-item v-for="(value, key) in tz" :key="key"><div class="card-padding"><img alt="" :src="tzImg(value)"></div></flexbox-item>
              </flexbox>
            </div>
          </card>
        </group>
        <group title="剩余">
          <ul>
            <li v-for="(value, key) in rest" :key="key">剩余{{ key }}张: {{ value.join(',') }}</li>
            <li>小王: {{ pool.indexOf('BJoker') > -1 ? '有' : '无' }}</li>
            <li>大王: {{ pool.indexOf('RJoker') > -1 ? '有' : '无' }}</li>
          </ul>
        </group>
      </div>
    </div>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {
    Card,
    Cell,
    Group,
    Range,
    Tab,
    TabItem,
    XButton,
    XNumber,
    XInput
  } from 'vux'
  import { random } from '../../utils'
  import Back from '../../assets/card/back.jpg'
  import Blank from '../../assets/card/blank.png'

  export default {
    components: {
      Layout,
      Card,
      Cell,
      Group,
      Range,
      Tab,
      TabItem,
      XButton,
      XNumber,
      XInput
    },
    data () {
      return {
        tabIdx: 0,
        pool: [],
        cur: '',
        sp: [],
        userNum: 5,
        curUser: 1,
        userHold: {},
        guessNum: 1,
        tzNum: 1,
        tz: []
      }
    },
    computed: {
      poolImg: function () {
        return this.pool.length ? Back : Blank
      },
      curImg: function () {
        return this.cur ? require('../../assets/card/' + this.cur + '.jpg') : Blank
      },
      rest: function () {
        let rest = {};
        const num = [
          '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
        ];
        const type = [
          'B', 'R', 'P', 'S'
        ];
        for (let i in num) {
          let cnt = 0;
          for (let j in type) {
            if (this.pool.indexOf(type[j] + num[i]) > -1) {
              cnt++
            }
          }
          if (rest[cnt] === undefined) {
            rest[cnt] = []
          }
          rest[cnt].push(num[i])
        }
        return rest
      }
    },
    created () {
      this.reset()
    },
    methods: {
      reset () {
        let pool = [];
        const num = [
          '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
        ];
        const type = [
          'B', 'R', 'P', 'S'
        ];
        const other = [
          'BJoker', 'RJoker'
        ];
        for (let i in type) {
          for (let j in num) {
            pool.push(type[i] + num[j])
          }
        }
        pool = pool.concat(other);
        this.pool = pool;
        this.cur = '';
        this.curUser = 1;
        this.userHold = {}
      },
      send () {
        this.cur = this.pool.splice(random(0, this.pool.length - 1), 1)[0];
        this.curUser = this.curUser % this.userNum + 1
      },
      randNum () {
        this.guessNum = random(1, 99)
      },
      randTz () {
        let tz = [];
        for (let i = 1; i <= this.tzNum; i++) {
          tz.push(random(1, 6))
        }
        this.tz = tz
      },
      tzImg (num) {
        return require('../../assets/card/tz' + num + '.png')
      },
      tabClick (idx) {
        this.tabIdx = idx
      }
    }
  }
</script>

<style>
  .card-padding {
    padding: 10px 10px 10px 10px;
    font-size: 20px;
    text-align: center;
  }
</style>
