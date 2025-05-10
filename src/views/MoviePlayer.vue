<template>
  <main class="movie_player--page">
    <div class="movie_player--player">

      <img src="../assets/images/playing-movie_bg_image.webp" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.movie_player--page {
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: $color-black;
}

.movie_player--player {
  height: 80%;
}
</style>
