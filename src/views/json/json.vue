<template>
  <div class="container">
    <el-card class="box-card">
      <textarea class="input-json" rows="6" v-model="jsonStr"></textarea>
      <div class="operation">
        <el-button type="primary" size="small" @click="onFormate">格式化</el-button>
        <el-button type="success" size="small" @click="onFlatten">flatten</el-button>
        <el-button type="danger" size="small" @click="onClear" class="space">清空</el-button>
        <el-switch v-model="switchValue" active-text="引号" @change="onChange">
        </el-switch>
        <el-switch v-model="switchValue2" active-text="显示控制" @change="onChange">
        </el-switch>
      </div>
      <div ref="json"></div>
    </el-card>
  </div>
</template>

<script>
import JsonFormater from './json-formater.js'
export default {
  name: 'json',
  data () {
    return {
      jsonStr: '',
      json: null,
      switchValue: true,
      switchValue2: true
    }
  },
  mounted () {
    this.formate()
  },
  methods: {
    formate () {
      var options = {
        dom: this.$refs.json,
        quoteKeys: this.switchValue,
        isCollapsible: this.switchValue2
      }
      this.json = new JsonFormater(options)
    },
    onFormate () {
      if (this.jsonStr) {
        this.json.doFormat(this.jsonStr)
      }
    },
    onClear () {
      this.jsonStr = ''
      this.$refs.json.innerHTML = ''
    },
    onChange (val) {
      this.formate()
      this.onFormate()
    },
    onFlatten () {
      this.$refs.json.innerText = this.$refs.json.innerText.replace(/[\r\n]/gm, '')
    }
  }
}
</script>
<style lang="scss" scope>
.space {
  margin-right: 10px;
}
</style>
