<template>
  <nav
    class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 "
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
      <div class="flex flex-row">
        <div class="text-white">
        <i class="fas fa-hiking"></i>
      </div>
        <router-link :to="{name: 'Home'}">
        <a
          class="text-xl font-bold lg:hover:text-gray-900 leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          href=""
          >Nanjak Yuk</a>
        </router-link>
      </div>
      
        <button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()"
        >
          <i class="text-white fas fa-bars"></i>
        </button>
      </div>
      <div
        class="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none"
        v-bind:class="{'hidden': !showMenu, 'block': showMenu}"
      >
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li class="flex items-center">
              <router-link :to="{name: 'AllTrip'}">
                  
            <div
              class="lg:text-white lg:hover:text-gray-900 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              ><span class="inline-block ml-2">Trip Open</span>
              </div>
              </router-link>
          </li>
          <li class="flex items-center">
              <router-link v-if="isLogin" :to="{name: 'AddTrip'}">
                  
            <div
              class="lg:text-white lg:hover:text-gray-900 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              ><span class="inline-block ml-2">Create Trip</span>
              </div>
              </router-link>
          </li>
          <li class="flex items-center">

              <router-link v-if="isLogin" :to="{name: 'MyTrip'}">
            <div
              class="lg:text-white lg:hover:text-gray-900 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="#pablo"
              ><span class="inline-block ml-2">My Trip</span></div
            >
              </router-link>
          </li>
          <li class="flex items-center">
            <g-signin-button
            v-if="!isLogin"
            :params="googleSignInParams"
            @success="onSignInSuccess"
          >
          <i class="fab fa-google"></i>
            <b class="ml-3">Sign in</b>
          </g-signin-button>
          <button
            v-else
            @click.prevent="logout"
            class="bg-blue-300 text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
            type="button"
            style="transition: all 0.15s ease 0s;"
        >
            Logout
        </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      showMenu: false,
      googleSignInParams: {
        client_id:
          "947558502250-r1daidmh7omd98rr5hdvab82gl8rdtcq.apps.googleusercontent.com",
      },
    }
  },
  computed: {
    isLogin: function(){
      return this.$store.state.isLogin
    }
  },
  methods: {
    toggleNavbar: function(){
      this.showMenu = !this.showMenu;
    },
    onSignInSuccess(googleUser) {
      this.$isLoading(true)
      const idToken = googleUser.getAuthResponse().id_token;
      this.$store.dispatch('googleLogin', idToken)
        .then((response) => {
          this.$isLoading(false)
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("userId", response.data.id);
          localStorage.setItem("name", response.data.name);
          this.$store.commit("SET_ISLOGIN", true);
          this.$toasted.success("Login successfully", {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
        })
        .catch((err) => {
          this.$isLoading(false)
          this.$toasted.error(err.response.data, {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
        });
    },
    logout: function(){
          if(window.gapi.auth2.getAuthInstance()){
              window.gapi.auth2.getAuthInstance().disconnect()
          }
          localStorage.clear()
          this.$store.commit('SET_ISLOGIN', false)
          this.$toasted.success("Logout successfully", {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
          this.$router.push({name: 'Home'})
      }
  }
}
</script>

<style>
.g-signin-button {
  margin-top: -5px;
  display: inline-block;
  padding: 2px 4px;
  border-radius: 5px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  text-align: center;
  height: 20px;
  cursor: pointer;
  font-size: 13px;
}
</style>