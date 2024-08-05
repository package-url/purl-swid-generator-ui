<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title">{{ title }}</span>
        <span class="close" @click="close">&times;</span>
      </div>
      <div class="modal-body">
        {{ packageUrl }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    packageUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.6); /* Black w/ opacity */
}

.modal-content {
  background-color: #25374f;
  margin: 15% auto; /* 15% from the top and centered */
  border: 1px solid #313d4f;
  width: 80%; /* Could be more or less, depending on screen size */
  border-radius: 5px;
  overflow: hidden;
}

.modal-header {
  padding: 10px;
  background-color: #0093ee;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 18px;
}

.close {
  color: white;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
  color: #ffffff;
}
</style>
