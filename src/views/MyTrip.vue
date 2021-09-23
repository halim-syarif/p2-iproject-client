<template>
  <div>
      <section class="py-20 mt-relative block 28 p min-h-screen lg:pt-0 bg-gray-900" 
      style='background-image: url("https://media.suara.com/pictures/970x544/2014/06/09/shutterstock_154213739.jpg"); background-size:cover; height:100%'>
        <div class="container mx-auto px-4">
          <div class="flex justify-center pt-20">
            <div class="w-full">
              <div
                class="flex min-w-0 shadow-lg rounded-lg bg-gray-200 rounded-2xl bg-opacity-30"
              >
                <div class="flex-auto min-h-96 p-5 lg:p-10">
                  <h4 class="text-2xl font-semibold -mt-5 mb-5 text-center">My Trip</h4>
                  <div v-if="myTrip.length == 0" class="flex flex-col justify-center">
                    <h4 class="mt-20 text-2xl font-semibold">Sorry</h4>
                    <p class="mt-5 font-semibold">You dont have any trip.</p>
                    <div>
                      <router-link :to="{name: 'AllTrip'}" class="text-blue-600">Join</router-link> the available trip, or 
                      <router-link :to="{name: 'AddTrip'}" class="text-blue-600">Create</router-link> a new one.
                    </div>
                  </div>
                  <!-- ListMytrip -->
                  <card-my-trip v-for="(trip, i) in myTrip" :key="i" :trip="trip" :index='i'></card-my-trip>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
import CardMyTrip from '../components/CardMyTrip.vue'
export default {
    name: 'MyTrip',
    components: {
        CardMyTrip
    },
    computed: {
      myTrip: function(){
        return this.$store.state.mytrips
      }
    },
    created(){
      this.$isLoading(true)
      this.$store.dispatch('getMyTrip')
      this.$isLoading(false)
    }
}
</script>

<style>

</style>