<template>
  <div>
    <section class="py-20 mt-relative block 28 p lg:pt-0 bg-gray-600">
      <div class="container mx-auto px-4">
        <div class="flex justify-center pt-20">
          <div class="w-3/4 px-4">
            <div
              class="flex flex-row min-w-0 shadow-lg rounded-2xl bg-gray-300"
            >
              <div class="flex-auto w-1/2 p-5 lg:p-10">
                <h4 class="text-2xl font-semibold">Create Your Journey</h4>

                <div class="relative mb-3 mt-8">
                  <label
                    class="block text-gray-700 text-xs font-bold mb-2"
                    for="full-name"
                    >Choose Your Destination</label
                  >
                  <select
                    v-model="mountainId"
                    class="
                      normal-case
                      border-0
                      px-3
                      py-3
                      placeholder-gray-400
                      text-gray-700
                      bg-white
                      rounded
                      text-sm
                      shadow
                      focus:outline-none
                      focus:ring
                      w-full
                    "
                  >
                    <option value="null" selected disabled>
                      ---- Select Mount ----
                    </option>
                    <option
                      v-for="mountain in mountains"
                      :key="mountain.id"
                      :value="mountain.id"
                    >
                      {{ mountain.name }}
                    </option>
                  </select>
                </div>

                <div class="relative mb-3">
                  <label
                    class="block text-gray-700 text-xs font-bold mb-2"
                    for="full-name"
                    >Choose Your Track</label
                  >
                  <select
                    v-model="trackId"
                    class="
                      border-0
                      px-3
                      py-3
                      placeholder-gray-400
                      text-gray-700
                      bg-white
                      rounded
                      text-sm
                      shadow
                      focus:outline-none
                      focus:ring
                      w-full
                    "
                  >
                    <option value="null" selected disabled>
                      ---- Select Track ----
                    </option>
                    <option
                      v-for="track in trackList"
                      :key="track.id"
                      :value="track.id"
                    >
                      {{ track.name }}
                    </option>
                  </select>
                </div>

                <div class="flex flex-wrap justify-evenly md:col-ls">
                  <!-- Schedule -->
                  <div class="w-full">
                    <label
                      class="block text-gray-700 text-xs font-bold mb-2"
                      for="full-name"
                      >Start Date</label
                    >
                    <input
                      v-model="start_date"
                      type="date"
                      class="
                        border-0
                        px-3
                        py-3
                        placeholder-gray-400
                        text-gray-700
                        bg-white
                        rounded
                        text-sm
                        shadow
                        focus:outline-none
                        focus:ring
                        w-full
                      "
                    />
                  </div>

                  <!-- Schedule -->
                  <div class="w-full ">
                    <label
                      class="block text-gray-700 text-xs font-bold mt-2"
                      for="full-name"
                      >End Date</label
                    >
                    <input
                      v-model="end_date"
                      type="date"
                      class="
                        border-0
                        px-3
                        py-3
                        placeholder-gray-400
                        text-gray-700
                        bg-white
                        rounded
                        text-sm
                        shadow
                        focus:outline-none
                        focus:ring
                        w-full
                      "
                    />
                  </div>

                </div>

                  <div class="relative w-full mb-3">
                  <label
                    class="block mt-2 text-gray-700 text-xs font-bold mb-2"
                    for="message"
                    >Description</label
                  ><textarea
                    v-model="description"
                    class="
                    row-10
                      border-0
                      px-3
                      py-3
                      placeholder-gray-400
                      text-gray-700
                      bg-white
                      rounded
                      text-sm
                      shadow
                      focus:outline-none
                      focus:ring
                      w-full
                    "
                    placeholder="Type a message..."
                  ></textarea>
                </div>
              </div>
              <div class="flex-auto p-5 lg:p-10 rounded mr-13 pr-2">
                <iframe
                  width="400"
                  height="400"
                  style="border:0"
                  loading="lazy"
                  allowfullscreen
                  :src="imageMap">
                </iframe>
                
                

              </div>
              
            </div>

                <div class="text-center mt-6">
                  <button
                    @click.prevent="createTrip"
                    class="
                      bg-white
                      text-gray-800
                      active:bg-gray-700
                      text-sm
                      font-bold
                      uppercase
                      px-6
                      py-3
                      rounded
                      shadow
                      hover:shadow-lg
                      outline-none
                      focus:outline-none
                      mr-1
                      mb-1
                    "
                    type="button"
                    style="transition: all 0.15s ease 0s"
                  >
                    Save
                  </button>
                </div>  
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "CreateTrip",
  data: function () {
    return {
      imageMap: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDCDpW1pT8Z8ijRP6NG6rjAWvzwu1pd9gI&q=Jakarta',
      mountainId: null,
      trackId: null,
      trackList: [],
      mountDescription: "",
      description: "",
      start_date: null,
      end_date: null,
    };
  },
  watch: {
    mountainId: function () {
      const mount = this.mountains.filter((el) => el.id == this.mountainId);
      this.imageMap = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDCDpW1pT8Z8ijRP6NG6rjAWvzwu1pd9gI&q=gunung%20${mount[0].name}`
      this.trackList = mount[0].Tracks;
      let status = "aktif";
      if (!mount[0].status) {
        status = "Tidak aktif";
      }
      this.mountDescription = `Gunung Semeru
Ketinggian : ${mount[0].height},
Status Gunung : ${status},
Lokasi: ${mount[0].lokasi}
`;
      this.description = this.mountDescription;
      this.trackId = null;
    },
    trackId: function () {
      const track = this.trackList.filter((el) => el.id == this.trackId);
      this.description =
        this.mountDescription +
        `
Pilihan jalur : ${track[0].name},
Jarak pendakian : ${track[0].distance} km,
Estimasi waktu tempuh : ${track[0].tracking_time} jam,
transport : ${track[0].transport}
`;
    },
  },
  computed: {
    mountains: function () {
      return this.$store.state.mountains;
    },
  },
  methods: {
    createTrip: function () {
      const payload = {
        MountId: this.mountainId,
        TrackId: this.trackId,
        start_date: this.start_date,
        end_date: this.end_date,
      };
      if(new Date(this.start_date) < new Date()){
        return this.$toasted.error('Wrong Start Date', {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
      }

      if(new Date(this.end_date) < new Date(this.start_date)){
        return this.$toasted.error('End Date must longer than start date', {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
      }
      this.$isLoading(true)
      this.$store
        .dispatch("createTrip", payload)
        .then(() => {
          this.$isLoading(false)
          this.$toasted.success('Successfully Create Trip', {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
          this.$router.push({ name: "MyTrip" });
        })
        .catch((err) => {
          this.$isLoading(false)
          const errors = err.response.data.message;
          if (typeof errors !== "string") {
            errors.forEach((el) => {
              this.$toasted.error(el, {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
            });
          } else {
            this.$toasted.error(errors, {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
          }
        });
    },
  },
  created: function () {
    this.$isLoading(true)
    this.$store.dispatch("getMountains");
    this.$isLoading(false)
  },
};
</script>

<style>
</style>

