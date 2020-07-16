<template>
  <div>
    <v-row
      style="height: 450px;"
      justify="center"
      align-content="center">
      <v-col cols="10">
        <v-card>
          <v-card-title>
            入退室登録
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-radio-group
                v-model="inout"
                name="inout"
                required>
                <v-radio
                  label="入室"
                  value="in"></v-radio>
                <v-radio
                  label="退室"
                  value="out"></v-radio>
              </v-radio-group>
              <v-select
                v-model="corporation"
                label="会社名"
                :items="corporations"
                name="corporation"
              ></v-select>
              <v-text-field
                label="利用者氏名"
                name="name"
                v-model="name"
                required
                v-if="this.inout === 'in'"></v-text-field>
              <v-select
                v-model="name"
                label="利用者氏名"
                :items="names"
                name="name"
                v-else></v-select>
            </v-form>
            <v-btn
              dark
              block
              color="primary"
              @click="onClickSubmit()">
              登録
            </v-btn>
          </v-card-text>
        </v-card>
        <ConfirmModal ref="confirmModal"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ConfirmModal from '../components/ConfirmModal.vue'

export default {
  name: 'Home',
  components: {
    ConfirmModal
  },
  data() {
    return {
      item: [
        this.corporation,
        this.name
      ],
      inout: 'in',
      corporation: '',
      corporations: [
        'canvas',
        'nathos'
      ],//dummy
      name: '',
    }
  },

  methods: {
    onClickSubmit() {
      this.$refs.confirmModal.open(this.corporation, this.name)
    }
  }
}
</script>
