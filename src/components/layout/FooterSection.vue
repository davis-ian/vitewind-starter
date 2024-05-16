<template>
  <div>
    <footer class="footer p-10 text-base-content">
      <nav>
        <h6 class="footer-title">Services</h6>
        <a class="link-hover link">Branding</a>
        <a class="link-hover link">Design</a>
        <a class="link-hover link">Marketing</a>
        <a class="link-hover link">Advertisement</a>
      </nav>
      <nav>
        <h6 class="footer-title">Company</h6>
        <a class="link-hover link">About us</a>
        <a class="link-hover link">Contact</a>
        <a class="link-hover link">Jobs</a>
        <a class="link-hover link">Press kit</a>
      </nav>
      <nav>
        <h6 class="footer-title">Legal</h6>
        <a class="link-hover link">Terms of use</a>
        <a class="link-hover link">Privacy policy</a>
        <a class="link-hover link">Cookie policy</a>
      </nav>
      <div>
        <h6 class="footer-title">Newsletter</h6>
        <fieldset class="form-control w-80">
          <label class="label">
            <span class="label-text">Enter your email address</span>
          </label>
          <div class="join">
            <input
              type="text"
              placeholder="username@site.com"
              class="input join-item input-bordered"
              v-model="userEmail"
            />
            <button @click="submitUserEmail" class="btn btn-primary join-item">
              Subscribe
            </button>
          </div>
        </fieldset>
      </div>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const userEmail = ref<string | null>(null);

const submitUserEmail = () => {
  //TODO:
  //HANDLE USER EMAIL SAVE

  userEmail.value = null;
  alert('Subscribed to newsletter');
};
</script>
<style></style>
