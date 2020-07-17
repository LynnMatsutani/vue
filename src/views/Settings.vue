<template>
  <div>
    <v-row
      style="height: 450px;"
      justify="center"
      align-content="center">
      <v-col cols="10">
        <v-card>
          <v-card-title>
            会社名登録
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="会社名"
                name="company_name"
                required></v-text-field>
            </v-form>
            <v-btn
              dark
              block
              color="primary">
              登録
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Settings',
}
</script>
