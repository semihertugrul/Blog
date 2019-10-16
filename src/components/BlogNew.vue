<template>
  <b-modal id="blogNew" ref="blogNew" title="Add new Entry" ok-title="Save" @ok="handleOk" :ok-disabled="okDisabled">
    <form @submit.stop.prevent="handleSubmit">
      <b-form-group
          label="Title">
        <b-form-input v-model.trim="entry.title" type="text" placeholder="Enter Title" :state="isValid(entry.title)"></b-form-input>
        <div class="invalid-feedback">Please provide a title</div>
      </b-form-group>
      <b-form-group
          label="URL">
        <b-form-input v-model.trim="entry.img" type="text" placeholder="Enter Image URL" :state="isValid(entry.img)"></b-form-input>
        <div class="invalid-feedback">Please provide an image URL</div>
      </b-form-group>
      <b-form-group
          label="Author">
        <b-form-input v-model.trim="entry.author" type="text" placeholder="Enter Author" :state="isValid(entry.author)"></b-form-input>
        <div class="invalid-feedback">Please provide an author</div>
      </b-form-group>
      <b-form-group
          label="Text">
        <b-form-textarea id="textarea" v-model="entry.text" placeholder="Enter Text" :state="isValid(entry.text)" :rows="5">
        </b-form-textarea>
        <div class="invalid-feedback">Please provide a text</div>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
import toastr from 'toastr'

export default {
  data () {
    return {
      entry: {
        title: '',
        img: '',
        author: '',
        text: ''
      }
    }
  },
  computed: {
    okDisabled () {
      return !this.isValid(this.entry.title) ||
              !this.isValid(this.entry.img) ||
                !this.isValid(this.entry.author) ||
                  !this.isValid(this.entry.text)
    }
  },
  methods: {
    isValid (txt) {
      return txt !== ''
    },
    handleOk (e) {
      e.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      this.entry.date = this.getTodayDateStr()
      this.$store.dispatch('addEntry', { entry: this.entry })
        .then(() => {
          this.resetForm()
          toastr.success('Entry added successfully!')
          this.$refs.blogNew.hide()
        })
        .catch((error) => {
          toastr.error(`Error: ${error}`)
          this.$refs.blogNew.hide()
        })
    },
    getTodayDateStr () {
      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth() + 1
      let yyyy = today.getFullYear()
      if (dd < 10) dd = `0${dd}`
      if (mm < 10) mm = `0${mm}`
      return `${dd}-${mm}-${yyyy}`
    },
    resetForm () {
      this.entry = {
        title: '',
        img: '',
        author: '',
        text: ''
      }
    }
  }
}
</script>

<style>
  fieldset {
    margin-bottom: 20px;
  }
</style>
