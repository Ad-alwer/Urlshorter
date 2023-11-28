<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="popup">
    <div class="popup-inner rounded-4">
      <ul class="">
        <li
          class="list-unstyled d-flex p-0 pt-2 m-0 justify-content-around pointer align-items-center border-secondary border-bottom pb-4"
          @click="goto('/profile/chart')"
        >
          <Icon icon="lucide:line-chart" class="responsive d-none" width="20" height="25" />
          <Icon icon="lucide:line-chart" class="none-responsive " width="25" height="25" />
          <span>Chart</span>
        </li>
        <li
          class="list-unstyled d-flex p-0 m-0 justify-content-around pointer align-items-center mt-4"
          @click="goto('/profile/links')"
        >
          <Icon icon="ri:links-fill" class="responsive d-none" width="20" height="25" />
          <Icon icon="ri:links-fill" class="none-responsive " width="25" height="25" />
          <span>Links</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "menu",
  components: {
    Icon,
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
    goto: function (e) {
      location.href = e;
    },
  },
};
</script>

<style scoped>
#popup {
  position: fixed;
  top: 14%;

  right: 8%;

  z-index: 99;

  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner {
    padding: 10px;
    padding-top: 15px;
    padding-bottom: 5px;
    background: rgba(24, 30, 41, 0.31);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.3px);
    -webkit-backdrop-filter: blur(7.3px);
    border: 1px solid rgba(255, 255, 255, 0.466);
    color: white;
    position: relative;
  }
}
ul {
  width: 150px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0;
}
.responsive{
  display: none;
}

@media screen and (max-width: 767px) {
  #popup {
    top: 15%;

    right: 4%;
  }
  ul{
    width: 80px;
  }
 
  .responsive{
  display: block !important;
}
.none-responsive{
display: none;
}
}
</style>
