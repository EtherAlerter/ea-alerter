
export const booleanValue = b => ({
  type: 'BOOLEAN',
  value: b,
});

export const stringValue = s => ({
  type: 'STRING',
  value: s,
});

export const numericValue = n => ({
  type: 'NUMERIC',
  value: n,
});

export const arrayValue = a => ({
  type: 'ARRAY',
  value: a,
});

export const asString = (s) => {
  if (s.type === 'STRING') {
    return s;
  } else if (s.type === 'NUMBER') {
    return stringValue(s.value.toString(10));
  } else if (s.type === 'BOOLEAN') {
    return stringValue(s.value ? 'TRUE' : 'FALSE');
  }
  throw Error('Invalid type');
};

export const asBoolean = (b) => {
  if (b.type === 'BOOLEAN') {
    return b;
  } else if (b.type === 'NUMBER') {
    return booleanValue(!b.value.isZero());
  } else if (b.type === 'STRING') {
    return booleanValue(b.value.length !== 0);
  }
  throw Error('Invalid type');
};
