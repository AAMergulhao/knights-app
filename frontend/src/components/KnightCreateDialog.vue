<template>
  <div class="text-center">
    <v-dialog v-model="isOpen" width="auto" @click:outside="$emit('closeCreateDialog')">
      <v-card style="width: 900px;  display: flex;">
        <v-toolbar color="primary">
          <v-toolbar-title>
            <h4>Create Knight</h4>
          </v-toolbar-title>

          <v-btn icon class="bg-red" @click="$emit('closeCreateDialog')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div style="display: flex; padding: 20px;">

          <div id="left-panel" style="width: 45%;">

            <div class="bg-primary elevation-8">
              <div class="pa-2 mt-3">
                <v-text-field label="Name" variant="outlined" v-model="knight.name"></v-text-field>
                <v-text-field label="Nickname" variant="outlined" v-model="knight.nickname"></v-text-field>
                <v-text-field label="Birthday" variant="outlined" type="date" v-model="knight.birthday"></v-text-field>
                <v-select label="Key attribute" variant="outlined" v-model="knight.keyAttribute"
                  :items="['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']"></v-select>
              </div>

              <v-divider thickness="2" class="mb-1" />

              <v-list class="bg-primary pa-1" density="comfortable">
                <v-list-subheader>Attributes</v-list-subheader>

                <v-list-item active-color="primary">
                  <div class="d-flex pa-1">
                    <v-text-field style="width: 140px; margin-right: 5px;" label="Strength" type="number"
                      variant="outlined" prepend-inner-icon="mdi-sword" v-model="knight.attributes.strength" />

                    <v-text-field style="width: 140px;" label="Dexterity" type="number" variant="outlined"
                      prepend-inner-icon="mdi-run-fast" v-model="knight.attributes.dexterity" />
                  </div>
                </v-list-item>

                <v-list-item active-color="primary">
                  <div class="d-flex pa-1">
                    <v-text-field style="width: 140px; margin-right: 5px;" label="Constitution" type="number"
                      variant="outlined" prepend-inner-icon="mdi-weight-lifter"
                      v-model="knight.attributes.constitution" />

                    <v-text-field style="width: 140px;" label="Intelligence" type="number" variant="outlined"
                      prepend-inner-icon="mdi-brain" v-model="knight.attributes.intelligence" />
                  </div>
                </v-list-item>

                <v-list-item active-color="primary">
                  <div class="d-flex pa-1">
                    <v-text-field style="width: 140px; margin-right: 5px;" label="Wisdom" type="number" variant="outlined"
                      prepend-inner-icon="mdi-head-snowflake" v-model="knight.attributes.wisdom" />

                    <v-text-field style="width: 140px;" label="Charisma" type="number" variant="outlined"
                      prepend-inner-icon="mdi-hand-peace" v-model="knight.attributes.charisma" />
                  </div>
                </v-list-item>
              </v-list>

            </div>
          </div>


          <div id="right-panel" style="width: 50%; margin-left: 2.5%;">
            <div class="align-center text-center d-flex">
              <v-icon icon="mdi-bag-personal"></v-icon>
              <h3 class="pa-2">Weapons</h3>
            </div>

            <div>
              <v-text-field label="Name" type="text" variant="outlined" prepend-inner-icon="mdi-head-snowflake"
                v-model="weapon.name" />
              <v-text-field label="Mod" type="number" variant="outlined" prepend-inner-icon="mdi-hand-peace"
                v-model="weapon.mod" />
              <v-select label="Attribute" variant="outlined" v-model="weapon.attr"
                :items="['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']" />
              <div class="d-flex">
                <v-checkbox label="Equipped" v-model="weapon.equipped" />
                <v-btn color="green" class="mt-4" append-icon="mdi-plus" @click="addWeapon()">Add Weapon</v-btn>
              </div>
            </div>

            <v-table fixed-header height="250px" class="bg-primary elevation-8" style="overflow: auto;">
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
                <tr v-for="item in knight.weapons || []" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.mod }}</td>
                  <td>{{ item.attr }}</td>
                  <td>{{ item.equipped ? "Yes" : "No" }}</td>
                </tr>
              </tbody>
            </v-table>

            <v-btn color="green" block class="mt-4" append-icon="mdi-plus"
              @click="createKnight().then(() => { $emit('closeCreateDialog') })">Create Knight</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import * as knightsService from '../services/knight-service';
import { Attributes } from '@/types/Attributes';
import { Weapon } from '@/types/Weapon';

export default defineComponent({
  props: {
    isOpen: {
      required: true,
      type: Boolean as PropType<boolean>
    },
  },
  methods: {
    addWeapon: function () {
      if (this.weapon.name == '') { alert('Name cannot be empty'); return; }
      this.knight.weapons.push(this.weapon);

      this.weapon = {
        name: "",
        mod: 0,
        attr: "Strength",
        equipped: false
      }
    },

    createKnight: async function () {
      await knightsService.createKnight(this.knight);
      this.knight = {
        name: "",
        nickname: "",
        birthday: '',
        keyAttribute: 'Strength',
        attributes: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0
        } as Attributes,
        weapons: [] as Weapon[],
        hero: false
      }
      this.weapon = {
        name: "",
        mod: 0,
        attr: "Strength",
        equipped: false
      }
    }
  },
  data() {
    return {
      knight: {
        name: "",
        nickname: "",
        birthday: '',
        keyAttribute: 'Strength',
        attributes: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0
        } as Attributes,
        weapons: [] as Weapon[],
        hero: false
      },
      weapon: {
        name: "",
        mod: 0,
        attr: "Strength",
        equipped: false
      },

    }
  },
  watch: {
  }
})
</script>