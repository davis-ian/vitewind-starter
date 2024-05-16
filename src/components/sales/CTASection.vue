<template>
  <div class="flex flex-col items-center gap-8 md:gap-12">
    <div class="text-center">
      <h2 class="mb-4 mt-4 text-3xl font-bold md:mb-8 md:text-5xl">
        <slot></slot>
      </h2>
      <p class="text-lg text-base-content/80">
        Don't waste time on Stripe subscriptions or designing a pricing
        section...
      </p>
    </div>
    <button class="group btn btn-primary btn-wide">
      <font-awesome-icon icon="fa-solid fa-bolt"></font-awesome-icon>
      <span> Get ViteFast </span>
    </button>
  </div>
</template>
