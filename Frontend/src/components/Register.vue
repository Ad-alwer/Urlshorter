<template>
  <div id="parent">
    <div class="child shadow">
      <h2 class="text-center fw-bold">Register</h2>

      <div class="mt-4 d-flex flex-column gap-2">
        <label for="Username" class="ps-2 text-capitalize">Username </label>
        <input
          type="text"
          ref="usernameinp"
          class="form-control"
          id="Username"
          @keyup="checkusername"
        />

        <span class="span ms-1" ref="spanusername"></span>
      </div>
      <div class="mt-2 d-flex flex-column gap-2">
        <label for="email" class="ps-2 text-capitalize">email</label>
        <input
          type="email"
          ref="emailinp"
          class="form-control"
          id="email"
          @keyup="checkemail"
        />

        <span class="span ms-1" ref="spanemail"></span>
      </div>
      <div class="mt-2 d-flex flex-column gap-2">
        <label for="password" class="ps-2 text-capitalize">Password</label>
        <div class="d-flex">
          <input
            class="form-control"
            :type="eyeicn ? 'Password' : 'text'"
            @keyup="checkpassword"
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

        <span class="span ms-1" ref="spanpassword"></span>
      </div>
      <div class="mt-2 d-flex justify-content-center">
        <button class="btn px-3 py-2 btn-submit" @click="submit">Submit</button>
      </div>
      <p class="mt-3 text-center p-footer" @click="login">Log in</p>
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
    checkusername: function (e) {
      const regexusername =
        /^(?=.{4,12}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
      if (regexusername.test(e.target.value)) {
        setTimeout(() => {
          axios
            .get(`${apiadress}Register/checkusername/${e.target.value}`)
            .then((res) => {
              if (res.data.msg == "Availabe") {
                this.$refs.spanusername.innerHTML = res.data.msg;
                this.$refs.spanusername.style.color = "green";
              } else {
                this.$refs.spanusername.innerHTML = res.data.msg;
                this.$refs.spanusername.style.color = "var(--red)";
              }
            });
        }, 200);
      } else {
        this.$refs.spanusername.innerHTML = "Username incorrect";
        this.$refs.spanusername.style.color = "var(--red)";
      }
    },
    checkemail: function (e) {
      /* eslint-disable */
      const mailregex =
        /^[a-z0-9]+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*@gmail\.com$/;
      if (mailregex.test(e.target.value)) {
        setInterval(() => {
          axios
            .get(`${apiadress}Register/checkemail/${e.target.value}`)
            .then((res) => {
              if (res.data.msg == "Availabe") {
                this.$refs.spanemail.innerHTML = res.data.msg;
                this.$refs.spanemail.style.color = "green";
              } else {
                this.$refs.spanemail.innerHTML = res.data.msg;
                this.$refs.spanemail.style.color = "var(--red)";
              }
            });
        }, 200);
      } else {
        this.$refs.spanemail.innerHTML = "Enail incorrect";
        this.$refs.spanemail.style.color = "var(--red)";
      }
    },
    checkpassword: function (e) {
      const passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (passwordregex.test(e.target.value)) {
        this.$refs.spanpassword.innerHTML = "Strong";
        this.$refs.spanpassword.style.color = "green";
      } else {
        this.$refs.spanpassword.innerHTML = "Password incorrect";
        this.$refs.spanpassword.style.color = "var(--red)";
      }
    },
    login: function () {
      location.href = "/login";
    },
    submit: function () {
      if (
        this.$refs.spanemail.style.color == "green" &&
        this.$refs.spanpassword.style.color == "green" &&
        this.$refs.spanusername.style.color == "green"
      ) {
        axios
          .post(`${apiadress}Register`, {
            username: this.$refs.usernameinp.value,
            email: this.$refs.emailinp.value,
            password: this.$refs.passwordinp.value,
          })
          .then((data) => {
            axios
              .post(`${apiadress}Register`, {
                username: this.$refs.usernameinp.value,
                email: this.$refs.emailinp.value,
                password: this.$refs.passwordinp.value,
              })
              .then((data) => {
                this.setcookies("session", data.data.token);
                Swal.fire({
                  icon: "success",
                  title: "Welcome",
                  showConfirmButton: false,
                  timer: 1200,
                });
                location.href = "/";
                setTimeout(() => {
                  location.href = "/";
                }, 500);
              });
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
input,
input:active,
input:focus,
input:active,
input:enabled {
  background-color: #0b101b !important;
  border: none !important;
  caret-color: #b654a2 !important;
  width: 290px !important;
  color: white !important;
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
</style>
