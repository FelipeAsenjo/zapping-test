<template>
    <div class="overlay fade-in">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(black, transparent, black);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>