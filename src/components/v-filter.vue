<template>
  <div class="filter">
    <div class="filter__item">
      <div @click="openFilter" class="filter__title">
        <div>{{ selected }}</div>
        <img
          src="../assets/arrow-icon.svg"
          class="filter__icon"
          :class="{ rotate: isFilterVisible }"
        />
      </div>
      <div class="filter__hidden" v-if="isFilterVisible">
        <div class="filter__search">
          <input
            type="text"
            @input="updateInput"
            class="filter__input"
            placeholder="type..."
          />
        </div>
        <div
          v-for="option in options"
          :key="option.index"
          @click="selectOption(option)"
          class="filter__option"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-filter",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: String,
      default: 'Type',
    },
    isFilterVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    selectOption(option) {
      this.$emit("select", option);
    },
    openFilter() {
      this.$emit("openFilter");
    },
    hideFilter() {
      this.$emit("hideFilter");
    },
    updateInput(event) {
      this.$emit("searchQuery", event.target.value);
    },
  },
};
</script>

<style lang="scss">
.filter {
  width: 25%;
  min-width: 20rem;
  font-size: 1.6rem;
  margin-right: 3rem;
  background: #fafafa;
  &__item {
    width: 100%;
  }
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 2.4rem;
    background: #ececec;
    margin-bottom: 0.3rem;
  }
  &__hidden {
    background: #ececec;
    padding: 1rem;
  }
  &__search {
    background: #dddddd;
    margin-bottom: 1rem;
    padding: 1.6rem 1rem;
  }
  &__input {
    border: none;
    color: #969696;
    outline: none;
    background: inherit;
    width: 100%;
    height: 100%;
  }
  &__option {
    padding: 1rem 1.4rem;
    background: #e9e7e7;
    cursor: pointer;
    margin-bottom: 1px;
    word-wrap: break-word;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__icon {
    transition: transform 0.1s;
    &.rotate {
      transform: rotate(180deg);
    }
  }
}
@media (max-width: 768px) {
  .filter {
    min-width: 12rem;
    width: 100%;
    position: sticky;
    top: 0;
    margin-right: 0;
  }
}
</style>