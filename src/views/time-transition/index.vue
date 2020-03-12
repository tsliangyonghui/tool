<template>
  <div class="timetransition-box">
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{timeText}}</span>
      </div>
      <div class="row">
        <el-button plain @click="curTime"><span class="bt-text">当前时间</span></el-button>
        <div class="space"></div>
        <el-input v-model="timeStr"></el-input>
        <div class="space"></div>
        <el-button type="primary" @click="transTime"><span class="bt-text">转换为时间戳</span></el-button>
        <div class="space"></div>
        <el-input v-model="timeCode" @focus="onSelected"></el-input>
      </div>
      <div class="space"></div>
      <div class="row">
        <el-button plain @click="curTimeCode"><span class="bt-text">当前时间戳</span></el-button>
        <div class="space"></div>
        <el-input v-model="timeCode2"></el-input>
        <div class="space"></div>
        <el-button type="primary" @click="transTimeCode"><span class="bt-text">转换为时间</span></el-button>
        <div class="space"></div>
        <el-input v-model="timeStr2" @focus="onSelected"></el-input>
      </div>
    </el-card>
  </div>
</template>

<script>
import Lunar from './lunar.js'
import { parseTime, strtotime } from '@/utils'
export default {
  name: 'timeTransition',
  data () {
    return {
      timeText: '',
      timeStr: '',
      timeCode: '',
      timeStr2: '',
      timeCode2: '',
    }
  },
  mounted () {
    this.timeText = Lunar()
    this.curTime()
    this.curTimeCode()
  },
  methods: {
    curTime () {
      this.timeStr = parseTime(new Date())
    },
    curTimeCode () {
      this.timeCode2 = Date.parse(new Date()) / 1000
    },
    transTime () {
      if (this.timeStr) {
        this.timeCode = strtotime(this.timeStr)
      }
    },
    transTimeCode () {
      if (this.timeCode2) {
        this.timeStr2 = parseTime(this.timeCode2)
      }
    },
    onSelected ($event) {
      $event.target.select()
    }
  }
}
</script>

<style lang="scss" scoped>
.timetransition-box {
  width: 800px;
  .space {
    width: 20px;
    height: 20px;
  }
  .bt-text {
    display: inline-block;
    width: 85px;
  }
  .row {
    display: flex;
  }
}
</style>
