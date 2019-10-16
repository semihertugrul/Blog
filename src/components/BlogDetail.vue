<template>
  <div class="blog-detail">
    <b-container>
      <b-row>
        <b-col>
          <b-link class="blog-detail__back-link" @click="goBack">Back</b-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="5">
          <img class="blog-detail__img " :src="entry.img" :alt="entry.imgAlt">
        </b-col>
        <b-col cols="12" md="7">
          <div class="blog-detail__content">
            <h1 v-if="!editMode">{{entry.title}}</h1>
            <b-form-input v-else v-model="entry.title" type="text" placeholder="Enter Title" class="input-text"></b-form-input>
            <p class="blog-detail__subtitle">by {{entry.author}} - <time>{{entry.date}}</time></p>
            <p class="blog-detail__text" v-if="!editMode">
              {{entry.text}}
            </p>
            <b-form-textarea v-else v-model="entry.text" class="input-textarea"  id="input-textarea" placeholder="Enter Text"></b-form-textarea>
            <b-link href="" role="button" v-if="!editMode" variant="link" @click="onClick">Edit</b-link>
            <b-link href="" role="button" v-if="!editMode" variant="link" @click="onDelete">Delete</b-link>
            <div v-else>
              <b-button variant="primary" @click="onSave">Save</b-button>
              <b-button variant="link" @click="onCancel">Cancel</b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import db from '../firebase'
import toastr from 'toastr'

export default {
  props: {
    index: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      entry: {},
      editMode: false
    }
  },
  methods: {
    fetchEntry () {
      db.ref(`entries/${this.index}`).on('value', snap => {
        this.entry = snap.val()
      })
    },
    onClick (event) {
      this.editMode = true
    },
    onSave (event) {
      // degisiklikleri firebase'e kaydet
      db.ref(`entries/${this.index}`).set(
        this.entry,
        error => {
          if (error) {
            console.error(error)
            toastr.error('Error happened!')
          } else {
            this.editMode = false
            toastr.success('Entry saved successfully!')
          }
        }
      )
    },
    onDelete (event) {
      // makaleyi sil
      this.$store.dispatch('deleteEntry', { index: this.entry.index })
        .then(() => {
          toastr.success('Entry deleted successfully!')
        })
        .catch((error) => {
          toastr.error(`Error: ${error}`)
        })
      this.$router.push({ name: 'Home' })
    },
    onCancel (event) {
      this.editMode = false
    },
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push({ name: 'Home' })
    }
  },
  watch: {
    '$route' (to, from) {
      this.index = to.params.index
      this.fetchEntry()
    }
  },
  created () {
    this.fetchEntry()
    document.body.parentNode.classList.add('has-overlay')
  },
  destroyed () {
    document.body.parentNode.classList.remove('has-overlay')
  }
}
</script>

<style>
  .blog-detail {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    overflow-y: auto;
    background-color: white;
    padding: 120px 0;
    z-index: 1;
  }

  .blog-detail__back-link {
    margin-bottom: 20px;
    display: inline-block;
    font-size: 18px;
  }

  .blog-detail__img {
    display: block;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  .blog-detail__content > h2 {
    margin-top: 0;
  }

  .blog-detail__subtitle {
    color: #aaa;
  }

  input.input-text,
  input.input-text:focus {
    font-size: 2.5rem;
    padding: 5px 10px;
    line-height: 1;
    width: 100%;
    height: auto;
    display: block;
    font-weight: 500;
    margin-bottom: 20px;
    color: #212529;
  }

  textarea.input-textarea,
  textarea.input-textarea:focus {
    display: block;
    width: 100%;
    height: 18rem;
    margin-bottom: 20px;
    padding: 5px 10px;
    color: #212529;
  }

</style>
