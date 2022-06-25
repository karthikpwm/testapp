import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { api } from '../boot/axios';

export const useUserStore = defineStore("user", () => {
    const user = ref({
        name: '',
        position: '',
        email: '',
        mobile: '',
        company_id: ''
    })

    const userType = ref('guest')

    const admin = ref({
        name: '',
        email: '',
        user_id: '',
        company_id: ''
    })
    const userAnswers = ref({})
    const questions = ref([])
    const token = ref('')
    const loggedinname = ref('')
    const company1_id = ref('')
    const company_id = ref('')
    console.log("userstore", token, loggedinname)
    const insertUser = async (user) => {
        await api.post(`analytic/questions`, { user })

    }

    const getQuestion = async (testlog_id, candidate_id) => {
        await api.post(`analytic/questions`, { testlog_id, candidate_id },
            {
                headers: {
                    Authorization: 'Bearer ' + token.value
                }
            })
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
        token,
        admin,
        loggedinname,
        company1_id,
        company_id,
        userType,
        getQuestion,
        insertUser
    }
})