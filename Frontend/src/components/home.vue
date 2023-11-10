/* eslint-disable */
<template>
  <div id="parent">
    <div class="container pt-5">
      <header class="d-flex align-items-baseline justify-content-between">
        <p class="text-center text-uppercase pointer fs-3 fw-bold">linkey</p>
        <div>
          <div class="d-flex gap-3" v-if="!login">
            <button
              class="btn text-white text-center px-3 py-2 pointer text-capitalize login"
              @click="goto('/login')"
            >
              login
            </button>
            <button
              class="btn text-white text-center px-3 py-2 pointer text-capitalize register"
              @click="goto('/register')"
            >
              register now
            </button>
          </div>
          <div class="login " v-else>
            <button
              class="btn text-white text-center px-3 py-2 pointer text-capitalize "
              
            >
             {{user.username}}
            </button>
            <Icon icon="icon-park-outline:down" class="me-2 pointer" width="22" height="22" />

          </div>
        </div>
      </header>
      <div class="mt-5 pt-5">
        <h2 class="text-center fw-bold text-capitalize">
          Shorten Your Loooong Links :)
        </h2>
        <p class="text-center mt-4">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>
        <div class="d-flex justify-content-center mt-5 searchbox mx-auto">
          <div class="d-flex align-items-baseline p-1">
            <div class="">
              <img
                src="../assets/img/linkicon.png"
                class="linkicn ms-3"
                alt=""
              />
              <input
                type="text"
                class="px-3 text-secondary"
                ref="urlinp"
                placeholder="Enter the link here"
              />
            </div>

            <button class="btn px-3 py-2 btn-submit text-white" @click="submit">
              Shorten Now !
            </button>
          </div>
        </div>
      </div>
      <div class="mt-4 d-flex justify-content-center gap-3">
        <div id="toggle-parent ">
          <input
            type="checkbox"
            class="offscreen"
            name="copy-toggle"
            id="copy-toggle"
            :checked="autocopy"
            @click="autocopy = !autocopy"
          />
          <label class="switch" for="copy-toggle"></label>
        </div>
        <span class="text-capitalize text-secondary copy-span"
          >auto copy to clipboard</span
        >
      </div>
      <table class="table mt-4 table-dark table-borderless">
        <thead class="opacity-75">
          <tr class="">
            <th class="text-center text-capitalize fw-light">short link</th>
            <th class="text-center text-capitalize fw-light">orginal link</th>
            <th class="text-center text-capitalize fw-light">qr code</th>
            <th class="text-center text-capitalize fw-light">view</th>
            <th class="text-center text-capitalize fw-light">status</th>
            <th class="text-center text-capitalize fw-light">delete</th>
          </tr>
        </thead>
        <tbody class="table-dark">
          <tr>
            <th class="text-center text-capitalize fw-light opacity-100">
              short link
            </th>
            <th class="text-center text-capitalize fw-light opacity-100">
              orginal link
            </th>
            <th class="text-center text-capitalize fw-light opacity-100">
              qr code
            </th>
            <th class="text-center text-capitalize fw-light opacity-100">
              view
            </th>
            <th class="text-center text-capitalize fw-light opacity-100">
              status
            </th>
            <th class="text-center text-capitalize fw-light opacity-100">
              delete
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import login from "./Login.vue";
import { Icon } from '@iconify/vue';

import Data from "../../default";
import axios from "axios";
const apiadress = Data.Api_Adress;
export default {
  /* eslint-disable */
  name: "home",
  beforeMount() {
    const jwt = login.methods.getcookies("jwt");
    jwt ? (this.login = true) : (this.login = false);
    if (jwt) {
      axios
        .get(`${apiadress}home/user/${jwt}`)
        .then((res) => (this.user = res.data));
    }
  },
  components: {
		Icon,
	},
  data() {
    return {
      autocopy: true,
      login: true,
      user: {},
    };
  },
  methods: {
    submit: function () {
      console.log(this.$refs.urlinp.value);
    },
    goto: function (e) {
      location.href = e;
    },
  },
};
</script>

<style scoped>
#parent {
  background-image: url("../assets/img/bakground.png");
  color: aliceblue;
  min-width: 100%;
  min-height: 100vh;
  background-size: 100% 100%;
}
header p {
  background: radial-gradient(
    12441.24% 70.1% at 5.56% 89.01%,
    #eb568e 0%,
    #144ee3 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-family: "Sf pro";
  font-style: bold;
  font-weight: 800;
}
.login {
  border-radius: 48px;
  border: 1px solid #353c4a;
  background: #181e29;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
}
.register {
  border-radius: 48px;
  border: 1px solid #144ee3;
  background: #144ee3;
  box-shadow: 10px 9px 22px 0px rgba(20, 78, 227, 0.38);
}
h2 {
  background: linear-gradient(
    90deg,
    #144ee3 -0.02%,
    #eb568e 38.86%,
    #a353aa 44.49%,
    #144ee3 80.67%
  );
  font-size: 68px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
span {
  color: #c9ced6;
  text-align: center;

  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 23.5px; /* 146.875% */
}
.linkicn {
  width: 20px;
  height: 14px;
  cursor: pointer;
}
input[type="text"] {
  caret-color: #b654a2;
  background-color: inherit;
  border: none;
  width: 460px;
}
input[type="text"]:focus {
  border: 0;
  outline: none;
}
::placeholder {
  font-size: 16px;
}
.searchbox {
  border-radius: 48px;
  border: 4px solid #353c4a;
  background: #181e29;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  width: 660px;
}
.btn-submit {
  border-radius: 48px;
  border: 1px solid #144ee3;
  background: #144ee3;
  box-shadow: 10px 9px 22px 0px rgba(20, 78, 227, 0.38);
}
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: all 0.3s;
  border-radius: 20px;
  top: 3px;
  cursor: pointer;
  scale: 0.9;
}
.switch::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background: #fff;
  top: 1px;
  left: 1px;
  transition: all 0.3s;
}
input[type="checkbox"]:checked + .switch::after {
  transform: translateX(20px);
}

input[type="checkbox"]:checked + .switch {
  background: #144ee3;
}
.offscreen {
  display: none;
}
.copy-span {
  font-size: 14px;
}
</style>
