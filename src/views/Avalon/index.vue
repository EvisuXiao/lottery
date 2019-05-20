<template>
  <layout title="机选彩票" :show-back="false">
    <div>
      <group>
        <x-number title="数量" :min="1" :max="10" v-model="num"></x-number>
        <x-input title="杀号(红)" text-align="right" v-model="ignoreRed"></x-input>
        <x-input title="杀号(蓝)" text-align="right" v-model="ignoreBlue"></x-input>
      </group>
      <group>
        <x-button style="border-radius: 99px;" type="primary" @click.native="submit">{{ first ? '生成' : '换一批' }}</x-button>
      </group>
      <group v-if="result.length">
        <card :header="{ title: '机选结果' }">
          <div slot="content">
            <div class="num-padding" v-for="(item, key) in result" :key="key">
              <span class="num-padding" style="color: red;">{{ item.red.join(',') }}</span><span class="num-padding">+</span><span class="num-padding" style="color: blue;">{{ item.blue[0] }}</span>
            </div>
          </div>
        </card>
      </group>
    </div>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {
    Cell,
    Card,
    Group,
    XButton,
    XNumber,
    XInput
  } from 'vux'
  import { random } from '../../utils'

  export default {
    components: {
      Layout,
      Card,
      Cell,
      Group,
      XButton,
      XNumber,
      XInput
    },
    data () {
      return {
        num: 1,
        ignoreRed: '',
        ignoreBlue: '',
        redPool: [],
        bluePool: [],
        result: [],
        first: true
      }
    },
    created () {
      this.reset()
    },
    methods: {
      reset () {
        let red = [];
        let blue = [];
        const ignoreRed = this.ignoreRed.split(',');
        const ignoreBlue = this.ignoreBlue.split(',');
        for (let i = 1; i <= 33; i++) {
          if (ignoreRed.indexOf(i.toString()) === -1) {
            red.push(i)
          }
        }
        for (let i = 1; i <= 16; i++) {
          if (ignoreBlue.indexOf(i.toString()) === -1) {
            blue.push(i)
          }
        }
        this.redPool = red;
        this.bluePool = blue;
      },
      submit () {
        this.result = [];
        for (let i = 0; i < this.num; i++) {
          this.reset();
          let each = {
            red: [],
            blue: []
          };
          while (each.red.length < 6) {
            each.red.push(this.redPool.splice(random(0, this.redPool.length - 1), 1)[0]);
          }
          each.red = each.red.sort(function (a, b) {
            return a - b
          });
          each.blue.push(this.bluePool.splice(random(0, this.bluePool.length - 1), 1)[0]);
          this.result.push(each)
        }
        this.first = false
      }
    }
  }
</script>

<style>
  .num-padding {
    padding: 10px 10px 10px 10px;
    font-size: 20px;
  }
</style>
