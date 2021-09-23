<template>
<div>
  <div v-if="!isSender" class="flex flex-col mb-2 w-1/2">
    <div class="normal-case">
        {{chat.name}}
    </div>
    <div>
        <span
      class="
        text-xs
        font-semibold
        inline-block
        py-1
        px-2
        uppercase
        rounded
        text-white
        bg-blue-400
        normal-case
        last:mr-0
        mr-1
      "
    >
      {{chat.message}}
    </span>
    </div>
    
  </div>
  <div v-else class="flex justify-end mr-3">
    <div class="flex flex-col mb-2 w-1/2">
      <div class="normal-case text-right">{{chat.name}}</div>
      <div class="text-right mt-2">
        <span class="
            normal-case
            last:mr-0
            text-xs
            font-semibold
            py-1
            px-2
            rounded
            text-white
            bg-green-400">
          {{chat.message}}
        </span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "IncomingMsg",
  props: ['chat'],
  computed: {
    isSender: function(){
      if(this.chat.userId == localStorage.getItem('userId')){
        return true
      } else {
        return false
      }
    }
  }
};
</script>

<style>
</style>