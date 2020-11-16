<script>
import axios from "axios";
import Repository from "@/components/Repository.vue";

import { API, QUERY_STR, SORT_BY, COUNT, LANGUAGES } from "../../config";

export default {
  name: "RepositoriesList",
  components: {
    Repository,
  },
  data() {
    return {
      isLoading: false,
      isError: false,
      message: "",
      repositories: [],
      languages: [],
      selectedLanguage: LANGUAGES[0],
    };
  },
  async mounted() {
    this.languages = LANGUAGES;
    await this.loadRepositories(LANGUAGES[0]);
  },
  methods: {
    async loadRepositories(language) {
      this.selectedLanguage = language;
      this.isLoading = true;
      try {
        const url = `${API}?q=${QUERY_STR}+language:${language}&sort=${SORT_BY}&per_page=${COUNT}`;
        const response = await axios.get(url);
        const { data } = response;
        this.isLoading = false;
        this.repositories = data && data.items;
      } catch (e) {
        console.log(JSON.stringify(e));
        this.isLoading = false;
        this.isError = true;
        this.message = `Can't load repositories: ${e.message}`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/RepositoriesList";
</style>

<template>
  <div class="repositories-list">
    <h1>Hithub repositories list</h1>
    <ul class="languages">
      <li :key="language" v-for="language in languages">
        <input
          type="radio"
          :id="language"
          name="language"
          :value="language"
          :checked="language == selectedLanguage"
          @click="loadRepositories($event.target.value)"
        />
        <label :for="language">{{ language }}</label>
      </li>
    </ul>
    <div v-if="isLoading" class="spinner">Loading...</div>
    <div v-else-if="isError" class="error">{{ message }}</div>
    <div v-else>
      <ul>
        <li
          :key="id"
          v-for="{
            id,
            name,
            html_url,
            owner: { avatar_url },
            stargazers_count,
            open_issues,
            homepage,
            language,
          } in repositories"
        >
          <Repository
            :name="name"
            :url="html_url"
            :logo="avatar_url"
            :stars="stargazers_count"
            :openIssues="open_issues"
            :homepage="homepage"
            :language="language"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
