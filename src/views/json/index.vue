<template>
  <div class="json-box">
    <json />
    <json />
  </div>
</template>

<script>
import Json from './json.vue'
export default {
  name: 'jsonFormater',
  components: { Json },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.json-box {
  display: flex;
  justify-content: space-around;
  .container {
    font-size: 13px;
    width: 48%;
    .input-json {
      width: 100%;
      padding: 6px 12px;
      font-size: 14px;
      color: #555;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .operation {
      margin: 8px 0px 10px 0px;
    }
  }
  pre.jf-CodeContainer {
    margin-top: 0;
    margin-bottom: 0;
    text-align: left;
  }
  pre {
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  img {
    position: relative;
    left: 3px;
    top: 1px;
  }
  .jf-ObjectBrace {
    color: #00aa00;
    font-weight: bold;
  }
  .jf-ArrayBrace {
    color: #0033ff;
    font-weight: bold;
  }
  .jf-PropertyName {
    color: #cc0000;
    font-weight: bold;
  }
  .jf-String {
    color: #007777;
  }
  .jf-Number {
    color: #aa00aa;
  }
  .jf-Boolean {
    color: #0000ff;
  }
  .jf-Null {
    color: #0000ff;
  }
  .jf-Comma {
    color: #000000;
  }
}
</style>
