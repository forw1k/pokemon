<template>
  <div class="card-item">
    <img :src="card.images.small" class="card-item__pic" />
  </div>
</template>

<script>
export default {
  name: "v-card",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.card-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.25);
  }
  &__pic {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
@media (max-width: 768px) {
  .card-item {
    &:hover {
      transform: none;
    }
  }
}
</style>