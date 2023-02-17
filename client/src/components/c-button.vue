<template>
  <button class="button reset">
    <slot />
  </button>
</template>

<style scoped>
.button {
  --button-height: 35px;
  --button-width: auto;

  display: inline-block;
  width: var(--button-width);
  height: var(--button-height);
  padding: 0 20px;
  border: 1px solid rgb(0 0 0 / 10%);
  border-radius: 4px;

  color: #ffffff;
  font-weight: bold;
  text-align: center;

  background-color: var(--color-brand);
}

.button:hover {
  box-shadow: 0 0.6em 1.2em -0.6em rgb(0 0 0 / 20%);
  filter: brightness(110%);
}

.button:active {
  filter: brightness(95%);
}

.button:disabled {
  color: #000000;

  background-color: rgb(0 0 0 / 2%);

  pointer-events: none;
}
</style>
