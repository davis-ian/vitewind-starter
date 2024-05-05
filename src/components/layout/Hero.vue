<template>
  <div>
    <div class="hero">
      <div class="hero-content text-center">
        <div>
          <h1 class="text-5xl font-bold">Ship your startup</h1>
          <h1 class="text-5xl font-bold">in days, not weeks</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button class="btn btn-primary btn-wide">
            <font-awesome-icon icon="fa-solid fa-bolt"></font-awesome-icon>
            <span> Get Started </span>
          </button>
        </div>
      </div>
    </div>
    <div>
      <featured-on></featured-on>
    </div>
  </div>
</template>

<script setup>
import FeaturedOn from '@/components/FeaturedOn.vue'
</script>
