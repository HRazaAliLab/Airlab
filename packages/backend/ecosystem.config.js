module.exports = [
  {
    script: "dist/main.js",
    name: "airlab",
    exec_mode: "cluster",
    instances: 4,
  },
];
