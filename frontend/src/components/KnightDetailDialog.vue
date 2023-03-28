<template>
  <div class="text-center">
    <v-dialog v-model="isOpen" width="auto" @click:outside="$emit('closeDetailDialog')">
      <v-card style="width: 900px;  display: flex;">
        <v-toolbar color="primary">
          <v-toolbar-title>
            <h4>Knight Details</h4>
          </v-toolbar-title>

          <v-btn icon @click="$emit('closeDetailDialog')" class="bg-red">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div style="display: flex; padding: 20px;">

          <div id="left-panel" style="width: 45%;">

            <div class="bg-primary elevation-8">
              <div class="d-flex">
                <div class="d-block" style="width: 50%;">
                  <v-avatar class="bg-secondary" size="170" rounded="0">
                    <v-img cover :src="'https://robohash.org/' + formatedKnight.nickname"></v-img>
                  </v-avatar>
                </div>
                <div class="pa-2 mt-3">
                  <h4>Name: {{ formatedKnight.name }}</h4>
                  <h4>Nickname: {{ formatedKnight.nickname }}</h4>
                  <h4>Birthday: {{ isoDateToUTC(rawKnight.birthday || '') }}</h4>
                  <h4>Exp: {{ formatedKnight.exp }}</h4>
                  <h4>Attack: {{ formatedKnight.attack }}</h4>
                </div>
              </div>

              <v-divider thickness="2" class=" mb-2" />

              <v-list class="bg-primary pa-2" density="comfortable">
                <v-list-subheader>Attributes</v-list-subheader>

                <v-list-item active-color="primary">
                  <template v-slot:prepend>
                    <v-icon :style="[`${rawKnight.keyAttribute === 'strength' ? 'color: yellow' : ''} `]"
                      icon="mdi-sword"></v-icon>
                  </template>

                  <v-list-item-title
                    :style="[`${rawKnight.keyAttribute === 'strength' ? 'color: yellow' : ''} `]">Strength:
                    {{ rawKnight.attributes ? rawKnight.attributes.strength : '' }}</v-list-item-title>
                </v-list-item>

                <v-list-item active-color="primary">
                  <template v-slot:prepend>
                    <v-icon :style="[`${rawKnight.keyAttribute === 'dexterity' ? 'color: yellow' : ''} `]"
                      icon="mdi-run-fast"></v-icon>
                  </template>

                  <v-list-item-title
                    :style="[`${rawKnight.keyAttribute === 'dexterity' ? 'color: yellow' : ''} `]">Dexterity:
                    {{ rawKnight.attributes ? rawKnight.attributes.dexterity : '' }}</v-list-item-title>
                </v-list-item>

                <v-list-item active-color="primary">
                  <template v-slot:prepend>
                    <v-icon :style="[`${rawKnight.keyAttribute === 'constitution' ? 'color: yellow' : ''} `]"
                      icon="mdi-weight-lifter"></v-icon>
                  </template>

                  <v-list-item-title
                    :style="[`${rawKnight.keyAttribute === 'constitution' ? 'color: yellow' : ''} `]">Constitution:
                    {{ rawKnight.attributes ? rawKnight.attributes.constitution : '' }}</v-list-item-title>
                </v-list-item>

                <v-list-item active-color="primary">
                  <template v-slot:prepend>
                    <v-icon :style="[`${rawKnight.keyAttribute === 'intelligence' ? 'color: yellow' : ''} `]"
                      icon="mdi-brain"></v-icon>
                  </template>

                  <v-list-item-title
                    :style="[`${rawKnight.keyAttribute === 'intelligence' ? 'color: yellow' : ''} `]">Intelligence: {{
                      rawKnight.attributes ? rawKnight.attributes.intelligence : '' }}</v-list-item-title>
                </v-list-item>

                <v-list-item active-color="primary">
                  <template v-slot:prepend>
                    <v-icon :style="[`${rawKnight.keyAttribute === 'wisdom' ? 'color: yellow' : ''} `]"
                      icon="mdi-head-snowflake"></v-icon>
                  </template>

                  <v-list-item-title :style="[`${rawKnight.keyAttribute === 'wisdom' ? 'color: yellow' : ''} `]">Wisdom:
                    {{ rawKnight.attributes ? rawKnight.attributes.wisdom : '' }}</v-list-item-title>
                </v-list-item>

                <v-list-item active-color="primary">
                  <template v-slot:prepend>
                    <v-icon :style="[`${rawKnight.keyAttribute === 'charisma' ? 'color: yellow' : ''} `]"
                      icon="mdi-hand-peace"></v-icon>
                  </template>

                  <v-list-item-title
                    :style="[`${rawKnight.keyAttribute === 'charisma' ? 'color: yellow' : ''} `]">Charisma:
                    {{ rawKnight.attributes ? rawKnight.attributes?.charisma : '' }}</v-list-item-title>
                </v-list-item>
              </v-list>

            </div>
          </div>


          <div id="right-panel" style="width: 50%; margin-left: 2.5%;">
            <div class="align-center text-center d-flex">
              <v-icon icon="mdi-bag-personal"></v-icon>
              <h3 class="pa-2">Weapons</h3>
            </div>
            <v-table fixed-header height="300px" class="bg-primary elevation-8" style="overflow: auto;">
              <thead>
                <tr>
                  <th>
                    Name
                  </th>
                  <th>
                    Mod
                  </th>
                  <th>
                    Attribute
                  </th>
                  <th>
                    Equipped
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in rawKnight.weapons || []" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.mod }}</td>
                  <td>{{ item.attr }}</td>
                  <td>{{ item.equipped ? "Yes" : "No" }}</td>
                </tr>
              </tbody>
            </v-table>

            <v-btn class="align-center mt-6 bg-red" style="margin-left: 20%;" append-icon="mdi-coffin"
              @click="deleteKnight(rawKnight._id).then(() => { $emit('closeDetailDialog') })">
              Send to hall of heroes
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { FormatedKnight, RawKnight } from '@/types/Knight';
import * as knightsService from '../services/knight-service';
import { isoDateToUTC } from '../utils/isoDateToUtc';

const weapons = [
  { name: 'sword', mod: 3, attr: 'strength', equipped: true },
  { name: 'bow', mod: 3, attr: 'dexterity', equipped: false },
  { name: 'bow', mod: 3, attr: 'dexterity', equipped: false },
  { name: 'bow', mod: 3, attr: 'dexterity', equipped: false },
  { name: 'bow', mod: 3, attr: 'dexterity', equipped: false },
  { name: 'bow', mod: 3, attr: 'dexterity', equipped: false },
  { name: 'bow', mod: 3, attr: 'dexterity', equipped: false }
]
export default defineComponent({
  props: {
    isOpen: {
      required: true,
      type: Boolean as PropType<boolean>
    },
    formatedKnight: {
      required: true,
      type: Object as PropType<FormatedKnight>
    }
  },
  methods: {
    isoDateToUTC,
    deleteKnight: knightsService.deleteKnight
  },
  data() {
    return {
      weapons,
      rawKnight: {} as RawKnight
    }
  },
  watch: {
    isOpen: async function () {
      if (this.isOpen) {
        const id = this.formatedKnight._id;
        const rawKnight = await knightsService.getRawKnight(id);
        this.rawKnight = rawKnight;
      }
    }
  }
})
</script>