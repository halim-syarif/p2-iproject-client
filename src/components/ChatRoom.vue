<template>
  <div id="app" v-chat-scroll class="mt-5 h-60 scroll">
    <message-card v-for="(chat, i) in chats" :key="i" :chat="chat"></message-card>
    
  </div>
</template>

<script>
import MessageCard from "./MessageCard.vue";

export default {
  name: "ChatRoom",
  data: function () {
    return {
      cards: []
    };
  },
  props: ['idRoom'],
  components: {
    MessageCard,
  },
  computed: {
      chats: function(){
          return this.$store.state.chats.filter(el => el.idRoom == this.idRoom)
      }
  },
  methods: {

  },
};
</script>

<style>
.scroll {
  overflow-y: scroll;
}
</style>