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
                            <v-list-item-title v-if="inout">
                                <span v-if="inout == 'in'">入室</span>
                                <span v-else>退室</span>
                            </v-list-item-title>
                            <v-list-item-title>会社名: {{company}}</v-list-item-title>
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
            inout: '',
            company: '',
            name: '',
            customTime: []
        }
    },

    methods: {
        open(inout, company, name, customTime = null) {
            this.show = true
            this.inout = inout
            this.company = company
            this.name = name
            if (customTime !== undefined) {
                this.customTime = customTime
            }
        },
        onClickClose() {
            this.show = false
        },
        onClickSubmit() {
            let item
            if (this.customTime) {
                let date = new Date(this.customTime.date)
                let month = date.getMonth()+1
                month = this.zeroPadding(month)
                let day = this.zeroPadding(date.getDate())

                item = {
                    company: this.company,
                    name: this.name,
                    date: date.getFullYear()+'/'+month+'/'+day,
                    intime: this.customTime.intime,
                    outtime: this.customTime.outtime
                }
            } else {
                let today = new Date()
                let month = today.getMonth()+1
                month = this.zeroPadding(month)
                let day = this.zeroPadding(today.getDate())

                let hour = this.zeroPadding(today.getHours())
                let minute = this.zeroPadding(today.getMinutes())
                item = {
                    inout: this.inout,
                    company: this.company,
                    name: this.name,
                    date: today.getFullYear()+'/'+month+'/'+day,
                    time: hour+':'+minute
                }
            }

            this.$store.dispatch('storeLog', {
                item: item
            })
            this.$emit('clearForm')
            this.show = false
        },
        zeroPadding(num) {
            num += ''
            if (num.length === 1) {
                num = '0' + num
            }
            return num
        }
    }
}
</script>