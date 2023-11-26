<template>
  <div class="container pointer">
    <a href="/" class="d-flex justify-content-center w-100 h-100 parent">
      <img src="../assets/img/404.png" class="img-fluid" alt="" />
    </a>
  </div>
</template>

<style scoped>
.parent {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0E131E;
}
img {
  width: 60%;
}



@media screen and (max-width: 767px) {
    img{
        width: 90%;
    }
}

</style>
