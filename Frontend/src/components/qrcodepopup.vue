<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <div class="popup-inner gap-2 rounded-4">
      <qrcode-vue :value="url" :size="200" level="H" ref="qrcode" />
      <div class="d-flex justify-content-center gap-3 mt-2">
      <button class="btn btn-danger px-3 py-2" @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  name: "popup",
  props: ["url"],
  components: {
    QrcodeVue,
  },

  mounted() {
    document.addEventListener("keydown", this.esc);
  },

  methods: {
    close: function () {
      this.$emit("closepopup", "closed");
    },
    esc(event) {
      if (event.key === "Escape") {
        this.close();
      }
    },
}
    
};
</script>

<style scoped>
#popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner {
    background-color: white;
    color: black;
    position: relative;
    padding: 20px;
    max-height: 720px;
  }
}
</style>
