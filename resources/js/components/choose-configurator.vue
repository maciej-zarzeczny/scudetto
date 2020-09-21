<template>
  <div class="choose-container container">
    <div class="columns is-vcentered choose-columns">
      <div class="column has-text-centered">
        <a href="/configurator/male">
          <div class="card choose-card">
            <div class="card-image choose-card-image">
              <figure class="image">
                <img src="/images/page/male_creator.png" alt="Male creator" />
              </figure>
            </div>
            <div class="card-content title">{{ $t('messages.m_creator') }}</div>
          </div>
        </a>
      </div>

      <div class="column has-text-centered">
        <a href="/configurator/female">
          <div class="card choose-card">
            <div class="card-image choose-card-image">
              <figure class="image">
                <img src="/images/page/female_creator.png" alt="Female creator" />
              </figure>
            </div>
            <div class="card-content title">{{ $t('messages.w_creator') }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~@/_bulma-variables";
@import "~@/_variables";

.choose-container {
  padding: 0 2% 0 2%;
}

.choose-columns {
  min-height: calc(100vh - 96px);
  margin-top: 96px;
}

.choose-card {
  background-color: transparent !important;
}

.choose-card-image {
  display: flex !important;
  justify-content: center !important;

  .image {
    max-width: 60%;
  }
}

.choose-card:hover {
  cursor: pointer;
  transform: scale(1.01);
  opacity: 0.9;
  transition: all 0.2s ease-in-out;
}

.card-content.title {
  font-size: 1.5rem;
  color: #1a1a1a;
  font-weight: 400;
}
</style>