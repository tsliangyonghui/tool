<template>
  <div class="qrcode-box">
    <el-card>
      <div slot="header" class="clearfix">
        <span>文本生成二维码</span>
        <el-button style="float: right; padding: 3px 5px" @click="onCreate" type="primary">生成</el-button>
      </div>
      <textarea class="input-json" rows="6" v-model="text"></textarea>
      <div class="qrcode-container" v-show="show">
        <div id="qrcode"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import QRCode from './qrcode-factory.js'
export default {
  name: 'qrcode',
  data() {
    return {
      text: '',
      show: false,
      qrcode: null
    }
  },
  mounted() {
    this.qrcode = new QRCode(document.getElementById('qrcode'), {
      text: "",
      width: 300,
      height: 300,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  },
  methods: {
    onCreate() {
      if (this.text) {
        this.show = true
        this.qrcode.clear()
        this.qrcode.makeCode(this.text)
      } else {
        this.show = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.qrcode-box {
  width: 800px;
  .input-json {
    width: 100%;
    padding: 6px 12px;
    font-size: 14px;
    color: #555;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .qrcode-container {
    width: 100%;
    padding: 10px;
    margin: 10px 0 0 0;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    justify-content: center;
  }
  #qrcode {
    background: #fff;
    padding: 10px;
  }
}
</style>
