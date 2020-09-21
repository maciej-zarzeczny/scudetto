<template>
  <div class="footer">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="is-pulled-right">
            <p>
              <a href="mailto:contact@scudetto.store" class="email-address">contact@scudetto.store</a>
            </p>
            <p>
              <a href="tel:+48788863434" class="phone-number">+48 788 863 434</a>
            </p>
            <p>
              <a href="tel:+48788863434" class="phone-number">+48 600 372 555</a>
            </p>
          </div>
        </div>
        <div class="column">
          <div class="buttons are-small">
            <a
              target="_blank"
              href="https://www.facebook.com/Scudetto-1127607537444039/?modal=admin_todo_tour"
            >
              <i class="fab fa-facebook social-icon"></i>
            </a>
            <a target="_blank" href="https://www.instagram.com/scudetto.store/">
              <i class="fab fa-instagram social-icon"></i>
            </a>
            <a target="_blank" href="https://www.pinterest.com/scudettovests">
              <i class="fab fa-pinterest social-icon"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-separator-container">
        <div class="footer-separator"></div>
      </div>

      <div class="footer-menu-container">
        <ul class="footer-menu">
          <li class="footer-menu-item">
            <a href="/terms">Regulamin zwroty i reklamacje</a>
          </li>

          <li class="footer-menu-item">
            <a href="/company-info">Dane firmy</a>
          </li>
        </ul>
      </div>
      <div class="company-name">
        <p>Scudetto &reg;</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer-menu-container {
  display: flex;
  justify-content: center;
  padding: 25px 0;

  .footer-menu .footer-menu-item {
    display: inline-block;
    padding: 0 20px;
    font-size: 18px;

    a {
      color: white;
    }

    &:hover {
      font-weight: bold;
      cursor: pointer;
    }
  }
}

.footer-separator-container {
  display: flex;
  justify-content: center;
  padding: 25px 0;

  .footer-separator {
    width: 10%;
    height: 2px;
    background-color: white;
  }
}

.footer {
  background-color: #1a1a1a;
  color: white;
}
.email-address {
  font-weight: bold;
  color: white;
}
.email-address:hover {
  color: white;
  opacity: 0.8;
}
.phone-number {
  font-weight: bold;
  color: white;
}
.phone-number:hover {
  opacity: 0.8;
  color: white;
}
.social-icon {
  margin-left: 10px;
  font-size: 30pt;
  color: white;
}
.social-icon:hover {
  cursor: pointer;
  opacity: 0.8;
}
.company-name {
  display: flex;
  justify-content: center;
}
.footer {
  margin: 0;
  padding-top: 100px;
  padding-bottom: 20px;
}
</style>
