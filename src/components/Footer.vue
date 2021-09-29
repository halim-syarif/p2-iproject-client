<template>
  <div class="footer-h8 bottom-0 relative z-10">
    <div class="footer-h8-left">
      <img
        src="https://i.postimg.cc/Y2NMhk3W/Logo-Hacktiv8-bordered-1.png"
        alt=""
        class="logo-hacktiv8 img-logo"
      />
    </div>
    <div class="footer-h8-bottom-row flex flex-row">
      <div class="social-link">
        <a
          href="https://twitter.com/hacktiv8id"
          target="_blank"
          class="social-link hover-link w-inline-block"
          ><img
            src="https://img.icons8.com/metro/26/ffffff/twitter.png"
            alt=""
            class="social-link-image"/></a
        >
      </div>
      <div class="social-link">
        <a
          href="https://www.facebook.com/hacktiv8id"
          target="_blank"
          class="social-link hover-link w-inline-block"
          ><img
            src="https://img.icons8.com/metro/26/ffffff/facebook-new--v2.png"
            alt=""
            class="social-link-image"/></a
        >
      </div>
      <div class="social-link">
          <a
          href="https://instagram.com/hacktiv8id"
          target="_blank"
          class="social-link hover-link w-inline-block"
          ><img
            src="https://img.icons8.com/metro/26/ffffff/instagram-new.png"
            alt=""
            class="social-link-image"/></a
        >
      </div>
      <div class="social-link"><a
          href="https://www.youtube.com/c/hacktiv8"
          target="_blank"
          class="social-link hover-link w-inline-block"
          ><img
            src="https://img.icons8.com/metro/26/ffffff/youtube.png"
            class="social-link-image"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hacktiv-footer"
};
</script>

<style scoped>
.footer-h8 {
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  background-color: #000;
  border-top: 1px solid #e6eaea;
}

.footer-h8-bottom-row {
  margin-right: 20px;
  margin-bottom: -20px;
}
.footer-h8-bottom-links {
  justify-content: space-between;
  color: #a59e9c;
  font-size: 15px;
}

.logo-hacktiv8 {
  max-width: 100px;
  padding: 20px;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
}
.social-link {
  margin-right: 20px;
  color: #7d7e7e;
}

.social-link-image:hover {
  animation: rotation 8s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
.img-logo {
  transition: transform 0.7s ease-in-out;
}
.img-logo:hover {
  transform: rotate(360deg);
}
</style>
