<template>
  <div class="text-center">
    <v-dialog v-model="isOpen" width="auto" @click:outside="$emit('closeUpdateDialog')">
      <v-card>
        <v-card-text>
          <h3 class="mb-1">Knight: {{ formatedKnight._id }}</h3>

          <div class="pa-2">
            <v-text-field label="Nickname" variant="outlined" v-model="nickname"></v-text-field>
          </div>
          <v-btn color="green" block @click="updateKnight().then(() => { $emit('closeUpdateDialog') })">Confirm</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';

import { FormatedKnight } from '@/types/Knight';
import * as knightsService from '../services/knight-service';

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
  data() {
    return {
      nickname: ""
    }
  },
  methods: {
    updateKnight: async function () {
      await knightsService.updateKnight(this.formatedKnight._id, this.nickname);
      this.formatedKnight.nickname = this.nickname;

      return;
    }
  },
  watch: {
    formatedKnight: function () {
      this.nickname = `${this.formatedKnight.nickname}`
    }
  }
})
</script>