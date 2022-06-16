<template>
  <div class="container">
    <div class="content">
      <v-filter
        :selected="TYPE"
        :isFilterVisible="IS_FILTER_VISIBLE"
        :options="TYPES"
        :value="searchQuery"
        @input="searchStr"
        @openFilter="openFilter(IS_FILTER_VISIBLE)"
        @select="optionSelect"
      />
      <v-list :cards="FILTERED_CARDS" />
    </div>
    <div v-if="isLoaded" class="preloader">
      <img src="../assets/loading-icon.svg" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import vList from "@/components/v-list";
import VFilter from "@/components/v-filter";
export default {
  components: {
    vList,
    VFilter,
  },
  computed: {
    ...mapState(["totalPages", "pageSize", "page", "searchQuery", "isLoaded"]),
    ...mapGetters([
      "CARDS",
      "TYPES",
      "TYPE",
      "IS_FILTER_VISIBLE",
      "FILTERED_CARDS",
    ]),
  },
  methods: {
    ...mapActions(["FETCH_CARDS", "FETCH_TYPES"]),
    ...mapMutations([
      "SET_TOTAL_PAGES",
      "SET_TYPE",
      "SET_FILTERED_CARDS",
      "SET_SEARCH_QUERY",
    ]),
    optionSelect(option) {
      this.$store.commit("SET_TYPE", option);
      this.$store.commit("SET_PAGE", 1);
      this.$store.commit(
        "SET_TOTAL_PAGES",
        Math.ceil(this.FILTERED_CARDS.length / this.pageSize)
      );
      this.$store.commit("SET_IS_FILTER_VISIBLE", false);
      this.$store.commit("SET_SEARCH_QUERY", "");
    },
    openFilter(IS_FILTER_VISIBLE) {
      this.$store.commit("SET_IS_FILTER_VISIBLE", !IS_FILTER_VISIBLE);
    },
    searchStr(event) {
      this.$store.commit("SET_SEARCH_QUERY", event.target.value);
    },
  },
  mounted() {
    if (this.CARDS.length === 0) {
      this.FETCH_CARDS();
    }
    this.FETCH_TYPES();
  },
};
</script>

<style lang="scss">
.content {
  display: flex;
  padding-top: 6rem;
  &__item {
    width: 100%;
  }
}
.preloader {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(211, 211, 211, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    padding-top: 0;
  }
}
</style>