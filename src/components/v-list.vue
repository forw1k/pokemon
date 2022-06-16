<template>
  <div class="content__item">
    <div class="card-list">
      <vCard v-for="card in cards" :key="card.id" :card="card" />
    </div>
    <div v-if="type === 'Type'" class="pagination">
      <div
        v-for="currentPage in totalPages"
        :key="currentPage"
        class="page"
        :class="{ 'current-page': PAGE === currentPage }"
        @click="setPage(currentPage)"
      >
        {{ currentPage }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import vCard from "@/components/v-card";
export default {
  name: "card-list",
  components: {
    vCard,
  },
  computed: {
    ...mapState(["totalPages", "type"]),
    ...mapGetters(["PAGE", "PAGE_SIZE"]),
  },
  methods: {
    ...mapActions(["FETCH_MORE_CARDS"]),
    ...mapMutations(["SET_PAGE"]),
    setPage(currentPage) {
      this.$store.commit("SET_PAGE", currentPage);
    },
  },
  props: {
    cards: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.card-list {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  background: #fafafa;
  padding: 0 2rem 2rem 2rem;
}
.pagination {
  display: flex;
  justify-content: center;
  background: #ebebeb;
}
.page {
  padding: 0.5rem;
  font-size: 1.6rem;
  cursor: pointer;
}
.current-page {
  font-weight: bold;
}
@media (max-width: 768px) {
  .card-list {
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 450px) {
  .card-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>