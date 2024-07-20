module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Port number of your local blockchain (e.g., Ganache)
      network_id: "*", // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Use a specific Solidity version
    },
  },
};
