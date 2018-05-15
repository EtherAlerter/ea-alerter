const logger = scope => ({
  info: (m) => {
    console.log(`${scope}: ${m}`); // eslint-disable-line no-console
  },
  error: (m) => {
    console.error(`${scope}: ${m}`); // eslint-disable-line no-console
  },
});

export default logger;
