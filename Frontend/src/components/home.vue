/* eslint-disable */
<template>
  <div id="parent" :class="showpopup ? 'blur' : ''">
    <div class="container pt-5">
      <header class="d-flex align-items-baseline justify-content-between">
        <p class="text-center text-uppercase pointer fs-3 fw-bold">linkey</p>
        <div class="btn-parents">
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
          <div class="login" @click="menushower = !menushower" v-else>
            <button
              class="btn text-white text-center px-3 py-2 pointer text-capitalize"
            >
              {{ user.username }}
            </button>
            <Icon
              icon="icon-park-outline:down"
              class="me-2 pointer"
              width="22"
              height="22"
            />
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

            <div>
              <button
                class="btn px-3 py-2 btn-submit text-white none-responsive"
                @click="submit"
              >
                Shorten Now !
              </button>
              <button
                class="btn btn-submit text-white responsive d-none"
                @click="submit"
              >
                <Icon
                  icon="formkit:arrowright"
                  width="30"
                  class="icn-submit"
                  height="30"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 d-flex justify-content-center gap-3">
        <div id="toggle-parent ">
          <input
            type="checkbox"
            class="offscreen"
            name="copy-toggle"
            ref="checkbox"
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
      <table class="table mt-4 table-dark table-borderless none-responsive">
        <thead class="opacity-75">
          <tr class="">
            <th class="text-center text-capitalize fw-light">short link</th>
            <th class="text-center text-capitalize fw-light">orginal link</th>
            <th class="text-center text-capitalize fw-light">qr code</th>
            <th class="text-center text-capitalize fw-light">view</th>
            <th class="text-center text-capitalize fw-light">status</th>
            <th class="text-center text-capitalize fw-light">Edit</th>
          </tr>
        </thead>
        <tbody class="table-dark">
          <tr
            v-for="(x, i) in userlinks"
            @click="i == 4 ? goto('dashboard/links') : null"
            :key="x"
          >
            <th
              @click="copy"
              class="text-center text-capitalize fw-light opacity-100"
            >
              www.{{ x.shortlink }}.com
            </th>
            <th class="text-center text-capitalize fw-light opacity-100 trim">
              {{ x.fulllink }}
            </th>
            <th class="text-center text-capitalize fw-light opacity-100">
              <img
                src="../assets/img/qr code.png"
                alt=""
                class="pointer qr"
                @click="qrshow(x.fulllink)"
              />
            </th>
            <th class="text-center text-capitalize fw-light opacity-100">
              {{ x.view }}
            </th>
            <th class="text-center text-capitalize fw-light opacity-100 d-f">
              <div
                class="d-flex justify-content-center gap-2 pointer"
                @click="changestatus(x._id)"
              >
                <span class="">{{ x.status }}</span>
                <svg
                  v-if="x.status == 'active'"
                  width="27"
                  height="25"
                  viewBox="0 0 36 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.875"
                    width="35"
                    height="35"
                    rx="17.5"
                    fill="#1EB036"
                    fill-opacity="0.14"
                  />
                  <path
                    d="M26.3145 17.875L22.6523 21.5371C21.1875 23.002 18.8145 23.002 17.3789 21.5371C15.9727 20.1309 15.8848 17.9043 17.1738 16.4395L17.3496 16.2637C17.4961 16.0586 17.8184 16.0293 17.9941 16.2051C18.1992 16.3809 18.2285 16.6738 18.0527 16.8789L17.9062 17.0547C16.9395 18.168 16.998 19.8379 18.0234 20.8633C19.1367 21.9766 20.8945 21.9766 22.0078 20.8633L25.6406 17.2305C26.7539 16.1172 26.7539 14.3594 25.6406 13.2461C24.5566 12.1621 22.7695 12.1621 21.6855 13.2461L21.0117 13.9199C20.8359 14.0957 20.543 14.0957 20.3379 13.9199C20.1621 13.7148 20.1621 13.4219 20.3379 13.2461L21.0117 12.5723C22.4766 11.1074 24.8496 11.1074 26.3145 12.5723C27.7793 14.0371 27.7793 16.4102 26.3145 17.875ZM10.4062 17.875L14.0684 14.2422C15.5332 12.7773 17.877 12.7773 19.3711 14.2422C20.748 15.6191 20.8359 17.8457 19.5469 19.3398L19.3711 19.5156C19.2246 19.7207 18.9316 19.75 18.7266 19.5742C18.5215 19.3984 18.4922 19.1055 18.668 18.9004L18.8438 18.7246C19.7812 17.6113 19.7227 15.9414 18.6973 14.916C17.584 13.8027 15.8262 13.8027 14.7129 14.916L11.0801 18.5488C9.9668 19.6621 9.9668 21.4199 11.0801 22.5332C12.1641 23.6172 13.9512 23.6172 15.0352 22.5332L15.709 21.8594C15.8848 21.6836 16.1777 21.6836 16.3828 21.8594C16.5586 22.0352 16.5586 22.3574 16.3828 22.5332L15.709 23.1777C14.2441 24.6426 11.8711 24.6426 10.4062 23.1777C8.94141 21.7129 8.94141 19.3398 10.4062 17.875Z"
                    fill="#C9CED6"
                  />
                </svg>

                <svg
                  v-else
                  width="27"
                  height="25"
                  viewBox="0 0 36 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.875"
                    width="35"
                    height="35"
                    rx="17.5"
                    fill="#B0901E"
                    fill-opacity="0.19"
                  />
                  <path
                    d="M9.73242 10.4922L27.5742 24.5547C27.75 24.7012 27.8086 25.0234 27.6328 25.1992C27.4863 25.4043 27.1934 25.4629 26.9883 25.2871L9.17578 11.2246C8.9707 11.0781 8.91211 10.7559 9.08789 10.5801C9.23438 10.375 9.55664 10.3164 9.73242 10.4922ZM26.3145 17.875L24.1465 20.0723L23.4141 19.4863L25.6406 17.2305C26.7539 16.1172 26.7539 14.3594 25.6406 13.2461C24.5566 12.1621 22.7695 12.1621 21.6855 13.2461L21.0117 13.9199C20.8359 14.0957 20.543 14.0957 20.3379 13.9199C20.1621 13.7148 20.1621 13.4219 20.3379 13.2461L21.0117 12.5723C22.4766 11.1074 24.8496 11.1074 26.3145 12.5723C27.7793 14.0371 27.7793 16.4102 26.3145 17.875ZM21.1289 22.4746C19.8398 22.8555 18.4043 22.5625 17.3789 21.5371C16.5879 20.7461 16.207 19.6914 16.2949 18.6367L17.2617 19.3984C17.3496 19.9551 17.6133 20.4531 18.0234 20.8633C18.6094 21.4492 19.4004 21.7422 20.1621 21.6836L21.1289 22.4746ZM18.6973 14.916V14.8867C18.1113 14.3301 17.3203 14.0371 16.5586 14.0664L15.5918 13.3047C16.8809 12.9238 18.3457 13.2168 19.3418 14.2422C20.1328 15.0332 20.5137 16.0879 20.4551 17.1426L19.459 16.3809C19.3711 15.8242 19.1074 15.3262 18.6973 14.916ZM13.3359 16.293L11.0801 18.5488C9.9668 19.6621 9.9668 21.4199 11.0801 22.5332C12.1641 23.6172 13.9512 23.6172 15.0352 22.5332L15.709 21.8594C15.8848 21.6836 16.1777 21.6836 16.3828 21.8594C16.5586 22.0352 16.5586 22.3574 16.3828 22.5332L15.709 23.1777C14.2441 24.6426 11.8711 24.6426 10.4062 23.1777C8.94141 21.7129 8.94141 19.3398 10.4062 17.875L12.5742 15.707L13.3359 16.293Z"
                    fill="#B0901E"
                  />
                </svg>
              </div>
            </th>
            <th class="text-center text-capitalize fw-light opacity-100">
              <!-- <Icon
                icon="solar:trash-bin-2-outline"
                class="pointer"
                color="#fc345c"
                width="30"
                height="30"
              /> -->
              <!-- <Icon
                icon="uil:chart-line"
                width="30"
                height="30"
                class="pointer"
              /> -->
              <Icon
                icon="mdi:edit-outline"
                class="pointer"
                width="25"
                height="25"
                @click="changeurl(x._id)"
              />
            </th>
          </tr>
        </tbody>
      </table>
      <div class="responsive d-none mt-3">
        <div class="res-table-header d-flex align-items-center px-3">
          <p class="mt-3 text-white">Shorten Link</p>
        </div>
        <div
          class="res-table-body border-bottom py-2"
          v-for="x in userlinks"
          :key="x"
        >
          <div>
            <div class="d-flex justify-content-between align-items-center px-3">
              <span class="pt-2 fs-5">www.{{ x.shortlink }}</span>
              <div class="overflow-hidden d-flex gap-4 align-items-center pt-2">
                <img
                  src="../assets/img/qr code.png"
                  alt=""
                  class="pointer qr"
                  @click="qrshow(x.fulllink)"
                />
                <button
                  class="btn btn-more text-white responsive d-none rounded-circle"
                  @click="x.open = !x.open"
                >
                  <Icon
                    icon="mingcute:down-fill"
                    width="30"
                    class="icn-more"
                    height="30"
                  />
                </button>
              </div>
            </div>
          </div>

          <div class="mx-3" v-if="x.open">
            <hr class="mx-5" />
            <div class="hide-div d-flex justify-content-between">
            <div>
              <div class="">
                <span>Orginallink</span>
                <p>{{ x.fulllink }}</p>
              </div>
              <div>
                <span>view</span>
                <p class="">{{ x.view }}</p>
              </div>
            </div>
              <div
                class="d-flex flex-column justify-content-center align-items-center pb-3 gap-4 "
              >
                <svg
                  v-if="x.status == 'active'"
                  width="30"
                  height="30"
                  class="pointer"
                  viewBox="0 0 36 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="changestatus(x._id)"
                >
                  <rect
                    x="0.875"
                    width="35"
                    height="35"
                    rx="17.5"
                    fill="#1EB036"
                    fill-opacity="0.14"
                  />
                  <path
                    d="M26.3145 17.875L22.6523 21.5371C21.1875 23.002 18.8145 23.002 17.3789 21.5371C15.9727 20.1309 15.8848 17.9043 17.1738 16.4395L17.3496 16.2637C17.4961 16.0586 17.8184 16.0293 17.9941 16.2051C18.1992 16.3809 18.2285 16.6738 18.0527 16.8789L17.9062 17.0547C16.9395 18.168 16.998 19.8379 18.0234 20.8633C19.1367 21.9766 20.8945 21.9766 22.0078 20.8633L25.6406 17.2305C26.7539 16.1172 26.7539 14.3594 25.6406 13.2461C24.5566 12.1621 22.7695 12.1621 21.6855 13.2461L21.0117 13.9199C20.8359 14.0957 20.543 14.0957 20.3379 13.9199C20.1621 13.7148 20.1621 13.4219 20.3379 13.2461L21.0117 12.5723C22.4766 11.1074 24.8496 11.1074 26.3145 12.5723C27.7793 14.0371 27.7793 16.4102 26.3145 17.875ZM10.4062 17.875L14.0684 14.2422C15.5332 12.7773 17.877 12.7773 19.3711 14.2422C20.748 15.6191 20.8359 17.8457 19.5469 19.3398L19.3711 19.5156C19.2246 19.7207 18.9316 19.75 18.7266 19.5742C18.5215 19.3984 18.4922 19.1055 18.668 18.9004L18.8438 18.7246C19.7812 17.6113 19.7227 15.9414 18.6973 14.916C17.584 13.8027 15.8262 13.8027 14.7129 14.916L11.0801 18.5488C9.9668 19.6621 9.9668 21.4199 11.0801 22.5332C12.1641 23.6172 13.9512 23.6172 15.0352 22.5332L15.709 21.8594C15.8848 21.6836 16.1777 21.6836 16.3828 21.8594C16.5586 22.0352 16.5586 22.3574 16.3828 22.5332L15.709 23.1777C14.2441 24.6426 11.8711 24.6426 10.4062 23.1777C8.94141 21.7129 8.94141 19.3398 10.4062 17.875Z"
                    fill="#C9CED6"
                  />
                </svg>

                <svg
                  v-else
                  width="30"
                  height="30"
                  class="pointer"
                  viewBox="0 0 36 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="changestatus(x._id)"
                >
                  <rect
                    x="0.875"
                    width="35"
                    height="35"
                    rx="17.5"
                    fill="#B0901E"
                    fill-opacity="0.19"
                  />
                  <path
                    d="M9.73242 10.4922L27.5742 24.5547C27.75 24.7012 27.8086 25.0234 27.6328 25.1992C27.4863 25.4043 27.1934 25.4629 26.9883 25.2871L9.17578 11.2246C8.9707 11.0781 8.91211 10.7559 9.08789 10.5801C9.23438 10.375 9.55664 10.3164 9.73242 10.4922ZM26.3145 17.875L24.1465 20.0723L23.4141 19.4863L25.6406 17.2305C26.7539 16.1172 26.7539 14.3594 25.6406 13.2461C24.5566 12.1621 22.7695 12.1621 21.6855 13.2461L21.0117 13.9199C20.8359 14.0957 20.543 14.0957 20.3379 13.9199C20.1621 13.7148 20.1621 13.4219 20.3379 13.2461L21.0117 12.5723C22.4766 11.1074 24.8496 11.1074 26.3145 12.5723C27.7793 14.0371 27.7793 16.4102 26.3145 17.875ZM21.1289 22.4746C19.8398 22.8555 18.4043 22.5625 17.3789 21.5371C16.5879 20.7461 16.207 19.6914 16.2949 18.6367L17.2617 19.3984C17.3496 19.9551 17.6133 20.4531 18.0234 20.8633C18.6094 21.4492 19.4004 21.7422 20.1621 21.6836L21.1289 22.4746ZM18.6973 14.916V14.8867C18.1113 14.3301 17.3203 14.0371 16.5586 14.0664L15.5918 13.3047C16.8809 12.9238 18.3457 13.2168 19.3418 14.2422C20.1328 15.0332 20.5137 16.0879 20.4551 17.1426L19.459 16.3809C19.3711 15.8242 19.1074 15.3262 18.6973 14.916ZM13.3359 16.293L11.0801 18.5488C9.9668 19.6621 9.9668 21.4199 11.0801 22.5332C12.1641 23.6172 13.9512 23.6172 15.0352 22.5332L15.709 21.8594C15.8848 21.6836 16.1777 21.6836 16.3828 21.8594C16.5586 22.0352 16.5586 22.3574 16.3828 22.5332L15.709 23.1777C14.2441 24.6426 11.8711 24.6426 10.4062 23.1777C8.94141 21.7129 8.94141 19.3398 10.4062 17.875L12.5742 15.707L13.3359 16.293Z"
                    fill="#B0901E"
                  />
                </svg>
                <Icon
                  icon="mdi:edit-outline"
                  class="pointer"
                  width="25"
                  height="25"
                  @click="changeurl(x._id)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <popup v-if="showpopup" @closepopup="showpopup = false" :url="qrurl" />
  <menupopup @closepopup="menushower = false" v-if="menushower"></menupopup>
</template>

<script>
import login from "./Login.vue";
import popup from "./qrcodepopup.vue";
import menupopup from "./menu.vue";
import { Icon } from "@iconify/vue";

import Data from "../../default";
import axios from "axios";
import Swal from "sweetalert2";

const apiadress = Data.Api_Adress;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  theme: "dark",
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
export default {
  /* eslint-disable */
  name: "home",
  beforeMount() {
    const jwt = login.methods.getcookies("jwt");
    jwt ? (this.login = true) : (this.login = false);
    if (jwt) {
      this.getdata();
    }
  },
  components: {
    Icon,
    popup,
    menupopup,
  },
  data() {
    return {
      autocopy: true,
      login: true,
      user: {},
      userlinks: [],
      showpopup: false,
      qrurl: "",
      menushower: false,
    };
  },
  methods: {
    submit: function () {
      const jwt = login.methods.getcookies("jwt");
      if (jwt) {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if (this.$refs.urlinp.value && urlRegex.test(this.$refs.urlinp.value)) {
        axios
          .post(`${apiadress}shortlink`, {
            creator: { userid: this.user._id, username: this.user.username },
            fulllink: this.$refs.urlinp.value,
          })
          .then((res) => {
            if (res.data.msg == "Link saved") {
              Toast.fire({
                icon: "success",
                title: `${res.data.msg}`,
              });
              this.$refs.checkbox.checked
                ? navigator.clipboard.writeText(this.$refs.urlinp.value)
                : null;
              this.$refs.urlinp.value = "";
              this.getdata();
            } else if (res.data.msg == "This link was created") {
              Toast.fire({
                icon: "error",
                title: `${res.data.msg}`,
              });
            }
          });
      } else {
        Toast.fire({
          icon: "error",
          title: `Please fill the input`,
        });
      }
        
      }else{
        Toast.fire({
                icon: "error",
                title: `You shold login first`,
                
              });
      }
    },
    goto: function (e) {
      location.href = e;
    },
    getdata: function () {
      const jwt = login.methods.getcookies("jwt");
      axios.get(`${apiadress}home/user/${jwt}`).then((res) => {
        this.user = res.data;
        if (window.innerWidth <= 767) {
          this.user.links = this.user.links.slice(0, 3);
          this.userlinks = [];
          this.user.links.forEach((e) => {
            axios.get(`${apiadress}home/link/${e.id}`).then((res) => {
              this.userlinks.push(res.data);
              this.userlinks.forEach((e) => {
                return (e.open = false);
              });
            });
          });
        } else {
          this.user.links = this.user.links.slice(0, 5);
          this.userlinks = [];
          this.user.links.forEach((e) => {
            axios.get(`${apiadress}home/link/${e.id}`).then((res) => {
              this.userlinks.push(res.data);
            });
          });
        }
      });
    },

    copy: function (e) {
      navigator.clipboard.writeText(e.target.innerHTML);
    },

    changestatus: function (id) {
      axios.get(`${apiadress}link/changestatus/${id}`).then((res) => {
        if (res.data) {
          this.getdata();
        }
      });
    },
    changeurl: function (id) {
      Swal.fire({
        title: "Enetr your new orginal link",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        preConfirm: (val) => {
          const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
          if (urlRegex.test(val)) {
            axios
              .post(`${apiadress}link/changeurl`, {
                url: val,
                id,
              })
              .then((res) => {
                if (res.data) {
                  this.getdata();
                }
              });
          } else {
            Swal.showValidationMessage(`
       'URL invalid'
      `);
          }
        },
 
      });
    },
    qrshow: function (url) {
      this.qrurl = url;
      this.showpopup = true;
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
.trim {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}
tbody :nth-child(5):not(th) {
  filter: blur(3px);
  opacity: 0.2;
  cursor: pointer;
}
tbody tr :nth-child(1):not() {
  cursor: copy;
}
.img-active {
  width: 25px;
}
.qr {
  height: 27px;
}
.blur {
  filter: blur(5px);
}
.btn:focus {
  outline: none !important ;
  box-shadow: none !important ;
}

@media screen and (max-width: 767px) {
  * {
    overflow-x: hidden;
  }
  .register {
    display: none;
  }
  header {
    margin: 0 !important;
  }
  h2 {
    text-align: center;
    font-size: 30px;
    /* width: 330.433px; */
  }
  h2 + p {
    font-size: 16px;
  }
  .searchbox {
    width: 450px;
    height: 60px;
  }
  input[type="text"] {
    width: 345px;
  }
  .none-responsive {
    display: none;
  }
  .responsive {
    display: block !important;
  }
  .btn-submit {
    box-shadow: none;
    width: 50px;
  }
  .icn-submit {
    margin-left: -3px;
  }
}
.res-table-header {
  border-radius: 10px 10px 0px 0px;
  background: #181e29;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(14px);
  height: 60px;
}
.res-table-body {
  backdrop-filter: blur(10px);
  background: #181e2963;
  /* height: 50px; */
  overflow: hidden;
}
.btn-more {
  width: 30px;
  height: 30px;
  padding: 0;
  background-color: #144ee3;
}
.icn-more {
  width: 100%;
  height: 100%;
}
.hide-div span {
  opacity: 0.8;
}
.hide-div p {
  max-width: 350px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
