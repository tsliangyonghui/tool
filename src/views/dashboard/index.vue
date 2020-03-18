<template>
  <div class="note-table">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="content" label="内容" header-align="center">
      </el-table-column>
      <el-table-column prop="time" label="时间" width="150" align="center">
      </el-table-column>
      <el-table-column prop="operation" label="新增" width="180" align="center">
        <template slot="header">
          <el-button size="mini" @click="onCreate" type="primary">新增</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="onDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="笔记内容" :visible.sync="showContent" :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item label="内容" label-width="60px">
          <el-input v-model="form.content" autocomplete="off" type="textarea" :autosize="{ minRows: 5}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showContent = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatTime, cache } from '@/utils'
export default {
  data() {
    return {
      tableData: null,
      showContent: false,
      form: {},
      edit: null
    }
  },
  created() {
    this.tableData = this.getNoteBook()
  },
  methods: {
    getNoteBook() {
      var arr = []
      var noteStr = localStorage.getItem("notebook")
      if (noteStr) {
        arr = JSON.parse(noteStr)
      }
      arr.map((res) => {
        res.time = formatTime(res.timeCode)
        return res
      })
      return arr
    },
    setNoteBook(data) {
      localStorage.setItem("notebook", JSON.stringify(data))
    },
    onEdit(data) {
      this.edit = data
      this.form = { ...data }
      this.showContent = true
    },
    onDelete(data) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.some((res, index) => {
          if (res.timeCode === data.timeCode) {
            this.tableData.splice(index, 1)
            return true
          }
        })
        this.setNoteBook(this.tableData)
      })
    },
    onCreate() {
      this.form = {}
      this.edit = null
      this.showContent = true
    },
    onSave() {
      if (this.form.content) {
        var arr = this.getNoteBook()
        if (this.edit) {
          arr.some((res, index) => {
            if (res.timeCode === this.edit.timeCode) {
              arr.splice(index, 1)
              return true
            }
          })
        }
        var timeCode = new Date().getTime()
        arr.push({
          content: this.form.content,
          time: formatTime(timeCode),
          timeCode: timeCode
        })
        arr.sort((a, b) => {
          return b.timeCode - a.timeCode
        })

        this.tableData = arr
        this.setNoteBook(arr)
      }
      this.showContent = false
    }
  }
}
</script>

<style lang="scss" scoped>
.note-table {
  /deep/ .el-table__row td:first-child .cell {
    height: 20px;
  }
}
</style>
