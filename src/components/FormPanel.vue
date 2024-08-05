<template>
  <div class="panel right-panel">
    <form @submit.prevent="onSubmit">
      <vue-collapsible-panel-group>
        <vue-collapsible-panel>
          <template #title>
            Software Creator
          </template>
          <template #content>
            <div class="form-group">
              <label for="creatorName">CREATOR NAME</label>
              <input
                  type="text"
                  id="creatorName"
                  v-model="form.creatorName"
                  @input="validateField('creatorName')"
                  :class="{'invalid-input': isCreatorNameInvalid}"
              >
            </div>
            <div class="form-group">
              <label for="regId">REG ID</label>
              <input
                  type="text"
                  id="regId"
                  v-model="form.regId"
                  :class="{'invalid-input': !isRegIdValid}"
                  @input="validateRegId"
                  @blur="setDefaultRegId"
              >
            </div>
          </template>
        </vue-collapsible-panel>
        <vue-collapsible-panel>
          <template #title>
            Software Identity
          </template>
          <template #content>
            <div class="form-group">
              <label for="name">NAME</label>
              <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  required
                  @input="validateField('name')"
                  :class="{'invalid-input': !form.name}"
              >
            </div>
            <div class="form-group">
              <label for="version">VERSION</label>
              <input
                  type="text"
                  id="version"
                  v-model="form.version"
                  @input="validateField('version')"
              >
            </div>
            <div class="form-group">
              <label for="tagId">TAG ID</label>
              <div class="input-refresh-wrapper">
                <input
                    type="text"
                    id="tagId"
                    v-model="form.tagId"
                    required
                    @input="validateField('tagId')"
                    :class="{'invalid-input': !form.tagId}"
                >
                <button type="button" @click="refreshUUID('tagId')" class="refresh-button">
                  <i class="fas fa-sync" style="color:#26c1c9"></i>
                </button>
              </div>
            </div>
          </template>
        </vue-collapsible-panel>
        <vue-collapsible-panel :expanded="false">
          <template #title>
            Tag Creator
          </template>
          <template #content>
            <div class="form-group">
              <label for="tagCreatorName">CREATOR NAME</label>
              <input
                  type="text"
                  id="tagCreatorName"
                  v-model="form.tagCreatorName"
                  @input="validateTagCreatorName"
                  :class="{'invalid-input': !isTagCreatorNameValid, 'valid-input': isTagCreatorNameValid}"
              >
            </div>
            <div class="form-group">
              <label for="tagRegId">REG ID</label>
              <input
                  type="text"
                  id="tagRegId"
                  v-model="form.tagRegId"
                  :class="{'invalid-input': !isTagRegIdValid}"
                  @input="validateTagRegId"
              >
            </div>
          </template>
        </vue-collapsible-panel>
      </vue-collapsible-panel-group>

      <p></p>
      <button type="submit" class="btn" :disabled="!isFormValid">Generate</button>
    </form>

    <Modal :visible="isModalVisible" @close="isModalVisible = false" title="Generated Package URL" :packageUrl="packageUrl">
    </Modal>
  </div>
</template>

<script>
import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'
import {VueCollapsiblePanelGroup, VueCollapsiblePanel} from '@dafcoe/vue-collapsible-panel'
import { v4 as uuidv4 } from 'uuid';
import { PackageURL } from 'packageurl-js';
import Modal from './Modal.vue';

export default {
  components: {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
    Modal
  },
  data() {
    return {
      form: {
        name: 'Example Application',
        version: '1.0.0',
        tagId: '',
        creatorName: 'Acme Inc',
        regId: 'example.com',
        tagCreatorName: '',
        tagRegId: '',
      },
      isRegIdValid: true,
      isTagRegIdValid: true,
      isTagCreatorNameValid: true,
      isModalVisible: false
    };
  },
  mounted() {
    this.form.tagId = this.generateUUID();
  },
  computed: {
    isFormValid() {
      return this.form.name && this.form.tagId && this.isRegIdValid && this.isTagRegIdValid && this.isTagCreatorNameValid && !this.isCreatorNameInvalid;
    },
    isCreatorNameInvalid() {
      return this.form.regId && !this.form.creatorName;
    }
  },
  methods: {
    onSubmit() {
      if (this.isFormValid) {
        this.generatePackageUrl();
        this.isModalVisible = true;
      }
    },
    validateField(field) {
      this.form[field] = this.form[field].trim();
    },
    validateRegId() {
      this.isRegIdValid = this.validateDomain(this.form.regId);
      this.isCreatorNameInvalid = this.form.regId && !this.form.creatorName;
    },
    validateTagRegId() {
      this.isTagRegIdValid = this.validateDomain(this.form.tagRegId);
      if (this.form.tagRegId) {
        this.validateTagCreatorName();
      }
    },
    validateTagCreatorName() {
      this.isTagCreatorNameValid = !(this.form.tagRegId && !this.form.tagCreatorName);
    },
    validateDomain(value) {
      const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
      return domainPattern.test(value) || value === '';
    },
    setDefaultRegId() {
      if (!this.form.regId) {
        this.form.regId = 'invalid.unavailable';
      }
    },
    generateUUID() {
      return uuidv4();
    },
    refreshUUID(field) {
      this.form[field] = this.generateUUID();
    },
    generatePackageUrl() {
      let namespace = this.form.creatorName;
      if (this.form.regId) {
        namespace += `/${this.form.regId}`;
      }

      const qualifiers = {
        tag_id: this.form.tagId
      };

      if (this.form.tagCreatorName) {
        qualifiers.tag_creator_name = this.form.tagCreatorName;
      }

      if (this.form.tagRegId) {
        qualifiers.tag_creator_regid = this.form.tagRegId;
      }

      const purl = new PackageURL('swid', namespace, this.form.name, this.form.version, qualifiers, null);
      this.packageUrl = purl.toString();
    }
  },
};
</script>

<style>
.vcpg[data-v-63943e43], .vcpg[data-v-63943e43] .vcp__header, .vcpg[data-v-63943e43] .vcp__body {
  --base-color: #1B2431 !important;
  --border-color: #465671 !important;
  --bg-color-header: #273142 !important;
  --bg-color-header-hover: #161E29 !important;
  --bg-color-header-active: #161E29 !important;
  --bg-color-body: #1B2431 !important;
}
.vcpg[data-v-63943e43] .vcp__header {
  color: #0093ee;
}
</style>

<style scoped>
.right-panel {
  background-color: #1B2431;
  color: #ffffff;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  text-transform: uppercase;
  color: #A9C7DF;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  background-color: #222C3C;
  color: #ffffff;
  border: 1px solid #455771;
  border-radius: 4px;
  transition: border-color 0.3s ease-in-out;
}
.form-group input:focus,
.form-group textarea:focus {
  border-color: #0093EE;
  outline: none;
}
.input-refresh-wrapper {
  display: flex;
  align-items: center;
}
.input-refresh-wrapper input {
  flex-grow: 1;
}
.input-refresh-wrapper button {
  margin-left: 10px;
  background-color: transparent;
  border: 1px solid #455771;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  height: 38px; /* Same height as the input */
  width: 38px;  /* Same width to make it square */
}
.invalid-input {
  border-color: #E10F2B !important;
}
.valid-input:focus {
  border-color: #0093EE;
  outline: none;
}
.btn {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>
