module.exports = [
  {
    script: "dist/src/main.js",
    name: "airlab",
    exec_mode: "cluster",
    instances: 4,
  },
];
