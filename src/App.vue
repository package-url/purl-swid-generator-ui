<template>
  <div id="app">
    <div class="content-container">
      <InstructionPanel></InstructionPanel>
      <div class="separator"></div>
      <FormPanel></FormPanel>
    </div>
  </div>
</template>

<script>
import InstructionPanel from "@/components/InstructionPanel.vue";
import FormPanel from "@/components/FormPanel.vue";

export default {
  components: {
    InstructionPanel,
    FormPanel
  }
};
</script>

<style scoped>
#app {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.content-container {
  display: flex;
  flex: 1;
  padding: 0;
}
.separator {
  width: 2px;
  background-color: #171e29;
}
@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }
  .separator {
    height: 2px;
    width: 100%;
  }
}
</style>
