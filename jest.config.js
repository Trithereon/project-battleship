// jest.config.js
module.exports = {
  moduleNameMapper: {
    "\\.(svg|png|jpg|jpeg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
};
