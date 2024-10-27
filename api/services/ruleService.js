const Node = require('../models/astModel');

// In-memory storage for AST (for simplicity, replace with DB in production)
let astStorage = null;

function parseCondition(condition) {
    const [field, operator, value] = condition.split(' ');
    
    // Remove single quotes if present
    const cleanedValue = value.replace(/^'|'$/g, ''); // Remove surrounding single quotes
    
    // Return field, operator, and value without JSON parsing
    return { field, operator, value: cleanedValue }; // value should remain a string
}


function createRuleAST(ruleString) {
    // Tokenize the rule string
    const tokens = ruleString.match(/(\w+|\d+|>|<|=|\(|\)|AND|OR|'[^']*')/g);
    console.log("Tokens:", tokens);
    return parseTokens(tokens);
}

function parseTokens(tokens) {
    const operators = [];
    const operands = [];

    function applyOperator() {
        const operator = operators.pop();
        const right = operands.pop();
        const left = operands.pop();
        operands.push(new Node("operator", operator, left, right));
    }

    while (tokens.length > 0) {
        const token = tokens.shift();

        if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators[operators.length - 1] !== '(') {
                applyOperator();
            }
            operators.pop(); // Remove the '('
        } else if (token === 'AND' || token === 'OR') {
            while (operators.length > 0 && precedence(operators[operators.length - 1]) >= precedence(token)) {
                applyOperator();
            }
            operators.push(token);
        } else {
            // This should be a condition like "age > 30"
            const condition = [token, tokens.shift(), tokens.shift()].join(' ');
            operands.push(new Node("operand", parseCondition(condition)));
        }
    }

    while (operators.length > 0) {
        applyOperator();
    }

    return operands[0];
}

function precedence(operator) {
    if (operator === 'AND') return 2;
    if (operator === 'OR') return 1;
    return 0;
}

function combineRules(rules) {
    const ruleASTs = rules.map(createRuleAST);
    let combinedAST = ruleASTs[0];

    for (let i = 1; i < ruleASTs.length; i++) {
        combinedAST = new Node("operator", "OR", combinedAST, ruleASTs[i]);
    }
    return combinedAST;
}

function evaluateRule(node, data) {
    if (node.type === "operand") {
        const { field, operator, value } = node.value;
        const userValue = data[field];
        switch (operator) {
            case '>': return userValue > value;
            case '<': return userValue < value;
            case '=': return userValue == value;
            default: throw new Error("Unsupported operator");
        }
    } else if (node.type === "operator") {
        const leftResult = evaluateRule(node.left, data);
        const rightResult = evaluateRule(node.right, data);

        if (node.value === "AND") return leftResult && rightResult;
        if (node.value === "OR") return leftResult || rightResult;
    }
    throw new Error("Invalid AST structure");
}

module.exports = {
    createRuleAST,
    combineRules,
    evaluateRule,
    setAST(ast) { astStorage = ast; },
    getAST() { return astStorage; },
};
