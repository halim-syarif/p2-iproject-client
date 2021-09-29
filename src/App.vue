<template>
  <div id="app" class="flex flex-col justify-between min-h-screen">
    <div>
      <navbar-component></navbar-component>
    </div>
    <div>
      <router-view/>
    </div>
    <div class="bottom-0">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "./components/Navbar.vue"
import Footer from './components/Footer.vue'

export default {
  name: "App",
  components: {
    NavbarComponent,
    Footer
  },
  created: function(){
    // this.$store.dispatch('getEmbedMap')
    if (localStorage.getItem('access_token')){
      this.$store.commit('SET_ISLOGIN', true)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Varela Round', 'Josefin Sans', sans-serif;
}
</style>
