<template>
  <Cards />
</template>

<script>
import Cards from "@/pages/Cards";
export default {
  name: "my-app",
  components: {
    Cards,
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
html {
  font-size: 10px;
}
a {
  text-decoration: none;
  color: #000;
}
#app {
  width: 100%;
  min-height: 100vh;
  margin: auto;
}
.container {
  margin: auto;
  max-width: 140rem;
}
</style>