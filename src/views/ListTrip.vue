<template>
  <div>
      <section class="py-20 mt-relative block 28 p lg:pt-0 bg-gray-600"
      
      style='background-image: url("https://media.suara.com/pictures/970x544/2014/06/09/shutterstock_154213739.jpg"); background-size:cover; height:100%'>
      
        <div class="container  mx-auto px-4">
          <div class="flex justify-center pt-20">
            <div class="w-full px-4">
              <div
                class="flex min-w-0 shadow-lg rounded-2xl bg-gray-300 bg-opacity-20"
              >
                <div v-if="allTrip.length > 0" class="flex-auto p-5 lg:p-10">
                  <h4 class="text-2xl font-semibold">Join with another trip</h4>
                  
                  <div class="flex flex-wrap">
                    
                        <!-- Card -->
                        <card v-for="trip in allTrip" :key="trip.id" :trip="trip"></card>

                    </div>
                </div>
                <div v-else class="flex-auto p-5 lg:p-10">
                  
                  <div class="flex flex-wrap">
                <div  class="flex flex-col justify-center mx-20">
                    <h4 class="mt-20 text-2xl font-semibold">Sorry</h4>
                    <p class="mt-5 font-semibold">No available trip.</p>
                    <div>
                      <router-link :to="{name: 'AddTrip'}" class="text-white">Create</router-link> a new one.
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
import Card from '../components/CardTrip.vue'
export default {
    name: 'ListTrip',
    components: {
        Card
    },
    computed: {
      allTrip: function(){
        return this.$store.state.alltrip
      }
    },
    created(){
      this.$isLoading(true)
      this.$store.dispatch('getAllTrip')
      this.$isLoading(false)
    }
}
</script>

<style>

</style>