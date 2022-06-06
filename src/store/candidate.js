import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { api } from '../boot/axios';

export const useCandidateStore = defineStore("candidate", () => {
    const candidate_id = ref(null)
    const testlog_id = ref(null)
    return {
        candidate_id,
        testlog_id
    }
})