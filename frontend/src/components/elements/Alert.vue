<template>
  <div v-if="getAlert.isShow" class="display-flex flex-12 alert" :class="color">
    <p>
      {{ getAlert.text }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  computed: {
    ...mapGetters(['getAlert']),
    color() {
      switch (this.getAlert.color) {
        case 'danger':
          return 'alert-warning';
        default:
          return 'alert-confirm';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .alert {
    position: relative;
    opacity: .7;
    top: 60%;
    margin: 0 auto;
    width: 300px;
    padding: 10px;
    border-radius: 3px;
    box-shadow: 0 1px 4px 0 rgba(196,196,196,0.5);
    z-index: 1;
    word-wrap: break-word;
    & > p {
      text-align: left;
      font-size: 15px;
      color: $dark;
      line-height: 1.2;
    }
  }
</style>
