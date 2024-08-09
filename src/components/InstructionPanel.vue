<template>
  <div class="panel left-panel">
    <h1 class="panel-title">Package URL SWID Generator</h1>
    <h2 class="category-title">Software Creator Fields</h2>
    <table>
      <tr>
        <td class="field-name">Creator Name:</td>
        <td>The name of the entity that created the software.</td>
      </tr>
      <tr>
        <td class="field-name">Reg ID:</td>
        <td>The registration identifier of the entity. The regId should be the domain name of the entity, if known. If the regId is not known, a default of “invalid.unavailable” will be used.</td>
      </tr>
    </table>
    <h2 class="category-title">Software Identity Fields</h2>
    <table>
      <tr>
        <td class="field-name">Name:</td>
        <td>The software component name as it would typically be referenced. For example, what would be seen in the add/remove dialog on a Windows device, or what is specified as the name of a packaged software product or a patch identifier name on a Linux device.</td>
      </tr>
      <tr>
        <td class="field-name">Version:</td>
        <td>Underlying development version for the software component.</td>
      </tr>
      <tr>
        <td class="field-name">Tag ID:</td>
        <td>The tagId is a globally unique identifier and should be assigned a GUID reference (see ISO/IEC 19770-5 definition for GUID). The tagID provides a unique reference for the specific product, version, edition, revision, etc (essentially, the same binary distribution). If two tagIDs match and the tagCreator is the same, the underlying products they represent are expected to be exactly the same. This allows IT systems to identify if a software item (for example, a patch) is installed simply by referencing the specific tagID value which is likely to be readily available in a software inventory. It is recommended, when possible, that a 16 byte GUID be used for this field as this provides global uniqueness without a significant amount of overhead for space. If use of a 16 byte GUID is not possible, a text based globally unique ID may be constructed, this ID should include a unique naming authority for the tagCreator and sufficient additional details that the tagId is unique for the software product, version, edition, revision, etc. This would likely look as follows (+ is used as a string concatenation symbol): regid + productName + version + edition + revision + ...</td>
      </tr>
      <tr>
        <td class="field-name">Patch:</td>
        <td>Set to true if this SWID describes a product patch or modification to a different software element.</td>
      </tr>
      <tr>
        <td class="field-name">Tag Version:</td>
        <td>The tag version indicates if a specific release of a software product has more than one tag that can represent that specific release. This may be the case if a software tag producer creates and releases an incorrect tag that they subsequently want to fix, but with no underlying changes to the product the SWID tag represents. This could happen if, for example, a patch is distributed that has a Link reference that does not cover all the various software releases it can patch. A newer SWID tag for that patch can be generated and the tag version value incremented to indicate that the data is updated.</td>
      </tr>
    </table>
    <h2 class="category-title">Tag Creator Fields</h2>
    <table>
      <tr>
        <td class="field-name">Creator Name:</td>
        <td>The name of the entity that created the SWID tag, if different from the software creator.</td>
      </tr>
      <tr>
        <td class="field-name">Reg ID:</td>
        <td>The registration identifier of the entity. The regId should be the domain name of the entity, if known. If the regId is not known, a default of “invalid.unavailable” will be used.</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.left-panel {
  background-color: #273142;
  color: #A9C7DF;
}
.panel-title {
  color: #ffffff;
}
.category-title {
  color: #0093ee;
}
.field-name {
  color: #ffffff;
  font-weight: bold;
  /* white-space:nowrap; */
}
table {
  border-collapse: collapse;
  border: 1px solid #1B2431;
  width: 100%;
}
td {
  border: 1px solid #1B2431;
  padding: 8px 10px;
}
</style>
<script setup lang="ts">
</script>