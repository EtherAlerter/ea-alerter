import { evaluateCallExpression } from './calls';
import { evaluateLiteralExpression } from './literals';
import { evaluateBinaryExpression } from './binary';
import * as values from './values';

const evaluate = (e, c, context) => {
  switch (e.type) {
    case 'BINARY':
      return evaluateBinaryExpression(e, c, context);
    case 'CALL':
      return evaluateCallExpression(e, c, context);
    case 'LITERAL':
      return evaluateLiteralExpression(e, c, context);
    default:
      throw Error('Invalid type');
  }
};

const evaluateContractExpression = web3 => (e, c) => evaluate(e, c, {
  web3,
  evaluate,
  values,
});

export default evaluateContractExpression;
