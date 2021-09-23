<template>
      <main>
      <div
        class="mt-relative pt-36 pb-32 flex content-center items-center justify-center"
        
      >
        <!-- background image -->
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          style='background-image: url("https://media.suara.com/pictures/970x544/2014/06/09/shutterstock_154213739.jpg");'
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-75 bg-black"
          ></span>
        </div>
        <!-- tagline -->
        <div class="container relative ml-14">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div class="pr-12">
                <h1 class="text-white font-semibold text-5xl">
                  Your story starts with us.
                </h1>
                <p class="mt-4 text-lg text-gray-300">
                  Persiapkan pendakian anda bersama kami
                </p>
                <button @click.prevent="addTrip" class="mt-4 text-green-400 bg-transparent border border-solid border-green-400 hover:bg-emerald-500 hover:text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style="height: 70px;"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div> -->
      </div>
      <section class="">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
            <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400"
                  >
                    <i class="fas fa-award"></i>
                  </div>
                  <h6 class="text-xl font-semibold">Gunung Semeru</h6>
                  <p class="mt-2 mb-4 text-gray-600">
                    Divide details about your product or agency work into parts.
                    A paragraph describing a feature will be enough.
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400"
                  >
                    <i class="fas fa-retweet"></i>
                  </div>
                  <h6 class="text-xl font-semibold">Gunung Rinjani</h6>
                  <p class="mt-2 mb-4 text-gray-600">
                    Keep you user engaged by providing meaningful information.
                    Remember that by this time, the user is curious.
                  </p>
                </div>
              </div>
            </div>
            <div class="pt-6 w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400"
                  >
                    <i class="fas fa-fingerprint"></i>
                  </div>
                  <h6 class="text-xl font-semibold">Gunung Kerinci</h6>
                  <p class="mt-2 mb-4 text-gray-600">
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough. Keep you user engaged!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
</template>
<script>
export default {
  name: "home",
  computed: {
    isLogin: function(){
      return this.$store.state.isLogin
    }
  },
  methods: {
    addTrip: function(){
      if(!this.isLogin){
        this.$toasted.info('You must login first', {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
      } else {
        this.$router.push({name: 'AddTrip'})
      }
    }
  }
}
</script>