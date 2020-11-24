<template>
  <div class="listItem">
    <div>
      <a :href="url" rel="noopener noreferrer" target="_blank">
        <img :alt="name" :src="logo" />
      </a>
    </div>
    <div>
      <a :href="url" rel="noopener noreferrer" target="_blank">
        <h3>{{ name }}</h3>
      </a>
    </div>
    <div>
      <a :href="homepage" rel="noopener noreferrer" target="_blank">
        Home page
      </a>
    </div>
    <div>Language: {{ language }}</div>
    <div>Open issue: {{ openIssues }}</div>
    <div>&#9733;{{ stars }}</div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/components/ListItem.scss";
</style>

<script>
export default {
  name: "ListItem",
  props: {
    name: String,
    url: String,
    logo: String,
    stars: Number,
    openIssues: Number,
    homepage: String,
    language: String,
  },
};
</script>
