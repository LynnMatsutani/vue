<template>
    <v-col cols="6">
        <v-dialog
            v-model="show"
            parsistent
            >
            <v-card>
                <v-card-title/>
                <v-card-text class="black--text">
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>会社名: {{corporation}}</v-list-item-title>
                            <v-list-item-title>名前: {{name}}</v-list-item-title>
                            <v-list-item-title v-if="customTime">利用時間: {{customTime.intime}}〜{{customTime.outtime}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    上記内容で登録します。よろしいですか？
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        color="grey"
                        text
                        :disabled="loading"
                        @click="onClickClose">
                        キャンセル
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        :loading="loading"
                        @click="onClickSubmit()">
                        送信
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-col>
</template>

<script>
export default {
    name: 'ConfirmModal',

    data() {
        return {
            show: false,
            loading: false,
            corporation: '',
            name: '',
            customTime: []
        }
    },

    methods: {
        open(corporation, name, customTime = null) {
            this.show = true
            this.corporation = corporation
            this.name = name
            if (customTime !== undefined) {
                this.customTime = customTime
            }
        },
        onClickClose() {
            this.show = false
        },
        onClickSubmit() {

        }
    }
}
</script>