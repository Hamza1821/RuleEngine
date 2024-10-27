// src/App.js
import  { useState } from 'react';
import { createRule, combineRules, evaluateRule } from './api';
import './index.css'; // Import your CSS file

function App() {
    const [ruleString, setRuleString] = useState('');
    const [combinedRules, setCombinedRules] = useState('');
    const [evaluationData, setEvaluationData] = useState('');
    const [result, setResult] = useState(null);
    const [combineResult, setCombineResult] = useState(null);
    const [evaluationResult, setEvaluationResult] = useState(null);

    const handleCreateRule = async () => {
        try {
            const response = await createRule(ruleString);
            setResult(response.data);
        } catch (error) {
            console.error(error);
            setResult({ error: "Error creating rule." });
        }
    };

    const handleCombineRules = async () => {
        try {
            const rulesArray = combinedRules.split(',').map(rule => rule.trim());
            const response = await combineRules(rulesArray);
            setCombineResult(response.data);
        } catch (error) {
            console.error(error);
            setCombineResult({ error: "Error combining rules." });
        }
    };

    const handleEvaluateRule = async () => {
        try {
            const data = JSON.parse(evaluationData);
            const response = await evaluateRule(data);
            setEvaluationResult(response.data);
        } catch (error) {
            console.error(error);
            setEvaluationResult({ error: "Error evaluating rule." });
        }
    };

    return (
        <div className="container">
            <h2>Rule Engine UI</h2>
            
            {/* Create Rule */}
            <div className="card">
                <h3>Create Rule</h3>
                <input
                    type="text"
                    placeholder="Enter rule string"
                    value={ruleString}
                    onChange={(e) => setRuleString(e.target.value)}
                    className="input"
                />
                <button onClick={handleCreateRule} className="button">Create Rule</button>
                {result && <pre className="result">{JSON.stringify(result, null, 2)}</pre>}
            </div>

            {/* Combine Rules */}
            <div className="card">
                <h3>Combine Rules</h3>
                <input
                    type="text"
                    placeholder="Enter comma-separated rules"
                    value={combinedRules}
                    onChange={(e) => setCombinedRules(e.target.value)}
                    className="input"
                />
                <button onClick={handleCombineRules} className="button">Combine Rules</button>
                {combineResult && <pre className="result">{JSON.stringify(combineResult, null, 2)}</pre>}
            </div>

            {/* Evaluate Rule */}
            <div className="card">
                <h3>Evaluate Rule</h3>
                <textarea
                    placeholder='Enter JSON data (e.g., {"age": 35, "department": "Sales"})'
                    value={evaluationData}
                    onChange={(e) => setEvaluationData(e.target.value)}
                    className="textarea"
                />
                <button onClick={handleEvaluateRule} className="button">Evaluate Rule</button>
                {evaluationResult && <pre className="result">{JSON.stringify(evaluationResult, null, 2)}</pre>}
            </div>
        </div>
    );
}

export default App;
