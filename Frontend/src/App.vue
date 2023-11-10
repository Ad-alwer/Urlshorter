<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@font-face {
  font-family: "Sf pro";
  font-style: normal;
  font-weight: 400;
  src: local(""),
    url("./assets/fonts/SFPRODISPLAYMEDIUM.OTF") format("opentype");
}

:root {
  --red: #ff5e8e !important;
}

* {
  font-family: "Sf pro";
}
.pointer {
  cursor: pointer;
}
</style>
