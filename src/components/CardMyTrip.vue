<template>
  <div>
    <div @click="showDetail" class="relative mt-1 ">
      <button
        class="
          w-full
          text-left
          bg-white
          text-gray-800
          active:bg-gray-100
          text-sm
          font-semibold
          uppercase
          px-4
          py-4
          rounded-2xl
          shadow
          hover:shadow-md
          outline-none
          focus:outline-none
          normal-case
        "
        type="button"
      >
      <p class="text-bold">{{ index + 1 }}. Gn. {{ trip.Mountain.name }}</p>
        <p>via {{ trip.Track.name }}</p>
        <p>{{ startDate }} - {{ endDate }}</p>
      </button>
    </div>
    <div v-if="openDetail" class="detail">
      
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
          rounded-2xl
          shadow
          hover:shadow-md
          outline-none
          focus:outline-none
        "
      >
      <div class="flex flex-col">
        <!-- button -->
        <div>
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto mt-1">
          <li class="flex mb-2 -mt-3 -ml-3">
            <!-- cuaca -->
            <button
              @click="showForecast"
              class="
                bg-yellow-400
                text-white
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
                lg:mr-1
                lg:mb-0
                ml-3
                mb-3
              "
              type="button"
              style="transition: all 0.15s ease 0s"
            >
              Prakiraan Cuaca
            </button>

            <!-- calender -->
            <AddToCalendar
              :buttonText="'Save to calendar'"
              :details="`Naik Gunung ${trip.Mountain.name}`"
              :endTime="new Date(`${trip.end_date}`)"
              :location="`${trip.Mountain.lokasi}`"
              :startTime="new Date(`${trip.start_date}`)"
              :title="`Naik Gunung ${trip.Mountain.name}`"
              class="
                bg-blue-400
                text-white
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
                lg:mr-1
                lg:mb-0
                ml-3
                mb-3
              "
              type="button"
              style="transition: all 0.15s ease 0s"
            />

            <!-- delete Trip -->
            <button
              @click.prevent="deleteHandler"
              class="
                bg-red-400
                text-white
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
                lg:mr-1
                lg:mb-0
                ml-3
                mb-3
              "
              type="button"
              style="transition: all 0.15s ease 0s"
            >
              finished
            </button>
          </li>
        </ul>
        </div>

        <!-- Main Page -->
        <div v-if="!showForeCast" class="flex flex-row h-85">
          <div class="w-1/4">
            <div class="pr-5">
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
                <div class="px-4 py-5 flex-auto">
                  <div class="flex flex-row justify-between">
                    <h6 class="text-lg font-semibold normal-case">Peralatan</h6>
                    <div class="w-full text-center"></div>
                    <button
                      class="mt-1 text-sm"
                      @click="$modal.show('my-modal')"
                    >
                      <i class="fas fa-plus-circle"></i>
                    </button>
                    <button
                      class="mt-1 text-sm ml-1"
                      @click="showDetailAlat"
                    >
                    <i class="fas fa-info-circle"></i>
                    </button>
                  </div>
                  <hr />
                  <div class="mt-2 mb-2 text-gray-600">
                    <div class="flex-flex-col">
                      <div class="flex flex-col mr-5">
                        <div
                          v-if="listEquipment.length == 0"
                          class="mt-3 normal-case"
                        >
                          <h1>You dont have any tools</h1>
                        </div>

                        <!-- item equipment -->
                        <div v-else class="mt-3 normal-case w-56 flex flex-col h-64" :class="{'scroll': peralatanDetail}" v-chat-scroll>
                          <div v-for="(item) in listEquipment" :key="item">
                            <div class="mb-2 flex flex-row">
                              <input
                                :disabled="item.jumlah <= +item.hasFill"
                                :checked="item.jumlah <= +item.hasFill"
                                type="checkbox"
                                @change="updateEquipment(item.id)"
                              />
                              <div class="flex flex-col">
                                <div class="flex flex-row justify-between lg:w-48 md:w-24">
                                  <div class="ml-1">
                                    <b class="text-red-800">{{ item.name }}</b>
                                    ({{ +item.hasFill }} of {{ item.jumlah }})
                                  </div>
                                  <button class="mr-1" @click="deleteEquipment(item.id)">
                                    <i class="fas fa-trash-alt"></i>
                                  </button>
                                </div>
                                <!-- detail -->
                                <div v-if="peralatanDetail">
                                  <div v-for="(user, i) in item.userPJ" :key="i">
                                    <ul class="ml-1 mt-1">
                                      <div class="flex flex-row justify-between w-36">
                                        <div>
                                          <li class="text-gray-500">
                                            [{{ user.jumlah }}] {{ user.name }}
                                          </li>
                                        </div>
                                        <div class="-mr-10" v-if="user.name == userlogin">
                                          <button @click="updateEquipment(item.id)" :disabled="item.jumlah <= +item.hasFill">
                                            <i
                                              class="fas fa-plus-circle mr-1"
                                            ></i>
                                          </button>
                                          <button @click="decrementEquipment(item.id)">
                                            <i class="fas fa-minus-circle"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </ul>
                                  </div>
                                </div>

                                <!-- tooltip -->
                                <!-- ref="btnRef"
                                  v-on:mouseenter="toggleTooltip()"
                                  v-on:mouseleave="toggleTooltip()" -->
                                <!-- <div
                                  ref="tooltipRef"
                                  v-bind:class="{
                                    hidden: !tooltipShow,
                                    block: tooltipShow,
                                  }"
                                  class="
                                    absolute
                                    ml-28
                                    bg-pink-600
                                    border-0
                                    block
                                    z-50
                                    font-normal
                                    leading-normal
                                    text-sm
                                    max-w-xs
                                    text-left
                                    no-underline
                                    break-words
                                    rounded-lg
                                  "
                                >
                                  <div>
                                    tes
                                  </div>
                                </div> -->
                              </div>
                            </div>
                          </div>
                        </div>

                        <t-modal name="my-modal">
                          <div class="flex flex-col justify-start text-center mt-10">
                            <div>
                              <h6 class="text-lg font-semibold">
                                Pilih peralatan
                              </h6>
                              <hr />
                              <div
                                class="
                                  flex flex
                                  row
                                  justify-between
                                  ml-20
                                  mr-20
                                "
                              >
                                <div>
                                  <h6 class="text-sm mt-5 normal-case">
                                    Nama Alat
                                  </h6>
                                  <hr />
                                </div>
                                <div>
                                  <h6 class="text-sm mt-5 normal-case">
                                    Jumlah
                                  </h6>
                                  <hr />
                                </div>
                              </div>

                              <!-- CheckBox -->
                              <div class="flex flex row justify-between mr-16">
                                <div class="text-left mt-5 ml-10">
                                  <input v-model="tenda_4" type="checkbox" />
                                  <span class="ml-2 normal-case"
                                    >Tenda Kapasitas 4</span
                                  >
                                </div>
                                <div class="text-left mt-5 ml-24">
                                  <input
                                    :disabled="!tenda_4"
                                    v-model="tenda_4_count"
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="0"
                                    class="
                                      border-0
                                      px-3
                                      py-2
                                      -mt-1
                                      placeholder-gray-400
                                      text-gray-700
                                      bg-white
                                      rounded
                                      shadow
                                      focus:outline-none
                                      focus:ring
                                      w-20
                                      h-5
                                    "
                                  />
                                </div>
                              </div>

                              <div class="flex flex row justify-between mr-16">
                                <div class="text-left mt-5 ml-10">
                                  <input v-model="tenda_2" type="checkbox" />
                                  <span class="ml-2 normal-case"
                                    >Tenda Kapasitas 2</span
                                  >
                                </div>
                                <div class="text-left mt-5 ml-24">
                                  <input
                                    :disabled="!tenda_2"
                                    v-model="tenda_2_count"
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="0"
                                    class="
                                      border-0
                                      px-3
                                      py-2
                                      -mt-1
                                      placeholder-gray-400
                                      text-gray-700
                                      bg-white
                                      rounded
                                      shadow
                                      focus:outline-none
                                      focus:ring
                                      w-20
                                      h-5
                                    "
                                  />
                                </div>
                              </div>

                              <div class="flex flex row justify-between mr-16">
                                <div class="text-left mt-5 ml-10">
                                  <input v-model="carriel" type="checkbox" />
                                  <span class="ml-2 normal-case">Carriel</span>
                                </div>
                                <div class="text-left mt-5 ml-24">
                                  <input
                                    :disabled="!carriel"
                                    v-model="carriel_count"
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="0"
                                    class="
                                      border-0
                                      px-3
                                      py-2
                                      -mt-1
                                      placeholder-gray-400
                                      text-gray-700
                                      bg-white
                                      rounded
                                      shadow
                                      focus:outline-none
                                      focus:ring
                                      w-20
                                      h-5
                                    "
                                  />
                                </div>
                              </div>

                              <div class="flex flex row justify-between mr-16">
                                <div class="text-left mt-5 ml-10">
                                  <input v-model="matras" type="checkbox" />
                                  <span class="ml-2 normal-case">Matras</span>
                                </div>
                                <div class="text-left mt-5 ml-24">
                                  <input
                                    :disabled="!matras"
                                    v-model="matras_count"
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="0"
                                    class="
                                      border-0
                                      px-3
                                      py-2
                                      -mt-1
                                      placeholder-gray-400
                                      text-gray-700
                                      bg-white
                                      rounded
                                      shadow
                                      focus:outline-none
                                      focus:ring
                                      w-20
                                      h-5
                                    "
                                  />
                                </div>
                              </div>

                              <div class="flex flex row justify-between mr-16">
                                <div class="text-left mt-5 ml-10">
                                  <input
                                    v-model="cooking_set"
                                    type="checkbox"
                                  />
                                  <span class="ml-2 normal-case"
                                    >Cooking Set</span
                                  >
                                </div>
                                <div class="text-left mt-5 ml-24">
                                  <input
                                    :disabled="!cooking_set"
                                    v-model="cooking_set_count"
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="0"
                                    class="
                                      border-0
                                      px-3
                                      py-2
                                      -mt-1
                                      placeholder-gray-400
                                      text-gray-700
                                      bg-white
                                      rounded
                                      shadow
                                      focus:outline-none
                                      focus:ring
                                      w-20
                                      h-5
                                    "
                                  />
                                </div>
                              </div>

                              <div class="flex flex row justify-between mr-16">
                                <div class="text-left mt-5 ml-10">
                                  <input v-model="kompor" type="checkbox" />
                                  <span class="ml-2 normal-case">Kompor</span>
                                </div>
                                <div class="text-left mt-5 ml-24">
                                  <input
                                    :disabled="!kompor"
                                    v-model="kompor_count"
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="0"
                                    class="
                                      border-0
                                      px-3
                                      py-2
                                      -mt-1
                                      placeholder-gray-400
                                      text-gray-700
                                      bg-white
                                      rounded
                                      shadow
                                      focus:outline-none
                                      focus:ring
                                      w-20
                                      h-5
                                    "
                                  />
                                </div>
                              </div>

                              <div class="flex flex row justify-between mr-16">
                                <div class="text-left mt-5 ml-10">
                                  <input v-model="tabung_gas" type="checkbox" />
                                  <span class="ml-2 normal-case"
                                    >Tabung Gas Hi-Cook</span
                                  >
                                </div>
                                <div class="text-left mt-5 ml-24">
                                  <input
                                    :disabled="!tabung_gas"
                                    v-model="tabung_gas_count"
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="0"
                                    class="
                                      border-0
                                      px-3
                                      py-2
                                      -mt-1
                                      placeholder-gray-400
                                      text-gray-700
                                      bg-white
                                      rounded
                                      shadow
                                      focus:outline-none
                                      focus:ring
                                      w-20
                                      h-5
                                    "
                                  />
                                </div>
                              </div>

                              <div class="flex flex row justify-between mr-16">
                                <div class="text-left mt-5 ml-10">
                                  <input v-model="flysheet" type="checkbox" />
                                  <span class="ml-2 normal-case"
                                    >Fly sheet</span
                                  >
                                </div>
                                <div class="text-left mt-5 ml-24">
                                  <input
                                    :disabled="!flysheet"
                                    v-model="flysheet_count"
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="0"
                                    class="
                                      border-0
                                      px-3
                                      py-2
                                      -mt-1
                                      placeholder-gray-400
                                      text-gray-700
                                      bg-white
                                      rounded
                                      shadow
                                      focus:outline-none
                                      focus:ring
                                      w-20
                                      h-5
                                    "
                                  />
                                </div>
                              </div>
                              <!-- custom tools -->
                              <div class="mt-5">Add custom tools</div>
                              <div class="flex flex row justify-between mr-16">
                                <div class="text-left mt-5 ml-10">
                                  <input
                                    v-model="custom"
                                    type="text"
                                    placeholder="type your tools"
                                    class="
                                      border-0
                                      px-3
                                      py-2
                                      -mt-1
                                      placeholder-gray-400
                                      text-gray-700
                                      bg-white
                                      rounded
                                      shadow
                                      focus:outline-none
                                      focus:ring
                                      w-36
                                      h-5
                                    "
                                  />
                                </div>
                                <div class="text-left mt-5 ml-10">
                                  <input
                                    :disabled="custom.length < 3"
                                    v-model="custom_count"
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="0"
                                    class="
                                      border-0
                                      px-3
                                      py-2
                                      -mt-1
                                      ml-5
                                      placeholder-gray-400
                                      text-gray-700
                                      bg-white
                                      rounded
                                      shadow
                                      focus:outline-none
                                      focus:ring
                                      w-20
                                      h-5
                                    "
                                  />
                                </div>
                              </div>
                              <button
                                @click="postEquipment"
                                class="
                                  bg-yellow-500
                                  text-white
                                  active:bg-gray-100
                                  text-xs
                                  font-bold
                                  px-4
                                  py-2
                                  rounded
                                  shadow
                                  hover:shadow-md
                                  outline-none
                                  focus:outline-none
                                  lg:mr-1
                                  lg:mb-0
                                  mb-5
                                  mt-5
                                  ml-5
                                "
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </t-modal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-1/5">
            <div class="w-3/12 w-full pr-5">
              <div
                class="
                  flex flex-col
                  min-w-0
                  bg-white
                  w-full
                  shadow-lg
                  rounded-lg
                  h-96
                "
              >
                <div class="px-4 py-5 flex-auto">
                  <h6 class="text-lg font-semibold normal-case">Members</h6>
                  <hr class="mb-5" />
                  <ul
                    v-for="(member, i) in members"
                    :key="i"
                    class="mb-3 mt-3"
                  >
                    <li class="normal-case">{{ i + 1 }}. {{ member }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
                  <h6 class="text-lg font-semibold normal-case">Chat</h6>
                  <hr />
                  <!-- chat Area -->
                  <chat-room :idRoom="trip.id"></chat-room>
                  <chat-input :idRoom="trip.id"></chat-input>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- forecast -->
        <weather
          v-else
          @closeForeCast="closeForeCast"
          :data="weather"
          :lokasi="location"
        ></weather>
      </div>
      </div>
      

    </div>
  </div>
</template>

<script>
// import { createPopper } from "@popperjs/core";
import { AddToCalendar } from "vue-add-events-to-google-calendar";
import ChatRoom from "../components/ChatRoom.vue";
import ChatInput from "../components/ChatInput.vue";
import Weather from "../components/Weather.vue";

export default {
  name: "CardMytrip",
  components: {
    AddToCalendar,
    ChatRoom,
    ChatInput,
    Weather,
  },
  data: function () {
    return {
      peralatanDetail: false,
      tooltipShow: false,
      openDetail: false,
      showForeCast: false,
      weather: [],
      listEquipment: [],
      tenda_4: false,
      tenda_2: false,
      carriel: false,
      cooking_set: false,
      kompor: false,
      tabung_gas: false,
      flysheet: false,
      matras: false,
      custom: "",
      tenda_4_count: null,
      tenda_2_count: null,
      carriel_count: null,
      cooking_set_count: null,
      kompor_count: null,
      tabung_gas_count: null,
      flysheet_count: null,
      matras_count: null,
      custom_count: null,
    };
  },
  props: ["trip", "index"],
  computed: {
    userlogin: function(){
        return localStorage.getItem('name')
    },
    startDate: function(){
      return new Date(this.trip.start_date).toUTCString().toString().slice(5, 17);
    },
    endDate: function(){
      return new Date(this.trip.end_date).toUTCString().toString().slice(5, 17);
    },
    equipmentList: function () {
      let list = {};
      if (this.tenda_4) {
        list.tenda_4 = this.tenda_4_count;
      }
      if (this.tenda_2) {
        list.tenda_2 = this.tenda_2_count;
      }
      if (this.carriel) {
        list.carriel = this.carriel_count;
      }
      if (this.cooking_set) {
        list.cooking_set = this.cooking_set_count;
      }
      if (this.kompor) {
        list.kompor = this.kompor_count;
      }
      if (this.tabung_gas) {
        list.tabung_gas = this.tabung_gas_count;
      }
      if (this.flysheet) {
        list.flysheet = this.flysheet_count;
      }
      if (this.matras) {
        list.matras = this.matras_count;
      }
      if (this.custom.length > 2) {
        list[this.custom] = this.custom_count;
      }
      return list;
    },
    location: function () {
      return this.trip.Mountain.lokasi;
    },
    members: function () {
      return this.trip.Users.map((el) => el.name);
    },
    getUserEquipment: function () {
      let equipmentByUser = this.listEquipment.map((el) => {
        let item = {
          name: el.name,
          users: [],
        };
        el.EquipmentUsers.forEach((user) => {
          const obj = {
            name: user.User.name,
            jumlah: user.jumlah,
          };
          item.users.push(obj);
        });
        return item;
      });
      return equipmentByUser;
    },
  },
  watch: {
    listEquipment: function () {
      this.listEquipment.forEach((item, i) => {
        let totalChecked = 0;
        item.EquipmentUsers.forEach((el) => {
          totalChecked += +el.jumlah;
        });
        item.hasFill = totalChecked;
        item.userPJ = this.getUserEquipment[i].users;
      });
    },
  },
  methods: {
    // toggleTooltip: function () {
    //   if (this.tooltipShow) {
    //     this.tooltipShow = false;
    //   } else {
    //     this.tooltipShow = true;
    //     createPopper(this.$refs.btnRef, this.$refs.tooltipRef, {
    //       placement: "right",
    //     });
    //   }
    // },
    postEquipment: function () {
      if (Object.values(this.equipmentList).includes(null)) {
        this.$toasted.error("fill all amount", {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
        return;
      }
      const data = {
        TripId: this.trip.id,
        list: this.equipmentList,
      };
      this.$isLoading(true)
      this.$store
        .dispatch("postEquipment", data)
        .then(() => {
          this.$isLoading(false)
          this.$modal.hide("my-modal");
          this.$toasted.success("success add equipment", {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
          this.getEquipmentList();
          (this.tenda_4 = false),
            (this.tenda_2 = false),
            (this.carriel = false),
            (this.cooking_set = false),
            (this.kompor = false),
            (this.tabung_gas = false),
            (this.flysheet = false),
            (this.matras = false),
            (this.custom = ""),
            (this.tenda_4_count = null),
            (this.tenda_2_count = null),
            (this.carriel_count = null),
            (this.cooking_set_count = null),
            (this.kompor_count = null),
            (this.tabung_gas_count = null),
            (this.flysheet_count = null),
            (this.matras_count = null),
            (this.custom_count = null);
        })
        .catch((err) => {
          this.$isLoading(false)
          this.$toasted.error(err.response.data.message, {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
        });
    },
    updateEquipment: function (idEquipment) {
      const payload = {
        UserId: localStorage.getItem("userId"),
        EquipmentId: idEquipment,
      };
      this.$isLoading(true)
      this.$store
        .dispatch("postUserEquipment", payload)
        .then(() => {
          this.$isLoading(false)
          this.getEquipmentList();
        })
        .catch((err) => {
          this.$isLoading(false)
          this.$toasted.error(err.response.data.message, {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
        });
    },
    decrementEquipment: function (idEquipment) {
      const payload = {
        UserId: localStorage.getItem("userId"),
        EquipmentId: idEquipment,
      };
      this.$isLoading(true)
      this.$store
        .dispatch("decrementEquipment", payload)
        .then(() => {
          this.$isLoading(false)
          this.getEquipmentList();
        })
        .catch((err) => {
          this.$isLoading(false)
          this.$toasted.error(err.response.data.message, {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
        });
    },
    showDetail: function () {
      if (this.openDetail) {
        this.openDetail = false;
        this.showForeCast = false;
      } else {
        this.getEquipmentList();
        this.openDetail = true;
      }
    },
    showDetailAlat: function () {
      if (this.peralatanDetail) {
        this.peralatanDetail = false;
      } else {
        this.peralatanDetail = true;
      }
    },
    deleteHandler: function () {
      this.$toasted.show("Are u sure to delete this?", {
        theme: "bubble",position: "top-center",fullWidth: true,
        action: [
          {
            text: "Cancel",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
          {
            text: "Yes",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
              this.deleteTrip();
            },
          },
        ],
      });
    },
    deleteTrip: function () {
      this.$isLoading(true)
      this.$store
        .dispatch("deleteTrip", this.trip.id)
        .then((response) => {
          this.$isLoading(false)
          this.$store.dispatch("getMyTrip");
          this.$toasted.success(response.data.message, {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
          this.openDetail = false;
        })
        .catch((err) => {
          this.$isLoading(false)
          this.$toasted.error(err.response.data.message, {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
        });
    },
    showForecast: function () {
      const location = this.trip.Mountain.lokasi;
      this.$isLoading(true)
      this.$store
        .dispatch("getWeather", location)
        .then((response) => {
          this.$isLoading(false)
          this.weather = response.data;
          this.weather.map((el) => {
            if (el.cuaca.includes("hujan")) {
              el.image = require("@/assets/rainy.svg");
            } else if (el.cuaca.includes("berawan")) {
              el.image = require("@/assets/cloudy.svg");
            } else if (el.cuaca.includes("cerah")) {
              el.image = require("@/assets/sun.svg");
            } else if (el.cuaca.includes("pecah")) {
              el.image = require("@/assets/storm.svg");
            } else {
              el.image = require("@/assets/SunCloudy.svg");
            }
            return el;
          });
          this.showForeCast = true;
        })
        .catch((err) => {
          this.$isLoading(false)
          this.$toasted.error(err.response.data.message, {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
        });
    },
    closeForeCast: function () {
      this.showForeCast = false;
    },
    getEquipmentList: function () {
      this.$isLoading(true)
      this.$store
        .dispatch("getEquipmentById", this.trip.id)
        .then((response) => {
          this.$isLoading(false)
          this.listEquipment = response.data;
        })
        .catch((err) => {
          this.$isLoading(false)
          this.$toasted.error(err.response.data.message, {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
        });
    },
    deleteEquipment: function(EquipmentId){
      this.$toasted.show("Are u sure to delete this?", {
        theme: "bubble",position: "top-center",fullWidth: true,
        action: [
          {
            text: "Cancel",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
          {
            text: "Yes",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
              this.$store.dispatch('deleteEquipment', EquipmentId)
              .then(() => {
                this.$toasted.success('Deleted success', {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
                this.getEquipmentList()
              })
              .catch(err => {
                this.$toasted.error(err.response.data.message, {theme: "bubble",position: "top-center",fullWidth: true}).goAway(2000);
              })
            },
          },
        ],
      });
    }
  },
  created() {
    // this.getEquipmentList();
  },
};
</script>

<style>
.scroll {
  overflow-y: scroll;
}
</style>