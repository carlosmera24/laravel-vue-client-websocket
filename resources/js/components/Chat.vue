<template>
    <div>
        <div class="box">
            <p v-if="!messages.length">Start typing the first message</p>

            <div v-for="(message, index) in messages"
                :key="'chat-' +index">
                <my-message
                    v-if="message.user == userId"
                    :message="message.text"
                ></my-message>

                <message
                    v-if="message.user != userId"
                    :message="message.text"
                    :user="message.user"
                ></message>
            </div>
        </div>

        <form @submit.prevent="submit">
            <div class="field has-addons has-addons-fullwidth">
                <div class="control is-expanded">
                    <input class="input" type="text" placeholder="Type a message" v-model="newMessage">
                </div>
                <div class="control">
                    <button type="submit" class="button is-danger" :disabled="!newMessage">
                        Send
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                userId: 2,
                messages: [],
                newMessage: ''
            }
        },
        mounted () {
           Echo.channel('unamula-trip-room.ref1')
                .listen('chatChannel', (e) => {
                    console.log("echo", e);
                    if(e.user != this.userId) {
                        this.messages.push({
                            text: e.message,
                            user: e.user
                        });
                    }
                });
        },
        methods: {
            submit() {
                axios.post(`${process.env.MIX_WEBSOCKET_SERVER_BASE_URL}api/message`, {
                    room: "ref1",
                    user_id: this.userId,
                    message: this.newMessage
                }).then((response) => {
                    this.messages.push({
                        text: this.newMessage,
                        user: this.userId
                    });

                    this.newMessage = '';
                }, (error) => {
                    console.log(error);
                });

            }
        }
    }
</script>
