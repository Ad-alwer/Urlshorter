<template>
  <div id="parent">
    <div class="child shadow">
      <h2 class="text-center fw-bold">Log in</h2>

      <div class="mt-4 d-flex flex-column gap-2">
        <label for="Username" class="ps-2 text-capitalize"
          >Username / Email
        </label>
        <input
          type="text"
          ref="usernameinp"
          class="form-control"
          id="Username"
        />
      </div>

      <div class="mt-3 d-flex flex-column gap-2">
        <label for="password" class="ps-2 text-capitalize">Password</label>
        <div class="d-flex">
          <input
            class="form-control"
            :type="eyeicn ? 'Password' : 'text'"
            ref="passwordinp"
          />
          <Icon
            :icon="eyeicn ? 'solar:eye-broken' : 'ph:eye-slash-light'"
            @click="eyeicn = !eyeicn"
            class="eye-pass"
            color="#144ee3"
            width="25"
            height="25"
          />
        </div>
      </div>
      <div class="form-check mt-3">
        <input
          class="form-check-input"
          type="checkbox"
          ref="remember"
          value=""
          id="remember"
        />
        <label class="form-check-label ms-1" for="remember">
          Remember me
        </label>
      </div>
      <div class="mt-3 d-flex justify-content-center">
        <button class="btn px-3 py-2 btn-submit" @click="submit">Submit</button>
      </div>
      <p class="mt-3 text-center p-footer" @click="register">Create account</p>
    </div>
  </div>
</template>

<script>
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
  customClass: { title: 'center-toast',},
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default {
  beforeMount() {
    this.removecookies(150, this.getcookies("jwt"));
  },
  data() {
    return {
      eyeicn: false,
    };
  },
  components: {
    Icon,
  },
  methods: {
    register: function () {
      location.href = "/register";
    },
    submit: function () {
       
      if (this.$refs.usernameinp.value && this.$refs.passwordinp.value) {
        const regexusername =
          /^(?=.{4,12}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
        axios
          .post(`${apiadress}login`, {
            which: regexusername.test(this.$refs.usernameinp.value)
              ? "username"
              : "email",
            username: this.$refs.usernameinp.value,
            password: this.$refs.passwordinp.value,
          })
          .then((res) => {
            
            if (res.data.token) {
             
              this.setcookies(this.$refs.remember.checked ? 10 : 'session', res.data.token);
              Swal.fire({
                icon: "success",
                title: "Welcome back",
                showConfirmButton: false,
                timer: 1200,
              });
             
              setTimeout(() => {
                location.href = "/";
              }, 500);
            }else if(res.data.msg){
              Toast.fire({
                icon: "error",
                title: `${res.data.msg}`,
              });
            }
          });
      } else {
        Toast.fire({
          icon: "error",
          title: `Please fill all inputs correct`,
        });
      }
    },
    setcookies: function (expireday, value) {
      let now;
      if (expireday == "session") {
        now = "session";
      } else {
        now = new Date();

        now.setTime(now.getTime() + expireday * 24 * 60 * 60 * 1000);
      }

      document.cookie = `jwt=${value};path=/;expires=${now}`;
    },
    getcookies: function (cookiename) {
      let cookiesArray = document.cookie.split(";");

      let mainCookie = null;

      cookiesArray.some((cookie) => {
        if (cookie.includes(cookiename)) {
          mainCookie = cookie.substring(cookie.indexOf("=") + 1);
          return true;
        }
      });

      return mainCookie;
    },
    removecookies: function (expireday, value) {
      const now = new Date();

      now.setTime(now.getTime() - expireday * 24 * 60 * 60 * 1000);

      document.cookie = `jwt=${value};path=/;expires=${now}`;
    },
  },
};
</script>

<style scoped>
* {
  letter-spacing: 1.3px;
}
#parent {
  background-color: #0b101b;
  min-width: 100%;
  min-height: 100vh;
  color: aliceblue;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
}
.child {
  position: relative;
  padding: 20px;
  padding-bottom: 5px !important;

  background: rgba(87, 85, 85, 0.26);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.6px);
  -webkit-backdrop-filter: blur(8.6px);
  border: 1px solid rgba(0, 0, 0, 0.4);
}
h2 {
  background: linear-gradient(
    90deg,
    #144ee3 -0.02%,
    #eb568e 38.86%,
    #a353aa 44.49%,
    #144ee3 80.67%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}
.btn-submit {
  color: white;
  border: 1px solid #144ee3;
  background: #144ee3;
  box-shadow: 10px 9px 22px 0px rgba(20, 78, 227, 0.38);
}
input[type="text"],
input[type="text"]:active,
input[type="text"]:focus,
input[type="text"]:active,
input[type="text"]:enabled {
  background-color: #0b101b !important;
  border: none !important;
  caret-color: #b654a2 !important;
  width: 290px !important;
  color: white !important;
}
input[type="password"],
input[type="password"]:active,
input[type="password"]:focus,
input[type="password"]:active,
input[type="password"]:enabled {
  background-color: #0b101b !important;
  border: none !important;
  caret-color: #b654a2 !important;
  width: 290px !important;
  color: white !important;
}
input[type=checkbox]{
    background-color: #0b101b !important;
    border: none !important
}
.p-footer {
  background: radial-gradient(
    12441.24% 70.1% at 5.56% 89.01%,
    #eb568e 0%,
    #144ee3 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
}
.eye-pass {
  margin-left: -32px;
  margin-top: 5px;
  cursor: pointer;
}
.span {
  font-size: 12px;
}
.center-toast {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
