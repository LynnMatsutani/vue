<template>
  <div>
    <v-row
      justify="center"
      align-content="center">
      <v-col cols="10">
        <v-card>
          <v-card-title>
            入退室登録(手動入力)
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-col>
              <v-date-picker
                locale="jp-ja"
                :day-format="date => new Date(date).getDate()"
                v-model="date"
                ></v-date-picker>
              </v-col>
              <vue-timepicker
                :format="format"
                :minute-interval="minInterval"
                :hour-range="inHourRange"
                hide-disabled-items
                placeholder="入室時間"
                hour-label="時"
                minute-label="分"
                v-model="intime"
                cols="4"></vue-timepicker>
              <vue-timepicker
                :format="format"
                :minute-interval="minInterval"
                :hour-range="outHourRange"
                hide-disabled-items
                placeholder="退室時間"
                hour-label="時"
                minute-label="分"
                v-model="outtime"></vue-timepicker>
              <v-select
                v-model="company"
                label="会社名"
                :items="companyList"
                name="company"
              ></v-select>
              <v-text-field
                label="利用者氏名"
                name="name"
                v-model="name"
                required
                ></v-text-field>
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
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import ConfirmModal from '../components/ConfirmModal.vue'

export default {
  name: 'Custom',
          components: {
            'vue-timepicker': VueTimepicker,
            ConfirmModal
        },

  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      inHourRange: [10,11,12,13,14,15,16,17,18,19],
      outHourRange: [11,12,13,14,15,16,17,18,19,20],
      intime: '',
      outtime: '',
      companyList: this.$store.state.companyList,
      company: '',
      name: '',
      format: 'HH:mm',
      minInterval: 5,
      loading: this.$state.loading
    }
  },
  mounted() {
    this.$store.dispatch('getCompany')
    this.companyList = this.$store.state.companyList
  },
  methods: {
    onClickSubmit() {
      this.$refs.confirmModal.open(this.corporation, this.name,{'date':this.date, 'intime':this.intime, 'outtime':this.outtime})
    }
  }
}
</script>
