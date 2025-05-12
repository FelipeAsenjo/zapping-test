<template>
    <div class="overlay fade-in">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(90deg, black, transparent, black);
  z-index: 1200;
}
</style>