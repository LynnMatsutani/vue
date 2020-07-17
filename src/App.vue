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
      <v-btn icon to="/">
        <v-icon>mdi-file-table-outline</v-icon>
      </v-btn>
      <!-- Custom -->
      <v-btn icon to="/custom">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <!-- Settings -->
      <v-btn icon to="/settings">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- メインコンテンツ -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-snackbar
      v-model="snackbarVisible"
      :bottom="y === 'bottom'"
      :color="status"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      timeout="2000"
      :top="y === 'top'"
      :vertical="mode === 'vertical'">{{ alertMessage }}</v-snackbar>
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
      status: this.$store.state.status
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
    }
  },
};
</script>
