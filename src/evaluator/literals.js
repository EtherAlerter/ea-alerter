const evaluateLiteralExpression = (e, c, context) => {
  if (e.type === 'BOOLEAN') {
    return context.values.booleanValue(e.value);
  } else if (e.type === 'NUMERIC') {
    return context.values.numericValue(e.value);
  }
  throw Error('Unrecognized literal type');
};

export default evaluateLiteralExpression;
