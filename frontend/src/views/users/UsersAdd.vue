<template>
  <el-dialog
    title="用户添加" :visible.sync="dialogFormVisible">
    <el-form ref="user-add-form" :model="form" label-width="80px">
      <el-form-item label="username" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {addUser} from '@/api/users-admin'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: 'please input username', trigger: blur}
        ],
        password: [
          {required: true, message: 'password must contain 3-6 characters', trigger: blur}
        ]
      },
      dialogFormVisible: this.visible
    }
  },
  watch: {
    visible(newValue) {
      this.dialogFormVisible = newValue
    }
  },
  methods: {
    handleClose() {
      this.dialogFormVisible = false
      this.$emit('update:visible', false)
    },

    async handleSubmit() {
      this.$refs['user-add-form'].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.$emit('update:visible', false)
          addUser(this.form).then(result => {
            if (result.data.ret) {
              this.$message({
                message: 'added successfully',
                type: 'success'
              })
              this.$parent._loadData()
              this.form.username = ''
              this.form.password = ''
            } else {
              this.$message.error(result.data.data.message)
            }
          })
        }else{
          this.dialogFormVisible = false
          this.$emit('update:visible', false)
          return false
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>

</style>
