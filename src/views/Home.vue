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
                @change="reGetNameList()"
                required>
                <v-radio
                  label="入室"
                  value="in"></v-radio>
                <v-radio
                  label="退室"
                  value="out"
                  ></v-radio>
              </v-radio-group>
              <v-select
                v-model="company"
                label="会社名"
                :items="getCompanyList"
                name="company"
                v-if="getCompanyList.length > 0 && this.inout === 'in'"
              ></v-select>
              <v-layout justify-center v-else-if="getCompanyList.length == 0">
                <v-progress-circular indeterminate></v-progress-circular>
              </v-layout>
              <v-text-field
                label="利用者氏名"
                name="name"
                v-model="name"
                required
                v-if="this.inout === 'in'"></v-text-field>
              <v-select
                v-model="name"
                label="利用者氏名"
                :items="getNameList"
                name="name"
                v-else-if="getNameList.length > 0"></v-select>
              <v-layout justify-center v-else>
                <v-progress-circular indeterminate></v-progress-circular>
              </v-layout>
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
        <ConfirmModal ref="confirmModal" @clearForm="clearForm"/>
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
  props: {
    props_companyList: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      inout: 'in',
      company: '',
      names: [],
      name: '',
      companyList: []
    }
  },
  computed: {
    getCompanyList() {
      return this.$store.getters.getCompanyList
    },
    getNameList() {
      return this.$store.getters.getNameList
    }
  },
  created() {
    this.$store.dispatch('getCompany')
    this.companyList = this.$store.getters.getCompanyList

    this.$store.dispatch('getName')
    this.nameList = this.$store.getters.nameList
  },
  methods: {
    onClickSubmit() {
      this.$refs.confirmModal.open(this.inout, this.company, this.name)
    },
    reGetNameList() {
      this.$store.dispatch('getName')
      this.nameList = this.$store.getters.nameList
    },
    clearForm() {
      this.company = ''
      this.name = ''
    }
  }
}
</script>
