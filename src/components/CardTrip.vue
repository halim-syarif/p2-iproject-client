<template>
  <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
    <div
      class="
        relative
        flex flex-col
        min-w-0
        break-words
        bg-white
        w-full
        mb-8
        shadow-lg
        rounded-2xl
      "
    >
      <div class="flex-auto mb-4">
        <img
          class="rounded-t-2xl"
          style="width: 400px; height: 200px"
          :src="trip.Mountain.imageUrl"
        />
        <h6 class="text-xl font-semibold mt-2">{{trip.Mountain.name}}</h6>
        <p class="text-sm mt-2 mb-2">{{date}}</p>
        <p>Jalur : {{trip.Track.name}}</p>
        <p class="mt-2 mb-4 text-gray-600">
          Anggota : {{trip.Users.length}} orang
        </p>
        <button
            v-if="!isJoined"
            @click.prevent="joinTrip"
            class="bg-blue-300 mb-4 text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
            type="button"
            style="transition: all 0.15s ease 0s;"
        >
            Join
        </button>
        <button
            v-else
            disabled
            class="bg-red-300 mb-4  text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
            type="button"
            style="transition: all 0.15s ease 0s;"
        >
            Joined
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ['trip'],
  computed: {
    date: function(){
      return new Date (this.trip.start_date).toLocaleDateString('id-ID')
    },
    schedule: function(){
      return new Date(this.trip.schedule).toUTCString().toString().slice(5,17)
    },
    isJoined: function(){
      if(!localStorage.getItem('access_token')){
        return false
      } else if(this.trip.Users.map(el => el.id).includes(+localStorage.getItem('userId'))){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    joinTrip: function(){
      if(!this.$store.state.isLogin){
        return this.$toasted.info('You must login first', {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
      }
      this.$isLoading(true)
      this.$store.dispatch('joinTrip', {TripId:this.trip.id})
      .then(() => {
        this.$isLoading(false)
        this.$toasted.success('Successfully Join Trip', {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
        this.$router.push({name: 'MyTrip'})
      })
      .catch(() => {
        this.$isLoading(false)
        this.$toasted.error('Something went wrong', {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
      })
    }
  }
};
</script>

<style>
</style>