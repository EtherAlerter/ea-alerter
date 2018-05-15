const evaluateBothSides = (e, c, context) => ({
  lhs: context.evaluate(e.leftHandSide, c, context),
  rhs: context.evaluate(e.rightHandSide, c, context),
});

const operators = {
  EQUALS: (e, c, context) => {
    const { lhs, rhs } = evaluateBothSides(e, c, context);
    if (lhs.type === 'NUMBER') {
      if (rhs.type === 'NUMBER') {
        return context.values.booleanValue(lhs.value.eq(rhs.value));
      }
      throw Error('Cannot compare NUMBER to non-NUMBER');
    } else if (lhs.type === 'STRING') {
      return context.values.booleanValue(lhs.value === context.values.asString(rhs));
    } else if (lhs.type === 'BOOLEAN') {
      return context.values.booleanValue(lhs.value === context.values.asBoolean(rhs));
    }
    return context.values.booleanValue(lhs.type === rhs.type && lhs.value === rhs.value);
  },
  LESS_THAN: (e, c, context) => {
    const { lhs, rhs } = evaluateBothSides(e, c, context);
    return context.values.booleanValue(lhs.type === rhs.type && lhs.type === 'NUMERIC' && lhs.value === rhs.value);
  },
  PLUS: (e, c, context) => {
    const { lhs, rhs } = evaluateBothSides(e, c, context);
    return context.values.numericValue(lhs.value + rhs.value);
  },
};

const evaluateBinaryExpression = (e, c, context) => {
  if (operators[e.operator]) {
    return operators[e.operator](e, c, context);
  }
  throw Error('Unrecognized operator');
};

export default evaluateBinaryExpression;
