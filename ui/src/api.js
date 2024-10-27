// src/api.js
import axios from 'axios';

const API_BASE_URL = "http://localhost:3000/api/rules";

export const createRule = async (ruleString) => {
    return axios.post(`${API_BASE_URL}/create_rule`, { rule_string: ruleString });
};

export const combineRules = async (rules) => {
    return axios.post(`${API_BASE_URL}/combine_rules`, { rules });
};

export const evaluateRule = async (data) => {
    return axios.post(`${API_BASE_URL}/evaluate_rule`, { data });
};
