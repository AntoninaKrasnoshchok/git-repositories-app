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
    <div v-else>
      <button @click="sendData()">Save result</button>
      <div class="notification">{{ message }}</div>
      <ul>
        <li
          :key="id"
          v-for="{
            id,
            name,
            url,
            logo,
            stars,
            openIssues,
            homepage,
            language,
          } in repositories"
        >
          <Repository
            :name="name"
            :url="url"
            :logo="logo"
            :stars="stars"
            :openIssues="openIssues"
            :homepage="homepage"
            :language="language"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/pages/RepositoriesList";
</style>

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
    async loadRepositories(selectedLanguage) {
      this.selectedLanguage = selectedLanguage;
      this.isLoading = true;
      this.message = "";
      try {
        const apiURL = `${API}?q=${QUERY_STR}+language:${selectedLanguage}&sort=${SORT_BY}&per_page=${COUNT}`;
        const {
          data: { items },
        } = await axios.get(apiURL);
        this.isLoading = false;
        this.repositories = items.map(
          ({
            id,
            name,
            html_url: url,
            owner: { avatar_url: logo },
            stargazers_count: stars,
            open_issues: openIssues,
            homepage,
            language,
          }) => ({ id, name, url, logo, stars, openIssues, homepage, language }),
        );
      } catch (e) {
        this.isLoading = false;
        this.message = `Can't load repositories: ${e.message}`;
      }
    },

    async sendData() {
      try {
        await axios({
          url: `${process.env.VUE_APP_BASE_URL}/api/repositories`,
          method: "post",
          data: {
            repositories: this.repositories,
          },
        });
        this.message = "Data saved";
      } catch (e) {
        this.message = "Can't save data";
      }
    },
  },
};
</script>
