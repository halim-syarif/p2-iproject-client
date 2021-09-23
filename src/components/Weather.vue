<template>
  <div
    class="
      w-full
      mt-1
      py-5
      text-left
      bg-white
      text-gray-800
      active:bg-gray-100
      text-xs
      font-bold
      uppercase
      px-4
      py-2
      rounded
      shadow
      hover:shadow-md
      outline-none
      focus:outline-none
    "
  >
    <div class="flex flex-row h-96">
      <div class="flex-auto">
        <div class="w-full pr-5">
          <div
            class="
              flex flex-col
              min-w-0
              break-words
              bg-white
              w-full
              shadow-lg
              rounded-lg
              h-96
            "
          >
            <div class="px-4 py-5">
              <div class="flex justify-between">
                <div>
                  <h6 class="text-xl font-semibold">ForeCast Cuaca - 7 Hari</h6>
                </div>
                <button @click="closeForeCast" class="text-lg">
                  <i class="far fa-times-circle"></i>
                </button>
              </div>
              <hr />

              <!-- forecast -->
              <div class="flex flex-col w-full mt-5">
                <h6 class="text-sm text-center font-semibold normal-case mb-10">{{ lokasi }}</h6>
                <div class="flex flex-row justify-evenly">
                  <div v-for="item in data" :key="item" >
                    <div class="flex flex-col items-center text-center">
                      <h6 class="text-xs">{{item.day}}</h6>
                      <h6 class="text-xs mt-1">{{item.fullDate}}</h6>
                      <h6 class="text-sm mt-4 mb-4">{{item.temp}} &#176;C</h6>
                      <img class="h-10 w-10" :src="item.image" />
                      <h6 class="text-xs mt-4 normal-case">{{ item.cuaca }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Weather",
  props: ['data', 'lokasi'],
  methods: {
    closeForeCast: function(){
      this.$emit('closeForeCast')
    }
  }
};
</script>

<style>

</style>