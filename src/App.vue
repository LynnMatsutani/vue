<template>
  <v-app>
    <!-- ツールバー -->
    <v-app-bar
      app
      color="primary"
      dark
    >
    <!-- タイトル -->
      <v-toolbar-title>入退室管理</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Home -->
      <v-tooltip bottom>
        <template v-slot:activator="{on, attrs}">
          <v-btn icon to="/"
            v-bind="attrs"
            v-on="on">
            <v-icon>mdi-file-table-outline</v-icon>
          </v-btn>
        </template>
        <span>入退室の登録はこちら</span>
      </v-tooltip>
      <!-- Custom -->
      <v-tooltip bottom>
        <template v-slot:activator="{on, attrs}">
          <v-btn icon to="/custom"
            v-bind="attrs"
            v-on="on">
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
        </template>
        <span>日時を入力して登録する場合はこちら</span>
      </v-tooltip>
      <!-- Settings -->
      <v-tooltip bottom>
        <template v-slot:activator="{on, attrs}">
          <v-btn icon to="/settings"
            v-bind="attrs"
            v-on="on">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <span>会社名リストへの登録はこちら</span>
      </v-tooltip>
    </v-app-bar>
    <!-- メインコンテンツ -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-overlay
      :absolute="false"
      opacity="0.46"
      z-index="5"
      v-model="loading"
    >
      <v-layout justify-center>
        <v-progress-circular indeterminate></v-progress-circular>
      </v-layout>
    </v-overlay>
    <v-snackbar
      v-model="snackbarVisible"
      :bottom="y === 'bottom'"
      :color="status"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      timeout="2000"
      :top="y === 'top'"
      :vertical="mode === 'vertical'">{{ getAlertMessage }}</v-snackbar>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      snackbar: false,
      x: null,
      y: 'top',
      mode: null,
      alertMessage: this.$store.state.alertMessage,
      status: this.$store.state.status,
    }
  },
  computed: {
    snackbarVisible: {
      get() {
        return this.$store.state.isEnable
      },
      set() {
        return this.$store.dispatch('snackOff')
      }
    },
    loading: {
      get() {
        return this.$store.state.loading
      },
      set() {
        return this.$store.dispatch('loadingOff')
      }
    },
    getAlertMessage() {
      return this.$store.state.alertMessage
    }
  },
};
</script>
