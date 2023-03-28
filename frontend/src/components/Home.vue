<template>
  <v-container class="fill-height" style="max-width: 1400px;">
    <v-responsive class="d-flex align-center text-center e">

      <KnightCreateDialog :isOpen="showCreateDialog"  @closeCreateDialog="showCreateDialog = false" />
      <KnightUpdateDialog :formatedKnight="seletedKnight" :isOpen="showUpdateDialog" @closeUpdateDialog="showUpdateDialog = false" />
      <KnightDetailDialog :formatedKnight="seletedKnight" :isOpen="showDetailDialog"
        @closeDetailDialog="showDetailDialog = false" />

      <v-container class="bg-primary pa-6 elevation-10" style="border-radius: 5px;">
        <div style="margin: 0 15% 0 5%; margin-bottom: 10px">
          <div style="display: flex;">
            <v-text-field label="Nickname" variant="outlined" v-model="searchField"></v-text-field>
            <v-checkbox label="Hero" v-model="searchHeroes"></v-checkbox>
            <v-btn class="bg-green" style="margin-top: 10px; margin-left: 15px;" append-icon="mdi-plus"
              @click="showCreateDialog = true">
              Create Knight
            </v-btn>

          </div>
        </div>
        <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="knightsToBeDisplayed"
          item-value="name" class="elevation-1" style="min-height: 600px;">

          <template v-slot:item.avatar="{ item }">
            <v-avatar size="70">
              <v-img :src="'https://robohash.org/' + item.raw.nickname"></v-img>
            </v-avatar>
          </template>

          <template v-slot:item._id="{ item }">

            <v-btn class="bg-primary" icon="mdi-pencil" style="margin-right: 10px;"
              @click="() => { showUpdateDialog = true; seletedKnight = item.raw }">
              <v-tooltip activator="parent" location="top">Edit nickname</v-tooltip>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="bg-primary" icon="mdi-account-details"
              @click="() => { showDetailDialog = true; seletedKnight = item.raw }">
              <v-tooltip activator="parent" location="top">Knight details</v-tooltip>
              <v-icon>mdi-account-details</v-icon>
            </v-btn>
          </template>

        </v-data-table>
      </v-container>
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import KnightDetailDialog from './KnightDetailDialog.vue';
import KnightUpdateDialog from './KnightUpdateDialog.vue';
import KnightCreateDialog from './KnightCreateDialog.vue';

import { FormatedKnight } from '@/types/Knight';
import * as knightsService from '../services/knight-service';

export default defineComponent({
  components: {
    KnightDetailDialog,
    KnightUpdateDialog,
    KnightCreateDialog
  },
  data() {
    return {
      searchField: "",
      showDetailDialog: false,
      showUpdateDialog: false,
      showCreateDialog: false,
      seletedKnight: {} as FormatedKnight,
      searchHeroes: false,
      itemsPerPage: 7,
      headers: [
        {
          title: 'Avatar',
          align: 'center',
          sortable: false,
          key: 'avatar',
        },
        { title: 'Name', align: 'center', key: 'name' },
        { title: 'Nickname', align: 'center', key: 'nickname' },
        { title: 'Weapons', align: 'center', key: 'weapons' },
        { title: 'Age', align: 'center', key: 'age' },
        { title: 'Exp', align: 'center', key: 'exp' },
        { title: 'Attack', align: 'center', key: 'attack' },
        { title: 'Actions', align: 'center', key: '_id', sortable: false },
      ],
      knightsToBeDisplayed: [] as FormatedKnight[],
      formatedKnights: [] as FormatedKnight[]
    }
  },
  methods: {
    updateKnights: async function () {
      const formatedKnights = await knightsService.getFormatedKnights(this.searchHeroes);
      this.knightsToBeDisplayed = formatedKnights;
      this.formatedKnights = formatedKnights;
      this.searchField = "";
    }
  },
  async mounted() {
    await this.updateKnights();
  },
  watch: {
    showDetailDialog: async function () {
      if (!this.showDetailDialog) await this.updateKnights();
    },
    showCreateDialog: async function () {
      if (!this.showCreateDialog) await this.updateKnights();
    },
    searchField: function () {
      const filteredKnights = this.formatedKnights.filter((knight) => { return knight.nickname.search(this.searchField) != -1 });
      this.knightsToBeDisplayed = filteredKnights;
    },
    searchHeroes: function () {
      this.updateKnights();
    }
  }
})
</script>
