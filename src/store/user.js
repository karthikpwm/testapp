import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { api } from '../boot/axios';

export const useUserStore = defineStore("user", () => {
    const user = ref({
        name: '',
        position: '',
        email: '',
        mobile: '',

    })
    const userAnswers = ref({})
    const questions = ref([

        // {
        //     question: 'kbfvubu fsvbkjbs kushbdvsadfasdfasfkbd',
        //     options: [{ answerText: 'v-on', isCorrect: false },
        //     { answerText: 'v-bind', isCorrect: false },
        //     { answerText: 'v-model', isCorrect: true },
        //     { answerText: 'v-if', isCorrect: false },],
        //     ans: null,
        //     type: 'radio'
        // },
        // {
        //     question: 'ques2',
        //     options: [{ answerText: 'Jeff Bezos', isCorrect: false },
        //     { answerText: 'Elon Musk', isCorrect: false },
        //     { answerText: 'Evan You', isCorrect: true },
        //     { answerText: 'Tony Stark', isCorrect: false },],
        //     ans: null,
        //     type: 'radio'
        // },
        // {
        //     question: 'Vue is used in the backend. - True or False?',
        //     options: [
        //         { answerText: 'True', isCorrect: false },
        //         { answerText: 'False', isCorrect: true },
        //     ],
        //     ans: null,
        //     type: 'radio'
        // },
        // {
        //     question: 'Which version of Vue is Launched on 2020?',
        //     options: [
        //         { answerText: 'Vue 2', isCorrect: false },
        //         { answerText: 'Vue 1', isCorrect: false },
        //         { answerText: 'Vue 4', isCorrect: false },
        //         { answerText: 'Vue 3', isCorrect: true },
        //     ],
        //     ans: null,
        //     type: 'radio'
        // },
        // {
        //     question: 'Is vue an OpenSource Library?',
        //     options: [
        //         { answerText: 'True', isCorrect: true },
        //         { answerText: 'False', isCorrect: false },
        //     ],
        //     ans: null,
        //     type: 'radio'
        // },
        // {
        //     question: 'Which of the following is a Full Javascript Frramework',
        //     options: [
        //         { answerText: 'Vue', isCorrect: false },
        //         { answerText: 'node', isCorrect: false },
        //         { answerText: 'react', isCorrect: false },
        //         { answerText: 'Angular', isCorrect: true },
        //     ],
        //     ans: null,
        //     type: 'radio'
        // },
        // {
        //     question: 'Composition API can be used on which version?',
        //     options: [
        //         { answerText: 'Vue 5', isCorrect: false },
        //         { answerText: 'Vue 2 Only', isCorrect: false },
        //         { answerText: 'Vue 3 Only', isCorrect: false },
        //         { answerText: 'Both Vue 2 and Vue 3', isCorrect: true },
        //     ],
        //     ans: null,
        //     type: 'radio'
        // },
    ])

    const insertUser = async (user) => {
        await api.post(`analytic/questions`, { user })

    }

    const getQuestion = async () => {
        await api.get(`analytic/questions`)
            .then(async res => {
                const data = res.data
                let userAnswer = {}
                questions.value = await data.data.map(x => {
                    userAnswer[x.question_id] = null
                    x.options = JSON.parse(x.options)
                    return x;

                })
                userAnswers.value = userAnswer
            })
    }
    return {
        user,
        questions,
        userAnswers,
        getQuestion,
        insertUser
    }
})