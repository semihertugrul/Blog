<template>
  <div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <b-container class="blog-list">
      <b-row>
        <b-col cols="12" >
          <h1>Home</h1>
          <b-btn variant="primary" v-b-modal.blogNew class="add-new-entry">Add new Entry</b-btn>
        </b-col>
        <b-col cols="12" sm="6" md="4" v-for="(item, index) in entries" :key="item.id">
          <router-link :to="{ name: 'BlogDetail', params: { index: index.toString() } }" class="blog-cell">
            <figure>
              <img :src="item.img" :alt="item.imgAlt" class="blog-cell__img">
              <figcaption class="blog-cell__caption">
                <div class="blog-cell__content">
                  <h2 class="blog-cell__title">{{item.title}}</h2>
                  <div class="blog-cell__meta">by {{item.author}}</div>
                </div>
              </figcaption>
            </figure>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
    <blog-new></blog-new>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BlogNew from './BlogNew'

export default {
  components: {
    BlogNew
  },
  computed: {
    ...mapState(['entries'])
  },
  created () {
    this.$store.dispatch('fetchEntries')
  }
}
</script>

<style>
  .slide-enter,
  .slide-leave-to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  .slide-enter-to,
  .slide-leave {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .slide-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-leave-active {
    transition: all 0.2s ease-in;
  }

  .add-new-entry {
    margin-bottom: 20px;
  }
</style>
