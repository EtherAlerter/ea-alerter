const evaluateParameters = (
  parameters,
  c,
  context,
) => parameters.map(p => context.evaluate(p, c, context));

const convertCallResult = (context, result) => {
  if (typeof result === 'string') {
    return context.values.stringValue(result);
  }
  if (context.web3.utils.isBigNumber(result)) {
    return context.values.numericValue(result);
  }
  if (typeof result === 'object') {
    const a = [];
    for (let i = 0; ; i += 1) {
      if (result[i]) {
        a.push(result[i]);
      } else {
        break;
      }
    }
    return context.values.arrayValue(a);
  }
  throw Error('Unhandled return type');
};

const evaluateCallExpression = async (e, c, context) => {
  const descriptor = c.methods[e.methodName];
  if (!descriptor) {
    throw Error('Unrecognized method');
  }
  const parameters = evaluateParameters(e.parameters, c, context);
  const method = descriptor(...parameters);
  return convertCallResult(context, await method.call());
};

export default evaluateCallExpression;
