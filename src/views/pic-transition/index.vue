<template>
  <div class="timetransition-box">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div class="pic">
            <input v-show="!src" type="file" ref="pic" accept="image/png,image/gif,image/jpeg" />
            <img style="max-width:100%;" v-show="src" :src="src">
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <textarea ref="text" v-model="textSrc" class="text" rows="25"></textarea>
        </el-card>
      </el-col>
    </el-row>
    <div class="btns">
      <el-button type="primary" @click="onClear">清 空</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'picTransition',
  data() {
    return {
      src: '',
      textSrc: ''
    }
  },
  mounted() {
    var self = this
    this.$refs.pic.onchange = function () {
      var f = this.files[0]
      var reader = new FileReader();
      reader.readAsDataURL(f)
      reader.onload = function (e) {
        self.src = reader.result
        self.textSrc = reader.result
      }
    }
    this.$refs.text.onchange = function () {
      self.src = self.textSrc
    }
  },
  methods: {
    onClear() {
      this.src = ''
      this.textSrc = ''
      this.$refs.pic.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  width: 100%;
}
.pic {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 460px;
}
.btns {
  text-align: center;
  margin: 20px;
}
</style>
