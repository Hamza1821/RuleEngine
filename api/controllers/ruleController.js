const ruleService = require('../services/ruleService');

exports.createRule = (req, res) => {
    const { rule_string } = req.body;
    console.log("Extracted rule_string:", rule_string);
    if (!rule_string) return res.status(400).json({ error: "rule_string is required" });

    try {
        const ast = ruleService.createRuleAST(rule_string);
        ruleService.setAST(ast); 
        console.log(ruleService.getAST(ast))
        res.json({ message: "Rule created", ast });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.combineRules = (req, res) => {
    const { rules } = req.body;
    if (!rules || !Array.isArray(rules)) return res.status(400).json({ error: "rules must be an array" });

    try {
        const combinedAST = ruleService.combineRules(rules);
        ruleService.setAST(combinedAST);
        res.json({ message: "Rules combined", combinedAST });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.evaluateRule = (req, res) => {
    const { data } = req.body;
    const ast = ruleService.getAST();
    if (!data) return res.status(400).json({ error: "data is required" });
    if (!ast) return res.status(400).json({ error: "No rule AST found. Create or combine rules first." });

    try {
        const result = ruleService.evaluateRule(ast, data);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
