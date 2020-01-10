<template>
  <div>
    <header class="px-12 py-8">
      <g-link to="/">
        <h2 class="text-2xl font-bold font-serif text-gray-700 hover:text-gray-900">amishDev</h2>
      </g-link>

    </header>
    <slot/>
  </div>
</template>

<script>
  import config from '~/.temp/config.js';

  export default {
    computed: {
      config() {
        return config
      }
    }
  }
</script>

<style src="~/assets/css/main.css"></style>
