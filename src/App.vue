<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-container>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <router-link :to="{ name: 'Home' }" class="navbar-brand" target="_self">VueBlog</router-link>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <router-link :to="{ name: 'Home' }" tag="li" active-class="active" exact><a class="nav-link">Home</a></router-link>
            <router-link :to="{ name: 'About' }" tag="li" active-class="active" exact><a class="nav-link">About</a></router-link>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-form @submit.prevent="onSubmit">
              <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" v-model="searchTerm"/>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      searchTerm: this.$route.query.q
    }
  },
  methods: {
    onSubmit () {
      this.$router.push({ name: 'Search', query: { q: this.searchTerm } })
    }
  }
}
</script>

<style>
#app {
  margin:0 0 60px;
}

.has-overlay {
  overflow: hidden;
}

h1 {
  margin-bottom: 20px;
}

.navbar {
  margin-bottom: 30px;
}

.blog-cell {
  position: relative;
  overflow: hidden;
  display: block;
  margin-bottom: 1rem;
}

.blog-cell__caption {
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.blog-cell__img {
  width: calc(100% + 50px);
  height: auto;
  transition: opacity 0.35s, transform 0.35s;
  opacity: 0.7;
  transform: translate3d(-40px,0,0);
}

.blog-cell__title {
  transition: transform 0.35s;
}

.blog-cell__content {
  position: absolute;
  top: 0;
  right: 0;
  padding: 2em;
  width: 100%;
  height: 50%;
}

.blog-cell__user-link {
  color: white;
}

.blog-cell__user-link:hover {
  text-decoration: underline;
  color: white;
}

.blog-cell__meta {
  opacity: 0;
  transition: opacity 0.3s, transform 0.35s;
}

.blog-cell__title,
.blog-cell__meta {
  transform: translate3d(0,40px,0);
  text-shadow: 1px 1px 20px #000;
}

.blog-cell:hover .blog-cell__img,
.blog-cell:hover .blog-cell__meta {
  opacity: 0.9;
}

.blog-cell:hover .blog-cell__img,
.blog-cell:hover .blog-cell__title,
.blog-cell:hover .blog-cell__meta {
  transform: translate3d(0,0,0);
}

.blog-cell:hover .blog-cell__meta {
  transition-delay: 0.06s;
}
</style>
